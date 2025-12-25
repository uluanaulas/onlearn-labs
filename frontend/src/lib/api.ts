// Простой API клиент с cookie-based сессиями
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Course {
  id: number;
  title: string;
  description: string;
  teacher_id: number;
  is_published: boolean;
  image?: string | null;
  rating?: number | null;
  review_count?: number | null;
  price?: string | null;
  level?: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
}

export interface LoginResponse {
  success: boolean;
  user: User;
  message: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  progress_percent: number;
}

export interface EnrollmentWithCourse {
  enrollment_id: number;
  course: Course;
  progress_percent: number;
}

export interface Comment {
  id: number;
  user_id: number;
  course_id: number;
  text: string;
  created_at: string;
  user_name?: string | null;
}

// Простая функция для всех запросов
async function fetchAPI(url: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    credentials: 'include', // Важно для cookies!
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      // Для 401 не делаем автоматический logout - пусть компоненты решают
      throw new Error('Please login first');
    }
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(errorText || `Request failed: ${response.statusText}`);
  }
  
  return response.json();
}

// Вход
export async function login(email: string, password: string): Promise<LoginResponse> {
  return fetchAPI('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// Выход
export async function logout(): Promise<void> {
  await fetchAPI('/logout', { method: 'POST' });
}

// Текущий пользователь
export async function getCurrentUser(): Promise<User> {
  return fetchAPI('/me');
}

// Все курсы
export async function getCourses(publishedOnly?: boolean): Promise<Course[]> {
  const url = publishedOnly !== undefined 
    ? `/courses?published_only=${publishedOnly}` 
    : '/courses';
  return fetchAPI(url);
}

// Курс по ID
export async function getCourse(id: number): Promise<Course> {
  return fetchAPI(`/courses/${id}`);
}

// Записаться на курс
export async function enrollCourse(courseId: number): Promise<Enrollment> {
  return fetchAPI('/enroll', {
    method: 'POST',
    body: JSON.stringify({ course_id: courseId }),
  });
}

// Мои курсы
export async function getMyCourses(): Promise<EnrollmentWithCourse[]> {
  return fetchAPI('/my-courses');
}

// Обновить прогресс
export async function updateProgress(enrollmentId: number, progressPercent: number): Promise<Enrollment> {
  return fetchAPI(`/enrollments/${enrollmentId}/progress`, {
    method: 'PATCH',
    body: JSON.stringify({ progress_percent: progressPercent }),
  });
}

// Получить комментарии курса
export async function getCourseComments(courseId: number): Promise<Comment[]> {
  return fetchAPI(`/courses/${courseId}/comments`);
}

// Создать комментарий
export async function createComment(courseId: number, text: string): Promise<Comment> {
  return fetchAPI(`/courses/${courseId}/comments`, {
    method: 'POST',
    body: JSON.stringify({ text }),
  });
}

// Удалить комментарий
export async function deleteComment(commentId: number): Promise<void> {
  await fetchAPI(`/comments/${commentId}`, { method: 'DELETE' });
}
