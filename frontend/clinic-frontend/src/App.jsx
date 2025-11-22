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
  const [revenue, setRevenue] = useState(8500);

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAppointmentsCount(data.Appointments.length + Math.floor(Math.random() * 3));
      setPatientsCount(data.Patients.length + Math.floor(Math.random() * 3));
      setRevenue(8500 + Math.floor(Math.random() * 1000));
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  // Handle delete
  const handleDelete = (id) => {
    const updated = data[activeMenu].filter((item) => item.id !== id);
    setData({ ...data, [activeMenu]: updated });
  };

  // Handle edit (simulate edit)
  const handleEdit = (id) => {
    const updated = data[activeMenu].map((item) => {
      if (item.id === id) {
        return { ...item, edited: true };
      }
      return item;
    });
    setData({ ...data, [activeMenu]: updated });
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
      <div className="header">Clinic Management Dashboard</div>
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

          {/* Cards */}
          <div className="card">
            <h3>Upcoming Appointments</h3>
            <p>{appointmentsCount} appointments</p>
          </div>

          <div className="card">
            <h3>Patients Summary</h3>
            <p>Total patients registered: {patientsCount}</p>
          </div>

          <div className="card">
            <h3>Revenue</h3>
            <p>${revenue.toLocaleString()} generated</p>
          </div>

          {/* Table / Main Section */}
          <div className="card">
            <h3>{activeMenu} Details</h3>
            {renderTable()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
