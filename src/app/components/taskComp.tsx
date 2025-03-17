"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL|| "http://localhost:8080/api";

export default function TaskComp() {
  interface Task {
    _id: string;
    title: string;
    description: string;
    status: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const token =localStorage.getItem("token");
    fetchTasks(token);
  }, []);
  
  const fetchTasks = async (token: string | null) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }

  };

  const addTask = async () => {
    const token =localStorage.getItem("token");
    await axios.post(`${API_BASE_URL}/tasks`, { title, description, status }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    setTitle("");
    fetchTasks(token);
  };

  const updateStatus = async (id:String, newStatus:String) => {
    const token =localStorage.getItem("token");
    await axios.put(`${API_BASE_URL}/tasks/${id}`, { status: newStatus }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    fetchTasks(token);
  };

  const deleteTask = async (id:String) => {
    const token =localStorage.getItem("token");
    await axios.delete(`${API_BASE_URL}/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    fetchTasks(token);
  };


  return (
    <div>
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Create Task</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
        className="border p-2 w-full my-2"
      />
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter description" className="border p-2 w-full my-2" />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 w-full my-2">
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <button onClick={addTask} className="bg-blue-500 text-white p-2">
        Add Task
      </button>

      </div>

        <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>    
          <tbody>
            {tasks.map((t) => (
              <tr key={t._id} className="hover:bg-gray-50">
          <td className="border border-gray-300 px-4 py-2">{t.title}</td>
          <td className="border border-gray-300 px-4 py-2">{t.description}</td>
          <td className="border border-gray-300 px-4 py-2"><select value={t.status} className="border p-2 w-full my-2" onChange={(e) => updateStatus(t._id, e.target.value)}>
          <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
            </select></td>
            <td className="border border-gray-300 px-4 py-2">
              <button className="bg-red-500 text-white p-2" onClick={() => deleteTask(t._id)}>Delete</button></td>
              </tr>

            ))}
          </tbody>
        </table>


    </div>
  );
}
