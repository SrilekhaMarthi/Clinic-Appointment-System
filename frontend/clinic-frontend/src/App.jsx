import { useState } from "react";
import "./App.css";

export default function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [bills, setBills] = useState([]);
  const [activeTab, setActiveTab] = useState("patients");

  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  const openForm = (type, item = null) => {
    setFormData({ type, item });
    setShowForm(true);
  };

  const closeForm = () => {
    setFormData({});
    setShowForm(false);
  };

  const handleAddOrEdit = (data) => {
    const { type, item } = formData;

    if (type === "patient") {
      if (item) setPatients(patients.map(p => p.id === item.id ? { ...p, ...data } : p));
      else setPatients([...patients, { id: Date.now(), ...data }]);
    }

    if (type === "doctor") {
      if (item) setDoctors(doctors.map(d => d.id === item.id ? { ...d, ...data } : d));
      else setDoctors([...doctors, { id: Date.now(), ...data }]);
    }

    if (type === "appointment") {
      if (item) setAppointments(appointments.map(a => a.id === item.id ? { ...a, ...data } : a));
      else setAppointments([...appointments, { id: Date.now(), status: "Scheduled", ...data }]);
    }

    if (type === "bill") {
      if (item) setBills(bills.map(b => b.id === item.id ? { ...b, ...data } : b));
      else setBills([...bills, { id: Date.now(), paymentStatus: "Pending", ...data }]);
    }

    closeForm();
  };

  const deleteItem = (id, type) => {
    if (type === "patient") setPatients(patients.filter(p => p.id !== id));
    if (type === "doctor") setDoctors(doctors.filter(d => d.id !== id));
    if (type === "appointment") setAppointments(appointments.filter(a => a.id !== id));
    if (type === "bill") setBills(bills.filter(b => b.id !== id));
  };

  const toggleStatus = (id, type) => {
    if(type === "appointment") {
      setAppointments(appointments.map(a => a.id === id ? {...a, status: a.status === "Scheduled" ? "Completed" : "Scheduled"} : a));
    }
    if(type === "bill") {
      setBills(bills.map(b => b.id === id ? {...b, paymentStatus: b.paymentStatus === "Pending" ? "Paid" : "Pending"} : b));
    }
  };

  return (
    <div className="container">
      <h1>Clinic Management Dashboard</h1>

      <div className="tabs">
        {["patients", "doctors", "appointments", "bills"].map(tab =>
          <button
            key={tab}
            className={activeTab === tab ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        )}
      </div>

      <div className="content">
        {/* Patients */}
        {activeTab === "patients" && <>
          <button className="add-btn" onClick={() => openForm("patient")}>+ Add Patient</button>
          {patients.map(p =>
            <div key={p.id} className="card">
              {p.name} (Age: {p.age})
              <div>
                <button className="edit-btn" onClick={() => openForm("patient", p)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteItem(p.id, "patient")}>Delete</button>
              </div>
            </div>
          )}
        </>}

        {/* Doctors */}
        {activeTab === "doctors" && <>
          <button className="add-btn" onClick={() => openForm("doctor")}>+ Add Doctor</button>
          {doctors.map(d =>
            <div key={d.id} className="card">
              Dr. {d.name} — {d.spec}
              <div>
                <button className="edit-btn" onClick={() => openForm("doctor", d)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteItem(d.id, "doctor")}>Delete</button>
              </div>
            </div>
          )}
        </>}

        {/* Appointments */}
        {activeTab === "appointments" && <>
          <button className="add-btn" onClick={() => openForm("appointment")}>+ Add Appointment</button>
          {appointments.map(a => {
            const patient = patients.find(p => p.id === Number(a.patientId));
            const doctor = doctors.find(d => d.id === Number(a.doctorId));
            return (
              <div key={a.id} className="card">
                Patient: {patient ? patient.name : "Unknown"} | Doctor: {doctor ? doctor.name : "Unknown"} | Date: {a.date} | 
                Status: <span className={`status-badge ${a.status.toLowerCase()}`}>{a.status}</span>
                <div>
                  <button className="edit-btn" onClick={() => openForm("appointment", a)}>Edit</button>
                  <button className="edit-btn" onClick={() => toggleStatus(a.id, "appointment")}>Toggle Status</button>
                  <button className="delete-btn" onClick={() => deleteItem(a.id, "appointment")}>Delete</button>
                </div>
              </div>
            )
          })}
        </>}

        {/* Bills */}
        {activeTab === "bills" && <>
          <button className="add-btn" onClick={() => openForm("bill")}>+ Generate Bill</button>
          {bills.map(b => {
            const app = appointments.find(a => a.id === Number(b.appId));
            const patient = app ? patients.find(p => p.id === Number(app.patientId)) : null;
            const doctor = app ? doctors.find(d => d.id === Number(app.doctorId)) : null;
            return (
              <div key={b.id} className="card">
                Patient: {patient ? patient.name : "Unknown"} | Doctor: {doctor ? doctor.name : "Unknown"} | Amount: ₹{b.amount} | 
                Status: <span className={`status-badge ${b.paymentStatus.toLowerCase()}`}>{b.paymentStatus}</span>
                <div>
                  <button className="edit-btn" onClick={() => openForm("bill", b)}>Edit</button>
                  <button className="edit-btn" onClick={() => toggleStatus(b.id, "bill")}>Toggle Status</button>
                  <button className="delete-btn" onClick={() => deleteItem(b.id, "bill")}>Delete</button>
                </div>
              </div>
            )
          })}
        </>}
      </div>

      {/* Modal */}
      {showForm && <FormModal
        formData={formData}
        closeForm={closeForm}
        handleAddOrEdit={handleAddOrEdit}
        patients={patients}
        doctors={doctors}
        appointments={appointments}
      />}
    </div>
  );
}

// --- FORM MODAL COMPONENT ---
function FormModal({ formData, closeForm, handleAddOrEdit, patients, doctors, appointments }) {
  const { type, item } = formData;
  const [data, setData] = useState(item || {});

  const handleChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); handleAddOrEdit(data); };

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h2>{item ? "Edit" : "Add"} {type.charAt(0).toUpperCase() + type.slice(1)}</h2>

        {(type === "patient" || type === "doctor") && <>
          <input name="name" placeholder="Name" value={data.name || ""} onChange={handleChange} required />
          {type === "patient" && <input name="age" placeholder="Age" type="number" value={data.age || ""} onChange={handleChange} required />}
          {type === "doctor" && <input name="spec" placeholder="Specialization" value={data.spec || ""} onChange={handleChange} required />}
        </>}

        {type === "appointment" && <>
          <select name="patientId" value={data.patientId || ""} onChange={handleChange} required>
            <option value="">Select Patient</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select name="doctorId" value={data.doctorId || ""} onChange={handleChange} required>
            <option value="">Select Doctor</option>
            {doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.name}</option>)}
          </select>
          <input name="date" type="date" value={data.date || ""} onChange={handleChange} required />
        </>}

        {type === "bill" && <>
          <select name="appId" value={data.appId || ""} onChange={handleChange} required>
            <option value="">Select Appointment</option>
            {appointments.map(a => {
              const patient = patients.find(p => p.id === Number(a.patientId));
              const doctor = doctors.find(d => d.id === Number(a.doctorId));
              return <option key={a.id} value={a.id}>{patient?.name} - Dr. {doctor?.name} ({a.date})</option>
            })}
          </select>
          <input name="amount" type="number" placeholder="Amount" value={data.amount || ""} onChange={handleChange} required />
        </>}

        <div className="modal-buttons">
          <button type="submit" className="add-btn">{item ? "Update" : "Add"}</button>
          <button type="button" className="delete-btn" onClick={closeForm}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
