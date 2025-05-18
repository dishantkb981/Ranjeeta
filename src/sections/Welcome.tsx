import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Heart, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (titleRef.current) {
      const tl = gsap.timeline();
      
      // Animate letters with a more dynamic effect
      tl.from(titleRef.current.querySelectorAll('.gsap-letter'), {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.03,
        duration: 1.5,
        ease: "back.out(1.7)"
      });

      // Add floating animation to the heart
      gsap.to(".floating-heart", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Add sparkle effects
      const sparkles = document.querySelectorAll('.sparkle');
      sparkles.forEach((sparkle, index) => {
        gsap.to(sparkle, {
          opacity: 0,
          scale: 0.5,
          rotate: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          delay: index * 0.2,
          ease: "power1.inOut"
        });
      });
    }
  }, []);

  return (
    <section className="section relative overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-300 via-dark-400 to-dark-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="sparkle absolute"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: 0
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2
            }}
          >
            <Sparkles size={20} className="text-accent-500" />
          </motion.div>
        ))}
      </div>

      {/* Content container without blur */}
      <div className="flex flex-col items-center justify-center w-full h-full text-center relative z-10">
        <motion.div
          initial={{ y: -40, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            type: 'spring', 
            stiffness: 100, 
            damping: 15, 
            delay: 0.2 
          }}
          className="mb-6 floating-heart"
        >
          <Heart 
            size={90} 
            fill="#fa3678" 
            stroke="#fa3678" 
            className="drop-shadow-glow animate-pulse-slow" 
          />
        </motion.div>

        <div ref={titleRef} className="mb-4">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, type: 'spring', stiffness: 60 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white"
          >
            {"4 Years of Love & Growth".split('').map((letter, index) => (
              <motion.span
                key={index}
                className="gsap-letter inline-block font-extrabold text-white"
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.3 }
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-2xl md:text-3xl text-accent-300 mb-8"
        >
          My Dearest Ranjeeta
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="max-w-xl mx-auto bg-dark-200/80 rounded-2xl shadow-xl p-8 mb-10 relative overflow-hidden border border-white/10"
        >
          <p className="text-lg md:text-xl text-white mb-2 relative z-10 font-medium">
            Four years of beautiful moments, shared dreams, and endless love. Every day with you is a blessing, every smile a treasure, and every challenge we've faced together has only made our bond stronger. You are my present, my future, and my forever.
          </p>
          <p className="mt-2 text-accent-300 text-lg relative z-10 font-medium">
            Let's relive our journey through these precious memories...
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/memories')}
          className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 px-10 rounded-full font-bold text-lg shadow-lg transition-all duration-300"
          style={{ marginTop: '1.5rem' }}
        >
          Explore Our Journey
        </motion.button>
      </div>
    </section>
  );
};

export default Welcome;