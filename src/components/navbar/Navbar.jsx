"use client"

import { React, useEffect } from "react";
import styles from "./Navbar.module.css"
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { setLoading } from "@/redux/loaderSlice";
import { setCurrentUser, setIsLoggedIn } from "@/redux/usersSlice";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const Navbar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { loading } = useSelector((state) => state.loaders);
    const { currentUser, isLoggedIn } = useSelector((state) => state.users);

    const getCurrentUser = async () => {
        try {
            dispatch(setLoading(true));
            const response = await axios.get("/api/users/currentuser");
            dispatch(setCurrentUser(response.data.data));
            dispatch(setIsLoggedIn(true));
        } catch (error) {
            // Handle error
            // console.error("Error fetching current user:", error);
            dispatch(setCurrentUser(null));
            dispatch(setIsLoggedIn(false));
        } finally {
            dispatch(setLoading(false));
        }
    };

    useEffect(() => {
        if (pathname !== "/login" && pathname !== "/register" && !currentUser) {
            getCurrentUser();
        }
    }, [pathname]);


    const handleLogout = async () => {
        try {
            dispatch(setLoading(true));
            await axios.post("/api/users/logout");
            toast.success("Logged out successfully");
            dispatch(setCurrentUser(null));
            router.push("/authentication");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.response?.data?.message || "Something went wrong");

        } finally {
            dispatch(setLoading(false));
        }
    };
    return (
        <div>
            {loading && <Loader />}
            <header className={styles.header}>
                <div className={styles.logo} onClick={() => router.push("/")}>MyVisitor</div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        {!loading && isLoggedIn && <li>
                            <Link href="/">Bookings</Link>
                        </li>}

                        {!loading && isLoggedIn && <li>
                            <Link href="/profile">Profile</Link>
                        </li>}


                        {!loading && isLoggedIn ? (
                            <li onClick={handleLogout}>
                                <p>Logout</p>
                            </li>
                        ) : (
                            <li className="cursor-pointer">
                                <Link href="/authentication">Login|Register</Link>
                            </li>
                        )
                        }

                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar