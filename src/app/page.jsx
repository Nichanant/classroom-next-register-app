"use client"

import Image from "next/image";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import imgNote from '../pic/b_notes_icon.svg'
import Footer from "./components/Footer";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main>
      <Container>
        <Navbar session={session} />
        <div className="flex-grow text-center p-10">
          <h3 className="text-5xl">Devboard</h3>
          <p className="text-xl">Join our community</p>
          <div className="flex justify-center my-20">
            <Image src={imgNote} width={200} height={0} alt="welcome image" className="animate-bounce w-200 h-200" />
          </div>
        </div>
        <Footer />
      </Container>
    </main>
  );
}
