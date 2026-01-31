import { GraduationCap, Users } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Student Management</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="w-3 h-3" />
              Manage student records
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
