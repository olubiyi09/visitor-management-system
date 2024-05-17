"use client"

import React, { useState } from 'react';
import styles from "./VisitorLog.module.css";
import { toast } from 'sonner';

const VisitorLog = () => {
    const [confirmationCode, setConfirmationCode] = useState("");
    const [visitorExists, setVisitorExists] = useState(false);

    const handleVerification = () => {
        // Your verification logic here to check if confirmationCode exists
        // For demo purpose, let's assume it's verified if confirmationCode is not empty
        if (confirmationCode.trim() !== "") {
            setVisitorExists(true);
        } else {
            setVisitorExists(false);
            toast.error("Invalid confirmation code. Please try again.");
        }
    };

    const handleTimeIn = () => {
        // Logic for time in
        toast.error("Time In recorded!");
    };

    const handleTimeOut = () => {
        // Logic for time out
        toast.error("Time Out recorded!");
    };

    return (
        <div className={styles.visitorLog}>
            <h2>Visitor's Log</h2>
            <p>Enter your Confirmation code</p>
            <div className={styles.input}>
                <input
                    type="text"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    placeholder="Enter Confirmation Code"
                />
                <button onClick={handleVerification}>Verify</button>
            </div>
            {visitorExists && (
                <div className={styles.card}>
                    <h3>Instructions:</h3>
                    <p>Please click the appropriate button to record your time:</p>
                    <div>
                        <button className={styles.btn1} onClick={handleTimeIn}>Check In</button>
                        <button className={styles.btn2} onClick={handleTimeOut}>Check Out</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VisitorLog;
