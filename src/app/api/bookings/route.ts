// import { NextRequest, NextResponse } from "next/server";
// import { connectDB } from "@/config/dbConfig";
// import Booking from "@/models/visitModel";
// connectDB();

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();

//         const newBooking = new Booking(reqBody);

//         await newBooking.save();

//         return NextResponse.json({
//             message: "Booking created successfully",
//             success: true,
//             newBooking
//         }, { status: 201 });
//     } catch (error: any) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }

// export async function GET(request: NextRequest) {
//     try {
//         const myBookings = await Booking.find();
//         console.log(myBookings);

//         return NextResponse.json({ myBookings });
//     } catch (error: any) {
//         return NextResponse.json({ message: error.message }, { status: 500 });
//     }
// }

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

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, bookingStatus } = reqBody; // Extract id and bookingStatus from the request body

        if (!id || !bookingStatus) {
            return NextResponse.json({ message: "Booking ID and status are required" }, { status: 400 });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { bookingStatus },
            { new: true }
        );

        if (!updatedBooking) {
            return NextResponse.json({ message: "Booking not found" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Booking status updated successfully",
            success: true,
            updatedBooking
        });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
