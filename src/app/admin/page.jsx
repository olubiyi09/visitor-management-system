"use client"
import React, { useState } from 'react';
import styles from './Admin.module.css';
import AdminUsers from "@/components/adminUsers/AdminUsers"
import AdminBookings from "@/components/adminBookings/AdminBookings"
import AdminHistory from "@/components/adminHistory/AdminHistory"

const Admin = () => {
    const [activeTab, setActiveTab] = useState('users');

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return <div><AdminUsers /></div>;
            case 'bookings':
                return <div><AdminBookings /></div>;
            case 'visitHistory':
                return <div><AdminHistory /></div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className={styles.tabs}>
                <button
                    className={activeTab === 'users' ? styles.active : ''}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </button>
                <button
                    className={activeTab === 'bookings' ? styles.active : ''}
                    onClick={() => setActiveTab('bookings')}
                >
                    Bookings
                </button>
                <button
                    className={activeTab === 'visitHistory' ? styles.active : ''}
                    onClick={() => setActiveTab('visitHistory')}
                >
                    Visit History
                </button>
            </div>
            <div className={styles['tab-content']}>
                {renderContent()}
            </div>
        </div>
    );
};

export default Admin;



