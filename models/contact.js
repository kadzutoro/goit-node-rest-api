import mongoose from "mongoose";

const contactSchema = new mongoose.Schema (
    {
        name:{
            type: string,
            required: [true, 'Set name for contact']
        },
        email: {
            type: string,
        },
        phone: {
            type: string,
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
        {
            versionKey: false,
            timestamps: true,
        }
    
)

const Contact = mongoose.model('Contact', contactSchema)

export default Contact;