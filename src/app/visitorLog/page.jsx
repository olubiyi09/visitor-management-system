"use client"

import React, { useEffect, useState } from 'react';
import styles from "./VisitorLog.module.css";
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loaderSlice';

const VisitorLog = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [visitorExists, setVisitorExists] = useState(false);
    const [hasTimedIn, setHasTimedIn] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [confirmationCodes, setConfirmationCodes] = useState([]);
    const [currentBooking, setCurrentBooking] = useState(null);
    const dispatch = useDispatch();
    const { currentUser, isLoggedIn } = useSelector((state) => state.users);

    // console.log(currentUser);
    // console.log(currentBooking);


    const getBookings = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/bookings");
            const bookingsData = response.data.myBookings;
            // setBookings(bookingsData);

            // Filter the bookings to find all confirmation codes for the current user
            const userBookings = bookingsData.filter(booking => booking.userID === currentUser._id);
            setBookings(userBookings);
            const codes = userBookings.map(booking => booking.confirmationCode);
            setConfirmationCodes(codes);

        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getBookings()
    }, [currentUser])
    // useEffect(() => {
    //     console.log(bookings);
    //     console.log(confirmationCodes);
    // }, [confirmationCodes])

    const handleVerification = async () => {
        dispatch(setLoading(true));
        const matchingBooking = bookings.find(booking => booking.confirmationCode === confirmationCode.trim());
        if (matchingBooking) {
            toast.success("Booking Found")
            setCurrentBooking(matchingBooking);
            setVisitorExists(true);
            dispatch(setLoading(false));
        } else {
            setVisitorExists(false);
            setCurrentBooking(null)
            toast.error("Booking not Found, Please check the code")
            dispatch(setLoading(false));
        }
    };

    const handleTimeIn = async () => {
        if (!hasTimedIn) {
            const timeIn = new Date().toISOString();
            const fullname = currentUser?.fullname
            const userID = currentUser?._id
            try {
                const response = await axios.post('/api/log', { confirmationCode, timeIn, fullname, userID });
                setHasTimedIn(true);
                // toast.success("Time In recorded!");
                toast.success(response.data.message);
            } catch (error) {
                const errorMessage = error.response?.data?.error || "Failed to record Time In. Please try again.";
                toast.error(errorMessage);
            }
        } else {
            toast.error("You have already timed in.");
        }
    };


    const handleTimeOut = async () => {
        if (hasTimedIn) {
            const timeOut = new Date().toISOString();
            try {
                // await axios.post('/api/time-out', { confirmationCode, timeOut });
                setHasTimedIn(false);
                toast.success("Time Out recorded!");
            } catch (error) {
                toast.error("Failed to record Time Out. Please try again.");
            }
        } else {
            toast.error("You need to time in first.");
        }
    };

    return (
        <div className={styles.visitorLog}>
            <h2>Visitor's Log</h2>
            <div className={styles.input}>
                <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Enter Confirmation Code"
                    required={true}
                />
                <button onClick={handleVerification}>Verify</button>
            </div>
            {visitorExists && (
                <div className={styles.card}>
                    <h4>Welcome, <span>{currentBooking?.fullname}</span></h4>
                    <h3>Instructions:</h3>
                    <p>Please click the appropriate button to record your time:</p>
                    <div className="flex justify-center">
                        <button
                            className={styles.btn1}
                            onClick={handleTimeIn}
                            disabled={hasTimedIn}
                        >
                            Check In
                        </button>
                        <button
                            className={styles.btn2}
                            onClick={handleTimeOut}
                            disabled={!hasTimedIn}
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitorLog;
