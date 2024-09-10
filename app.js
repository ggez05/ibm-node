import cors from "cors";
import dotenv from "dotenv";
import Express from "express";

// routes
import notFoundHandler from "./middleware/not-found.js";
import authRoutes from "./routes/auth.js";
import bookRoutes from "./routes/book.js";
import reviewRoutes from "./routes/review.js";

dotenv.config();

const app = Express();
app.use(cors());
// middleware
app.use(Express.json());

// routes
const baseURL = "/api/v1";
app.use(baseURL, authRoutes);
app.use(baseURL, bookRoutes);
app.use(baseURL, reviewRoutes);

// error handlers
app.use(notFoundHandler);

try {
  const port = 5000;
  app.listen(port, console.log(`Server running on port ${port}!`));
} catch (error) {
  console.log(error);
}
