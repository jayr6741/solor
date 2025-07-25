const userModel = require("../../models/user");
const Response = require("../../helper/errHandler");
var CryptoJS = require("crypto-js");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getdata = await userModel.findOne({ email: email });

    if (!email || !password) {
      const obj = {
        res,
        status: 400,
        message: "all fill is requierd",
      };
      return Response.Error(obj);
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Response.Error({
        res,
        status: 400,
        message: "Password must include uppercase, lowercase, number, and special character"
      });
    }
    if (getdata) {
      const obj = {
        res,
        status: 400,
        message: "email already exit",
      };
      return Response.Error(obj);
    }
    var encrypt = CryptoJS.AES.encrypt(
      password,
      process.env.secret_key
    ).toString();
    req.body.password = encrypt;
    const saveData = await userModel.create(req.body);
    const obj = {
      res,
      status: 200,
      message: "data create successFully",
      data: saveData,
    };
    return Response.Success(obj);
  } catch (error) {
    // console.log('error', error)
    const obj = {
      res,
      status: 500,
      message: error.message,
    }
    return Response.Error(obj);
  }
};
module.exports = register;
