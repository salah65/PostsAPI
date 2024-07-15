import express from "express";
import { create_new_post_Handler, get_All_Posts_ByDate_Handler, update_post_votes_Handler } from "../postsController/postsController";

export const router = express.Router();
router.get("/posts/:date", get_All_Posts_ByDate_Handler);
router.post("/posts", create_new_post_Handler);
router.patch("/posts/:date", update_post_votes_Handler);


