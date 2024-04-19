import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user already exists
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User does not exist");
        }

        // Compare Password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            email: user.email,
        };

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        // Set token expiration time in milliseconds
        const tokenExpiration = 60 * 60 * 24 * 1000; // 1 day in milliseconds

        const response = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

        // Set cookie with token
        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: tokenExpiration,
        });

        // Automatically delete token cookie when it expires
        setTimeout(() => {
            response.cookies.delete("token");
        }, tokenExpiration);

        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
