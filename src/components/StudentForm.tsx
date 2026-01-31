import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Student, StudentFormData } from "@/types/student";
import { UserPlus, Save } from "lucide-react";

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: StudentFormData) => void;
  student?: Student | null;
}

const classOptions = [
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12"
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

const StudentForm = ({ open, onClose, onSubmit, student }: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    rollNo: "",
    age: 0,
    className: "",
    year: currentYear,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        rollNo: student.rollNo,
        age: student.age,
        className: student.className,
        year: student.year,
      });
    } else {
      setFormData({
        name: "",
        rollNo: "",
        age: 0,
        className: "",
        year: currentYear,
      });
    }
    setErrors({});
  }, [student, open]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof StudentFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Roll No is required";
    } else if (formData.rollNo.length > 20) {
      newErrors.rollNo = "Roll No must be less than 20 characters";
    }

    if (!formData.age || formData.age < 1 || formData.age > 100) {
      newErrors.age = "Age must be between 1 and 100";
    }

    if (!formData.className) {
      newErrors.className = "Class is required";
    }

    if (!formData.year) {
      newErrors.year = "Year is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {student ? <Save className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {student ? "Edit Student" : "Add New Student"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rollNo">Roll No</Label>
            <Input
              id="rollNo"
              placeholder="Enter roll number"
              value={formData.rollNo}
              onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
              className={errors.rollNo ? "border-destructive" : ""}
            />
            {errors.rollNo && <p className="text-sm text-destructive">{errors.rollNo}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter age"
              min={1}
              max={100}
              value={formData.age || ""}
              onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
              className={errors.age ? "border-destructive" : ""}
            />
            {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="className">Class</Label>
            <Select
              value={formData.className}
              onValueChange={(value) => setFormData({ ...formData, className: value })}
            >
              <SelectTrigger className={errors.className ? "border-destructive" : ""}>
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                {classOptions.map((cls) => (
                  <SelectItem key={cls} value={cls}>
                    {cls}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.className && <p className="text-sm text-destructive">{errors.className}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Select
              value={formData.year.toString()}
              onValueChange={(value) => setFormData({ ...formData, year: parseInt(value) })}
            >
              <SelectTrigger className={errors.year ? "border-destructive" : ""}>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.year && <p className="text-sm text-destructive">{errors.year}</p>}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {student ? "Update Student" : "Add Student"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentForm;
