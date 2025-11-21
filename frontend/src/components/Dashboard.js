import React from "react";
import AddPatient from "./AddPatient";
import BookAppointment from "./BookAppointment";
import AppointmentList from "./AppointmentList";

const Dashboard = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Clinic Appointment System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AddPatient />
        <BookAppointment />
      </div>
      <AppointmentList />
    </div>
  );
};

export default Dashboard;
