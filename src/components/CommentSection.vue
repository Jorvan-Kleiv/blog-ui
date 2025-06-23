<template>
  <div class="max-w-4xl py-2 bg-white rounded-2xl">
    <!-- Comment Input Section -->
    <div class="mb-8">
      <div class="bg-gray-50 rounded-xl px-4 py-2 border border-gray-200">
        <textarea
            v-model="newComment"
            placeholder="Add comment..."
            class="w-full bg-transparent resize-none outline-none text-gray-700 placeholder-gray-500 min-h-20"
            :class="textFormatting"
            @keydown.ctrl.enter="submitComment"
        ></textarea>

        <!-- Formatting Toolbar -->
        <div class="flex items-center justify-between mt-4">
          <div class="flex items-center space-x-3">
            <button
                @click="toggleBold"
                :class="{ 'bg-gray-300 text-gray-800': isBold }"
                class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Bold"
            >
              <Bold class="w-4 h-4 text-gray-600" />
            </button>
            <button
                @click="toggleItalic"
                :class="{ 'bg-gray-300 text-gray-800': isItalic }"
                class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Italic"
            >
              <Italic class="w-4 h-4 text-gray-600" />
            </button>
            <button
                @click="toggleUnderline"
                :class="{ 'bg-gray-300 text-gray-800': isUnderline }"
                class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Underline"
            >
              <Underline class="w-4 h-4 text-gray-600" />
            </button>
            <div class="w-px h-6 bg-gray-300"></div>
            <button
                @click="triggerFileUpload"
                class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Attach file"
            >
              <Paperclip class="w-4 h-4 text-gray-600" />
            </button>
            <input
                ref="fileInput"
                type="file"
                @change="handleFileUpload"
                class="hidden"
                accept="image/*,video/*,.pdf,.doc,.docx"
            />
            <button
                @click="triggerImageUpload"
                class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Add image"
            >
              <Image class="w-4 h-4 text-gray-600" />
            </button>
            <input
                ref="imageInput"
                type="file"
                @change="handleImageUpload"
                class="hidden"
                accept="image/*"
            />
            <button
                @click="toggleEmojiPicker"
                class="p-2 hover:bg-gray-200 rounded-lg transition-colors relative"
                title="Add emoji"
            >
              <Smile class="w-4 h-4 text-gray-600" />
            </button>
            <button
                @click="insertMention"
                class="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                title="Mention someone"
            >
              <AtSign class="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <button
              @click="submitComment"
              :disabled="!newComment.trim()"
              class="px-6 py-2 bg-purple-500 text-white rounded-full font-medium hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            Submit
          </button>
        </div>

        <!-- Emoji Picker -->
        <transition name="fade">
          <div v-if="showEmojiPicker" class="mt-4 p-4 bg-white border rounded-lg shadow-lg">
            <div class="grid grid-cols-8 gap-2">
              <button
                  v-for="emoji in emojis"
                  :key="emoji"
                  @click="insertEmoji(emoji)"
                  class="p-2 hover:bg-gray-100 rounded text-xl transition-colors"
              >
                {{ emoji }}
              </button>
            </div>
          </div>
        </transition>

        <!-- File Preview -->
        <div v-if="attachedFiles.length > 0" class="mt-4 space-y-2">
          <div
              v-for="(file, index) in attachedFiles"
              :key="index"
              class="flex items-center justify-between bg-white p-3 rounded-lg border"
          >
            <div class="flex items-center space-x-2">
              <Paperclip class="w-4 h-4 text-gray-500" />
              <span class="text-sm text-gray-700">{{ file.name }}</span>
            </div>
            <button
                @click="removeFile(index)"
                class="text-red-500 hover:text-red-700 transition-colors"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Comments Header -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-2">
        <button
            @click="toggleCommentsSection"
            class="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          <ChevronRight
              v-if="!showComments"
              class="w-5 h-5 text-gray-600 transition-transform duration-200"
          />
          <ChevronDown
              v-else
              class="w-5 h-5 text-gray-600 transition-transform duration-200"
          />
          <h2 class="text-xl font-semibold text-gray-900">Comments</h2>
          <span class="bg-purple-500 text-white text-sm px-2 py-1 rounded-full font-medium">
            {{ totalCommentsCount }}
          </span>
        </button>
      </div>

      <div v-if="showComments" class="flex items-center space-x-2">
        <ArrowUpDown class="w-4 h-4 text-gray-500" />
        <select
            v-model="sortBy"
            class="text-gray-700 bg-transparent outline-none cursor-pointer"
        >
          <option value="recent">Most recent</option>
          <option value="popular">Most popular</option>
          <option value="oldest">Oldest first</option>
        </select>
        <ChevronDown class="w-4 h-4 text-gray-500" />
      </div>
    </div>

    <!-- Comments List -->
    <transition name="slide-down">
      <div v-if="showComments" class="space-y-4">
        <div
            v-for="comment in sortedComments"
            :key="comment.id"
            class="comment-item"
        >
          <!-- Main Comment -->
          <div class="flex space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200">
            <img
                :src="comment.avatar"
                :alt="comment.author"
                class="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                @error="handleImageError"
            />

            <div class="flex-1 min-w-0">
              <div class="flex items-center space-x-2 mb-2">
                <span class="font-medium text-gray-900">{{ comment.author }}</span>
                <CheckCircle
                    v-if="comment.isVerified"
                    class="w-4 h-4 text-blue-500"
                />
                <span class="text-sm text-gray-500">{{ comment.timestamp }}</span>
              </div>

              <div
                  class="text-gray-700 mb-3 leading-relaxed whitespace-pre-wrap"
                  :class="comment.formatting"
              >
                {{ comment.content }}
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center space-x-4">
                <button
                    @click="likeComment(comment.id)"
                    :class="{ 'text-purple-500': comment.userLiked }"
                    class="flex items-center space-x-1 text-gray-500 hover:text-purple-500 transition-colors group"
                >
                  <ThumbsUp class="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span class="text-sm font-medium">{{ comment.likes }}</span>
                </button>

                <button
                    @click="dislikeComment(comment.id)"
                    :class="{ 'text-red-500': comment.userDisliked }"
                    class="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors group"
                >
                  <ThumbsDown class="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span class="text-sm font-medium">{{ comment.dislikes }}</span>
                </button>

                <button
                    @click="replyToComment(comment)"
                    class="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors group"
                >
                  <MessageCircle class="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span class="text-sm font-medium">Reply</span>
                </button>

                <button class="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreHorizontal class="w-4 h-4" />
                </button>
              </div>

              <!-- Replies Toggle -->
              <div v-if="comment.replies && comment.replies.length > 0" class="mt-3">
                <button
                    @click="toggleReplies(comment.id)"
                    class="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <ChevronRight
                      v-if="!comment.showReplies"
                      class="w-4 h-4 transition-transform duration-200"
                  />
                  <ChevronDown
                      v-else
                      class="w-4 h-4 transition-transform duration-200"
                  />
                  <span>{{ comment.replies.length }} {{ comment.replies.length === 1 ? 'reply' : 'replies' }}</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Replies -->
          <transition name="slide-down">
            <div v-if="comment.showReplies && comment.replies && comment.replies.length > 0" class="ml-14 border-l-2 border-gray-100 pl-4 space-y-2">
              <div
                  v-for="reply in comment.replies"
                  :key="reply.id"
                  class="flex space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <img
                    :src="reply.avatar"
                    :alt="reply.author"
                    class="w-8 h-8 rounded-full flex-shrink-0 object-cover"
                    @error="handleImageError"
                />

                <div class="flex-1 min-w-0">
                  <div class="flex items-center space-x-2 mb-1">
                    <span class="font-medium text-gray-900 text-sm">{{ reply.author }}</span>
                    <CheckCircle
                        v-if="reply.isVerified"
                        class="w-3 h-3 text-blue-500"
                    />
                    <span class="text-xs text-gray-500">{{ reply.timestamp }}</span>
                  </div>

                  <div
                      class="text-gray-700 text-sm mb-2 leading-relaxed whitespace-pre-wrap"
                      :class="reply.formatting"
                  >
                    {{ reply.content }}
                  </div>

                  <div class="flex items-center space-x-3">
                    <button
                        @click="likeComment(reply.id, true, comment.id)"
                        :class="{ 'text-purple-500': reply.userLiked }"
                        class="flex items-center space-x-1 text-gray-500 hover:text-purple-500 transition-colors group"
                    >
                      <ThumbsUp class="w-3 h-3 group-hover:scale-110 transition-transform" />
                      <span class="text-xs font-medium">{{ reply.likes }}</span>
                    </button>

                    <button
                        @click="dislikeComment(reply.id, true, comment.id)"
                        :class="{ 'text-red-500': reply.userDisliked }"
                        class="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors group"
                    >
                      <ThumbsDown class="w-3 h-3 group-hover:scale-110 transition-transform" />
                      <span class="text-xs font-medium">{{ reply.dislikes }}</span>
                    </button>

                    <button
                        @click="replyToComment(reply)"
                        class="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors group"
                    >
                      <MessageCircle class="w-3 h-3 group-hover:scale-110 transition-transform" />
                      <span class="text-xs font-medium">Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </transition>

    <!-- Reply Modal -->
    <transition name="modal">
      <div
          v-if="replyingTo"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          @click.self="cancelReply"
      >
        <div class="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold">Reply to {{ replyingTo.author }}</h3>
            <button @click="cancelReply" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <div class="flex items-center space-x-3 mb-2">
              <img
                  :src="replyingTo.avatar"
                  :alt="replyingTo.author"
                  class="w-8 h-8 rounded-full object-cover"
                  @error="handleImageError"
              />
              <span class="font-medium text-gray-900">{{ replyingTo.author }}</span>
            </div>
            <div class="text-gray-700 text-sm whitespace-pre-wrap">{{ replyingTo.content }}</div>
          </div>

          <textarea
              v-model="replyContent"
              placeholder="Write your reply..."
              class="w-full p-4 border border-gray-200 rounded-lg resize-none outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="4"
              :class="replyFormatting"
          ></textarea>

          <div class="flex justify-end space-x-3 mt-4">
            <button
                @click="cancelReply"
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
                @click="submitReply"
                :disabled="!replyContent.trim()"
                class="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Reply
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  Bold, Italic, Underline, Paperclip, Image, Smile, AtSign,
  ArrowUpDown, ChevronDown, ThumbsUp, ThumbsDown, MessageCircle,
  MoreHorizontal, X, ChevronRight, CheckCircle
} from 'lucide-vue-next'

// Reactive data
const newComment = ref('')
const replyContent = ref('')
const replyingTo = ref(null)
const sortBy = ref('recent')
const comments = ref([])
const showComments = ref(true)
const showEmojiPicker = ref(false)
const attachedFiles = ref([])

// Text formatting states
const isBold = ref(false)
const isItalic = ref(false)
const isUnderline = ref(false)

// Refs
const fileInput = ref(null)
const imageInput = ref(null)

// Emojis
const emojis = ['😀', '😂', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💯', '🎉', '😢', '😡', '🤯', '🙄', '😎', '🤗']

// Avatar URLs
const avatarUrls = [

]

// Sample data with real avatars
const sampleComments = [

]

// Computed properties
const textFormatting = computed(() => {
  const classes = []
  if (isBold.value) classes.push('font-bold')
  if (isItalic.value) classes.push('italic')
  if (isUnderline.value) classes.push('underline')
  return classes.join(' ')
})

const replyFormatting = computed(() => {
  return textFormatting.value
})

const sortedComments = computed(() => {
  if (!comments.value || comments.value.length === 0) {
    return []
  }

  const sorted = [...comments.value]
  switch (sortBy.value) {
    case 'popular':
      return sorted.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes))
    case 'oldest':
      return sorted.reverse()
    default:
      return sorted
  }
})

const totalCommentsCount = computed(() => {
  if (!comments.value || comments.value.length === 0) {
    return 0
  }

  let count = comments.value.length
  comments.value.forEach(comment => {
    if (comment.replies && Array.isArray(comment.replies)) {
      count += comment.replies.length
    }
  })
  return count
})

// Initialize comments
onMounted(() => {
  comments.value = [...sampleComments]
})

// Methods
const submitComment = () => {
  if (!newComment.value.trim()) return

  // Initialize comments array if it doesn't exist
  if (!comments.value) {
    comments.value = []
  }

  const comment = {
    id: Date.now(),
    author: 'You',
    avatar: avatarUrls[4],
    content: newComment.value,
    timestamp: 'just now',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false,
    formatting: textFormatting.value,
    replies: [],
    showReplies: false
  }

  comments.value.unshift(comment)
  newComment.value = ''
  attachedFiles.value = []
  resetFormatting()
}

const resetFormatting = () => {
  isBold.value = false
  isItalic.value = false
  isUnderline.value = false
}

const toggleBold = () => {
  isBold.value = !isBold.value
}

const toggleItalic = () => {
  isItalic.value = !isItalic.value
}

const toggleUnderline = () => {
  isUnderline.value = !isUnderline.value
}

const triggerFileUpload = () => {
  if (fileInput.value) {
    fileInput.value.click()
  }
}

const triggerImageUpload = () => {
  if (imageInput.value) {
    imageInput.value.click()
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    attachedFiles.value.push({
      name: file.name,
      type: file.type,
      size: file.size
    })
    event.target.value = '' // Reset input
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      newComment.value += `\n[Image: ${file.name}]`
      console.log(e)
    }
    reader.readAsDataURL(file)
    event.target.value = '' // Reset input
  }
}

const removeFile = (index) => {
  attachedFiles.value.splice(index, 1)
}

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
}

const insertEmoji = (emoji) => {
  newComment.value += emoji
  showEmojiPicker.value = false
}

const insertMention = () => {
  newComment.value += '@'
}

const handleImageError = (event) => {
  event.target.src = '/placeholder.svg?height=40&width=40'
}

const likeComment = (commentId, isReply = false, parentId = null) => {
  if (!comments.value || comments.value.length === 0) {
    return
  }

  if (isReply && parentId) {
    const parent = comments.value.find(c => c.id === parentId)
    if (parent && parent.replies && Array.isArray(parent.replies)) {
      const reply = parent.replies.find(r => r.id === commentId)
      if (reply) {
        if (reply.userLiked) {
          reply.likes--
          reply.userLiked = false
        } else {
          reply.likes++
          reply.userLiked = true
          if (reply.userDisliked) {
            reply.dislikes--
            reply.userDisliked = false
          }
        }
      }
    }
  } else {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      if (comment.userLiked) {
        comment.likes--
        comment.userLiked = false
      } else {
        comment.likes++
        comment.userLiked = true
        if (comment.userDisliked) {
          comment.dislikes--
          comment.userDisliked = false
        }
      }
    }
  }
}

const dislikeComment = (commentId, isReply = false, parentId = null) => {
  if (!comments.value || comments.value.length === 0) {
    return
  }

  if (isReply && parentId) {
    const parent = comments.value.find(c => c.id === parentId)
    if (parent && parent.replies && Array.isArray(parent.replies)) {
      const reply = parent.replies.find(r => r.id === commentId)
      if (reply) {
        if (reply.userDisliked) {
          reply.dislikes--
          reply.userDisliked = false
        } else {
          reply.dislikes++
          reply.userDisliked = true
          if (reply.userLiked) {
            reply.likes--
            reply.userLiked = false
          }
        }
      }
    }
  } else {
    const comment = comments.value.find(c => c.id === commentId)
    if (comment) {
      if (comment.userDisliked) {
        comment.dislikes--
        comment.userDisliked = false
      } else {
        comment.dislikes++
        comment.userDisliked = true
        if (comment.userLiked) {
          comment.likes--
          comment.userLiked = false
        }
      }
    }
  }
}

const replyToComment = (comment) => {
  // Store the original comment and its parent ID if it's a reply
  replyingTo.value = {
    ...comment,
    // If this is a reply to a reply, we need to track the parent comment ID
    isReply: comment.hasOwnProperty('isReply') ? comment.isReply : false,
    parentId: comment.hasOwnProperty('parentId') ? comment.parentId : comment.id
  }
}

const submitReply = () => {
  if (!replyContent.value.trim() || !replyingTo.value) return
  if (!comments.value || comments.value.length === 0) return

  const reply = {
    id: Date.now(),
    author: 'You',
    avatar: avatarUrls[5],
    content: replyContent.value,
    timestamp: 'just now',
    likes: 0,
    dislikes: 0,
    userLiked: false,
    userDisliked: false,
    formatting: replyFormatting.value,
    // Add these properties to track that this is a reply and its parent
    isReply: true,
    parentId: replyingTo.value.parentId
  }

  // Find the top-level parent comment
  const parentComment = comments.value.find(c => c.id === replyingTo.value.parentId)
  if (parentComment) {
    // Initialize replies array if it doesn't exist
    if (!parentComment.replies || !Array.isArray(parentComment.replies)) {
      parentComment.replies = []
    }
    parentComment.replies.push(reply)

    // Initialize showReplies if it doesn't exist
    if (parentComment.showReplies === undefined) {
      parentComment.showReplies = false
    }
    parentComment.showReplies = true
  }

  cancelReply()
}

const cancelReply = () => {
  replyingTo.value = null
  replyContent.value = ''
}

const toggleReplies = (commentId) => {
  if (!comments.value || comments.value.length === 0) {
    return
  }

  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    // Initialize showReplies if it doesn't exist
    if (comment.showReplies === undefined) {
      comment.showReplies = false
    }
    comment.showReplies = !comment.showReplies
  }
}

const toggleCommentsSection = () => {
  showComments.value = !showComments.value
}
</script>

<style scoped>
.comment-item {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
.slide-down-enter-to, .slide-down-leave-from {
  opacity: 1;
  max-height: 1000px;
  transform: translateY(0);
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar for modal */
.max-h-\[80vh\]::-webkit-scrollbar {
  width: 6px;
}

.max-h-\[80vh\]::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.max-h-\[80vh\]::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.max-h-\[80vh\]::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
