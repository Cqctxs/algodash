import React from "react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Problem from "./Problem";

import io from "socket.io-client";
import useAuth from "../hooks/useAuth";

const socket = io.connect("http://localhost:8080"); //SERVER

function Play() {
  const { auth } = useAuth();
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState(0);
  const [queued, setQueued] = useState(false);

  useEffect(() => {
    setUsername(auth?.user);
    setRating(auth?.rating);
  });

  const joinRoom = () => {
    if (username !== "") {
      const player = {
        id: socket.id,
        username: username,
        rating: rating,
      };
      socket.emit("join-room", player);
      setQueued(true);
    }
  };
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="content">
        {!queued ? (
          <div className="play">
            <h2>Code Racer</h2>
            <button onClick={joinRoom}>Join Queue</button>
          </div>
        ) : (
          <Problem socket={socket} setQueued={setQueued} />
        )}
      </div>
    </>
  );
}

export default Play;
