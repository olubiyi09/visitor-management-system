"use client"
import styles from "./Home.module.css";
import Hero from "@/components/hero/Hero";
import Loader from "@/components/loader/Loader";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { loading } = useSelector((state: any) => state.loaders);
  const { currentUser, isLoggedIn } = useSelector((state: any) => state.users);


  // useEffect(() => {
  //   console.log(currentUser, isLoggedIn);
  // }, [isLoggedIn]);

  return (
    <>
      {loading && <Loader />}
      <main className={styles.wrapper}>
        <Hero />
      </main>
    </>
  );
}
