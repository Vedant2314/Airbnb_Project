package com.airbnb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.airbnb.model.Booking;
import com.airbnb.repository.BookingRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
