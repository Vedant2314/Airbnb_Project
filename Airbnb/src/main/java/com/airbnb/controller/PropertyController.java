// /backend/src/main/java/com/airbnb/controller/PropertyController.java

package com.airbnb.controller;

import com.airbnb.model.Property;
import com.airbnb.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService service;

    @PostMapping("/upload")
    public Property uploadProperty(
            @RequestParam String title,
            @RequestParam String address,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam double price,
            @RequestParam String description,
            @RequestParam("image") MultipartFile image
    ) throws IOException {
        Property property = new Property(title, address, city, state, price, description, null);
        return service.saveProperty(property, image);
    }

    // ✅ Main GET method (handles both all and filtered by city)
    @GetMapping
    public List<Property> getProperties(@RequestParam(required = false) String city) {
        if (city != null && !city.trim().isEmpty()) {
            return service.getPropertiesByCity(city.trim());
        }
        return service.getAllProperties();
    }

    @GetMapping("/{id}")
    public Property getById(@PathVariable Long id) {
        return service.getPropertyById(id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        service.deletePropertyById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property updatedProperty) {
        return service.updateProperty(id, updatedProperty);
    }
}
