import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

import { auth } from "../../../middleware/auth";
import { PostController } from "./post.controller";

const router = Router();

router.post(
  "/",
  auth(Role.USER, Role.ADMIN, Role.AUTHOR),
  PostController.createPost,
);

router.get("/", PostController.getAllPosts);

// router.get("/stats", auth(Role.ADMIN), PostController.getPostsStats);

// router.get(
//   "/my-posts",
//   auth(Role.USER, Role.ADMIN, Role.AUTHOR),
//   PostController.getMyPosts,
// );

// router.get("/:postId", PostController.getPostById);

// router.patch(
//   "/:postId",
//   auth(Role.USER, Role.ADMIN, Role.AUTHOR),
//   PostController.updatePost,
// );

// router.delete(
//   "/:postId",
//   auth(Role.USER, Role.ADMIN, Role.AUTHOR),
//   PostController.deletePost,
// );

export const postRoutes = router;
