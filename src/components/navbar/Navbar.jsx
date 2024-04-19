import React from 'react'
import styles from "./Navbar.module.css"
import Link from "next/link";

const Navbar = () => {
    return (
        <div>
            <header className={styles.header}>
                <div className={styles.logo}>MyVisitor</div>
                <nav>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/">Bookings</Link>
                        </li>
                        <li>
                            <Link href="/">Profile</Link>
                        </li>
                        <li>
                            <Link href="/">Logout</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar