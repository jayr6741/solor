const bannerModel = require("../../models/bannerschema");
const Response = require("../../helper/errHandler");

const createbanners = async (req, res) => {
  try {
    const { title } = req.body;
    const file = req.file;

    if (!title || !file) {
      return Response.Error({
        res,
        status: 400,
        message: "Title and file are required",
      });
    }

    const isVideo = file.mimetype.startsWith("video/");
    const folder = isVideo ? "videos" : "images";
    const fileUrl = `http://localhost:3030/uploads/${folder}/${file.filename}`;

    const createbanner = await bannerModel.create({
      title,
      media: fileUrl, // this field could be renamed to `media` to make it clearer
    });

    if (!createbanner) {
      return Response.Error({
        res,
        status: 400,
        message: "Banner not created",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "Banner created successfully",
      data: createbanner,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.stack,
    });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const file = req.file;

    // Fetch existing banner
    const banner = await bannerModel.findById(id);
    if (!banner) {
      return Response.Error({
        res,
        status: 404,
        message: "Banner not found",
      });
    }

    // Handle file if uploaded
    let mediaUrl = banner.media;
    if (file) {
      const isVideo = file.mimetype.startsWith("video/");
      const folder = isVideo ? "videos" : "images";
      mediaUrl = `http://localhost:3030/uploads/${folder}/${file.filename}`;

    }

    // Update the banner document
    banner.title = title || banner.title;
    banner.media = mediaUrl;

    const updatedBanner = await banner.save();

    return Response.Success({
      res,
      status: 200,
      message: "Banner updated successfully",
      data: updatedBanner,
    });
  } catch (error) {
    console.error("Update Banner Error:", error);
    return Response.Error({
      res,
      status: 500,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getAllBanners = async (req, res) => {
  try {
    const banners = await bannerModel.find();
    if (!banners || banners.length === 0) {
      return Response.Error({
        res,
        status: 400,
        message: "no data found",
      });
    }
    return Response.Success({
      res,
      status: 200,
      message: "Fetched all banners",
      data: banners,
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};
const deleteBanner = async (req, res) => {
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
    const deleted = await bannerModel.findByIdAndDelete(id);
    if (!deleted) {
      return Response.Error({
        res,
        status: 404,
        message: "Banner not found",
      });
    }

    return Response.Success({
      res,
      status: 200,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    return Response.Error({
      res,
      status: 500,
      message: error.message,
    });
  }
};

module.exports = { getAllBanners, createbanners, updateBanner, deleteBanner };
