"use client"

import React, { useState } from 'react';
import styles from "./Authentication.module.css";

const Page = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Validate form fields here
        if (activeTab === 'login') {
            // Implement login logic
            console.log(formData);
        } else if (activeTab === 'register') {
            // Implement registration logic
            console.log(formData);
        }
    };

    return (
        <section className={styles["section-container"]}>
            <div className={styles.container}>
                <div className={styles.navbar}>
                    <button className={activeTab === 'login' ? styles.active : ''} onClick={() => handleTabChange('login')}>Login</button>
                    <button className={activeTab === 'register' ? styles.active : ''} onClick={() => handleTabChange('register')}>Register</button>
                </div>
                <div className={styles.form}>
                    {activeTab === 'login' && (
                        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
                            <h2>Login</h2>
                            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                            <button type="submit">Login</button>
                        </form>
                    )}
                    {activeTab === 'register' && (
                        <form className={styles.registerForm} onSubmit={handleFormSubmit}>
                            <h2>Register</h2>
                            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                            <button type="submit">Register</button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Page;
