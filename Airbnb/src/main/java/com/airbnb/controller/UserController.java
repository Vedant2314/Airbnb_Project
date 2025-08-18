package com.airbnb.controller;

import com.airbnb.model.User;
import com.airbnb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User registerUser(@RequestBody User user) {
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        return userService.login(user.getEmail(), user.getPassword());
    }

    // ✅ Get all users
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // ✅ Update user
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userService.updateUser(id, updatedUser);
    }

    // ✅ Delete user
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return "User deleted successfully";
    }
}
