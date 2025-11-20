package com.wichita.clinic.controller;

import com.wichita.clinic.entity.Patient;
import com.wichita.clinic.service.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
@CrossOrigin
public class PatientController {

    private final PatientService service;

    public PatientController(PatientService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) {
        return ResponseEntity.ok(service.savePatient(patient));
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return service.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable int id) {
        return ResponseEntity.ok(service.getPatientById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable int id,
            @RequestBody Patient patient
    ) {
        patient.setPatientId(id);
        return ResponseEntity.ok(service.updatePatient(patient.getPatientId(), patient));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable int id) {
        service.deletePatient(id);
        return ResponseEntity.ok("Patient deleted successfully");
    }
}

