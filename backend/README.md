# Onlearn API

Educational web platform backend API built with FastAPI.

## Features

- Course catalog management
- User enrollment system
- Progress tracking
- Role-based access (Student, Teacher, Admin)

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, access the interactive API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

- `GET /` - API welcome message
- `GET /courses` - List all courses (optional query: `?published_only=true/false`)
- `GET /courses/{id}` - Get course details
- `POST /enroll` - Create a new enrollment
- `GET /users/{id}/courses` - Get user's enrolled courses with progress
- `PATCH /enrollments/{id}/progress` - Update enrollment progress

## Data Models

- **User**: id, name, role (student|teacher|admin)
- **Course**: id, title, description, teacher_id, is_published
- **Enrollment**: id, user_id, course_id, progress_percent (0-100)

## Notes

- This is a prototype using in-memory data storage
- Data is seeded on server startup
- All data is lost when the server restarts

