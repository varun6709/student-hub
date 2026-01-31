export interface Student {
  id: string;
  name: string;
  rollNo: string;
  age: number;
  className: string;
  year: number;
  createdAt: Date;
}

export type StudentFormData = Omit<Student, 'id' | 'createdAt'>;
