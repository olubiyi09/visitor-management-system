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
