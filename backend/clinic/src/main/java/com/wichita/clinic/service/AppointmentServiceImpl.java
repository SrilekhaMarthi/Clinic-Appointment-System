package com.wichita.clinic.service;

import com.wichita.clinic.entity.Appointment;
import com.wichita.clinic.entity.Doctor;
import com.wichita.clinic.entity.Patient;
import com.wichita.clinic.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository repo;

    public AppointmentServiceImpl(AppointmentRepository repo) {
        this.repo = repo;
    }

    @Override
    public Appointment saveAppointment(Appointment appointment) {
        return repo.save(appointment);
    }

    @Override
    public Appointment getAppointmentById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return repo.findAll();
    }

    @Override
    public List<Appointment> getAppointmentsByPatient(Patient patient) {
        return repo.findByPatient(patient);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctor(Doctor doctor) {
        return repo.findByDoctor(doctor);
    }

    @Override
    public Appointment updateAppointment(int id, Appointment updated) {
        Appointment existing = getAppointmentById(id);
        existing.setAppointmentDate(updated.getAppointmentDate());
        existing.setAppointmentTime(updated.getAppointmentTime());
        existing.setStatus(updated.getStatus());
        existing.setDoctor(updated.getDoctor());
        existing.setPatient(updated.getPatient());
        return repo.save(existing);
    }

    @Override
    public void deleteAppointment(int id) {
        repo.deleteById(id);
    }
}
