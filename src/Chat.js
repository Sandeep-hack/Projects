import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Chat.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import InsertEmoticonOutlinedIcon from "@mui/icons-material/InsertEmoticonOutlined";
import SendIcon from "@mui/icons-material/Send";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import db from "./Firebase";
import firebase from "./Firebase";
// import { Message, MessageSharp } from "@material-ui/icons";

function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastseenPhoto, setLastseen] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);
  useEffect(() => {
    setLastseen(messages[messages.length - 1]?.photoURL);
  }, [messages]);

  function sendMessage(e) {
    e.preventDefault();
    // console.log("messgae was sent");
    if (input.length > 0) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .add({
          message: input,
          
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: localStorage.getItem("photoURL"),
        });
    }
    
  }

  return (
    <div className="chat">
      <div className="chat__header">
        <IconButton>
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        </IconButton>

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Last Seen at ...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileOutlinedIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className={`chat__message ${true && "chat__reciever"}`}>
          <span className="chat__name">Dark</span>
          Hey Guys
          <span className="chat__timestamp">3:28 pm</span>
        </p>
        <p className="chat__message">Hey Guys</p>
      </div>

      <div className="chat__footer">
        <InsertEmoticonOutlinedIcon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            Send message
          </button>
        </form>
        {/* <button></button> */} <SendIcon />
        <MicOutlinedIcon />
      </div>
    </div>
  );
}

export default Chat;
