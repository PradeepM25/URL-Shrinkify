# URL Shrinkify - URL Shortener Project

## Overview
URL Shrinkify is a simple and efficient URL shortening service. It takes a long URL and converts it into a short, easy-to-share link. When the short link is accessed, it redirects the user to the original URL.

This project includes a frontend web interface and a backend API to create and resolve short URLs.

---

## Features

- Shortens long URLs to compact short links
- Redirects short URLs to original URLs
- Simple and clean user interface
- REST API for shortening URLs programmatically
- Data persistence with MongoDB
- Easy to deploy on cloud platforms (Heroku, Vercel, etc.)

---

## Technologies Used

- Frontend: EJS, CSS
- Backend: Node.js, Express.js
- Database: MongoDB (Atlas or local)
- Libraries: shortid (for generating short IDs), cors

---

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB instance (local or cloud like MongoDB Atlas)
- Git (optional, for cloning repository)

### Steps

1. Clone the repository  
```bash
git clone https://github.com/PradeepM25/URL-Shrinkify.git
cd URL-Shrinkify

## Folder Structure

C:.
├── models
│    └── shorturl.js           # URL schema and database model
├── node_modules              # Project dependencies
├── views
│    └── index.ejs            # Main frontend template
├── server.js                 # Main server entry point
├── package.json              # Project metadata and dependencies
├── package-lock.json         # Locked dependencies versions
├── .env                      # Environment variables (not included in repo)
├── .gitignore                # Files to ignore in git
└── readme.md                 # This file

