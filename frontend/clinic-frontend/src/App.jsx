import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Appointments");
  const [activeTab, setActiveTab] = useState("Today");

  const initialData = {
    Appointments: [
      { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "10:00 AM" },
      { id: 2, patient: "Jane Doe", doctor: "Dr. Brown", time: "11:00 AM" },
      { id: 3, patient: "Alice", doctor: "Dr. Smith", time: "12:00 PM" },
    ],
    Patients: [
      { id: 1, name: "John Doe", age: 30, contact: "123-456-7890" },
      { id: 2, name: "Jane Doe", age: 25, contact: "234-567-8901" },
      { id: 3, name: "Alice", age: 40, contact: "345-678-9012" },
    ],
    Doctors: [
      { id: 1, name: "Dr. Smith", specialty: "Cardiology", patients: 30 },
      { id: 2, name: "Dr. Brown", specialty: "Dermatology", patients: 25 },
      { id: 3, name: "Dr. Lee", specialty: "Pediatrics", patients: 20 },
    ],
    Bills: [
      { id: 1, patient: "John Doe", amount: "$200", status: "Paid" },
      { id: 2, patient: "Jane Doe", amount: "$150", status: "Pending" },
      { id: 3, patient: "Alice", amount: "$300", status: "Paid" },
    ],
    Reports: [
      { id: 1, title: "Monthly Revenue", date: "2025-11-01" },
      { id: 2, title: "Patient Growth", date: "2025-11-01" },
    ],
  };

  const [data, setData] = useState(initialData);

  // Card counts
  const [appointmentsCount, setAppointmentsCount] = useState(data.Appointments.length);
  const [patientsCount, setPatientsCount] = useState(data.Patients.length);
  const [revenue, setRevenue] = useState(8500); // ✅ revenue now included

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAppointmentsCount(data.Appointments.length + Math.floor(Math.random() * 3));
      setPatientsCount(data.Patients.length + Math.floor(Math.random() * 3));
      setRevenue(8500 + Math.floor(Math.random() * 1000)); // ✅ revenue used
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  // Handle delete row
  const handleDelete = (id) => {
    const updated = data[activeMenu].filter((item) => item.id !== id);
    setData({ ...data, [activeMenu]: updated });
  };

  // Handle edit row
  const handleEdit = (id) => {
    const updated = data[activeMenu].map((item) => {
      if (item.id === id) {
        return { ...item, edited: true };
      }
      return item;
    });
    setData({ ...data, [activeMenu]: updated });
  };

  // Handle action buttons
  const handleAction = (label) => {
    alert(`You clicked "${label}" button in ${activeMenu} tab`);
  };

  // Menu-specific cards and buttons, revenue included in Appointments
  const menuConfig = {
    Appointments: {
      cards: [
        { title: "Upcoming Appointments", value: appointmentsCount, icon: "📅" },
        { title: "Revenue", value: `$${revenue.toLocaleString()}`, icon: "💰" }, // ✅ used revenue
      ],
      actions: [
        { label: "Create Appointment", type: "create" },
        { label: "Schedule Appointment", type: "schedule" },
      ],
    },
    Patients: {
      cards: [
        { title: "Total Patients", value: patientsCount, icon: "🧑‍⚕️" },
        { title: "New Patients", value: 2, icon: "🆕" },
      ],
      actions: [
        { label: "Add Patient", type: "create" },
        { label: "Import Patients", type: "schedule" },
      ],
    },
    Doctors: {
      cards: [
        { title: "Total Doctors", value: data.Doctors.length, icon: "👨‍⚕️" },
        { title: "Specialties", value: 3, icon: "💼" },
      ],
      actions: [
        { label: "Add Doctor", type: "create" },
        { label: "Assign Patients", type: "schedule" },
      ],
    },
    Bills: {
      cards: [
        { title: "Total Bills", value: data.Bills.length, icon: "📄" },
        { title: "Pending Payments", value: 1, icon: "⏳" },
      ],
      actions: [
        { label: "Generate Bill", type: "create" },
        { label: "Mark Paid", type: "schedule" },
      ],
    },
    Reports: {
      cards: [
        { title: "Total Reports", value: data.Reports.length, icon: "📊" },
        { title: "Monthly Reports", value: 2, icon: "🗓️" },
      ],
      actions: [
        { label: "Generate Report", type: "create" },
        { label: "Export Report", type: "schedule" },
      ],
    },
  };

  // Render table
  const renderTable = () => {
    const tableData = data[activeMenu];
    if (!tableData || tableData.length === 0) return <p>No data available</p>;

    const headers = Object.keys(tableData[0]).filter((h) => h !== "id" && h !== "edited");

    return (
      <table>
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h.toUpperCase()}</th>
            ))}
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} style={row.edited ? { backgroundColor: "#fff3cd" } : {}}>
              {headers.map((h) => (
                <td key={h}>{row[h]}</td>
              ))}
              <td>
                <button className="edit" onClick={() => handleEdit(row.id)}>Edit</button>
                <button className="delete" onClick={() => handleDelete(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      {/* Header with user info */}
      <div className="header">
        Clinic Dashboard
        <div className="user-info">
          <img src="https://via.placeholder.com/35" alt="User Avatar" />
          <span>Dr. Admin</span>
        </div>
      </div>

      <div className="dashboard">
        {/* Sidebar */}
        <div className="sidebar">
          {Object.keys(data).map((menu) => (
            <div
              key={menu}
              className={`menu-item ${activeMenu === menu ? "active" : ""}`}
              onClick={() => setActiveMenu(menu)}
            >
              {menu}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Tabs */}
          <div className="tabs">
            {["Today", "Week", "Month"].map((tab) => (
              <div
                key={tab}
                className={`tab ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            {menuConfig[activeMenu].actions.map((btn, idx) => (
              <button
                key={idx}
                className={btn.type === "create" ? "create" : "schedule"}
                onClick={() => handleAction(btn.label)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="cards-container">
            {menuConfig[activeMenu].cards.map((card, idx) => (
              <div key={idx} className={`card ${activeMenu.toLowerCase()}`}>
                <div className="content">
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                </div>
                <div className="icon">{card.icon}</div>
              </div>
            ))}
          </div>

          {/* Table / Main Section */}
          <div className="card" style={{ color: "#333", backgroundColor: "#fff" }}>
            <h3>{activeMenu} Details</h3>
            {renderTable()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
