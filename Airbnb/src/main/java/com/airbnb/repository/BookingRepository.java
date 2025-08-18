package com.airbnb.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.airbnb.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
  List<Booking> findByUserId(Long userId);

  @Query("SELECT b FROM Booking b WHERE b.propertyId = :propertyId AND " +
         "((b.checkIn <= :checkOut AND b.checkOut >= :checkIn))")
  List<Booking> findConflictingBookings(Long propertyId, LocalDate checkIn, LocalDate checkOut);
}

