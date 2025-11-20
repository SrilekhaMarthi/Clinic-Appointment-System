package com.wichita.clinic.service;

import com.wichita.clinic.entity.Patient;

import java.util.List;

public interface PatientService {
    Patient savePatient(Patient patient);
    Patient getPatientById(int id);
    List<Patient> getAllPatients();
    void deletePatient(int id);
    Patient updatePatient(int id, Patient updated) ;
}
