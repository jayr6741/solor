const Response = require("../../helper/errHandler");
const userModel = require("../../models/user");

const dashboard = async (req, res) => {
  // console.log('req.userId', req.userId)
  try {
    const getdata = await userModel.findById({ _id: req.userId });
    if (!getdata) {
      const obj = {
        res,
        status: 404,
        message: "data not found",
      };
      return Response.Error(obj);
    }
    if (req.role == "user") {
      const obj = {
        res,
        status: 404,
        message: "dashboard successFully get",
        data: getdata,
      };
      return Response.Success(obj);
    } else {
      const obj = {
        res,
        status: 400,
        message: "pleash only user cant login",
      };
      return Response.Error(obj); 
    }
  } catch (error) {
    const obj = {
      res,
      status: 500,
      message: error.message,
    };
    return Response.Error(obj);
  }
};
module.exports = dashboard;
