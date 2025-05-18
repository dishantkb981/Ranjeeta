import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routes = [
    { path: '/', label: 'Home' },
    { path: '/memories', label: 'Memories' },
    { path: '/reasons', label: 'Reasons' },
    { path: '/everything', label: 'Everything' },
    { path: '/thankyou', label: 'Thank You' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-dark-200/80 backdrop-blur-lg border-b border-primary-500/20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-4 space-x-6">
          {routes.map((route) => (
            <motion.button
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                location.pathname === route.path ? 'text-accent-500' : 'text-gray-300 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {location.pathname === route.path && (
                <motion.div
                  layoutId="active"
                  className="absolute inset-0 bg-dark-300 rounded-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center">
                {route.label}
                {location.pathname === route.path && (
                  <Heart className="ml-1" size={12} fill="currentColor" />
                )}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;