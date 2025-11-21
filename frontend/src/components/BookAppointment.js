import React, { useState, useEffect } from "react";
import { API } from "../api";

const BookAppointment = () => {
  const [patientId, setPatientId] = useState("");
  const [date, setDate] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await API.get("/users");
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/appointments", { patientId, date });
      alert("Appointment booked!");
      setPatientId("");
      setDate("");
    } catch (err) {
      console.error(err);
      alert("Error booking appointment");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Book
        </button>
      </form>
    </div>
  );
};

export default BookAppointment;
