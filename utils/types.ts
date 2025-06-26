export interface IUser {
  id: string;
  email: string;
  name: string;
  posts: IPost[];
  profile: IProfile;
}

export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  image: string;
  likes: number;
  comments: Comment[];
  owner: IUser;
}

export interface IProfile {
  id: string;
  bio: string;
  picture?: string;
  userId: string;
}

export interface Comment {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  post: IPost[];
}
