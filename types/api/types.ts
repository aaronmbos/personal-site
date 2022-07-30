export type ReactionType = "like";

export interface Reaction {
  type: ReactionType;
  count: number;
  hasReacted: boolean;
}
