package com.wichita.clinic.entity;

import jakarta.persistence.Entity;

@Entity
public class Patient {

    private int patientId;
    private int age;
    private String gender;
    private String contactNo;
    private String email;

    public Patient() {
    }

    public Patient(int patientId, int age, String gender, String contactNo, String email) {
        this.patientId = patientId;
        this.age = age;
        this.gender = gender;
        this.contactNo = contactNo;
        this.email = email;
    }

    public int getPatientId() {
        return patientId;
    }

    public void setPatientId(int patientId) {
        this.patientId = patientId;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Patient{" +
                "patientId=" + patientId +
                ", age=" + age +
                ", gender='" + gender + '\'' +
                ", contactNo='" + contactNo + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
