Master branch is the fixed code |*|
Vulnerable version is the vulnerable code
 
 Glow Beauty Salon - Secure Web Application

**Student:** Dona Eliz  
**Module:** Secure Web Development  
**College:** National College of Ireland  
**Base Project:** [4auvar/VulnNodeApp](https://github.com/4auvar/VulnNodeApp)

Project Overview
Glow Beauty Salon is a secure web application built by forking an intentionally vulnerable Node.js application and implementing security fixes while adding beauty salon functionality. Customers can register, login, and book appointments. Admins can manage services and view all bookings.

User Roles
| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | admin@glowsalon.com | admin123 | Manage services, view all bookings |
| Customer | Register via app | Your password | Book/cancel appointments |

Features
- User registration and login
- Role-based access control (Admin and Customer)
- Customer: book, view and cancel appointments
- Admin: add, view and delete salon services
- Admin: view all appointments
- Secure password hashing with bcrypt
- SQL injection prevention with parameterized queries
- Input validation on all forms
- Security headers with Helmet.js
- Secure session management

Security Improvements
| # | Vulnerability | Fix Applied |
|---|--------------|-------------|
| 1 | SQL Injection in login | Parameterized queries |
| 2 | Plaintext password storage | bcrypt hashing (salt rounds: 10) |
| 3 | Insecure session config | HttpOnly, SameSite, strong secret |
| 4 | Missing security headers | Helmet.js middleware |
| 5 | No input validation | express-validator on all forms |

## 🗂️ Project Structure
