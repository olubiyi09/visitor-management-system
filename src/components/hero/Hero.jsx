import React from 'react'
import styles from "./Hero.module.css"
import Image from "next/image";
import Loader from "@/components/loader/Loader"

const Hero = () => {
    return (
        <section>
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <h2>MyVisitor Management Application</h2>
                        <p>MyVisitor is an intuitive application that helps you effortlessly track, manage, and organize visitors, ensuring seamless visitor management for your establishment.</p>
                        <div className={styles.btn}>
                            <button>Book Appointment</button>
                        </div>
                    </div>
                    <div>
                        <Image
                            src="/hero.svg"
                            alt="hero Image"
                            width={500}
                            height={54}
                            priority
                        />
                    </div>


                </div>
            </div>
        </section>
    )
}

export default Hero