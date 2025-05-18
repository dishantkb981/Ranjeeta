import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EverythingSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isInView && textRef.current) {
      gsap.from(textRef.current.querySelectorAll('.gsap-char'), {
        opacity: 0,
        y: 20,
        stagger: 0.03,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });
    }
  }, [isInView]);

  const floatingHearts = Array(12).fill(0).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 10 + Math.random() * 20,
    delay: Math.random() * 2,
    duration: 4 + Math.random() * 6
  }));

  return (
    <section ref={sectionRef} className="section bg-gradient-to-b from-dark-300 via-dark-400 to-dark-300 py-20">
      <div className="container mx-auto px-4 relative">
        {/* Floating hearts background */}
        {floatingHearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute pointer-events-none"
            style={{ 
              left: `${heart.x}%`, 
              top: `${heart.y}%`,
              opacity: 0
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
              rotate: [0, 20, -20, 0]
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Heart 
              size={heart.size} 
              className="text-accent-500" 
              fill={Math.random() > 0.5 ? "#fa3678" : "#8b2cff"} 
            />
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-white cursive">You're My Everything</h2>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="max-w-4xl mx-auto p-8 bg-dark-200/70 backdrop-blur-md rounded-2xl shadow-2xl animated-border"
          >
            <div 
              ref={textRef} 
              className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed cursive"
            >
              {`You are the melody to my song, the smile to my face, and the beat to my heart.`.split('').map((char, index) => (
                <span key={index} className="gsap-char inline-block">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-12 flex justify-center"
            >
              <Heart 
                fill="#fa3678" 
                stroke="#fa3678" 
                size={80} 
                className="animate-heart-beat" 
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2 }}
              className="mt-8 text-lg md:text-xl text-accent-300 text-center"
            >
              Forever and Always, My Love
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="flex justify-center mt-12"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/thankyou')}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 px-8 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
              >
                Next
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default EverythingSection;