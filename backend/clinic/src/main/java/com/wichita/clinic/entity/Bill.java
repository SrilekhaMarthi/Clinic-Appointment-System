package com.wichita.clinic.entity;

import com.wichita.clinic.utils.PaymentStatus;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int billId;

    @OneToOne
    @JoinColumn(name="appointment_id",nullable = false)
    private Appointment appointment;

    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    public Bill() {
    }

    public Bill(int billId, Appointment appointment, BigDecimal amount, PaymentStatus paymentStatus) {
        this.billId = billId;
        this.appointment = appointment;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
    }

    public int getBillId() {
        return billId;
    }

    public void setBillId(int billId) {
        this.billId = billId;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    @Override
    public String toString() {
        return "Bill{" +
                "billId=" + billId +
                ", appointment=" + appointment +
                ", amount=" + amount +
                ", paymentStatus=" + paymentStatus +
                '}';
    }
}
