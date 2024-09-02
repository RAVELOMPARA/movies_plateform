"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./(auth)/login/page.jsx";

export default function Home() {
  return (
    <main className="{styles.main}">
      <Login />
    </main>
  );
}
