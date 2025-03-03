# Retail Store by Nodejs and Reactjs

## Overview

ASP.NetCore_RetailStore is a web application designed as a **Point of Sale (POS)** system for a retail store specializing in **mobile phones and accessories**. The system provides essential functionalities such as sales transactions, product management, employee management, customer tracking, and reporting.

This project was developed as part of the **Web Programming with Node.js** final project for **Semester 1/2023-2024**.

## Technologies Used
### **Backend**
- **Node.js & Express.js**: Provides the server-side logic and API endpoints.
- **MongoDB & Mongoose**: NoSQL database for storing products, customers, and transaction data.
- **JWT Authentication**: Secure login and user authentication.
- **Nodemailer**: Sends automated emails for account notifications.

### **Frontend**
- **React.js**: Builds the interactive user interface.
- **React Router**: Manages client-side routing for navigation.
- **Redux (if used)**: Manages state efficiently across the application.
- **Material-UI / Tailwind CSS**: Enhances UI design and responsiveness.

### **Additional Tools & Services**
- **Dotenv**: Manages environment variables.
- **Cors**: Enables secure API access across different origins.
- **Bcrypt.js**: Hashes passwords for secure storage.
- **Cloudinary / Firebase Storage (if applicable)**: Stores and retrieves images.
  
## Features

### **Account Management**
- Pre-configured admin account (`admin/admin`).
- Sales staff accounts are created by the admin.
- Automatic email notification for new accounts.
- Temporary login links expire in **1 minute**.
- First-time login requires a password reset.
- Login using username (email prefix).
- Profile management (avatar, name, password change).

### **User Management (Admin Only)**
- View the staff list.
- View detailed employee profiles.
- Resend login email.
- Lock/unlock employee accounts.

### **Product Management**
- Admin can **view, add, update, and delete** products.
- Employees can only view product lists (without wholesale price).
- Products cannot be deleted if linked to a purchase.

### **Customer Management**
- Customer accounts are created automatically on first purchase.
- View customer details (name, phone, address).
- Track purchase history and order details.

### **Transaction Processing**
- Add products via **search** or **barcode scanning**.
- View and edit cart in real-time.
- Automatic order summary updates (total price, change calculation).
- Process transactions and generate invoices (PDF).

### **Reporting and Analytics**
- View sales reports by predefined periods (today, last 7 days, this month, custom date range).
- Display key metrics: total sales, number of orders, products sold.
- Admin can see **profit calculations**.


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KTPx4/Nodejs_Reactjs_RetailStore.git
   cd Nodejs_Reactjs_RetailStore
   ```

2. Install dependencies for backend and frontend:
   ```bash
   cd Server
   npm install
   cd ../Client
   npm install
   ```

3. Set up the database connection in the `.env` file.

4. Start the backend server:
   ```bash
   cd Server
   npm start
   ```   
5. Start the frontend application:
   ```bash
   cd frontend
   npm Client
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```
 
## Deployment
- Deployable on render.com: [Here](https://finalnodejs-80u8.onrender.com)

 
