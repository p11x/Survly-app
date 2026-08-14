import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TypewriterProps {
  phrases: string[];
}

export default function Typewriter({ phrases }: TypewriterProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  
  const typingSpeed = 45;
  const deletingSpeed = 28;
  const pauseTime = 1600;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleType = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        setText((prev) => prev.substring(0, prev.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      } else {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text === currentPhrase) {
          timer = setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      }
    };

    const speed = isDeleting ? deletingSpeed : typingSpeed;
    timer = setTimeout(handleType, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex, phrases]);

  return (
    <span className="inline-flex items-center min-h-[1.5em]">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-text-gradient font-black tracking-tight">
        {text}
      </span>
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-1 h-[1em] bg-indigo-600 ml-1 rounded-full"
      />
    </span>
  );
}
