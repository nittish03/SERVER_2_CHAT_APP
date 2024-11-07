import express from 'express';
import { getUsersForSidebar } from '../controllers/userController.js';
import protectRoutes from "../middleware/protectRoute.js"


const router = express.Router();



router.get("/",protectRoutes,getUsersForSidebar);


export default router;