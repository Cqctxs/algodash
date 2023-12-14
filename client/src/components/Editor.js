import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import useAuth from "../hooks/useAuth";

function Editor() {
  const { auth } = useAuth();
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log(`username: ${auth?.user}`);
    setUsername(auth?.user);
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [inputspec, setInputspec] = useState("");
  const [outputspec, setOutputspec] = useState("");

  const updateTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const updateBody = (e) => {
    const value = e.target.value;
    setBody(value);
  };
  const updateInputspec = (e) => {
    const value = e.target.value;
    setInputspec(value);
  };
  const updateOutputspec = (e) => {
    const value = e.target.value;
    setOutputspec(value);
  };

  const postBlog = async () => {
    await axios.post("http://localhost:8080/api/problems/", {});
  };

  return (
    <>
      <div className="flex justify-around">
        <div className="my-8 w-2/5">
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Title
          </h1>
          <input
            className="mb-12 w-full bg-neutral-700 resize-none rounded-full px-6 py-4 outline-none h-20 text-2xl focus:outline-teal-400"
            value={title}
            onChange={updateTitle}
          />
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Body
          </h1>
          <textarea
            className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-80 focus:outline-teal-400"
            value={body}
            onChange={updateBody}
          />
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Input Specification
          </h1>
          <textarea
            className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-40 focus:outline-teal-400"
            value={inputspec}
            onChange={updateInputspec}
          />
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Output Specification
          </h1>
          <textarea
            className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-40 focus:outline-teal-400"
            value={outputspec}
            onChange={updateOutputspec}
          />
          <button className="text-black bg-teal-400 px-8 py-4 text-medium rounded-full">
            Post!
          </button>
        </div>
        <div className="my-8 w-2/5">
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            {title}
          </h1>
          <p>Created by: {username}</p>
          <Markdown className="w-full prose prose-invert">{body}</Markdown>
        </div>
      </div>
    </>
  );
}

export default Editor;
