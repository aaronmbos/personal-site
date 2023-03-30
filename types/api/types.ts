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
  data: T;
  isSuccess: boolean;
  message: string;
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
  description: string;
  content: string;
  tags?: string[];
}

export const parseJsonRequest = <T>(req: string): T => JSON.parse(req) as T;
