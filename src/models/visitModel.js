import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User ID is required"],
    },
    date: {
        type: Date,
        required: [true, "Please enter the date for leave"],
    },
    time: {
        type: String,
        required: [true, "Please enter the reason for the leave"],
    },
    fullname: {
        type: String,
        required: [true, "Please enter your full name"],
    },
    phone: {
        type: String,
        required: [true, "Please enter you mobile number"],
    },
    bookingStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    email: {
        type: String,
        required: [true, "Please enter you email address"],
    },
    confirmationCode: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


const Booking = mongoose.models.booking || mongoose.model("booking", bookingSchema);

export default Booking;


