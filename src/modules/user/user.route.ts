import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../../middleware/auth";
import { CreateUserController } from "./user.controller";

const router = Router();

router.post('/register', CreateUserController.createUser);
router.get('/me',auth(Role.USER), CreateUserController.getMyprofile);
router.patch('/updateProfile', auth(Role.USER || Role.AUTHOR), CreateUserController.updateProfile)

export const UserRoutes = router;