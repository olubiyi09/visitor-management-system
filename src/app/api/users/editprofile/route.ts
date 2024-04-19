import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request: NextRequest) {
    try {
        const formData = await request.json();
        const userId = formData.userId; // Assuming you're passing userId along with other form data

        // Find the user by userId and update their profile data
        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    phone: formData.phone,
                    address: formData.address,
                    gender: formData.gender,
                }
            },
            { new: true } // To return the updated document
        );

        return NextResponse.json({
            message: "User profile updated successfully",
            data: updatedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
