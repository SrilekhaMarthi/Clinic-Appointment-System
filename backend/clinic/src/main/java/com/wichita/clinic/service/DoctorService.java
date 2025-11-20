package com.wichita.clinic.service;

import com.wichita.clinic.entity.Doctor;

import java.util.List;

public interface DoctorService {
    Doctor saveDoctor(Doctor doctor);
    Doctor getDoctorById(int id);
    List<Doctor> getAllDoctors();

    Doctor updateDoctor(int id, Doctor updated);

    void deleteDoctor(int id);
}
