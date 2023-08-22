import express from "express"
import { Delete, dislike, getUser, like, subscribe, unsubscribe, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//update a user;
router.put("/:id",verifyToken,update)
router.delete("/:id",verifyToken,Delete);

router.get("/find/:id",getUser)


router.put("/sub/:id",verifyToken,subscribe)

router.put("/unsub/:id",verifyToken,unsubscribe);

router.put("/like/:videoId",verifyToken,like)


router.put("/dislike/:videoId",verifyToken,dislike)





export default router;


// 18:00 timestamp lama dave