import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function AnimatedHomeButton() {
  return (
    <Link to="/dashboard">
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative inline-block"
      >
        <Button className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-2xl transition-all flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Home size={24} className="mr-2" />
          </motion.div>
          Home
        </Button>
      </motion.div>
    </Link>
  );
}
