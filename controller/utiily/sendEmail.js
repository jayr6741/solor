const nodemailer = require("nodemailer");

const sendEmail = async ({ from, to, subject, html }) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jayr6741@gmail.com",
                pass: "cqgc ehzb cnya gokh", // Use app-specific password
            },
        });

        const mailOptions = {
            from,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        // console.log("Email sent: ", info.response);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error };
    }
};

module.exports = sendEmail;
