<template>
  <div>
    <!-- Composant Drawer -->
    <Teleport to="body">
      <!-- Overlay -->
      <Transition name="overlay">
        <div
            v-if="isOpen"
            class="fixed inset-0 bg-black/70 z-40 min-h-full"
            @click="closeDrawer"
        ></div>
      </Transition>

      <!-- Drawer -->
      <Transition :name="`drawer-${position}`">
        <div
            v-if="isOpen"
            :class="drawerClasses"
            class="fixed bg-white shadow-xl z-50"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ props.header }}
            </h2>
            <button
                @click="closeDrawer"
                class="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X class="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div class="px-4 py-2 overflow-y-auto">
            <slot />
          </div>
          <!-- Footer (optionnel) -->
          <div v-if="showFooter" class="p-4 border-t border-gray-200 bg-gray-50">
            <div class="flex justify-end gap-2">
              <button
                  @click="closeDrawer"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Annuler
              </button>
              <button
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
const emit = defineEmits(['close'])
import { ref, computed } from 'vue'
import {
  X,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Home,
  User,
  Settings,
  Mail,
  Info,
  CheckCircle,
  Bell,
  Calendar,
  Plus,
  Download,
  Share,
  Trash2
} from 'lucide-vue-next'
const position = ref()
const showFooter = ref(false)

const props = defineProps({
  position: {
    type: String,
    default: 'bottom',
  },
  header: {
    type: String,
    required: true,
    default: 'Insane',
  },
  isOpen: {
    type: Boolean,
    default: false,
  }
})
position.value = props.position

// Classes CSS dynamiques
const drawerClasses = computed(() => {
  const baseClasses = 'transition-all duration-300 ease-in-out'

  switch (position.value) {
    case 'left':
      return `${baseClasses} top-0 left-0 min-h-full overflow-y-auto max-h-screen w-1/2 max-w-[80vw]`
    case 'right':
      return `${baseClasses} top-0 right-0 min-h-full overflow-y-auto max-h-screen w-1/2 max-w-[80vw]`
    case 'top':
      return `${baseClasses} top-0 left-0 w-full h-fit max-h-[80vh]`
    case 'bottom':
      return `${baseClasses} bottom-0 left-0 w-full h-fit max-h-[80vh]`
    default:
      return baseClasses
  }
})


// Function to close the drawer
const closeDrawer = () => {
  emit('close')
}

// Fermeture avec la touche Escape
const handleKeydown = (event) => {
  if (event.key === 'Escape' && props.isOpen) {
    closeDrawer()
  }
}

// Écouter les événements clavier
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<style scoped>
/* Animations pour l'overlay */
.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}


/* Animations pour le drawer gauche */
.drawer-left-enter-active,
.drawer-left-leave-active {
  transition: transform 0.3s ease;
}

.drawer-left-enter-from,
.drawer-left-leave-to {
  transform: translateX(-100%);
}

/* Animations pour le drawer droite */
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: transform 0.3s ease;
}

.drawer-right-enter-from,
.drawer-right-leave-to {
  transform: translateX(100%);
}

/* Animations pour le drawer haut */
.drawer-top-enter-active,
.drawer-top-leave-active {
  transition: transform 0.3s ease;
}

.drawer-top-enter-from,
.drawer-top-leave-to {
  transform: translateY(-100%);
}

/* Animations pour le drawer bas */
.drawer-bottom-enter-active,
.drawer-bottom-leave-active {
  transition: transform 0.3s ease;
}

.drawer-bottom-enter-from,
.drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style>
