import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export type Result = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: ApiError;
};
export type CommentId = bigint;
export interface Comment {
    id: CommentId;
    createdAt: Timestamp;
    text: string;
    user: UserId;
}
export interface Post {
    id: PostId;
    content: string;
    createdAt: Timestamp;
    user: UserId;
    likes: Array<UserId>;
    image?: string;
    comments: Array<Comment>;
}
export interface User {
    id: UserId;
    bio: string;
    username: string;
    createdAt: Timestamp;
    followers: Array<UserId>;
    following: Array<UserId>;
    profilePicture: string;
}
export type PostId = bigint;
export type ApiError = {
    __kind__: "alreadyExists";
    alreadyExists: null;
} | {
    __kind__: "invalidInput";
    invalidInput: string;
} | {
    __kind__: "notFound";
    notFound: null;
} | {
    __kind__: "selfAction";
    selfAction: null;
} | {
    __kind__: "unauthorized";
    unauthorized: null;
};
export type Result_1 = {
    __kind__: "ok";
    ok: PostId;
} | {
    __kind__: "err";
    err: ApiError;
};
export interface backendInterface {
    addComment(postId: PostId, text: string): Promise<Result>;
    createPost(content: string, image: string | null): Promise<Result_1>;
    deletePost(postId: PostId): Promise<Result>;
    followUser(target: UserId): Promise<Result>;
    getAllUsers(): Promise<Array<User>>;
    getExplorePosts(page: bigint, limit: bigint): Promise<Array<Post>>;
    getFeed(page: bigint, limit: bigint): Promise<Array<Post>>;
    getFollowers(userId: UserId): Promise<Array<User>>;
    getFollowing(userId: UserId): Promise<Array<User>>;
    getMyProfile(): Promise<User | null>;
    getPost(postId: PostId): Promise<Post | null>;
    getUser(userId: UserId): Promise<User | null>;
    getUserProfile(userId: UserId): Promise<User | null>;
    likePost(postId: PostId): Promise<Result>;
    registerUser(username: string, bio: string, profilePicture: string): Promise<Result>;
    unfollowUser(target: UserId): Promise<Result>;
    unlikePost(postId: PostId): Promise<Result>;
    updatePost(postId: PostId, content: string, image: string | null): Promise<Result>;
    updateProfile(username: string, bio: string, profilePicture: string): Promise<Result>;
}
