package com.airbnb.service;

import com.airbnb.model.Property;
import com.airbnb.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class PropertyService {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @Autowired
    private PropertyRepository repository;
    
    public Property saveProperty(Property property, MultipartFile image) throws IOException {
        if (image != null && !image.isEmpty()) {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            File file = new File(UPLOAD_DIR + filename);
            image.transferTo(file);
            property.setImagePath("uploads/" + filename);
        }
        return repository.save(property);
    }

    public List<Property> getAllProperties() {
        return repository.findAll();
    }
    
    public Property getPropertyById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // ✅ DELETE by ID
    public void deletePropertyById(Long id) {
        repository.deleteById(id);
    }

    // ✅ UPDATE Property
    public Property updateProperty(Long id, Property updated) {
        return repository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setAddress(updated.getAddress());
            existing.setCity(updated.getCity());
            existing.setState(updated.getState());
            existing.setPrice(updated.getPrice());
            existing.setDescription(updated.getDescription());
            return repository.save(existing);
        }).orElse(null);
    }
    
    public List<Property> getPropertiesByCity(String city) {
        return repository.findByCityIgnoreCase(city);
    }
}
