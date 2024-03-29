import React, { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/api/problems";

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
  const [sampleinput, setSamplenput] = useState("");
  const [sampleoutput, setSampleoutput] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

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
  const updateSampleinput = (e) => {
    const value = e.target.value;
    setSamplenput(value);
  };
  const updateSampleoutput = (e) => {
    const value = e.target.value;
    setSampleoutput(value);
  };
  const updateInput = (e) => {
    const value = e.target.value;
    setInput(value);
  };
  const updateOutput = (e) => {
    const value = e.target.value;
    setOutput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const rating = response.data.rating;
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };
  return (
    <>
      <div className="flex justify-around">
        <form className="my-8 w-2/5">
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
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Sample Input
          </h1>
          <textarea
            className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-40 focus:outline-teal-400"
            value={sampleinput}
            onChange={updateSampleinput}
          />
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Sample Output
          </h1>
          <textarea
            className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-40 focus:outline-teal-400"
            value={sampleoutput}
            onChange={updateSampleoutput}
          />
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Input
          </h1>
          <textarea
            className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-40 focus:outline-teal-400"
            value={input}
            onChange={updateInput}
          />
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            Output
          </h1>
          <textarea
            className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-40 focus:outline-teal-400"
            value={output}
            onChange={updateOutput}
          />
          <button className="text-black bg-teal-400 px-8 py-4 text-medium rounded-full">
            Create!
          </button>
        </form>
        <div className="my-8 w-2/5">
          <h1 className="text-white text-5xl font-medium mb-8 select-none">
            {title}
          </h1>
          <p className="my-4">Created by: {username}</p>
          <hr class="h-1 mx-auto my-8 bg-neutral-700 border-0 rounded" />
          <Markdown className="w-full prose prose-invert">{body}</Markdown>
          <hr class="h-1 mx-auto my-8 bg-neutral-700 border-0 rounded" />
          <h1 className="text-white text-2xl font-medium my-8 select-none">
            Input Specification
          </h1>
          <Markdown className="w-full prose prose-invert">{inputspec}</Markdown>
          <h1 className="text-white text-2xl font-medium my-8 select-none">
            Output Specification
          </h1>
          <Markdown className="w-full prose prose-invert">
            {outputspec}
          </Markdown>
          <hr class="h-1 mx-auto my-8 bg-neutral-700 border-0 rounded" />
          <h1 className="text-white text-2xl font-medium my-8 select-none">
            Sample Input
          </h1>
          <p className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-full">
            {sampleinput}
          </p>
          <h1 className="text-white text-2xl font-medium my-8 select-none">
            Sample Output
          </h1>
          <p className="mb-12 w-full bg-neutral-700 resize-none rounded-3xl px-6 py-4 outline-none h-full">
            {sampleoutput}
          </p>
        </div>
      </div>
    </>
  );
}

export default Editor;
