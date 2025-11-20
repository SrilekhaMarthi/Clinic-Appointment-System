package com.wichita.clinic.service;


import com.wichita.clinic.entity.Appointment;
import com.wichita.clinic.entity.Doctor;
import com.wichita.clinic.entity.Patient;

import java.util.List;

public interface AppointmentService {
    Appointment saveAppointment(Appointment appointment);
    Appointment getAppointmentById(int id);
    List<Appointment> getAllAppointments();
    List<Appointment> getAppointmentsByPatient(Patient patient);
    List<Appointment> getAppointmentsByDoctor(Doctor doctor);

    Appointment updateAppointment(int id, Appointment updated);

    void deleteAppointment(int id);

}
