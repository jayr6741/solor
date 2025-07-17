const Response = require("../../helper/errHandler");
const productModel = require("../../models/productschema");

const createProduct = async (req, res) => {
  try {
    const { title, description } = req.body;

    const image = req.file.filename;
    // console.log( image);
    let imageUrl = `http://localhost:3030/uploads/images/${req.file.filename}`;
    console.log(image);
    console.log(title);
    console.log(description);

    if (!image || !title || !description) {
      return Response.Error({
        res,
        status: 400,
        message: "all fill are required",
      });
    }
    const createproduct = await productModel.create({
      image: imageUrl,
      title,
      description,
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
    const product = await productModel.find().sort({ createdAt: -1 });
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
    const { title, description } = req.body;
    const { id } = req.params;
    const file = req.file;

    if (!id) {
      return Response.Error({
        res,
        status: 400,
        message: "Product ID is required",
      });
    }

    // Prepare data to update
    const updateData = {};
    // console.log('updateData', updateData)
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (file) {
      const imageUrl = `http://localhost:3030/uploads/images/${file.filename}`;
      updateData.image = imageUrl;
    } 
    // Perform update
    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    // console.log('updatedProduct', updatedProduct)
    if (!updatedProduct) {
      return Response.Error({
        res,
        status: 404,
        message: "Product not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "Product updated successfully",
      data: updatedProduct,
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
