import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/dbConfig"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { fullname, email, password } = reqBody

        //   Check if user already exist
        const user = await User.findOne({ email })
        if (user) {
            throw new Error("User already exist");
        }

        // Hash Password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })

        await User.create(newUser)
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            newUser
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}