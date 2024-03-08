import { BlogPost } from "../../lib/posts";

export type ReactionType = "like";

export interface Reaction {
  type: ReactionType;
  count: number;
  hasReacted: boolean;
}

export interface SearchHit {
  objectID: string;
  title: string;
  description: string;
  date: string;
  metadata: string[];
  slug: string;
}

export interface ApiResponse<T> {
  data?: T;
  isSuccess: boolean;
  message?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  username: string;
  isLoggedIn: boolean;
}

export interface PostsRequest {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  tags?: string[];
  publishedAt?: Date;
}

export interface PostsPatchRequest {
  id: string;
  fields: Record<PostPatchFields, any>;
}

export type PostPatchFields =
  | "title"
  | "slug"
  | "description"
  | "content"
  | "tags"
  | "publishedAt";

export const parseJsonRequest = <T>(req: string): T => JSON.parse(req) as T;

export interface Paged<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

export type PostSummary = Pick<
  BlogPost,
  "id" | "slug" | "description" | "date" | "tags" | "title"
>;

export interface ReactionRequest {
  slug: string;
  type: string;
  currentCount: number;
}

export interface SearchRequest {
  query: string;
}

export interface PostPageRequest {
  page: number;
}
