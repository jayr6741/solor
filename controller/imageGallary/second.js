const Response = require("../../helper/errHandler");
const SecondModel = require("../../models/second")

const createimage = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return Response.Error({
                res,
                status: 400,
                message: " file are required",
            });
        }

        const fileUrl = `http://192.168.29.36:3030/uploads/images/${file.filename}`
        const createImage = await SecondModel.create({
            image: fileUrl,
        })
        if (!createImage) {
            return Response.Error({
                res,
                status: 400,
                message: "Image not created",
            });
        }
        return Response.Success({
            res,
            status: 200,
            message: "Image created successfully",
            data: createImage,
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.stack,
        });
    }
}
const getAllImages = async (req, res) => {
    try {
        const images = await SecondModel.find();
        return Response.Success({
            res,
            status: 200,
            message: "Images fetched successfully",
            data: images,
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.message,
        });
    }
};
const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;
// console.log('id', req.params)
        if (!file) {
            return Response.Error({
                res,
                status: 400,
                message: "File is required for update",
            });
        }

        const fileUrl = `http://192.168.29.36:3030/uploads/images/${file.filename}`;

        const updated = await SecondModel.findByIdAndUpdate(
            id,
            { image: fileUrl },
            { new: true }
        );
        if (!updated) {
            return Response.Error({
                res,
                status: 404,
                message: "Image not found",
            });
        }

        return Response.Success({
            res,
            status: 200,
            message: "Image updated successfully",
            data: updated,
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.message,
        });
    }
};
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await SecondModel.findByIdAndDelete(id);

        if (!deleted) {
            return Response.Error({
                res,
                status: 404,
                message: "Image not found",
            });
        }

        return Response.Success({
            res,
            status: 200,
            message: "Image deleted successfully",
            data: deleted,
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.message,
        });
    }
};

module.exports = {
    createimage, getAllImages, updateImage, deleteImage
}