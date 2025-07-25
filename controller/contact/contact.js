const Response = require('../../helper/errHandler')
const contactModel = require('../../models/contectschema')
const sendEmail = require('../utiily/sendEmail')

const createcontact = async (req, res) => {
    try {
        const { name, email, number, title, message } = req.body
        if (!name || !email || !number) {
            return Response.Error({
                res,
                status: 400,
                message: "all filed are reuired"
            })
        }
        const createdata = await contactModel.create({ name, email, number, title, message })
        if (createdata.status === 400) {
            return Response.Error({
                res,
                status: 401,
                message: "contact us failed"
            })
        }
        // 📧 Send email
        await sendEmail({
            from: `"${name}" <${email}>`,
            to: "jayr6741@gmail.com",
            subject: `New Contact Us Request - ${title || 'No Title'}`,
            html: `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 20px; background-color: #f9f9f9;">
    <h2 style="text-align: center; color: #333;">📩 New Contact Request</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold; width: 30%;">Name:</td>
        <td style="padding: 8px;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Email:</td>
        <td style="padding: 8px;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Phone Number:</td>
        <td style="padding: 8px;">${number}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Title:</td>
        <td style="padding: 8px;">${title || 'Not Provided'}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; vertical-align: top;">Message:</td>
        <td style="padding: 8px; white-space: pre-line;">${message}</td>
      </tr>
    </table>
    <p style="text-align: center; margin-top: 20px; font-size: 13px; color: #888;">
      This message was sent via your website contact form.
    </p>
  </div>
      `,
        })
        return Response.Success({
            res,
            status: 200,
            message: "create contact successfully",
            data: createdata
        })
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.stack
        })
    }   
}


const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find().sort({ createdAt: -1 });
        if(contacts.length <= 0) {
            return Response.Error({
            res,
            status: 400,
            message: "not found"
        });
        }
        return Response.Success({
            res,
            status: 200,
            message: "All contacts fetched successfully",
            data: contacts
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.stack
        });
    }
};

const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, number, title, message } = req.body;

        const updated = await contactModel.findByIdAndUpdate(
            id,
            { name, email, number, title, message },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return Response.Error({
                res,
                status: 404,
                message: "Contact not found for update"
            });
        }

        return Response.Success({
            res,
            status: 200,
            message: "Contact updated successfully",
            data: updated
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.stack
        });
    }
};
const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await contactModel.findByIdAndDelete(id);

        if (!deleted) {
            return Response.Error({
                res,
                status: 404,
                message: "Contact not found for deletion"
            });
        }

        return Response.Success({
            res,
            status: 200,
            message: "Contact deleted successfully",
            data: deleted
        });
    } catch (error) {
        return Response.Error({
            res,
            status: 500,
            message: error.stack
        });
    }
};

module.exports = { createcontact,getAllContacts,updateContact,deleteContact }