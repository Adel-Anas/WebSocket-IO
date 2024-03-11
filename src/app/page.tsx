"use client";
import ChatImage from '@/assets/removedBackground.png';
import Image from 'next/image';
import Link from 'next/link'; 
import Navbar from '@/components/Navbar';
export default function Home() {

  return (
    <>
    <Navbar />
      <section className="bg-[#13162b] h-screen flex gap-16 items-center justify-start pl-28">
        <div className="pt-14 gap-10 flex flex-col text-white w-6/12">
          <h1 className="text-5xl leading-[3.5rem] ">Connect and Chat: Your <br /> Online Hub for Conversations</h1>
          <p className="text-xl">Fast, easy, Unlimited chat services</p>
          <div className='flex gap-6'>
            <Link href="/room">
              <button className='py-3 px-7 rounded-full bg-purple-900 text-white'>Create User</button>
            </Link>
            <Link href='/chat'>
              <button className='py-3 px-8 rounded-full bg-transparent text-white border border-white'>Join Chat</button>
            </Link>
          </div>
        </div>
        <div className='w-7/12'>
          <Image src={ChatImage} alt="Chat Image" className='rounded'/>
        </div>
      </section>
    </>
  );
}
