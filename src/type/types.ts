type Common = {
    id: string | undefined,
    created_at: Date | undefined,
    updated_at: Date | undefined
}
export type User = {
    username: string,
    first_name: string | undefined,
    last_name: string | undefined,
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
export type Validation = {
    code: string,
    expiration_date: Date,
    user: User,

} & Common;
export type Article = {
    title: string,
    content: string,
    status: string,
    user: User,
    image: Image

} & Common;
export type Image = {
    name: string,
    path: string,
} & Common;
export type Tag = {
    name: string,
    article: Article,

} & Common;
export type Comment = {
    content: string,
    commentable_type: unknown,
    commentable_id: unknown,
    user: User,

} & Common;