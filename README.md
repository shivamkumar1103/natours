# Natours

> An awesome tour booking web application built with Node.js, Express, MongoDB, and Pug.

**Live Application:** [https://natours-fn4m.onrender.com](https://natours-fn4m.onrender.com)

## Description

Natours is a comprehensive backend application for booking nature tours. It features a complete RESTful API, server-side rendered templates using Pug, authentication, authorization, payments with Stripe, and much more.

## Features

- **Tours, Users, Reviews, and Bookings:** Full CRUD operations and complex aggregation pipelines.
- **Authentication & Authorization:**
  - JWT-based authentication.
  - Role-based access control (user, guide, lead-guide, admin).
  - Password reset via email.
- **Security:**
  - Encryption using bcrypt.
  - Rate limiting, data sanitization (NoSQL injection, XSS protection).
  - Security HTTP headers (Helmet), Parameter pollution prevention (HPP).
- **Payments:** Integration with Stripe for secure tour booking checkout.
- **Map:** Leaflet integration to display tour locations.
- **Email:** Nodemailer and Brevo integration for sending transactional emails (welcome, password reset).
- **Server-Side Rendering:** Dynamic HTML templates using Pug.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend/Views:** Pug, Vanilla JavaScript, CSS
- **Bundler:** Parcel
- **Deployment:** Render (Hosting), MongoDB Atlas (Cloud Database)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd natours
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `config.env` file in the root directory.
   - You can copy the contents from `example.env` into `config.env`.
   - Fill in the required credentials (MongoDB URI, JWT secret, Email credentials, Stripe secret key).

4. (Optional) Populate the database with sample data:
   ```bash
   node dev-data/data/import-dev-data.js --import
   ```

### Running the Application

To run in development mode:

```bash
npm start
# or using nodemon
npm run start:prod
```

To build and watch frontend assets (Parcel):

```bash
npm run watch:js
```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Environment Variables

Check [example.env](./example.env) for the required environment variables format.
