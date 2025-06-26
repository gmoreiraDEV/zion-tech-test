// data-access/userDAL.ts
import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export const getAllPosts = async () => {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      owner: true,
      comments: true,
    },
  });
};

export const getPostById = async (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      owner: true,
      comments: true,
    },
  });
};

export const createPost = async (data: {
  description?: string;
  images?: string[];
  ownerId: string;
}) => {
  return prisma.post.create({
    data,
  });
};

export const deletePost = async (id: string) => {
  return prisma.post.delete({
    where: { id },
  });
};
