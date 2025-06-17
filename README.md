# Rashtriya Kishan Manch Project Documentation

## 1. Introduction

### Project Overview
The Rashtriya Kishan Manch is a full-stack MERN application built to serve as the digital platform for the organization. It provides a public-facing website to disseminate information, showcase activities, and engage with the community, alongside a comprehensive admin panel for content management and administrative tasks.

### Purpose and Goals
- To establish a strong online presence for the Rashtriya Kishan Manch.
- To provide a centralized platform for sharing information about the organization's vision, programs, projects, and team.
- To facilitate member registration and engagement through an online application process.
- To offer a secure and intuitive admin dashboard for managing all website content.
- To ensure a responsive and user-friendly experience across all devices.

### Key Features
- **Content Management:** Full CRUD (Create, Read, Update, Delete) capabilities for various content types including Media, Programs, Projects, Team Members, and more.
- **Member Registration:** A public-facing form for users to apply for membership, including document uploads and OTP verification.
- **Media & Gallery:** Sections to showcase media coverage, program photos, and project galleries.
- **File Uploads:** Integration with Cloudinary for robust cloud-based storage of images and documents.
- **User Authentication:** Secure, role-based access control using JWT (JSON Web Tokens) for the admin panel.
- **Admin Panel:** A dedicated interface for administrators to manage all aspects of the application's content.
- **Dynamic Content:** Informational sections like "Andolan" (Movements) and "Vision" are dynamically managed from the backend.

## 2. Project Setup

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js:** (LTS version recommended)
- **npm** (Node Package Manager) or **yarn**
- **MongoDB:** A running instance of MongoDB (local or cloud-hosted like MongoDB Atlas).
- **Cloudinary Account:** For handling media uploads.

### Repository Structure
The project is a monorepo organized into two main directories:
- `frontend/`: Contains the React-based frontend application (built with Vite).
- `server/`: Contains the Node.js/Express.js backend API.

### Backend Installation
1.  Navigate to the `server` directory: `cd server`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the `server` directory. You will need to add the following variables:
    ```
    NODE_ENV=development
    PORT=5001
    MONGO_URI=<Your_MongoDB_Connection_String>
    JWT_SECRET=<Your_JWT_Secret>
    CLOUDINARY_CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
    CLOUDINARY_API_KEY=<Your_Cloudinary_API_Key>
    CLOUDINARY_API_SECRET=<Your_Cloudinary_API_Secret>
    ```
4.  Start the development server: `npm run dev`

### Frontend Installation
1.  Navigate to the `frontend` directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file in the `frontend` directory and add the backend API URL:
    ```
    VITE_API_URL=http://localhost:5001
    ```
4.  Start the development server: `npm start` (which runs `vite`)

## 3. Backend Architecture

### Overview
The backend is a RESTful API built with Node.js and Express.js, using MongoDB for the database. It follows a standard feature-based structure with routes, controllers, models, and middleware.

-   **Technology Stack:**
    -   **Node.js:** JavaScript runtime.
    -   **Express.js:** Web application framework.
    -   **MongoDB:** NoSQL database.
    -   **Mongoose:** ODM library for MongoDB.
    -   **JWT (jsonwebtoken & bcryptjs):** For authentication and password hashing.
    -   **Cloudinary & Multer:** For handling `multipart/form-data` and cloud-based file uploads.
    -   **dotenv:** For managing environment variables.
    -   **cors:** For enabling Cross-Origin Resource Sharing.

-   **Directory Structure (`server/`):**
    -   `config/`: Database connection configuration.
    -   `controllers/`: Contains the business logic for each route.
    -   `middleware/`: Custom middleware for authentication (`authMiddleware`) and file uploads (`uploadMiddleware`).
    -   `models/`: Mongoose schema definitions for all database collections.
    -   `routes/`: API route definitions.
    -   `server.js`: The main application entry point.

### API Endpoints
The API is prefixed with `/api`. Admin-only routes are protected and require a valid JWT from a user with an 'admin' role.

-   **Auth (`/api/auth`)**
    -   `POST /login`: Authenticates an admin user and returns a JWT.
    -   `POST /register`: (Admin Only) Registers a new user (admin/editor).
    -   `GET /profile`: (Protected) Retrieves the logged-in user's profile.

-   **OTP (`/api/otp`)**
    -   `POST /send`: Sends an OTP for verification (used in member registration).
    -   `POST /verify`: Verifies a submitted OTP.

-   **Members (`/api/members`)**
    -   `POST /`: (Public) Submits a new member application with document upload.
    -   `GET /`: (Admin Only) Get all member applications.
    -   `GET /:id`: (Admin Only) Get a single member application.
    -   `PUT /:id`: (Admin Only) Update a member application.
    -   `DELETE /:id`: (Admin Only) Delete a member application.

-   **Media (`/api/media`)**
    -   `GET /`: (Public) Get all media items.
    -   `GET /:id`: (Public) Get a single media item.
    -   `PUT /:id/view`: (Public) Increments the view count for a media item.
    -   `POST /`: (Admin Only) Create a new media item with file uploads.
    -   `PUT /:id`: (Admin Only) Update a media item.
    -   `DELETE /:id`: (Admin Only) Delete a media item.

-   **Programs (`/api/programs`)**
    -   `GET /`: (Public) Get all programs.
    -   `GET /:id`: (Public) Get a single program.
    -   `POST /`: (Admin Only) Create a new program with uploads.
    -   `PUT /:id`: (Admin Only) Update a program.
    -   `DELETE /:id`: (Admin Only) Delete a program.

-   **Projects (`/api/projects`)**
    -   `GET /`: (Public) Get all projects.
    -   `GET /:id`: (Public) Get a single project.
    -   `POST /`: (Admin Only) Create a new project with uploads.
    -   `PUT /:id`: (Admin Only) Update a project.
    -   `DELETE /:id`: (Admin Only) Delete a project.

-   **Team (`/api/team`)**
    -   `GET /`: (Public) Get all team members.
    -   `GET /:id`: (Public) Get a single team member.
    -   `POST /`: (Admin Only) Create a new team member with photo upload.
    -   `PUT /:id`: (Admin Only) Update a team member.
    -   `DELETE /:id`: (Admin Only) Delete a team member.

-   **Andolan (Movements) (`/api/andolan`)**
    -   `GET /`: (Public) Get all Andolan events.
    -   `POST /`: (Admin Only) Create a new Andolan event.
    -   `PUT /:id`: (Admin Only) Update an Andolan event.
    -   `DELETE /:id`: (Admin Only) Delete an Andolan event.

-   **Information (`/api/information`)**
    -   `GET /`: (Public) Get all information items.
    -   `POST /`: (Admin Only) Create a new information item.
    -   `PUT /:id`: (Admin Only) Update an information item.
    -   `DELETE /:id`: (Admin Only) Delete an information item.

-   **Vision (`/api/vision`)**
    -   `GET /`: (Public) Get the organization's vision statement.
    -   `POST /`: (Admin Only) Create or update the vision statement.

### Database Models
Mongoose schemas define the structure for each collection in MongoDB. Key models include:
-   `User`: Stores admin user credentials and roles.
-   `Member`: Stores member application data.
-   `Media`: Stores links and metadata for news articles, videos, etc.
-   `Program`: Stores details about organizational programs and events.
-   `Project`: Stores details about organizational projects.
-   `Team`: Stores profiles of team members.
-   `Andolan`, `Information`, `Vision`: Store content for the respective informational pages.
-   `OTP`: Temporarily stores OTPs for phone verification.

## 4. Frontend Architecture

### Overview
The frontend is a modern Single-Page Application (SPA) built with React and Vite, styled with Tailwind CSS. It provides a fast, responsive interface for public users and administrators.

-   **Technology Stack:**
    -   **React:** UI library for building components.
    -   **Vite:** Fast frontend build tool and development server.
    -   **React Router DOM:** For client-side routing.
    -   **Redux Toolkit:** For global state management.
    -   **Axios:** For making HTTP requests to the backend API.
    -   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
    -   **Framer Motion:** For animations.
    -   **Lucide React:** For icons.
    -   **Recharts:** For data visualization in the admin dashboard.

-   **Directory Structure (`frontend/src/`):**
    -   `components/`: Reusable UI components (e.g., Header, Footer, Cards).
    -   `pages/`: Top-level components representing application pages (e.g., HomePage, AboutPage, AdminDashboard).
    -   `redux/` or `store/`: Contains Redux Toolkit slices and store configuration.
    -   `hooks/`: Custom React hooks.
    -   `utils/`: Utility functions.
    -   `App.jsx`: Main application component where routing is defined.
    -   `main.jsx`: The entry point for the React application.

### Routing
Client-side routing is managed by `react-router-dom`. Routes are defined in `App.jsx`, separating public-facing pages from protected admin routes. A `ProtectedRoute` component likely guards admin pages, redirecting unauthenticated users to the login page.

### State Management
-   **Redux Toolkit:** Used for managing global application state, such as user authentication status, and caching fetched data from the API to reduce redundant network requests.
-   **React Hooks:** `useState`, `useEffect`, and `useContext` are used for managing local component state (e.g., form inputs, loading indicators).

### Styling
-   **Tailwind CSS:** The primary styling solution. Utility classes are used directly in the JSX for most styling.
-   **`index.css`:** Contains base styles, Tailwind directives, and any global custom styles.
