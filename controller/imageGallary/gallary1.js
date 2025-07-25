const Response = require("../../helper/errHandler");
const gallaryModel = require("../../models/gallery1")
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
        const createImage = await gallaryModel.create({
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
const getImages = async (req, res) => {
    try {
        const images = await gallaryModel.find();
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
            message: error.stack,
        });
    }
};

const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file;

        if (!file) {
            return Response.Error({
                res,
                status: 400,
                message: "File is required",
            });
        }

        const fileUrl = `http://192.168.29.36:3030/uploads/images/${file.filename}`;

        const updated = await gallaryModel.findByIdAndUpdate(
            id,
            { image: fileUrl },
            { new: true }
        );

        if (!updated) {
            return Response.Error({
                res,
                status: 404,
                message: "Image not found or not updated",
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
            message: error.stack,
        });
    }
};
const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await gallaryModel.findByIdAndDelete(id);

        if (!deleted) {
            return Response.Error({
                res,
                status: 404,
                message: "Image not found or already deleted",
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
            message: error.stack,
        });
    }
};

module.exports = {
    createimage, getImages, updateImage, deleteImage
}