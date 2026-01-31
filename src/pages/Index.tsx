import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StudentTable from "@/components/StudentTable";
import StudentForm from "@/components/StudentForm";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useStudents } from "@/hooks/useStudents";
import { Student, StudentFormData } from "@/types/student";
import { Plus, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { students, addStudent, updateStudent, deleteStudent, searchStudents } = useStudents();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredStudents = useMemo(() => {
    return searchStudents(searchQuery);
  }, [searchQuery, searchStudents]);

  const handleAddStudent = (data: StudentFormData) => {
    addStudent(data);
    toast({
      title: "Student Added",
      description: `${data.name} has been added successfully.`,
    });
  };

  const handleEditStudent = (data: StudentFormData) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, data);
      toast({
        title: "Student Updated",
        description: `${data.name}'s details have been updated.`,
      });
    }
    setEditingStudent(null);
  };

  const handleDeleteStudent = (id: string) => {
    const student = students.find((s) => s.id === id);
    deleteStudent(id);
    toast({
      title: "Student Deleted",
      description: student ? `${student.name} has been removed.` : "Student removed.",
      variant: "destructive",
    });
  };

  const openEditForm = (student: Student) => {
    setEditingStudent(student);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="glass-card rounded-xl p-6 animate-fade-in">
          {/* Stats */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-border">
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
              <div>
                <p className="text-2xl font-bold text-foreground">{students.length}</p>
                <p className="text-sm text-muted-foreground">Total Students</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <Button onClick={() => setIsFormOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Student
            </Button>
          </div>

          {/* Table */}
          <StudentTable
            students={filteredStudents}
            onEdit={openEditForm}
            onDelete={handleDeleteStudent}
          />
        </div>
      </main>

      <Footer />

      {/* Form Dialog */}
      <StudentForm
        open={isFormOpen}
        onClose={closeForm}
        onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
        student={editingStudent}
      />
    </div>
  );
};

export default Index;
