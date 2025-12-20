import { getQueryPost,createPost,  updatePost, deletePost} from "../../controller/post/post.controller.ts";
import express from "express";
const postRouter = express.Router();
postRouter.get('/', getQueryPost);
postRouter.post('/newpost', createPost);
postRouter.put('/:id', updatePost);
postRouter.delete('/delete/:id', deletePost);
export default postRouter;