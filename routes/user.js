import express  from "express";
import * as allControllers from "../controllers/user.js"
import { isAuthenticated } from "../middleware/authentic.js";

const router=express.Router();

router.get('/all',allControllers.showall);

router.post('/register',allControllers.register);

router.post('/login',allControllers.login);

router.get('/logout',allControllers.logout);

router.get('/me',isAuthenticated,allControllers.detail);

export default router;