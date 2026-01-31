const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-4">
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} Student Management System. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
