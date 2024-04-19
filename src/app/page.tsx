import styles from "./Home.module.css"
import Hero from "@/components/hero/Hero"

export default function Home() {
  return (
    <main className={styles.wrapper}>
      {/* <hr /> */}
      <Hero />
    </main>
  );
}
