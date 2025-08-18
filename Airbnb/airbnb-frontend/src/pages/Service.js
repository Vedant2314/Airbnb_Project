import React from 'react';
import './Service.css';
//import { Link, Links } from 'react-router-dom';

// src/Services.js

 const services = [
  { title: "Photography", status: "Coming soon", image:"https://plus.unsplash.com/premium_photo-1667538960104-25726d82a6e5?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8NGslMjBjYW1lcmF8ZW58MHx8MHx8fDA%3D" },
  { title: "Chefs", status: "Coming soon", image: "https://media.istockphoto.com/id/1436956975/photo/chef-pouring-special-sauce-on-pork-ribs-in-the-kitchen.jpg?s=612x612&w=0&k=20&c=_epAf-Hm8uA_mZ3Kfeq_ki5_g4AlrJBEYEpYjk1aSe4=" },
  { title: "Prepared meals", status: "Coming soon", image: "https://c1.wallpaperflare.com/preview/1000/747/802/food-drink-food.jpg" },
  { title: "Massage", status: "Coming soon", image: "https://media.gettyimages.com/id/511048384/video/stone-massage.jpg?s=640x640&k=20&c=o1SxDNKXnt6xnIaFyKl3p5-HPLJMg4ESMS0zL2zF5tI=" },
  { title: "Training", status: "Coming soon", image: "https://img.freepik.com/free-photo/top-view-perfectly-ordered-fitness-items_23-2150321809.jpg" },
  { title: "Make-up", status: "Coming soon", image: "https://t4.ftcdn.net/jpg/02/73/55/33/360_F_273553300_sBBxIPpLSn5iC5vC8FwzFh6BJDKvUeaC.jpg" },
  { title: "Hair", status: "Coming soon", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQJcCepTFz1srk0kmxwXdM8fDYZFzzh7zuA&s" },
  { title: "Spa treatments", status: "Coming soon", image: "https://t4.ftcdn.net/jpg/01/87/29/35/360_F_187293579_mPGjfd0YI3lAICz473ORPEPJ3rpFcPIE.jpg" },
];

const Services = () => {
  return (
    <section className="services-section">
      <h2>Services in Mumbai</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.status}</p>
          </div>
        ))}
      </div>
    </section>
    
  );
  
};

export default Services;