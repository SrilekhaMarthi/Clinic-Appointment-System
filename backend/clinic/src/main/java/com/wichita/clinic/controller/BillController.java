package com.wichita.clinic.controller;

import com.wichita.clinic.entity.Bill;
import com.wichita.clinic.entity.Appointment;
import com.wichita.clinic.service.BillService;
import com.wichita.clinic.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bills")
@CrossOrigin
public class BillController {

    private final BillService service;
    private final AppointmentService appointmentService;

    public BillController(BillService service, AppointmentService appointmentService) {
        this.service = service;
        this.appointmentService = appointmentService;
    }

    @PostMapping
    public ResponseEntity<Bill> createBill(@RequestBody Bill bill) {
        return ResponseEntity.ok(service.saveBill(bill));
    }

    @GetMapping
    public List<Bill> getAllBills() {
        return service.getAllBills();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> getBillById(@PathVariable int id) {
        return ResponseEntity.ok(service.getBillById(id));
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<Bill> getBillByAppointment(@PathVariable int appointmentId) {
        Appointment appt = appointmentService.getAppointmentById(appointmentId);
        return ResponseEntity.ok(service.getBillByAppointment(appt));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bill> updateBill(
            @PathVariable int id,
            @RequestBody Bill bill
    ) {
        bill.setBillId(id);
        return ResponseEntity.ok(service.updateBill(bill.getBillId(), bill));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBill(@PathVariable int id) {
        service.deleteBill(id);
        return ResponseEntity.ok("Bill deleted successfully");
    }
}
