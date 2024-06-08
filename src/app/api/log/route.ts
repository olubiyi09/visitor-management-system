import { connectDB } from "@/config/dbConfig";
import Attendance from "@/models/logModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { confirmationCode, timeIn, fullname, userID } = await request.json();

        if (!confirmationCode || !timeIn || !fullname || !userID) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }


        // Check if the attendance record already exists for today and has a check-in
        let existingAttendance = await Attendance.findOne({ confirmationCode });

        if (existingAttendance && existingAttendance.checkIn) {
            return NextResponse.json({ error: "You have already checked in today." }, { status: 400 });
        }

        if (!existingAttendance) {
            existingAttendance = new Attendance({
                confirmationCode,
                fullname,
                userID,
                date: new Date(),
                checkIn: timeIn,
            });
        } else {
            existingAttendance.checkIn = timeIn;
        }

        await existingAttendance.save();

        return NextResponse.json({
            message: "Time In recorded successfully",
            data: existingAttendance
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}


export async function PUT(request: NextRequest) {
    try {
        const { confirmationCode, timeOut } = await request.json();

        if (!confirmationCode || !timeOut) {
            return NextResponse.json({ error: "Confirmation code and time out are required" }, { status: 400 });
        }

        // Find the attendance record for the given confirmation code
        const existingAttendance = await Attendance.findOne({ confirmationCode });

        if (!existingAttendance) {
            return NextResponse.json({ error: "No attendance record found for this confirmation code" }, { status: 404 });
        }

        if (!existingAttendance.checkIn) {
            return NextResponse.json({ error: "You need to check in before checking out" }, { status: 400 });
        }

        // Update the check-out time
        existingAttendance.checkOut = timeOut;
        await existingAttendance.save();

        return NextResponse.json({
            message: "Time Out recorded successfully",
            data: existingAttendance
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function GET(request: NextRequest) {
    try {
        // Fetch all attendance records
        const attendances = await Attendance.find();

        return NextResponse.json({
            message: "Attendance records fetched successfully",
            data: attendances
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}