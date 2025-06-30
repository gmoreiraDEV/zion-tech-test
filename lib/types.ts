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

export type CommentWithUser = {
  id: string;
  description: string;
  createdAt: string;
  postId: string;
  user: {
    id: string;
    email: string;
    raw_user_meta_data: {
      full_name?: string;
      avatar_url?: string;
      bio?: string;
    };
  };
};
