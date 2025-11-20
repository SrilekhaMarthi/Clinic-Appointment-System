package com.wichita.clinic.service;

import com.wichita.clinic.entity.Patient;
import com.wichita.clinic.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    private final PatientRepository repo;

    public PatientServiceImpl(PatientRepository repo) {
        this.repo = repo;
    }

    @Override
    public Patient savePatient(Patient patient) {
        return repo.save(patient);
    }


    @Override
    public Patient getPatientById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    @Override
    public List<Patient> getAllPatients() {
        return repo.findAll();
    }

    @Override
    public Patient updatePatient(int id, Patient updated) {
        Patient existing = getPatientById(id);
        existing.setAge(updated.getAge());
        existing.setGender(updated.getGender());
        existing.setContactNo(updated.getContactNo());
        existing.setEmail(updated.getEmail());
        return repo.save(existing);
    }

    @Override
    public void deletePatient(int id) {
        repo.deleteById(id);
    }
}