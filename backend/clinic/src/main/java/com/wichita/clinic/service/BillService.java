package com.wichita.clinic.service;

import com.wichita.clinic.entity.Appointment;
import com.wichita.clinic.entity.Bill;

import java.util.List;

public interface BillService {
    Bill saveBill(Bill bill);
    Bill getBillById(int id);
    Bill getBillByAppointment(Appointment appointment);
    List<Bill> getAllBills();

    Bill updateBill(int id, Bill updated);

    void deleteBill(int id);
}
