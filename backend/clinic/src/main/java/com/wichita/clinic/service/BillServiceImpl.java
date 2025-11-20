package com.wichita.clinic.service;

import com.wichita.clinic.entity.Appointment;
import com.wichita.clinic.entity.Bill;
import com.wichita.clinic.repository.BillRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillServiceImpl implements BillService {

    private final BillRepository repo;

    public BillServiceImpl(BillRepository repo) {
        this.repo = repo;
    }

    @Override
    public Bill saveBill(Bill bill) {
        return repo.save(bill);
    }

    @Override
    public Bill getBillById(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    @Override
    public Bill getBillByAppointment(Appointment appointment) {
        return null;
    }

    @Override
    public List<Bill> getAllBills() {
        return repo.findAll();
    }

    @Override
    public Bill updateBill(int id, Bill updated) {
        Bill existing = getBillById(id);
        existing.setAmount(updated.getAmount());
        existing.setPaymentStatus(updated.getPaymentStatus());
        existing.setAppointment(updated.getAppointment());
        return repo.save(existing);
    }

    @Override
    public void deleteBill(int id) {
        repo.deleteById(id);
    }
}
