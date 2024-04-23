"use client"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Book.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { FaCircleCheck } from "react-icons/fa6";
import axios from 'axios';
import Loader from '@/components/loader/Loader';
import { setLoading } from '@/redux/loaderSlice';
import Link from "next/link";
import { useRouter } from 'next/navigation';

const BookAppointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentUser, isLoggedIn } = useSelector((state) => state.users);
    const { loading } = useSelector((state) => state.loaders)

    const availableTimes = [
        '09:00 AM',
        '09:30 AM',
        '10:00 AM',
        '10:30 PM',
        '11:00 PM',
        '11:30 PM',
        '12:00 PM',
        '12:30 PM',
        '13:00 PM',
        '13:30 PM',
        '14:00 PM',
        '14:30 PM',
        '15:00 PM',
        '15:30 PM',
        '16:00 PM',
    ];

    const generateConfirmationCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = '';
        for (let i = 0; i < 7; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return code;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Fetch available appointment times for the selected date from the server
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    // const handleBookAppointment = async () => {
    //     if (selectedDate && selectedTime) {
    //         // Here you can handle booking logic, such as sending data to the server
    //         const code = generateConfirmationCode();
    //         setConfirmationCode(code);

    //         setBookingConfirmed(true);
    //     } else {
    //         toast.error("Select a Date and Time")
    //     }
    // };

    // const handleBookAppointment = async () => {
    //     if (selectedDate && selectedTime) {
    //         try {
    //             dispatch(setLoading(true))
    //             // Prepare data to send to the server
    //             const data = {
    //                 userID: currentUser._id, // Assuming currentUser contains user information including _id
    //                 date: selectedDate,
    //                 time: selectedTime,
    //                 fullname: currentUser.fullname,
    //                 phone: currentUser?.phone || "none",
    //                 email: currentUser.email,
    //                 confirmationCode: generateConfirmationCode()
    //             };

    //             // Make POST request to the server
    //             const response = await axios.post('/api/bookings', data);

    //             // Handle success response
    //             console.log(response.data); // Log the response data
    //             setConfirmationCode(data.confirmationCode);
    //             setBookingConfirmed(true);
    //             toast.success(response.data.message)
    //         } catch (error) {
    //             // Handle error
    //             console.error('Error booking appointment:', error);
    //             toast.error('Error booking appointment. Please try again later.');
    //         } finally {
    //             dispatch(setLoading(false))
    //         }
    //     } else {
    //         toast.error("Select a Date and Time");
    //     }
    // };

    const handleBookAppointment = async () => {
        if (selectedDate && selectedTime) {
            try {
                dispatch(setLoading(true));
                // Prepare data to send to the server
                const data = {
                    userID: currentUser._id, // Assuming currentUser contains user information including _id
                    date: selectedDate,
                    time: selectedTime,
                    fullname: currentUser.fullname,
                    phone: currentUser?.phone || "none",
                    email: currentUser.email,
                    confirmationCode: generateConfirmationCode()
                };

                // Make POST request to the server
                const response = await axios.post('/api/bookings', data);

                // Handle success response
                console.log(response.data); // Log the response data
                setConfirmationCode(data.confirmationCode);
                setBookingConfirmed(true);
                toast.success(response.data.message);

                // Reset states after booking confirmation
                setSelectedDate(new Date());
                setSelectedTime(null);
                setBookingConfirmed(true);
            } catch (error) {
                // Handle error
                console.error('Error booking appointment:', error);
                toast.error('Error booking appointment. Please try again later.');
            } finally {
                dispatch(setLoading(false));
            }
        } else {
            toast.error("Select a Date and Time");
        }
    };


    const handleModalClose = () => {
        setBookingConfirmed(false);
        router.push("/bookingHistory")
    };

    return (
        <div className={styles.container}>
            {loading && <Loader />}
            <div>
                <div className={styles.header}>
                    <h2>Book Appointment</h2>
                    <p>
                        <Link href="/bookingHistory">View Booking History</Link>
                    </p>
                </div>
                <hr />
                <div className={styles.datePickerContainer}>
                    <label>Select a Visitation Date:</label>{" "}
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()} // To disable past dates
                        placeholderText="Select Date"
                        className={styles.datePicker}
                    />
                </div>

                {selectedDate && (
                    <div className={styles.availableTimesContainer}>
                        <h3>Available Times for {selectedDate.toLocaleDateString()}</h3>
                        <div className={styles.timeGrid}>
                            {availableTimes.map((time) => (
                                <button
                                    key={time}
                                    className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ''}`}
                                    onClick={() => handleTimeSelect(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className={styles.selectedTime}>
                    <button className={styles.bookButton} onClick={handleBookAppointment}>
                        Book Appointment
                    </button>
                </div>

                {bookingConfirmed && (
                    <div className={styles.modal}>
                        <div className={styles.modalContent}>
                            <div className={styles.top}>
                                <div className={styles.icon}>
                                    <FaCircleCheck size={60} color="#F7C566" />
                                </div>
                                <h3>Appointment Confirmed!</h3>
                                {/* <p>Appointment Details:</p> */}
                                <p>Date: {selectedDate.toLocaleDateString()}</p>
                                <p>Time: {selectedTime}</p>
                                {/* Replace with actual visitor information */}
                                <p>Name: {currentUser.fullname}</p>
                                <p>Phone: 123-456-7890</p>
                                <p>Email: {currentUser.email}</p>
                                {/* Display the generated confirmation code */}
                                <p>Confirmation Code: {confirmationCode}</p>

                            </div>
                            <span className={styles.close} onClick={handleModalClose}>
                                close
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookAppointment;
