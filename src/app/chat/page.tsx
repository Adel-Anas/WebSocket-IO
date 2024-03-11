"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { IoChatbubbles } from "react-icons/io5";
import { LuSend } from "react-icons/lu";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

type User = {
  _id: string;
  username: string;
};
type Message = {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  content: string;
};
const Chat = ({ user }: { user: User }, {closeState}:any) => {

  const router = useRouter()
  const [inbox, setInbox] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>();
  useEffect(() => {
    const socket = io("http://localhost:3001");
    const getMsg = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/");
        const data = res.data;
        console.log(data);
        setInbox(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMsg();
    socket.on("message", () => {
      getMsg();
    });
  }, []);
  const sendMsg = (e: FormEvent) => {
    e.preventDefault();
    const socket = io("http://localhost:3001");
    if (message) {
      socket.emit("message", message, user?._id);
      setMessage("");
    }
  };

  return (
    <div className="h-screen">
      <header className="flex h-[15%] justify-between items-center px-16 bg-blue-950">
        <nav className="flex justify-between items-center h-24 w-full">
          <h1 className="text-white text-2xl font-semibold ">ChatSphere</h1>
          <button onClick={()=> window.location.reload()} className="w-32 rounded h-10 text-white font-semibold bg-blue-500 text-lg flex items-center justify-center">
            Leave room
          </button>
        </nav>
      </header>
      <section className="flex h-[70%]">
        <aside className="flex flex-col w-2/12 bg-blue-950 text-white py-6 px-6 gap-9">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <IoChatbubbles className="w-8 h-8" />
              <p className="text-xl">Room Name:</p>
            </div>

            <div className="p-3 bg-blue-500">
              <p>Javascript</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <FaUsers className="w-8 h-8 " />
              <p className="text-xl ">Users :</p>
            </div>
            <div>
              <p>Anas</p>
            </div>
          </div>
        </aside>
        <div
          className="grid grid-cols-1 gap-10 overflow-scroll h-full w-full bg-scroll p-10"
          style={{ scrollbarWidth: "none" }}
        >
          {inbox.map((i) => (
            <div
              className={`${
                i.sender._id == user?._id
                  ? " bg-green-900 text-white overflow-hidden text-wrap"
                  : "bg-slate-900 text-white overflow-hidden text-wrap"
              } p-5 rounded-md flex flex-col gap-2 min-h-32 h-auto w-full`}
            >
              <h1 className="text-sky-500">
                {user.username == i.sender.username ? "me" : i.sender.username}
              </h1>
              <p>{i.content}</p>
            </div>
          ))}
        </div>
      </section>
      <footer className="bg-blue-950 h-[15%] flex items-center justify-center px-12">
        <form
          onSubmit={sendMsg}
          className="flex gap-5 items-center justify-center w-full"
        >
          <input
            value={message}
            onChange={(e)=> setMessage(e.target.value)}
            type="text"
            className="w-10/12 h-10 pl-5"
            placeholder="Enter Message Here"
          />
          <div className="flex border border-black bg-blue-500 w-1/12 h-10 items-center gap-3 text-white pl-3">
            <LuSend className="w-6 h-6" />
            <button className="text-xl">Send</button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default Chat;
