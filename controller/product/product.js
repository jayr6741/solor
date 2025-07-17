const Response = require("../../helper/errHandler");
const productModel = require("../../models/productschema");

const createProduct = async (req, res) => {
  try {
    const { title, decription } = req.body;
    const image = req.file.filename;
    let imageUrl = `http://localhost:3030/uploads/images/${req.file.filename}`;
    if (!image || !title || !decription) {
      return Response.Error({
        res,
        status: 400,
        message: "all fill are required",
      });
    }
    const createproduct = await productModel.create({
      image: imageUrl,
      title,
      decription,
    });
    //   console.log("createproduct", createproduct);
    return Response.Success({
      res,
      status: 200,
      message: "product successFully create",
      data: createproduct,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.stack,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const product = await productModel.find();
    if (!product || product.length === 0) {
      return Response.Error({
        res,
        status: 400,
        message: "no data found",
      });
    }
    return Response.Success({
      res,
      status: 200,
      message: "Fetched all product",
      data: product,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { title, decription } = req.body;
    const { id } = req.params;
    const file = req.file;

    if (!id) {
      return Response.Error({
        res,
        status: 400,
        message: "product ID is required",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (decription) decription    .title = title;
    if (file) {
      updateData.image = `http://localhost:3030/uploads/images/${file.filename}`;
    }

    const updatedproduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedproduct) {
      return Response.Error({
        res,
        status: 404,
        message: "product not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "product updated successfully",
      data: updatedproduct,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      const obj = {
        res,
        status: 400,
        message: "id is required",
      };
      return Response.Error(obj);
    }
    const deleted = await productModel.findByIdAndDelete(id);
    if (!deleted) {
      return Response.Error({
        res,
        status: 404,
        message: "product not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "product deleted successfully",
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};
module.exports = { createProduct, updateProduct, deleteProduct, getAllProduct };
