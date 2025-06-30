export interface IPost {
  id: string;
  ownerId: string;
  description: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  images?: string[];
  comments_count?: number;
}

export interface IComment {
  id: string;
  postId: string;
  userId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
