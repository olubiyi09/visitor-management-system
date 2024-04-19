"use client"

import React, { useState } from 'react';
import styles from "./Authentication.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/loaderSlice';
import { toast } from 'sonner';
import axios from 'axios';
import Loader from '@/components/loader/Loader';
import { useRouter } from 'next/navigation';

const Page = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: ''
    });
    const dispatch = useDispatch()
    const router = useRouter()
    const { loading } = useSelector((state) => state.loaders)

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Validate form fields here
        if (activeTab === 'login') {
            // Implement login logic
            console.log("login:", formData);
            try {
                dispatch(setLoading(true))

                const response = await axios.post("/api/users/login", formData);
                toast.success(response.data.message)
                router.push("/")
                setFormData({
                    email: '',
                    password: '',
                });
            } catch (error) {
                toast.error(error.response.data.message || "Something went wrong")
            } finally {
                dispatch(setLoading(false))
            }

        } else if (activeTab === 'register') {
            // Implement registration logic
            console.log("Register:", formData);
            try {
                dispatch(setLoading(true))
                const response = await axios.post("/api/users/register", formData);
                toast.success(response.data.message)
                setActiveTab("login")
                setFormData({
                    fullname: "",
                    email: "",
                    password: "",
                });
            } catch (error) {
                toast.error(error.response.data.message || "Something went wrong")
                console.log(error.response.data.message);
            } finally {
                dispatch(setLoading(false))
            }
        }
    };

    return (
        <>
            {loading && <Loader />}
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
                                <input type="email" name="email" placeholder="Email" required value={formData.username} onChange={handleInputChange} />
                                <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} />
                                <button type="submit">Login</button>
                            </form>
                        )}
                        {activeTab === 'register' && (
                            <form className={styles.registerForm} onSubmit={handleFormSubmit}>
                                <h2>Register</h2>
                                <input type="text" name="fullname" placeholder="FullName" required value={formData.username} onChange={handleInputChange} />
                                <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleInputChange} />
                                <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleInputChange} />
                                <button type="submit">Register</button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
