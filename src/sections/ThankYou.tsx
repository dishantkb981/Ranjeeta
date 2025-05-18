import { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart } from 'lucide-react';
import { gsap } from 'gsap';
import HeartParticles from '../components/HeartParticles';

const ThankYou: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });
  const [showConfetti, setShowConfetti] = useState(false);
  
  useEffect(() => {
    if (isInView && textRef.current) {
      const words = textRef.current.querySelectorAll('.word');
      
      gsap.from(words, {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5
      });
    }
    // Auto confetti/heart burst on mount
    if (isInView && sectionRef.current) {
      for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        const colors = ['#fa3678', '#8b2cff', '#ff6a9e', '#a55aff', '#fff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        heart.innerHTML = `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='${color}' stroke='${color}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/></svg>`;
        heart.className = 'absolute pointer-events-none z-50';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = `translate(-50%, -50%) rotate(${Math.random()*360}deg)`;
        sectionRef.current.appendChild(heart);
        gsap.to(heart, {
          x: Math.cos((i/50)*2*Math.PI) * (200 + Math.random()*160),
          y: Math.sin((i/50)*2*Math.PI) * (200 + Math.random()*160),
          opacity: 0,
          scale: 1.5 + Math.random(),
          duration: 2.5,
          ease: 'power2.out',
          onComplete: () => {
            if (sectionRef.current) sectionRef.current.removeChild(heart);
          }
        });
      }
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView) {
      // Show confetti burst after a short delay
      const timeout = setTimeout(() => setShowConfetti(true), 1200);
      return () => clearTimeout(timeout);
    }
  }, [isInView]);

  // More floating hearts for extra magic
  const floatingHearts = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 80 + 10,
    y: Math.random() * 60 + 10,
    delay: 0.3 + Math.random() * 0.7,
    duration: 1.5 + Math.random() * 0.8,
    size: 18 + Math.random() * 18,
    color: i % 2 === 0 ? '#fa3678' : '#8b2cff',
  }));

  // Floating "I Love You Ranjeeta" texts
  const floatingLoveTexts = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    x: Math.random() * 80 + 5,
    y: Math.random() * 70 + 5,
    delay: 0.5 + Math.random() * 1.5,
    duration: 6 + Math.random() * 4,
    color: [
      'from-pink-400 via-accent-400 to-primary-400',
      'from-accent-400 via-pink-400 to-primary-400',
      'from-primary-400 via-pink-400 to-accent-400',
      'from-pink-400 via-primary-400 to-accent-400',
      'from-accent-400 via-primary-400 to-pink-400',
      'from-primary-400 via-accent-400 to-pink-400',
      'from-pink-400 via-primary-400 to-accent-400',
    ][i % 7],
    rotate: Math.random() * 360,
  }));

  const loveQuests = [
    {
      title: 'Our Next Adventure',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-accent-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-7-7 7-7-9 2-2 9z" /></svg>,
      desc: 'A surprise trip awaits us!'
    },
    {
      title: 'A Secret Date',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-pink-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z" /></svg>,
      desc: 'A romantic evening just for us.'
    },
    {
      title: 'A Love Letter',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-purple-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>,
      desc: 'A heartfelt message for you.'
    },
    {
      title: 'A Forever Promise',
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 text-blue-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>,
      desc: 'A vow for our future.'
    },
  ];

  return (
    <section className="section min-h-screen flex items-center justify-center bg-black bg-gradient-to-br from-black via-dark-400 to-black overflow-hidden relative">
      <HeartParticles />
      {/* Floating I Love You Ranjeeta texts */}
      {floatingLoveTexts.map(love => (
        <motion.div
          key={love.id}
          className={`absolute z-10 pointer-events-none select-none`}
          style={{ left: `${love.x}%`, top: `${love.y}%`, width: 'max-content' }}
          initial={{ opacity: 0, scale: 0.7, rotate: love.rotate }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0.7, 1.1, 1, 0.8, 1],
            rotate: [love.rotate, love.rotate + 30, love.rotate - 30, love.rotate],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: love.duration,
            delay: love.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        >
          <span
            className={`text-xl md:text-2xl font-extrabold bg-gradient-to-r ${love.color} bg-clip-text text-transparent animate-glow`}
            style={{
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: 'none',
              animation: 'glowPulseLight 2.5s infinite alternate',
              letterSpacing: '1.5px',
            }}
          >
            I Love You <span className="text-accent-400">Ranjeeta</span>
          </span>
        </motion.div>
      ))}
      {/* Animated floating hearts surprise */}
      {floatingHearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute z-20 pointer-events-none"
          style={{ left: `${heart.x}%`, top: `${heart.y}%` }}
          initial={{ opacity: 0, y: -40, scale: 0.7 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: heart.delay, duration: heart.duration, type: 'spring', stiffness: 120 }}
        >
          <Heart size={heart.size} fill={heart.color} stroke={heart.color} className="drop-shadow-glow" />
        </motion.div>
      ))}
      {/* Confetti burst surprise */}
      {showConfetti && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          {Array(40).fill(0).map((_, i) => {
            const angle = (i / 40) * 2 * Math.PI;
            const distance = 120 + Math.random() * 80;
            const color = i % 4 === 0 ? '#fa3678' : i % 4 === 1 ? '#8b2cff' : i % 4 === 2 ? '#ffd6e0' : '#fff';
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.7 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance,
                  scale: [1, 1.2, 0.8],
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 1.5, delay: 0.1 + (i * 0.025) }}
              >
                <Heart size={14 + Math.random() * 10} fill={color} stroke={color} />
              </motion.div>
            );
          })}
        </div>
      )}
      {/* Sparkle overlay */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="w-full h-full animate-sparkle bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.18)_0,rgba(255,255,255,0.08)_40%,transparent_80%)]" />
        <div className="w-full h-full animate-sparkle bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.10)_0,rgba(255,255,255,0.04)_40%,transparent_80%)]" />
      </div>
      {/* Animated floating love quest cards */}
      <div className="absolute inset-0 flex flex-wrap items-center justify-center z-10 pointer-events-none">
        {loveQuests.map((quest, i) => (
          <motion.div
            key={quest.title}
            className="m-4 p-6 rounded-2xl bg-dark-200/80 border-2 border-accent-400/40 shadow-xl backdrop-blur-lg flex flex-col items-center max-w-xs min-w-[220px] pointer-events-auto"
            initial={{ opacity: 0, y: 60, scale: 0.8, rotate: -8 + i * 5 }}
            animate={{ opacity: 1, y: [60, -10, 0, 10, 0], scale: 1, rotate: [0, 8, -8, 0] }}
            transition={{ duration: 1.2 + i * 0.2, delay: 0.5 + i * 0.2, type: 'spring', stiffness: 80, repeat: Infinity, repeatType: 'reverse', repeatDelay: 2 }}
            style={{ zIndex: 10 + i }}
          >
            <div className="mb-2">{quest.icon}</div>
            <div className="text-xl font-bold text-white mb-1 cursive drop-shadow-glow">{quest.title}</div>
            <div className="text-accent-300 text-base text-center">{quest.desc}</div>
          </motion.div>
        ))}
      </div>
      {/* Main reveal card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.8, type: 'spring', stiffness: 120 }}
        className="relative z-20 max-w-lg w-full mx-auto p-10 bg-dark-200/80 border-2 border-accent-400/60 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col items-center animated-border"
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: [0.7, 1.2, 1], opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, type: 'spring', stiffness: 180 }}
          className="mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#fa3678" viewBox="0 0 24 24" stroke="#fa3678" className="w-16 h-16 animate-heart-beat drop-shadow-glow">
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </motion.div>
        {/* I Love You Ranjeeta Forever - animated gradient text */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 1.3, type: 'spring', stiffness: 120 }}
          className="mb-3 text-2xl md:text-3xl font-extrabold text-center animate-glow bg-gradient-to-r from-pink-400 via-accent-400 to-primary-400 bg-clip-text text-transparent"
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: 'none',
            animation: 'glowPulseLight 2.5s infinite alternate',
          }}
        >
          <span className="inline-block animate-bounce-slow">I</span> <span className="inline-block animate-pulse">Love</span> <span className="inline-block animate-bounce-slow">You</span> <span className="inline-block animate-pulse text-accent-400">Ranjeeta</span> <span className="inline-block animate-bounce-slow">Forever</span>
        </motion.div>
        <div className="text-3xl md:text-4xl font-extrabold text-white mb-2 cursive drop-shadow-glow text-center">4 Years & Forever More</div>
        <div className="text-lg md:text-xl text-accent-300 text-center mb-4">Ranjeeta Yaduvanshi &amp; Dishant</div>
        <div className="text-base md:text-lg text-white/80 text-center">Thank you for being my love, my best friend, and my forever. The journey continues with new adventures, surprises, and endless love. <span className="text-accent-400 font-bold">Will you be my forever?</span></div>
      </motion.div>
    </section>
  );
};

export default ThankYou;