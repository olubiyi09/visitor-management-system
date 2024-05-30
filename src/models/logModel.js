import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "User ID is required"],
    },
    date: {
        type: Date,
        required: [true, "Please enter the date"],
    },
    checkIn: {
        type: String,
        default: null,
    },
    checkOut: {
        type: String,
        default: null,
    },
    fullname: {
        type: String,
        required: [true, "Please enter your full name"],
    },
    confirmationCode: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
});

const Attendance = mongoose.models.attendances || mongoose.model("attendances", attendanceSchema);

export default Attendance;
