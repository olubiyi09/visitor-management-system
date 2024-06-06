import { connectDB } from "@/config/dbConfig";
import Attendance from "@/models/logModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const { confirmationCode } = await request.json();

        if (!confirmationCode) {
            return NextResponse.json({ error: "Confirmation code is required" }, { status: 400 });
        }

        // Find the attendance record for the given confirmation code
        const attendance = await Attendance.findOne({ confirmationCode });

        if (!attendance) {
            return NextResponse.json({ error: "No attendance record found for this confirmation code" }, { status: 404 });
        }

        return NextResponse.json({
            message: "Attendance status retrieved successfully",
            checkIn: attendance.checkIn,
            checkOut: attendance.checkOut,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
