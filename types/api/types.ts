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
