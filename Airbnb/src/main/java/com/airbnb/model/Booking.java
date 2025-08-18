package com.airbnb.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Booking {
  @Id @GeneratedValue
  private Long id;

  private Long userId;
  private Long propertyId;
  private LocalDate checkIn;
  private LocalDate checkOut;
  private Double totalAmount;
  
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public Long getUserId() {
		return userId;
	}
	
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	
	public Long getPropertyId() {
		return propertyId;
	}
	
	public void setPropertyId(Long propertyId) {
		this.propertyId = propertyId;
	}
	
	public LocalDate getCheckIn() {
		return checkIn;
	}
	
	public void setCheckIn(LocalDate checkIn) {
		this.checkIn = checkIn;
	}
	
	public LocalDate getCheckOut() {
		return checkOut;
	}
	
	public void setCheckOut(LocalDate checkOut) {
		this.checkOut = checkOut;
	}
	
	public Double getTotalAmount() {
		return totalAmount;
	}
	
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	
	public Property getProperty() {
		return property;
	}
	
	public void setProperty(Property property) {
		this.property = property;
	}

@ManyToOne
  @JoinColumn(name = "propertyId", insertable = false, updatable = false)
  private Property property;
}

