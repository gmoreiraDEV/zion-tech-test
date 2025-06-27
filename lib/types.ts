export interface IPost {
  id: string;
  description?: string;
  createdAt: Date;
  images?: string[];
  ownerId: string;
  likes?: string;
  comments?: string[];
}
