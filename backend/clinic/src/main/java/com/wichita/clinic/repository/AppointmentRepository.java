package com.wichita.clinic.repository;

import com.wichita.clinic.entity.Appointment;
import com.wichita.clinic.entity.Doctor;
import com.wichita.clinic.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    List<Appointment> findByPatient(Patient patient);
    List<Appointment> findByDoctor(Doctor doctor);
}
