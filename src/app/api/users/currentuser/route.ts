import { connectDB } from "@/config/dbConfig";
import { getDataFromToken } from "@/helpers/validateJWT";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();
export async function GET(request: NextRequest) {

    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");
        console.log(user);
        console.log(userId);

        if (!user) {
            throw new Error("No user found")
        }

        return NextResponse.json({
            message: "User found",
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}