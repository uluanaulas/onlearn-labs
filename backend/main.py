from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

app = FastAPI(
    title="Onlearn API",
    description="Educational web platform API",
    version="1.0.0"
)


# Enums
class UserRole(str, Enum):
    STUDENT = "student"
    TEACHER = "teacher"
    ADMIN = "admin"


# Pydantic Models
class User(BaseModel):
    id: int
    name: str
    role: UserRole


class Course(BaseModel):
    id: int
    title: str
    description: str
    teacher_id: int
    is_published: bool


class Enrollment(BaseModel):
    id: int
    user_id: int
    course_id: int
    progress_percent: int = Field(ge=0, le=100)


# Request/Response Models
class EnrollRequest(BaseModel):
    user_id: int
    course_id: int


class ProgressUpdateRequest(BaseModel):
    progress_percent: int = Field(ge=0, le=100)


class EnrollmentWithCourse(BaseModel):
    enrollment_id: int
    course: Course
    progress_percent: int


# In-memory data storage
users: List[User] = []
courses: List[Course] = []
enrollments: List[Enrollment] = []
next_user_id = 1
next_course_id = 1
next_enrollment_id = 1


# Seed initial data
def seed_data():
    global users, courses, enrollments, next_user_id, next_course_id, next_enrollment_id
    
    # Users
    users.extend([
        User(id=1, name="Alice Johnson", role=UserRole.STUDENT),
        User(id=2, name="Bob Smith", role=UserRole.STUDENT),
        User(id=3, name="Dr. Sarah Williams", role=UserRole.TEACHER),
        User(id=4, name="Prof. Michael Brown", role=UserRole.TEACHER),
        User(id=5, name="Admin User", role=UserRole.ADMIN),
    ])
    next_user_id = 6
    
    # Courses
    courses.extend([
        Course(id=1, title="Introduction to Python", description="Learn Python basics", teacher_id=3, is_published=True),
        Course(id=2, title="Advanced Web Development", description="Build modern web applications", teacher_id=3, is_published=True),
        Course(id=3, title="Data Structures and Algorithms", description="Master fundamental algorithms", teacher_id=4, is_published=True),
        Course(id=4, title="Machine Learning Basics", description="Introduction to ML concepts", teacher_id=4, is_published=False),
    ])
    next_course_id = 5
    
    # Enrollments
    enrollments.extend([
        Enrollment(id=1, user_id=1, course_id=1, progress_percent=45),
        Enrollment(id=2, user_id=1, course_id=2, progress_percent=20),
        Enrollment(id=3, user_id=2, course_id=1, progress_percent=80),
        Enrollment(id=4, user_id=2, course_id=3, progress_percent=100),
    ])
    next_enrollment_id = 5


# Initialize seed data on startup
@app.on_event("startup")
async def startup_event():
    seed_data()


# Endpoints
@app.get("/")
async def root():
    return "Onlearn API"


@app.get("/courses", response_model=List[Course])
async def list_courses(published_only: Optional[bool] = Query(None, alias="published_only")):
    """
    List all courses. Optionally filter by published status.
    """
    if published_only is None:
        return courses
    return [course for course in courses if course.is_published == published_only]


@app.get("/courses/{course_id}", response_model=Course)
async def get_course(course_id: int):
    """
    Get course details by ID.
    """
    course = next((c for c in courses if c.id == course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


@app.post("/enroll", response_model=Enrollment, status_code=201)
async def enroll_user(request: EnrollRequest):
    """
    Create a new enrollment if it doesn't already exist.
    """
    # Validate user exists
    user = next((u for u in users if u.id == request.user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Validate course exists
    course = next((c for c in courses if c.id == request.course_id), None)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if enrollment already exists
    existing = next(
        (e for e in enrollments if e.user_id == request.user_id and e.course_id == request.course_id),
        None
    )
    if existing:
        raise HTTPException(status_code=400, detail="Enrollment already exists")
    
    # Create new enrollment
    global next_enrollment_id
    enrollment = Enrollment(
        id=next_enrollment_id,
        user_id=request.user_id,
        course_id=request.course_id,
        progress_percent=0
    )
    enrollments.append(enrollment)
    next_enrollment_id += 1
    
    return enrollment


@app.get("/users/{user_id}/courses", response_model=List[EnrollmentWithCourse])
async def get_user_courses(user_id: int):
    """
    Get all courses enrolled by a user with their progress.
    """
    # Validate user exists
    user = next((u for u in users if u.id == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Find all enrollments for this user
    user_enrollments = [e for e in enrollments if e.user_id == user_id]
    
    # Build response with course details
    result = []
    for enrollment in user_enrollments:
        course = next((c for c in courses if c.id == enrollment.course_id), None)
        if course:
            result.append(EnrollmentWithCourse(
                enrollment_id=enrollment.id,
                course=course,
                progress_percent=enrollment.progress_percent
            ))
    
    return result


@app.patch("/enrollments/{enrollment_id}/progress", response_model=Enrollment)
async def update_progress(enrollment_id: int, request: ProgressUpdateRequest):
    """
    Update the progress percentage of an enrollment.
    """
    enrollment = next((e for e in enrollments if e.id == enrollment_id), None)
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    
    enrollment.progress_percent = request.progress_percent
    return enrollment

