import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { loveReasons } from '../data/loveReasons';
import { Heart, Smile, Award, Brain, Link, Flame, Music, HandMetal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoveReasons: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'heart': return <Heart className="text-accent-500" size={28} />;
      case 'smile': return <Smile className="text-accent-500" size={28} />;
      case 'award': return <Award className="text-accent-500" size={28} />;
      case 'brain': return <Brain className="text-accent-500" size={28} />;
      case 'link': return <Link className="text-accent-500" size={28} />;
      case 'flame': return <Flame className="text-accent-500" size={28} />;
      case 'music': return <Music className="text-accent-500" size={28} />;
      case 'helping-hand': return <HandMetal className="text-accent-500" size={28} />;
      default: return <Heart className="text-accent-500" size={28} />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="section bg-gradient-to-b from-dark-300 via-dark-400 to-dark-300 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white cursive">Why I Love You</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            There are countless reasons why my heart beats for you, 
            but here are just a few of the things that make you so special to me.
          </p>
        </motion.div>

        <div ref={sectionRef}>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loveReasons.map((reason) => (
              <motion.div
                key={reason.id}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(139, 44, 255, 0.1), 0 10px 10px -5px rgba(250, 54, 120, 0.04)" 
                }}
                className="text-card animated-border"
              >
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {getIcon(reason.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{reason.title}</h3>
                    <p className="text-gray-300">{reason.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/everything')}
            className="bg-gradient-to-r from-primary-500 to-accent-500 text-white py-3 px-8 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-glow"
          >
            Next
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveReasons;