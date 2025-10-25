# Flight Booking System

A full-stack Flight Booking Platform built with React.js (frontend) and Django REST Framework (backend).
It allows users to register, view available flights, and book flights. Admin can approve users, add flights.

## Features

User Registration & Login (with admin approval)

Admin Dashboard to approve users and add flights

Flight List Page for approved users

Booking Flights with email notifications (after booking and admin approval)

Responsive design using Bootstrap

## API Endpoints

User
|Method|    |EndPoint|                |Description|
|------|----|--------|----------------|-----------|
|POST  |    |/api/users/register/|    |Register new user|
|POST  |    |/api/users/login/|       |Login user (returns access token)|

Admin
|Method|    |EndPoint|                |Description|
|------|----|--------|----------------|-----------|
|GET  |    |/api/admin/users/|    |Fetch all users|
|POST  |    |/api/admin/users/{id}/approve/|       |Approve pending user|

Flights
|Method|    |EndPoint|                |Description|
|------|----|--------|----------------|-----------|
|GET  |    |/api/flights/|    |Fetch all flights|
|POST  |    |/api/flights/|       |Add new flight(admin only)|

Booking
|Method|    |EndPoint|                |Description|
|------|----|--------|----------------|-----------|
|POST |    |/api/bookings/|    |Book a flight(user only)|






## Screenshots

## 1. Home page
![image alt](https://github.com/Nikhila-27/Flight-Booking-Management/blob/a2d8899250fb9ef828f43bb9a7f11e919c776361/client/FlightProject/Screenshot%202025-10-25%20112729.png)

## 2. Register
![image alt](https://github.com/Nikhila-27/Flight-Booking-Management/blob/6b439593dd86800698e5b1f60605a2e9b2c5cc13/client/FlightProject/Screenshot%202025-10-25%20111928.png)

## 3. Login
![image alt](https://github.com/Nikhila-27/Flight-Booking-Management/blob/0ba8e050240687f51381bfd5bbc85f8e7eb495ea/client/FlightProject/Screenshot%202025-10-25%20111954.png)

## 4. Admin Dashboard
![image](https://github.com/Nikhila-27/Air-Booking/blob/1ca0b345f290a47efe2ea6f3b90741be6e980710/Screenshot%202025-10-25%20112339.png)

![image alt](https://github.com/Nikhila-27/Air-Booking/blob/bdc41f2f64248619d15e15236d5f0803b5930993/Screenshot%202025-10-25%20112408.png)

## 5. FlightList
![image alt](https://github.com/Nikhila-27/Air-Booking/blob/8b1d494b0103d779674ec5da74139c788addf980/Screenshot%202025-10-25%20112540.png)

## 6. Booking confirmation
![image alt](https://github.com/Nikhila-27/Air-Booking/blob/fc7349f3bbd439909508c5f667cc7dc29e2c712f/Screenshot%202025-10-25%20112619.png)

## 7. Email
![image alt](https://github.com/Nikhila-27/Air-Booking/blob/f6f082ba360b25b8b3c1dec5be9ded2ee1ee8f31/Screenshot%202025-10-25%20123923.png)
