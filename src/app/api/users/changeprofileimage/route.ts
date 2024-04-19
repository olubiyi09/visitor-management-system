import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function PUT(request: NextRequest) {
    try {
        const { userId, newImageUrl } = await request.json();

        const updatedUser = await User.findOneAndUpdate(
            { _id: userId },
            { $set: { profileimage: newImageUrl } },
            { new: true }
        );

        return NextResponse.json({
            message: "Profile image updated successfully",
            data: updatedUser
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
