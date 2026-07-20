import { NextFunction, Request, Response } from "express";
import httpstatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { postService } from "./post.service";

const createPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.user?.id;
    const payload = req.body;
    const post = await postService.createPost(payload, userId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.CREATED,
      message: "post created successfully!",
      data: { post },
    });
  },
);

const getAllPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAllPosts();

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "All post retrieve successfully",
      data: { posts },
    });
  },
);

const getPostById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const posts = await postService.getPostById(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "post retrieved successfully",
      data: { posts },
    });
  },
);

const getMyPosts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id;
    const myposts = await postService.getMyPosts(authorId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "post retrieved successfully",
      data: { myposts },
    });
  },
);

const updatePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const payload = req.body;
    const authorId = req.user?.id;
    const updatepost = await postService.updatePost(
      postId as string,
      payload,
      authorId as string,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "post updated successfully",
      data: { updatepost },
    });
  },
);

const deletePost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;
    const result = await postService.deletePost(postId as string);

    sendResponse(res, {
      success: true,
      statusCode: httpstatus.OK,
      message: "Post deleted successfully",
      data: { result },
    });
  },
);
export const PostController = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPosts,
  updatePost,
  deletePost,
};
