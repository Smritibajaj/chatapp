import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
const charApiUrl = "/api/chat.json";

export default function App() {
  const [chatInput, setChatInput] = useState();
  const [chatHistory, setChatHistory] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    setChatInput(value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setChatHistory([...chatHistory, { user: "me", message: chatInput } , { user: "Emma", message: chatInput }]);
  };

  useEffect(() => {
    axios
      .get(charApiUrl)
      .then((res) => res.data)
      .then((data) => setChatHistory([...data]))
      .catch((e) => console.log(e));
  }, []);
  return (
    <React.Fragment>
      <div className="mx-auto">
        <div className="border h-screen rounded">
          <div>
            <div className="w-full">
              <div className="relative flex items-center p-3 border-b border-gray-300">
                <img
                  className="object-cover w-10 h-10 rounded-full"
                  src="/simmybajaj.jpg"
                  alt="username"
                />
                <span className="block ml-2 font-bold text-gray-600">{"Simmy"}</span>
                <span className="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
              </div>
              <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                <ul className="space-y-2">
                  {chatHistory &&
                    chatHistory.map((msg) => {
                      if (msg.user === "me") {
                        return (
                          <li className="flex justify-end">
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                              <span className="block">{msg.message}</span>
                            </div>
                          </li>
                        );
                      } else {
                        return (
                          <li className="flex justify-start">
                            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                              <span className="block">{msg.message}</span>
                            </div>
                          </li>
                        );
                      }
                    })}
                </ul>
              </div>

              <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                <input
                  type="text"
                  placeholder="Message"
                  className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
                  name="message"
                  required
                  onChange={handleChange}
                />
                <button type="submit" onClick={onHandleSubmit}>
                  <svg
                    className="w-5 h-5 text-gray-500 origin-center transform rotate-90"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
