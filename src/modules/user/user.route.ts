import { Router } from "express";
import { CreateUserController } from "./user.controller";

const router = Router();

router.post('/register', CreateUserController.createUser);


export const UserRoutes = router;