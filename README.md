# Quizzer Frontend

## Description

Quizzer Frontend is the user interface of the Quizzer web application, designed to support both teachers and students in the learning process through interactive quizzes. The frontend communicates with the Quizzer backend REST API and provides a responsive and user-friendly experience for managing and completing quizzes.

The application is developed as part of a Scrum-based software project where the team collaborates in iterative sprints to deliver features aligned with the Product Owner’s vision.

The frontend provides two main dashboards:

- **Teacher Dashboard** – allows teachers to create, edit, manage, and publish quizzes.
- **Student Dashboard** – allows students to access quizzes, answer questions, and review their results with immediate feedback.

---

# Features

## Teacher Features
- Create and manage quizzes
- Add quiz details such as:
  - Quiz name
  - Description
  - Course code
  - Publication status
- Add multiple-choice questions
- Define difficulty levels:
  - EASY
  - NORMAL
  - HARD
- Manage answer options
- Organize quizzes by categories
- View and manage published quizzes

## Student Features
- Browse published quizzes
- Browse quizzes by category
- Complete quizzes interactively
- Receive immediate answer feedback
- View quiz results and statistics
- Track overall performance and correct answer percentages

---

# Members

- Oanh Pham
- Tri Pham
- Sadikshya Parajuli
- Nghi Vo
- Quy Tran

---

# GitHub Links

<ul>
<li><a href="https://github.com/lunapham10">Oanh Pham </a> </li>
<li><a href= "https://github.com/qynwphuu"> Quy Tran </a> </li>
<li> <a href= "https://github.com/tripham-fi"> Tri Pham </a> </li>
<li> <a href= "https://github.com/HaniNghi"> Nghi Vo </a> </li>
<li><a href= "https://github.com/sadikshyeah"> Sadikshya Parajuli</a></li>
</ul>

---

# Backlog

<li><a href="https://github.com/orgs/The-Five-Stack/projects/2">Backlog for Quizzer</a></li>
---

# Developer Guide

## Frontend

### System Requirements

To run this application locally, make sure you have the following installed:

- Node.js (recommended version 18 or newer)
- npm or yarn
- Git

---

# How to Start the Frontend Application

## 1. Clone the Repository

```bash
git clone https://github.com/The-Five-Stack/quizzer-ui.git
cd quizzer-ui
```

---

## 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory and configure the backend API URL if needed.

Example:

```env
VITE_API_URL=https://quizzer-git-quizzer-project.2.rahtiapp.fi
```

---

## 4. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using yarn:

```bash
yarn dev
```

---

## 5. Access the Application

Once the development server starts, open your browser and visit:

```text
http://localhost:5173
```

---

# URLs of the Application

## Frontend Deployment

### Teacher Dashboard
https://quizzer-ui.onrender.com

### Student Dashboard
https://quizzer-ui.onrender.com/student

## Backend API
https://teacher:teacher123@quizzer-git-quizzer-project.2.rahtiapp.fi/

## Swagger REST API Documentation
https://quizzer-git-quizzer-project.2.rahtiapp.fi/swagger-ui/index.html#/

---

# Available Scripts

## Run Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Run Linter

```bash
npm run lint
```

---

# API Integration

The frontend consumes REST APIs from the Quizzer backend application for:

- Quiz management
- Question management
- Answer submission
- Result tracking
- Reviews and ratings

---


# Retrospectives

- Sprint 1  
  https://edu.flinga.fi/s/EKJFXSK

- Sprint 2  
  https://edu.flinga.fi/s/EVGX2MH

---
