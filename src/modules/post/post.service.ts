import { prisma } from "../../../lib/prisma";
import { ICreatePostPayload, IUpdatePostPayload } from "./post.interface";

const createPost = async (payload: ICreatePostPayload, userId: string) => {
  const post = await prisma.post.create({
    data: {
      ...payload,
      authorId: userId,
    },
  });
  return post;
};
const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });

  return posts;
};
const getPostById = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
  });

  const updatePost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });

  return updatePost;
};
const updatePost = async (
  postId: string,
  payload: IUpdatePostPayload,
  authorId: string,
) => {
  const findPost = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (findPost.authorId !== authorId) {
    throw new Error("you are not own this post.");
  }

  const result = await prisma.post.update({
    where: { id: postId },
    data: payload,
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });

  return result;
};
const deletePost = async (postId: string) => {
  const post = await prisma.post.findUniqueOrThrow({
    where: { id: postId },
  });

  if (!post) {
    throw new Error("post not found");
  }
  const deletepost = await prisma.post.delete({
    where: { id: postId },
  });

  return deletepost;
};
const getPostsStats = () => {};

const getMyPosts = async (authorId: string) => {
  const myposts = await prisma.post.findMany({
    where: {
      authorId: authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        omit: { password: true },
      },
      comments: true,
    },
  });
  return myposts;
};

export const postService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsStats,
  getMyPosts,
};
