"use client"

import React, { useEffect, useState } from 'react';
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { CldUploadButton, CldImage } from 'next-cloudinary';
import axios from 'axios';
import { toast } from 'sonner';
import { setCurrentUser } from '@/redux/usersSlice';
import { setLoading } from '@/redux/loaderSlice';
import Loader from "@/components/loader/Loader";

const Profile = () => {
    const [uploadResult, setUploadResult] = useState(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editedValues, setEditedValues] = useState({});
    const currentUser = useSelector((state) => state.users.currentUser);
    const loading = useSelector((state) => state.loaders.loading); // Get loading state from Redux
    const dispatch = useDispatch();

    useEffect(() => {
        const getCurrentUser = async () => {
            try {
                dispatch(setLoading(true)); // Set loading state to true
                const response = await axios.get("/api/users/currentuser");
                dispatch(setCurrentUser(response.data.data));
            } catch (error) {
                // Handle error
                console.error("Error fetching current user:", error);
                dispatch(setCurrentUser(null));
            } finally {
                dispatch(setLoading(false)); // Set loading state to false regardless of success or failure
            }
        };

        getCurrentUser();
    }, [dispatch]);

    const capitalizeFirstLetter = (string) => {
        return string
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const handleOnUpload = (result, widget) => {
        setUploadResult(result.info);
        widget.close();
    };

    const handleSave = async () => {
        // Your save logic here
    };

    const handleEditModalOpen = () => {
        setEditedValues({
            address: currentUser.address,
            gender: currentUser.gender,
            phone: currentUser.phone
        });
        setEditModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSaveImage = async () => {
        if (uploadResult && uploadResult.url) {
            try {
                dispatch(setLoading(true));
                const response = await axios.put('/api/users/changeprofileimage', {
                    userId: currentUser._id,
                    newImageUrl: uploadResult.url,
                });

                // Update the currentUser in Redux store
                const updatedUser = { ...currentUser, profileimage: uploadResult.url };
                dispatch(setCurrentUser(updatedUser));

                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.error(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const handleModalSave = async (e) => {
        // Implement save logic here
        setEditModalOpen(false);

        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const response = await axios.put(`/api/users/editprofile`, {
                userId: currentUser._id,
                phone: editedValues.phone,
                address: editedValues.address,
                gender: editedValues.gender,
            });

            const updatedUser = response.data.data;
            dispatch(setCurrentUser(updatedUser));

            toast.success("Profile updated successfully");
            setShowEditModal(false);
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <>
            {loading && <Loader />}
            {currentUser && !loading &&
                <section className={styles["sec-container"]}>
                    <div className={styles.wrapper}>
                        <div className={styles.container}>
                            <div className={styles["top-section"]}>
                                <div className={styles.image}>
                                    <CldImage
                                        width="200"
                                        height="200"
                                        src={uploadResult ? uploadResult.url : currentUser.profileimage}
                                        alt="profileImage"
                                    />
                                    <div className={styles.btns}>
                                        <CldUploadButton
                                            uploadPreset="f1njlfjn"
                                            onUpload={handleOnUpload}
                                        />
                                        <button className="ml-2" onClick={handleSaveImage}>
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles["bottom-section"]}>
                                <div className={styles.info}>
                                    <p>Full Name: <span>{capitalizeFirstLetter(currentUser.fullname)}</span></p>
                                    <p>Email: <span>{currentUser.email}</span></p>
                                    <p>Phone: <span>{currentUser.phone}</span></p>
                                    <p>Address: <span>{currentUser.address}</span></p>
                                    <p>Gender: <span>{currentUser.gender}</span></p>
                                </div>

                                <button onClick={handleEditModalOpen}>Edit profile</button>
                            </div>
                        </div>
                    </div>
                </section>
            }

            {/* Modal for editing profile */}
            {editModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <span className={styles.close} onClick={() => setEditModalOpen(false)}>&times;</span>
                        <h2>Edit Profile</h2>
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={editedValues.address}
                            onChange={handleInputChange}
                        />
                        <label>Gender:</label>
                        <input
                            type="text"
                            name="gender"
                            value={editedValues.gender}
                            onChange={handleInputChange}
                        />
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={editedValues.phone}
                            onChange={handleInputChange}
                        />
                        <button onClick={handleModalSave} className={styles.save}>Save</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
