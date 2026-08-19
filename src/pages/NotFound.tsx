import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="mesh-gradient bg-dot-grid flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full max-w-md rounded-2xl p-10 text-center shadow-strong"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow-primary">
          <Compass className="h-8 w-8" />
        </div>
        <h1 className="section-heading font-heading text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg font-medium">Oops! Page not found</p>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Button asChild size="lg" className="mt-8 w-full">
          <Link to="/">Return to Home</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
