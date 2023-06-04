"use client";
import React, { useRef } from "react";
import "@/styles/Homepage.css";
import Header from "@/components/Home/Header";
import About from "@/components/Home/About";
import Why from "@/components/Home/Why";
import Contact from "@/components/Home/Contact";
import Footer from "@/components/Home/Footer";

export default function Home() {
  const profileRef = useRef();
  const whyRef = useRef();
  const contactRef = useRef();

  return (
    <>
      <Header profileRef={profileRef} whyRef={whyRef} contactRef={contactRef} />
      <About />
      <Why whyRef={whyRef} />
      <Contact contactRef={contactRef} />
      <Footer />
    </>
  );
}
