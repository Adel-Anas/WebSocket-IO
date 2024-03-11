"use client";
import { FormEvent, useState } from "react";
import { io } from "socket.io-client";
import Chat from "../chat/page";
import image from "@/assets/background.webp";
import Link from "next/link";

export default function Home() {
  const [userConnected, setUserConnected] = useState<any>({});
  const [user, setUser] = useState("");
  const [chat, setChat] = useState(false);
  const socket = io("http://localhost:3001");
  const joinRoom = (e: FormEvent) => {
    e.preventDefault();
    if (user) {
      socket.emit("joinRoom", user);
      socket.on("joinRoom", (user) => {
        setUserConnected(user);
        setChat(true);
      });
    }
  };
  return (
    <>
      {chat ? (
        <Chat user={userConnected}/>
      ) : (   
        <form
          className="flex items-center justify-center h-screen "
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${image.src})`,
          }}
        >
          <div className="w-[28rem] h-[25rem]">
            <div className="flex items-center justify-center w-full bg-blue-600 h-[70px] rounded text-white">
              <h1 className="font-bold text-2xl">ChatSphere</h1>
            </div>
            <div className="h-[330px] bg-blue-900 flex flex-col items-center py-7 gap-5 px-10">
              <div className="flex flex-col gap-1 w-full">
                <p className="text-white text-lg">Username</p>
                <input
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  placeholder="Enter your name..."
                  className="w-full h-10 outline-none pl-3"
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-7">
                <p className="text-white text-lg">Room</p>
                <select name="" id="" className="h-10 outline-none">
                  <option value="javascript">Javascript</option>
                </select>
              </div>
              <div
                className="w-full h-10 text-white font-semibold bg-blue-600 text-lg flex items-center justify-center "
              >
                <button onClick={joinRoom}>Join Chat</button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
