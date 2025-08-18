package com.airbnb.repository;

import com.airbnb.model.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    // 🔍 Custom search query (Spring JPA will generate this automatically)
	List<Property> findByCityIgnoreCase(String city);
}
