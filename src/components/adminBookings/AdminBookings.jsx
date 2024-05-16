"use client";

import React, { useEffect, useState } from 'react';
import { setLoading } from '@/redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import styles from "./AdminBookings.module.css";

const AdminBookings = () => {
    const dispatch = useDispatch();
    const { currentUser, isLoggedIn } = useSelector((state) => state.users);
    const [bookings, setBookings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const bookingsPerPage = 7;

    const getBookings = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/bookings");
            const bookingsData = response.data.myBookings;

            // Sort bookings by createdAt in descending order
            bookingsData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setBookings(bookingsData);
        } catch (error) {
            console.error('Error fetching bookings:', error);
            toast.error("Error fetching bookings. Please try again later.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            await axios.put("/api/bookings", { id: bookingId, bookingStatus: newStatus });
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking._id === bookingId ? { ...booking, bookingStatus: newStatus } : booking
                )
            );
            toast.success("Booking status updated successfully.");
        } catch (error) {
            console.error('Error updating booking status:', error);
            toast.error("Error updating booking status. Please try again later.");
        }
    };

    useEffect(() => {
        getBookings();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    const currentBookings = bookings.slice(indexOfFirstBooking, indexOfLastBooking);

    const totalPages = Math.ceil(bookings.length / bookingsPerPage);

    return (
        <div className={styles.container}>
            <h2>Booking History</h2>
            <div className={styles.contentWrapper}>
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
                        {currentBookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <td>{indexOfFirstBooking + index + 1}</td>
                                <td>{new Date(booking.date).toLocaleDateString()}</td>
                                <td>{booking.time}</td>
                                <td>
                                    <select
                                        value={booking.bookingStatus}
                                        onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>{booking.confirmationCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.pagination}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? styles.active : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminBookings;
