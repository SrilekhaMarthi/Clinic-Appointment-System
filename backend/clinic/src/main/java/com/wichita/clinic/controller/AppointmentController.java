package com.wichita.clinic.controller;

import com.wichita.clinic.entity.Appointment;
import com.wichita.clinic.entity.Patient;
import com.wichita.clinic.entity.Doctor;
import com.wichita.clinic.service.AppointmentService;
import com.wichita.clinic.service.PatientService;
import com.wichita.clinic.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appointments")
@CrossOrigin
public class AppointmentController {

    private final AppointmentService service;
    private final PatientService patientService;
    private final DoctorService doctorService;

    public AppointmentController(AppointmentService service,
                                 PatientService patientService,
                                 DoctorService doctorService) {
        this.service = service;
        this.patientService = patientService;
        this.doctorService = doctorService;
    }

    @PostMapping
    public ResponseEntity<Appointment> bookAppointment(@RequestBody Appointment appointment) {
        return ResponseEntity.ok(service.saveAppointment(appointment));
    }

    @GetMapping
    public List<Appointment> getAllAppointments() {
        return service.getAllAppointments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable int id) {
        return ResponseEntity.ok(service.getAppointmentById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(
            @PathVariable int id,
            @RequestBody Appointment appointment
    ) {
        appointment.setAppointmentId(id);
        return ResponseEntity.ok(service.updateAppointment(appointment.getAppointmentId(), appointment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(@PathVariable int id) {
        service.deleteAppointment(id);
        return ResponseEntity.ok("Appointment cancelled successfully");
    }

    // 🔎 Fetch appointments by patient
    @GetMapping("/patient/{patientId}")
    public List<Appointment> getAppointmentsByPatient(@PathVariable int patientId) {
        Patient patient = patientService.getPatientById(patientId);
        return service.getAppointmentsByPatient(patient);
    }

    // 🔎 Fetch appointments by doctor
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctor(@PathVariable int doctorId) {
        Doctor doctor = doctorService.getDoctorById(doctorId);
        return service.getAppointmentsByDoctor(doctor);
    }
}

