const Response = require("../../helper/errHandler");
const reviewModel = require("../../models/reviewschema");

const review = async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    if (!name || !message || !rating) {
      return Response.Error({
        res,
        status: 400,
        message: "All fields are required",
      });
    }

    const createrating = await reviewModel.create({
      name,
      message,
      rating,
    });

    return Response.Success({
      res,
      status: 200,
      message: "Rating submitted successfully",
      data: createrating,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message, rating } = req.body;

    const updated = await reviewModel.findByIdAndUpdate(
      id,
      { name, message, rating },
      { new: true }
    );

    if (!updated) {
      return Response.Error({
        res,
        status: 404,
        message: "Review not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "Review updated successfully",
      data: updated,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: "Failed to update review",
      error: error.message,
    });
  }
};

// DELETE review by ID
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await reviewModel.findByIdAndDelete(id);

    if (!deleted) {
      return Response.Error({
        res,
        status: 404,
        message: "Review not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "Review deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
//get all review
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find().sort({ createdAt: -1 });
    return Response.Success({
      res,
      status: 200,
      message: "Fetched all reviews",
      data: reviews,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};
module.exports = { review, updateReview, deleteReview, getAllReviews };
