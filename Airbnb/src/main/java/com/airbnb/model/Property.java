package com.airbnb.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String address;
    private String city;
    private String state;
    private double price;
    private String description;
    private String imagePath;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PropertyImagePath> imagePaths = new ArrayList<>();

    public Property() {}

    public Property(String title, String address, String city, String state, double price, String description, String imagePath) {
        this.title = title;
        this.address = address;
        this.city = city;
        this.state = state;
        this.price = price;
        this.description = description;
        this.imagePath = imagePath;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public List<PropertyImagePath> getImagePaths() {
		return imagePaths;
	}

	public void setImagePaths(List<PropertyImagePath> imagePaths) {
		this.imagePaths = imagePaths;
	}

    // Getters & setters
    
}
