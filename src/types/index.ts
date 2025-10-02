export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studentId: string;
  program: string;
  year: number;
  gpa: number;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  instructor: string;
  description: string;
  progress: number;
  color: string;
  schedule: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  courseName: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

export interface Grade {
  id: string;
  courseId: string;
  courseName: string;
  assignmentName: string;
  grade: number;
  maxGrade: number;
  date: string;
}

export interface ScheduleEvent {
  id: string;
  courseId: string;
  courseName: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'exam';
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}
