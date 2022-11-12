import { Avatar } from "@mui/material";
import { React, useState, useEffect } from "react";
import db from "./Firebase";
import "./SidebarChat.css";
import { Link } from "react-router-dom";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  function createChat() {
    const roomName = prompt("Please enter name for the chat");

    if (roomName) {
      // cleaver database stuff
      db.collection("rooms").add({
        name: roomName,
      });
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`} className="sidebarChat__link">
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h3>{name}</h3>
          <p>Last message....</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new chat</h2>
    </div>
  );
}

export default SidebarChat;
