import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest) {

    try {
        const users = await User.find().select("-password");

        if (!users || users.length === 0) {
            throw new Error("No users found");
        }

        return NextResponse.json({
            message: "Users found",
            data: users
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
