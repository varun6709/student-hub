import { Student } from "@/types/student";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash2, Users } from "lucide-react";

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

const StudentTable = ({ students, onEdit, onDelete }: StudentTableProps) => {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground animate-fade-in">
        <Users className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-lg font-medium">No students found</p>
        <p className="text-sm">Add your first student to get started</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Roll No</TableHead>
            <TableHead className="font-semibold">Age</TableHead>
            <TableHead className="font-semibold">Class</TableHead>
            <TableHead className="font-semibold">Year</TableHead>
            <TableHead className="font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student, index) => (
            <TableRow 
              key={student.id} 
              className="hover:bg-muted/30 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>{student.rollNo}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {student.className}
                </span>
              </TableCell>
              <TableCell>{student.year}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(student)}
                    className="hover:bg-primary/10 hover:text-primary"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Student</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{student.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(student.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;
