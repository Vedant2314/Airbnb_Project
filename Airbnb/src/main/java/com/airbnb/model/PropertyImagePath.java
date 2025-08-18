package com.airbnb.model;

import jakarta.persistence.*;

@Entity
public class PropertyImagePath {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String path;

    @ManyToOne
    @JoinColumn(name = "property_id", nullable = false)
    private Property property;

    public PropertyImagePath() {}

    public PropertyImagePath(String path, Property property) {
        this.path = path;
        this.property = property;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Property getProperty() {
        return property;
    }

    public void setProperty(Property property) {
        this.property = property;
    }
}
