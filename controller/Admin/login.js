    const userModel = require("../../models/user");
    const Response = require("../../helper/errHandler");
    const CryptoJS = require("crypto-js");
    const jwt = require("jsonwebtoken");

    const login = async (req, res) => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return Response.Error({
                    res,
                    status: 400,
                    message: "All fields are required",
                });
            }

            const getdata = await userModel.findOne({ email });
            if (!getdata) {
                return Response.Error({
                    res,
                    status: 400,
                    message: "Please register first",
                });
            }

            const bytes = CryptoJS.AES.decrypt(getdata.password, process.env.secret_key);
            const decrypt = bytes.toString(CryptoJS.enc.Utf8);

            if (decrypt !== password) {
                return Response.Error({
                    res,
                    status: 400,
                    message: "Password does not match",
                });
            }

            const encrypt = CryptoJS.AES.encrypt(getdata.id, process.env.secret_key).toString();

            const token = jwt.sign(
                {
                    userId: encrypt,
                    role: getdata.role,
                },
                process.env.jwt_key,
                { expiresIn: process.env.jwt_expire }
            );

            return Response.Success({
                res,
                status: 200,
                message: "Login successfully",
                data: {
                    getdata,
                    token, // ✅ return token in response
                },
            });

        } catch (error) {
            return Response.Error({
                res,
                status: 500,
                message: error.message,
            });
        }
    };

    const logout = (req, res) => {
        // In token-based auth, logout is client-side (just delete localStorage)
        return res.status(200).json({ message: "Logged out on client side" });
    };

    module.exports = { login, logout };
