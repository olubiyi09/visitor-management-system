import React from 'react'
import styles from "./Loader.module.css"
import Image from "next/image";

const Loader = () => {
    return (
        <div className={`${styles["loader-parent"]}`}>
            <div className={`${styles.loader}`}>
                <Image
                    src="/loading.svg"
                    alt="Loading..."
                    width={150}
                    height={54}
                    priority
                />
            </div>
        </div>

    )
}

export default Loader