export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags?: string[];
  published_at?: Date;
  created_at: Date;
  updated_at: Date;
}
