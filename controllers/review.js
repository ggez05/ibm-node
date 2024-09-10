const reviews = [
  {
    UserId: 1,
    BookId: 123456789,
    review_text: "A timeless classic, beautifully written!",
  },
  {
    UserId: 1,
    BookId: 456456456,
    review_text: "An insightful story with strong characters.",
  },
  {
    UserId: 2,
    BookId: 456456456,
    review_text: "A gripping tale, but a bit too dark for my taste.",
  },
  {
    UserId: 1,
    BookId: 123123123,
    review_text: "Loved the depth of the characters!",
  },
];

export function addReview(req, res) {
  try {
    const { user_id } = req.user;
    const book_id = req.params.id;
    const { review_text } = req.body;

    const review = reviews.find(
      (review) => review.UserId == user_id && review.BookId == book_id
    );

    if (review) {
      review.review_text = review_text;
      return res.json({ message: "Review updated successfully!" });
    }

    reviews.push({ UserId: user_id, BookId: book_id, review_text });
    res.json({ message: "Review added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export function getReview(req, res) {
  try {
    const { id } = req.params;

    // Find reviews for the given book
    const bookReview = reviews.filter((review) => review.BookId == id);

    if (!bookReview.length) {
      return res.json({ message: "No review found for this book!" });
    }

    res.json({ message: "Review found for this book", bookReview });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export function deleteReview(req, res) {
  try {
    const { user_id } = req.user;
    const { id } = req.params;

    // Find index of the review to delete
    const reviewIndex = reviews.findIndex(
      (review) => review.UserId == user_id && review.BookId == id
    );

    if (reviewIndex === -1) {
      return res.json({ message: "No review found for that user to delete!" });
    }

    // Remove the review from the array
    reviews.splice(reviewIndex, 1);
    res.json({ message: "Review deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}
