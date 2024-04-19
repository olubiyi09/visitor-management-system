"use client"

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Book.module.css';

const BookAppointment = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

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
    ];

    const handleDateChange = (date) => {
        setSelectedDate(date);
        // Fetch available appointment times for the selected date from the server
    };

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleBookAppointment = () => {
        if (selectedDate && selectedTime) {
            // Here you can handle booking logic, such as sending data to the server
            setBookingConfirmed(true);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Book Appointment</h2>
            <div className={styles.datePickerContainer}>
                <label>Select a Visitation Date:</label>
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
                                className={`${styles.timeSlot} ${selectedTime === time ? styles.selected : ''
                                    }`}
                                onClick={() => handleTimeSelect(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {selectedTime && (
                <div className={styles.selectedTime}>
                    <p>You have selected: {selectedTime}</p>
                    <button className={styles.bookButton} onClick={handleBookAppointment}>
                        Book Appointment
                    </button>
                </div>
            )}

            {bookingConfirmed && (
                <div className={styles.confirmation}>
                    <h3>Appointment Confirmed!</h3>
                    <p>Appointment Details:</p>
                    <p>Date: {selectedDate.toLocaleDateString()}</p>
                    <p>Time: {selectedTime}</p>
                    {/* Replace with actual visitor information */}
                    <p>Name: John Doe</p>
                    <p>Email: johndoe@example.com</p>
                    <p>Phone: 123-456-7890</p>
                    {/* Generate a unique code for the appointment */}
                    <p>Confirmation Code: ABC123DEF456</p>
                </div>
            )}
        </div>
    );
};

export default BookAppointment;
