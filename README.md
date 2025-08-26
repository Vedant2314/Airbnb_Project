
# Airbnb_Project

Ensure **Java 17** (or your project's Java version) and **Maven** are installed.
A Java web application – **Spring Boot (JPA)** – using **Maven**.
 frameworks: JPA/Hibernate, Spring Boot, Spring Data JPA, Spring MVC
**Database:** MySQL (jdbc\:mysql://localhost:3306/airbnb_app)

## 🧰 Tech Stack

* Language: Java
* Build: Maven
* Frameworks/Libraries: JPA/Hibernate, Spring Boot, Spring Data JPA, Spring MVC
* View Layer: JSP/HTML
* Packaging: JAR/WAR (depends on build)

## 🚀 How to Run

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


<img width="940" height="427" alt="image" src="https://github.com/user-attachments/assets/0f024d04-544c-4525-8ff3-c9b3f84d3262" />



