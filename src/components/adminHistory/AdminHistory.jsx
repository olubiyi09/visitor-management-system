import React, { useEffect, useState } from 'react';
import styles from "./AdminHistory.module.css";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/redux/loaderSlice';

const AdminHistory = () => {
    const [attendances, setAttendances] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const attendancesPerPage = 7;
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAttendances = async () => {
            try {
                dispatch(setLoading(true));
                const response = await axios.get('/api/log'); // Assuming the endpoint for fetching attendances is /api/log
                setAttendances(response.data.data);
            } catch (error) {
                console.error('Error fetching attendances:', error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchAttendances();
    }, []);

    const indexOfLastAttendance = currentPage * attendancesPerPage;
    const indexOfFirstAttendance = indexOfLastAttendance - attendancesPerPage;
    const currentAttendances = attendances.slice(indexOfFirstAttendance, indexOfLastAttendance);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className={styles.adminHistory}>
            <h2>Visit History</h2>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Confirmation Code</th>
                            <th>Check-In Time</th>
                            <th>Check-Out Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAttendances.map(attendance => (
                            <tr key={attendance._id}>
                                <td>{attendance.fullname}</td>
                                <td>{attendance.confirmationCode}</td>
                                <td>{new Date(attendance.checkIn).toLocaleString()}</td>
                                <td>{attendance.checkOut ? new Date(attendance.checkOut).toLocaleString() : 'Not available'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                {Array.from({ length: Math.ceil(attendances.length / attendancesPerPage) }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={currentPage === i + 1 ? styles.active : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminHistory;