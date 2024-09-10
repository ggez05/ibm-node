import { Router } from "express";
import * as reviewControllers from "../controllers/review.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

// registered users
router.put("/books/:id/reviews", authenticate, reviewControllers.addReview);
router.delete(
  "/books/:id/reviews",
  authenticate,
  reviewControllers.deleteReview
);

// general users
router.get("/books/:id/reviews", reviewControllers.getReview);

export default router;
