import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { memories } from '../data/memories';
import { useNavigate } from 'react-router-dom';

const Memories: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateY: 45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="section bg-gradient-to-b from-dark-300 via-dark-400 to-dark-300 py-20 px-4 md:px-8 h-screen overflow-hidden">
      <div className="container mx-auto max-w-7xl h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white cursive">
            Our Precious Memories
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Every moment with you becomes a beautiful memory that I treasure forever.
            Here are some of the special moments we've shared over our 4 years together.
          </p>
        </motion.div>

        <div ref={sectionRef} className="relative flex-1 rounded-xl p-1">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 justify-center items-center perspective-1000"
          >
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.12,
                  rotateY: 8,
                  z: 80,
                  boxShadow: "0 12px 32px 0 rgba(250, 54, 120, 0.18), 0 2px 8px 0 rgba(139, 44, 255, 0.13)"
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                  animation: `floatMemories 4s ease-in-out ${index % 2 === 0 ? 'alternate' : 'alternate-reverse'} infinite`,
                  zIndex: 10 + index
                }}
                className="photo-card group transform-gpu will-change-transform max-w-[260px] mx-auto bg-white/10 border-2 border-accent-400/60 rounded-3xl shadow-2xl hover:shadow-accent-400/40 transition-all duration-500 p-4 animate-glow floating-memory"
              >
                <div className="relative h-full flex flex-col transform-gpu">
                  <div className="relative h-64 w-full overflow-hidden rounded-2xl mb-3 shadow-lg border border-primary-400/30 bg-black/30">
                    <motion.img 
                      src={memory.image} 
                      alt={memory.title}
                      initial={{ scale: 1.12 }}
                      whileHover={{ scale: 1.04 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-400 via-transparent opacity-70 rounded-2xl"></div>
                    
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-primary-500/40 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow flex flex-col p-1">
                    <motion.span 
                      className="text-accent-400 text-[10px] font-semibold mb-0.5 tracking-wide uppercase"
                      whileHover={{ scale: 1.08 }}
                    >
                      {memory.date}
                    </motion.span>
                    <motion.h3 
                      className="text-base font-bold mb-0.5 text-white drop-shadow-glow"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {memory.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-200 text-[11px] flex-grow"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {memory.description}
                    </motion.p>
                  </div>
                  
                  <motion.div 
                    className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center shadow-md"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="12" 
                      height="12" 
                      viewBox="0 0 24 24" 
                      fill="#fff" 
                      stroke="#fff" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 text-center"
          >
            <p className="text-xl md:text-2xl text-accent-300 cursive mb-8">
              "Every picture tells our story, every moment holds our love."
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/reasons')}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 px-8 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
            >
              Next
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Memories;