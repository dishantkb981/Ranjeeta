import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial audio properties
    audio.volume = 0.5;
    audio.loop = true;

    const handleCanPlay = () => {
      console.log('Audio can play');
      setIsLoaded(true);
      setError(null);
    };

    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setError('Failed to load audio. Please try again.');
      setPlaying(false);
      setIsLoaded(false);
    };

    const handlePlay = () => {
      console.log('Audio started playing');
      setPlaying(true);
      setError(null);
    };

    const handlePause = () => {
      console.log('Audio paused');
      setPlaying(false);
    };

    // Add all event listeners
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    // Load the audio
    audio.load();

    return () => {
      audio.pause();
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (playing) {
        await audio.pause();
      } else {
        // Reset audio to start when playing
        audio.currentTime = 0;
        
        // Try to play with user interaction
        try {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
          }
        } catch (playError) {
          console.error('Play error:', playError);
          setError('Please click the button again to play music');
          setPlaying(false);
        }
      }
    } catch (err) {
      console.error('Toggle error:', err);
      setError('Unable to play audio. Please try again.');
      setPlaying(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          playing ? 'bg-accent-500' : 'bg-dark-200'
        } ${!isLoaded ? 'opacity-50' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          boxShadow: playing ? '0 0 20px rgba(250, 54, 120, 0.5)' : '0 0 10px rgba(0, 0, 0, 0.2)'
        }}
        disabled={!isLoaded}
      >
        <Music 
          size={28} 
          className={`${playing ? 'text-white animate-pulse' : 'text-accent-500'}`}
        />
      </motion.button>

      <audio
        ref={audioRef}
        src="/perfect.mp3"
        preload="auto"
      />

      {error && (
        <div className="fixed bottom-20 right-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
      {!isLoaded && !error && (
        <div className="fixed bottom-20 right-6 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          Loading audio...
        </div>
      )}
    </>
  );
};

export default MusicPlayer;