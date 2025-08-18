package com.airbnb.repository;

import com.airbnb.model.PropertyImagePath;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyImagePathRepository extends JpaRepository<PropertyImagePath, Long> {
    void deleteByPropertyId(Long propertyId);
}
