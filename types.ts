export interface IUser {
  id: string;
  email: string;
  name: string;
  posts?: IPost[];
  profile?: IProfile;
}

export interface IPost {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  images: string[];
  likes: number | null;
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
  post?: IPost[];
}

export interface IFeedCard {
  user?: {
    id?: string;
    name?: string;
    email?: string;
    profile?: {
      picture?: string;
    };
  };
  post: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    images: string[];
    likes: number | null;
    ownerId: string;
    owner: {
      id: string;
      name: string | null;
      email: string;
      picture?: string;
    };
    comments: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      description: string;
    }[];
  };
}
