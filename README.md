
# Airbnb_Project

## ✨ About

This project is a full-stack Airbnb Clone built to simulate the core features of the Airbnb platform. It provides users with the ability to explore properties, make bookings, and manage stays while also offering hosts and admins the tools to manage listings and user activities.

## 🔹 Features
* User Authentication – Secure signup/login functionality
* Property Listings – Browse, search, and view property details with images and pricing
* Booking System – Select dates, confirm reservations, and view past/current bookings
* Host Dashboard – List properties, manage listings, and track bookings
* Admin Panel – Manage users, bookings, and properties
* Responsive Frontend – Clean and user-friendly interface built for web use

## 🔹 Tech Stack
* Frontend: React + Tailwind CSS
* Backend: Spring Boot (Java)
* Database: MySQL
* Version Control: Git & GitHub

## 🚀 How to Run

Ensure **Java 17** (or your project's Java version) and **Maven** are installed.
A Java web application – **Spring Boot (JPA)** – using **Maven**.
 frameworks: JPA/Hibernate, Spring Boot, Spring Data JPA, Spring MVC
**Database:** MySQL (jdbc\:mysql://localhost:3306/airbnb_app)

1. **Create Database**

   ```sql
   CREATE DATABASE airbnb_app;
   USE airbnb_app;
   ```

   Update credentials in `src/main/resources/application.properties` if needed.

2. **Run the Backend (Maven Project from IDE)**

   * Open the project in your Java IDE (IntelliJ, Eclipse, or STS).
   * Run it as a Spring Boot Application 

  
3. **Run the Frontend (React App)**

   * Open the `airbnb-frontend` folder in VS Code or any other IDE, or use CMD:

     ```bash
     cd airbnb-frontend
     npm install
     npm start
     ```
   * The frontend will run at **[http://localhost:3000](http://localhost:3000)** and backend at **[http://localhost:8081](http://localhost:8081)** (default).

### 🔑 Default Login Credentials
** For admin use this password **
* **Admin Password:** `admin123`

NOTE:- This is a demo project. To use it fully, please add hotel/property details using the Host section of the frontend. 
       Only then will the listings appear, as no initial hotel data is preloaded in the database.


## Home Page: 
Displays the main landing page of the Airbnb clone with navigation options, featured listings, and search functionality for properties.
<img width="940" height="427" alt="image" src="https://github.com/user-attachments/assets/64568d77-a2f3-4607-a149-017f056e0c39" />

 
## Signup Page:
Allows new users to create an account by entering their personal details like name, email, and password.
<img width="940" height="428" alt="image" src="https://github.com/user-attachments/assets/c8c56bb7-a0b6-4cb2-a294-5f0994a6f70b" />

 
## Login Page:
Provides fields for existing users to log in using their email and password credentials.
<img width="940" height="431" alt="image" src="https://github.com/user-attachments/assets/916a1a20-5282-4aef-8fb9-59ec1159148a" />

 
## Home Page:
Shows a personalized homepage with property recommendations, navigation links, and quick access to booking options.
<img width="940" height="429" alt="image" src="https://github.com/user-attachments/assets/04035918-c2fe-4ebf-9f5d-0f31e1b4f75d" />

 
## Property Information Page:
Displays detailed information about a specific property including images, description, price, location, and availability.
<img width="940" height="426" alt="image" src="https://github.com/user-attachments/assets/f7ae41a9-629e-4fa9-be8a-fc9e17b0982e" />

 
## Booking Page:
Allows users to select dates, number of guests, and confirm their booking for a chosen property.
<img width="940" height="336" alt="image" src="https://github.com/user-attachments/assets/63c2aec5-c578-4576-9c67-020af41ef589" />

 
## Stays Page:
Shows all available stay options categorized by location, price range, and property type.
<img width="937" height="470" alt="image" src="https://github.com/user-attachments/assets/cf726544-9ec5-4400-87ba-4c77eae33a13" />

 
## Host Page:
Provides functionality for property owners to list their properties with details like photos, description, and pricing.
<img width="940" height="429" alt="image" src="https://github.com/user-attachments/assets/65b2f64d-3afa-4726-a669-60021c80ad28" />

 
## Services Page:
Lists additional services (like cleaning, food, or extra amenities) available for users during their stay.
<img width="940" height="424" alt="image" src="https://github.com/user-attachments/assets/30c21ca3-2cf2-482c-8536-07ae880dfcf8" />

 
## Dashboard:
A user’s dashboard showing an overview of profile, bookings, listings and other options.
<img width="445" height="254" alt="image" src="https://github.com/user-attachments/assets/89d4efbe-8a40-4616-b5b2-1f7bea48c55d" />
<img width="489" height="495" alt="image" src="https://github.com/user-attachments/assets/1beebc4c-097f-4376-a042-0ae66d3cb3df" />


  
## Profile Page:
Displays the user’s personal information such as name, email, and preferences.
<img width="940" height="426" alt="image" src="https://github.com/user-attachments/assets/acbcddd2-472e-44fe-b66f-f500f424ea8e" />

 
## Bookings Page:
Lists all current and past bookings made by the user with status updates.
<img width="940" height="425" alt="image" src="https://github.com/user-attachments/assets/608cf300-d854-49b3-b9d0-6ae69199c507" />


## Listings Page:
Shows the properties listed by a host with options to edit or remove them.
<img width="940" height="427" alt="image" src="https://github.com/user-attachments/assets/9b62ddb7-4af7-4d38-a1d1-08eedbd1d2bf" />

 
## Logout Option:
Provides a secure way for users to log out of their account and will redirect you back to the login page.
<img width="489" height="496" alt="image" src="https://github.com/user-attachments/assets/5d0a9410-da08-47e4-abe7-39599db96417" />

 
## Admin Login Page:
A separate login page for administrators to access the admin panel.
<img width="940" height="429" alt="image" src="https://github.com/user-attachments/assets/76eadbba-24ad-41a1-913c-b45ec17d625e" />


 
## Admin Panel:
The main admin dashboard that provides access to property management, booking control, and user management.
<img width="940" height="424" alt="image" src="https://github.com/user-attachments/assets/bec1acb1-ebf8-43d9-9498-f1fe058d4561" />

 
## Manage Properties Option:
Allows the admin to view, edit, or remove property listings.
<img width="940" height="427" alt="image" src="https://github.com/user-attachments/assets/09905aec-88a1-43af-8465-8df48a6a3f70" />

 
## Manage Bookings Option:
Enables the admin to monitor, confirm, or cancel user bookings.
<img width="940" height="425" alt="image" src="https://github.com/user-attachments/assets/6fc998e0-823b-4128-9d01-01d08f206da1" />

 
## Manage Users Option:
Provides the admin with the ability to manage registered users, including blocking or editing user details.
<img width="940" height="423" alt="image" src="https://github.com/user-attachments/assets/e9bee69e-f08c-41a0-8fae-8e4cdfafca73" />

 









