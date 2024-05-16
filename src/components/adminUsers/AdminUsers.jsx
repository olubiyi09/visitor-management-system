"use client";

import React, { useEffect, useState } from 'react';
import { setLoading } from '@/redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import styles from "./AdminUsers.module.css";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const { currentUser, isLoggedIn } = useSelector((state) => state.users);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 7;

    const getUsers = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/users");
            const allUsers = response.data.data;

            console.log(allUsers);
            setUsers(allUsers)
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error("Error fetching users. Please try again later.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users?.length / usersPerPage);

    return (
        <div className={styles.container}>
            <h2>All Users</h2>
            <div className={styles.contentWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Gender</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{indexOfFirstUser + index + 1}</td>
                                <td>{user?.fullname}</td>
                                <td>{user?.gender}</td>
                                <td>{user?.email}</td>
                                <td>{user?.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {users?.length > usersPerPage && (
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
                )}
            </div>
        </div>
    );
};

export default AdminUsers;
