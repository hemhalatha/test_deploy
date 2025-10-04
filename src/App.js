import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const api_url = "http://localhost:5000/details";

// ---------------- Get Component ----------------
function Get() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const save = async () => {
    try {
      await axios.post(api_url, { name, age });
      navigate("/show_details"); // redirect to another route
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Enter Details</h2>
        <input
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-3 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
          onClick={save}
        >
          Save
        </button>
      </div>
    </div>
  );
}

// ---------------- Show Component ----------------
function Show() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(api_url);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center items-center mt-16">
      <div className="bg-white shadow-lg rounded-xl p-6 w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Stored Data
        </h2>
        <ul className="space-y-2">
          {data.map((item, i) => (
            <li
              key={i}
              className="bg-gray-100 p-3 rounded-lg text-gray-800 font-medium"
            >
              <span className="text-blue-600">{item.name}</span> — {item.age}
            </li>
          ))}
        </ul>
        <Link
          to="/"
          className="block text-center mt-4 text-blue-500 hover:underline font-semibold"
        >
          ⬅ Back
        </Link>
      </div>
    </div>
  );
}

// ---------------- Main App ----------------
function App() {
  return (
    <>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mt-8">
        Full Stack Website
      </h1>
      <Routes>
        <Route path="/" element={<Get />} />
        <Route path="/show_details" element={<Show />} />
      </Routes>
    </>
  );
}

export default App;
