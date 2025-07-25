var jwt = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
const Response = require("../helper/errHandler");

const authToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        const checktoken = token.split(" ")[0];
        if (checktoken !== "Bearer") {
            const obj = {
                res,
                status: 400,
                message: "invalid Token",
            };
            return Response.Error(obj);
        }

        token = token.split(" ")[1];
        jwt.verify(token, process.env.jwt_key, function (err, decoded) {
            if (err) {
                return Response.Error({
                    res,
                    status: 400,
                    message: err,
                });
            } else {
                var bytes = CryptoJS.AES.decrypt(
                    decoded.userId,
                    process.env.secret_key
                );
                var decrypt = bytes.toString(CryptoJS.enc.Utf8);
                req.userId = decrypt;
                req.role = decoded.role
            }
        });
        next();
    } catch (error) {
        const obj = {
            res,
            status: 500,
            message: error.message,
        };
        return Response.Error(obj);
    }
};
module.exports = authToken;
