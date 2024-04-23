import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/config/dbConfig";
import Booking from "@/models/visitModel";
connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const newBooking = new Booking(reqBody);

        await newBooking.save();

        return NextResponse.json({
            message: "Booking created successfully",
            success: true,
            newBooking
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        const myBookings = await Booking.find();
        console.log(myBookings);

        return NextResponse.json({ myBookings });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}