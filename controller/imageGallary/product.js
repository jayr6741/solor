const Response = require("../../helper/errHandler");
const ProductModel = require("../../models/product")


const createproduct = async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file;

        if (!title || !file) {
            return Response.Error({
                res,
                status: 400,
                message: "Title and file are required",
            });
        }

        const fileUrl = `http://192.168.29.36:3030/uploads/images/${file.filename}`
        const createProduct = await ProductModel.create({
            title,
            description,
            image: fileUrl,
        })
        if (!createProduct) {
            return Response.Error({
                res,
                status: 400,
                message: "Product not created",
            });
        }
        return Response.Success({
            res,
            status: 200,
            message: "Product created successfully",
            data: createProduct,
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.stack,
        });
    }
}
const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        return Response.Success({
            res,
            status: 200,
            message: "Products fetched successfully",
            data: products,
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.message,
        });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const file = req.file;

        if (!title || !file) {
            return Response.Error({
                res,
                status: 400,
                message: "Title and file are required",
            });
        }

        const fileUrl = `http://192.168.29.36:3030/uploads/images/${file.filename}`
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                image: fileUrl,
            },
            { new: true }
        );
        if (!updatedProduct) {
            return Response.Error({
                res,
                status: 400,
                message: "Product not updated",
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
            message: error.stack,
        });
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return Response.Error({
                res,
                status: 404,
                message: "Product not found",
            });
        }
        return Response.Success({
            res,
            status: 200,
            message: "Product deleted successfully",
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.stack,
        });
    }
}
module.exports = {
    createproduct,
    getAllProducts,
    updateProduct,
    deleteProduct
};