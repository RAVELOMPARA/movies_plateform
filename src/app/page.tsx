"use client"
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className="{styles.main}">
      <Link href="/home">Home</Link>
      <Link href="/cv">Cv</Link>
      <br />
      <Link href="/contact">Contact</Link>
    </main>
  );
}
