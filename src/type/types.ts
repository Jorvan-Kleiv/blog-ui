type Common = {
    id: string,
    created_at: Date | string | null,
    updated_at: Date | string | null
}

export type User = {
    username: string,
    first_name?: string,
    last_name?: string,
    email: string,
    password: string,
} & Common;

export type Profile = {
    username: string,
    bio: string,
    country: string,
    city: string,
    phone: string,
    website: string,
    facebook: string,
    twitter: string,
    instagram: string,
    youtube: string,
    linkedin: string,
    user: User
} & Common;

export type Image = {
    name: string,
    path: string,
} & Common;


export type Tag = {
    name: string;
    article_id?: string;
} & Common;

export type Article = {
    title: string,
    content: string,
    status: string,
    is_liked: boolean,
    likes_count: number,
    owner: User,
    image: Image | null,
    tags?: Tag[]
} & Common;


export type Comment = {
    content: string,
    commentable_type: unknown,
    commentable_id: string,
    user: User,
} & Common;
