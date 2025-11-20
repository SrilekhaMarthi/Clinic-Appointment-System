package com.wichita.clinic.service;

import com.wichita.clinic.entity.Doctor;
import com.wichita.clinic.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository repo;

    public DoctorServiceImpl(DoctorRepository repo) {
        this.repo = repo;
    }

    @Override
    public Doctor saveDoctor(Doctor doctor) {
        return repo.save(doctor);
    }

    @Override
    public Doctor getDoctorById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return repo.findAll();
    }

    @Override
    public Doctor updateDoctor(int id, Doctor updated) {
        Doctor existing = getDoctorById(id);
        existing.setName(updated.getName());
        existing.setSpecialization(updated.getSpecialization());
        existing.setPhone(updated.getPhone());
        existing.setEmail(updated.getEmail());
        return repo.save(existing);
    }

    @Override
    public void deleteDoctor(int id) {
        repo.deleteById(id);
    }
}
