import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Appointments");
  const [activeTab, setActiveTab] = useState("Today");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "Create Appointment" / "Add Patient"
  const [formData, setFormData] = useState({}); // Store form input

  const initialData = {
    Appointments: [
      { id: 1, patient: "John Doe", doctor: "Dr. Smith", time: "10:00 AM" },
      { id: 2, patient: "Jane Doe", doctor: "Dr. Brown", time: "11:00 AM" },
    ],
    Patients: [
      { id: 1, name: "John Doe", age: 30, contact: "123-456-7890" },
      { id: 2, name: "Jane Doe", age: 25, contact: "234-567-8901" },
    ],
    Doctors: [
      { id: 1, name: "Dr. Smith", specialty: "Cardiology", patients: 30 },
    ],
    Bills: [
      { id: 1, patient: "John Doe", amount: "$200", status: "Paid" },
    ],
    Reports: [
      { id: 1, title: "Monthly Revenue", date: "2025-11-01" },
    ],
  };

  const [data, setData] = useState(initialData);

  // Card counts and revenue
  const [appointmentsCount, setAppointmentsCount] = useState(data.Appointments.length);
  const [patientsCount, setPatientsCount] = useState(data.Patients.length);
  const [revenue, setRevenue] = useState(8500);

  useEffect(() => {
    const interval = setInterval(() => {
      setAppointmentsCount(data.Appointments.length + Math.floor(Math.random() * 3));
      setPatientsCount(data.Patients.length + Math.floor(Math.random() * 3));
      setRevenue(8500 + Math.floor(Math.random() * 1000));
    }, 5000);
    return () => clearInterval(interval);
  }, [data]);

  // Delete & Edit
  const handleDelete = (id) => {
    const updated = data[activeMenu].filter((item) => item.id !== id);
    setData({ ...data, [activeMenu]: updated });
  };

  const handleEdit = (id) => {
    const updated = data[activeMenu].map((item) =>
      item.id === id ? { ...item, edited: true } : item
    );
    setData({ ...data, [activeMenu]: updated });
  };

  // Open modal
  const handleAction = (label) => {
    setModalType(label);
    setFormData({});
    setModalOpen(true);
  };

  // Submit modal form
  const handleSubmit = () => {
    let newItem = {};
    switch (modalType) {
      case "Create Appointment":
        newItem = { id: Date.now(), patient: formData.patient || "New Patient", doctor: formData.doctor || "Dr. X", time: formData.time || "12:00 PM" };
        setData({ ...data, Appointments: [...data.Appointments, newItem] });
        break;
      case "Add Patient":
        newItem = { id: Date.now(), name: formData.name || "New Patient", age: formData.age || 0, contact: formData.contact || "" };
        setData({ ...data, Patients: [...data.Patients, newItem] });
        break;
      default:
        break;
    }
    setModalOpen(false);
  };

  // Menu cards and buttons
  const menuConfig = {
    Appointments: {
      cards: [
        { title: "Upcoming Appointments", value: appointmentsCount, icon: "📅" },
        { title: "Revenue", value: `$${revenue.toLocaleString()}`, icon: "💰" },
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
            {headers.map((h) => <th key={h}>{h.toUpperCase()}</th>)}
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row.id} style={row.edited ? { backgroundColor: "#fff3cd" } : {}}>
              {headers.map((h) => <td key={h}>{row[h]}</td>)}
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
      <div className="header">
        Clinic Dashboard
        <div className="user-info">
          <img src="https://via.placeholder.com/35" alt="User Avatar" />
          <span>Dr. Admin</span>
        </div>
      </div>

      <div className="dashboard">
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

        <div className="main-content">
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

          <div className="action-buttons">
            {menuConfig[activeMenu]?.actions?.map((btn, idx) => (
              <button
                key={idx}
                className={btn.type === "create" ? "create" : "schedule"}
                onClick={() => handleAction(btn.label)}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div className="cards-container">
            {menuConfig[activeMenu]?.cards?.map((card, idx) => (
              <div key={idx} className={`card ${activeMenu.toLowerCase()}`}>
                <div className="content">
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                </div>
                <div className="icon">{card.icon}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ color: "#333", backgroundColor: "#fff" }}>
            <h3>{activeMenu} Details</h3>
            {renderTable()}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{modalType}</h3>
            {modalType === "Create Appointment" && (
              <div className="modal-form">
                <input placeholder="Patient Name" onChange={(e) => setFormData({ ...formData, patient: e.target.value })} />
                <input placeholder="Doctor Name" onChange={(e) => setFormData({ ...formData, doctor: e.target.value })} />
                <input placeholder="Time" onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
              </div>
            )}
            {modalType === "Add Patient" && (
              <div className="modal-form">
                <input placeholder="Patient Name" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                <input placeholder="Age" type="number" onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                <input placeholder="Contact" onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
              </div>
            )}
            <div className="modal-buttons">
              <button className="create" onClick={handleSubmit}>Submit</button>
              <button className="delete" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
