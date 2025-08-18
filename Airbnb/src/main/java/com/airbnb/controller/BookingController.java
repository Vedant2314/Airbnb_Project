package com.airbnb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.airbnb.model.Booking;
import com.airbnb.repository.BookingRepository;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepo;

    @PostMapping
    public ResponseEntity<?> bookProperty(@RequestBody Booking booking) {
        // Basic validation
        if (booking.getUserId() == null || booking.getPropertyId() == null ||
            booking.getCheckIn() == null || booking.getCheckOut() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Missing required booking details.");
        }

        // Prevent same-day or invalid range
        if (!booking.getCheckOut().isAfter(booking.getCheckIn())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Check-out must be after check-in.");
        }

        // Conflict check
        List<Booking> conflicts = bookingRepo.findConflictingBookings(
                booking.getPropertyId(),
                booking.getCheckIn(),
                booking.getCheckOut()
        );

        if (!conflicts.isEmpty()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Property already booked for these dates.");
        }

        bookingRepo.save(booking);
        return ResponseEntity.ok("Booking successful");
    }

    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingRepo.findByUserId(userId);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> cancelBooking(@PathVariable Long id) {
        if (!bookingRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Booking not found");
        }
        bookingRepo.deleteById(id);
        return ResponseEntity.ok("Booking cancelled successfully");
    }

}
