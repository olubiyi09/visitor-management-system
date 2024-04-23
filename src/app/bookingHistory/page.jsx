"use client"

import React, { useEffect, useState } from 'react';
import { setLoading } from '@/redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import styles from "./BookingHistory.module.css";

const BookingHistory = () => {
    const dispatch = useDispatch();
    const { currentUser, isLoggedIn } = useSelector((state) => state.users);
    const [bookings, setBookings] = useState([]);

    const getBookings = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/bookings");
            const bookingsData = response.data.myBookings;
            setBookings(bookingsData);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error("Error fetching bookings. Please try again later.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getBookings();
    }, []);

    const userBookings = bookings.filter(booking => booking.userID === currentUser?._id);

    return (
        <div className={styles.container}>
            <h2>Booking History</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Appointment Date</th>
                        <th>Appointment Time</th>
                        <th>Status</th>
                        <th>Confirmation Code</th>
                    </tr>
                </thead>
                <tbody>
                    {userBookings.map((booking, index) => (
                        <tr key={booking._id}>
                            <td>{(index + 1)}</td>
                            <td>{new Date(booking.date).toLocaleDateString()}</td>
                            <td>{booking.time}</td>
                            <td>{booking.bookingStatus}</td>
                            <td>{booking.confirmationCode}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingHistory;
