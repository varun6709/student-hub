import { useState, useCallback } from "react";
import { Student, StudentFormData } from "@/types/student";

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Sample initial data
const initialStudents: Student[] = [
  {
    id: generateId(),
    name: "John Smith",
    rollNo: "2025001",
    age: 16,
    className: "Class 10",
    year: 2025,
    createdAt: new Date(),
  },
  {
    id: generateId(),
    name: "Emma Wilson",
    rollNo: "2025002",
    age: 15,
    className: "Class 9",
    year: 2025,
    createdAt: new Date(),
  },
  {
    id: generateId(),
    name: "Michael Brown",
    rollNo: "2025003",
    age: 17,
    className: "Class 11",
    year: 2025,
    createdAt: new Date(),
  },
];

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);

  const addStudent = useCallback((data: StudentFormData) => {
    const newStudent: Student = {
      id: generateId(),
      ...data,
      createdAt: new Date(),
    };
    setStudents((prev) => [newStudent, ...prev]);
  }, []);

  const updateStudent = useCallback((id: string, data: StudentFormData) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, ...data } : student
      )
    );
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }, []);

  const searchStudents = useCallback(
    (query: string) => {
      if (!query.trim()) return students;
      const lowercaseQuery = query.toLowerCase();
      return students.filter(
        (student) =>
          student.name.toLowerCase().includes(lowercaseQuery) ||
          student.rollNo.toLowerCase().includes(lowercaseQuery) ||
          student.className.toLowerCase().includes(lowercaseQuery)
      );
    },
    [students]
  );

  return {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    searchStudents,
  };
};
