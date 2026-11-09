import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Tag,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Pause,
  Play,
  Flame,
  Percent,
  CheckCircle2
} from 'lucide-react';

export interface OfferItem {
  id: string;
  categoryId: string;
  kicker: string;
  title: string;
  discount: string;
  description: string;
  features: string[];
  code: string;
  ctaText: string;
  image: string;
  bgGradient: string;
  accentBorder: string;
  accentText: string;
  accentGlow: string;
}

const OFFERS: OfferItem[] = [
  {
    id: 'offer-clean-35',
    categoryId: 'cleaning',
    kicker: 'TRENDING THIS WEEK',
    title: 'Full Home & Kitchen Deep Clean',
    discount: 'FLAT 35% OFF',
    description: 'Hospital-grade sanitization, kitchen chimney degreasing, bathroom descaling & floor buffing.',
    features: ['Crew of 3 verified pros', 'Eco-friendly safe solutions', '30-day rework warranty'],
    code: 'CLEAN35',
    ctaText: 'Book Deep Clean',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-indigo-950 via-slate-900 to-slate-950',
    accentBorder: 'border-indigo-500/30',
    accentText: 'text-indigo-400',
    accentGlow: 'bg-indigo-500/10'
  },
  {
    id: 'offer-ac-400',
    categoryId: 'appliance',
    kicker: 'SUMMER CARE FEST',
    title: 'AC Power Jet Servicing & Filter Scrub',
    discount: 'SAVE ₹400',
    description: 'High-pressure jet pump wash, indoor coil disinfectant spray, and free gas pressure checkup.',
    features: ['2x faster cooling boost', 'Anti-fungal coil spray', '60-day leak protection'],
    code: 'CHILL400',
    ctaText: 'Claim AC Offer',
    image: '/home-appliance-repair.webp',
    bgGradient: 'from-sky-950 via-slate-900 to-slate-950',
    accentBorder: 'border-sky-500/30',
    accentText: 'text-sky-400',
    accentGlow: 'bg-sky-500/10'
  },
  {
    id: 'offer-plumb-zero',
    categoryId: 'plumbing',
    kicker: 'POPULAR REPAIR DEAL',
    title: 'Zero Inspection Fee on Plumbing Repairs',
    discount: '₹0 VISIT FEE',
    description: 'Book certified plumbers for pipe blockages, taps, toilet cisterns, or concealed leaks.',
    features: ['30-min doorstep arrival', '₹0 fee on repair approval', 'Transparent rate card'],
    code: 'ZEROVISIT',
    ctaText: 'Book Plumber',
    image: '/plumbing-repair-service_181624-27146.webp',
    bgGradient: 'from-emerald-950 via-slate-900 to-slate-950',
    accentBorder: 'border-emerald-500/30',
    accentText: 'text-emerald-400',
    accentGlow: 'bg-emerald-500/10'
  },
  {
    id: 'offer-beauty-500',
    categoryId: 'beauty',
    kicker: 'WEEKEND LUXURY',
    title: 'Salon & Spa Pamper Experience at Home',
    discount: 'FLAT ₹500 OFF',
    description: 'Deluxe facial, chocolate roll-on waxing, pedicures, and stress-relief head massage.',
    features: ['100% single-use sealed kits', 'Top-rated female beauticians', 'Zero mess cleanup guaranteed'],
    code: 'GLOW500',
    ctaText: 'Book Salon Care',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80',
    bgGradient: 'from-rose-950 via-slate-900 to-slate-950',
    accentBorder: 'border-rose-500/30',
    accentText: 'text-rose-400',
    accentGlow: 'bg-rose-500/10'
  },
  {
    id: 'offer-move-20',
    categoryId: 'moving',
    kicker: 'SAFE RELOCATION',
    title: 'Intercity & Local House Shifting',
    discount: '20% INSTANT OFF',
    description: 'Complete hassle-free relocation with dedicated transport, dismantling, and careful assembly.',
    features: ['5-layer bubble packing', 'Free transit damage insurance', 'On-time delivery pledge'],
    code: 'RELOCATE20',
    ctaText: 'Schedule Move',
    image: '/Moving Services-img.webp',
    bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
    accentBorder: 'border-amber-500/30',
    accentText: 'text-amber-400',
    accentGlow: 'bg-amber-500/10'
  }
];

interface AdvancedOffersSlideshowProps {
  onSelectCategory: (categoryId: string) => void;
}

export default function AdvancedOffersSlideshow({ onSelectCategory }: AdvancedOffersSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Countdown timer in state (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<any>(null);

  // Countdown timer decrement
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 5, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Slide navigation handlers
  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % OFFERS.length);
    setProgress(0);
  };

  const goToPrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length);
    setProgress(0);
  };

  const goToIndex = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    setProgress(0);
  };

  // Auto-play progress loop
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (stepMs / SLIDE_DURATION) * 100;
        if (next >= 100) {
          goToNext();
          return 0;
        }
        return next;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused]);

  // Copy code handler
  const handleCopyCode = (e: React.MouseEvent, code: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const activeOffer = OFFERS[currentIndex];

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 80 : -80,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 }
      }
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -80 : 80,
      opacity: 0,
      scale: 0.98,
      transition: { duration: 0.2 }
    })
  };

  return (
    <section className="w-full space-y-3 mb-2" aria-label="Special Offers Slideshow">
      {/* Header bar: Title, Flash Timer & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500/20" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Special Offers & Deals</h3>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-full border border-slate-200/60">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>
              Flash deals expire in{' '}
              <span className="font-mono font-semibold text-slate-800 tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </span>
          </div>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center gap-2">
          {/* Pause / Play toggle */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors shadow-xs"
            aria-label={isPaused ? 'Resume auto-play' : 'Pause auto-play'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Previous Slide */}
          <button
            onClick={goToPrev}
            title="Previous offer"
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            aria-label="Previous offer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Slide */}
          <button
            onClick={goToNext}
            title="Next offer"
            className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors shadow-xs"
            aria-label="Next offer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slideshow Showcase Container */}
      <div
        className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-slate-800/80 bg-slate-950 group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Animated Slide Frame */}
        <div className="relative min-h-[300px] md:min-h-[260px] flex">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={activeOffer.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`w-full bg-gradient-to-br ${activeOffer.bgGradient} p-6 sm:p-8 flex flex-col md:flex-row items-stretch justify-between gap-6 relative z-10`}
            >
              {/* Left Column: Offer Details */}
              <div className="flex-1 flex flex-col justify-between space-y-4 max-w-xl z-10">
                {/* Kicker & Discount Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-400">
                    {activeOffer.kicker}
                  </span>
                  <span className="text-slate-600">·</span>
                  <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-md bg-white/10 text-white backdrop-blur-xs border border-white/15`}>
                    <Percent className="w-3 h-3 text-amber-400" />
                    {activeOffer.discount}
                  </span>
                </div>

                {/* Main Headline & Description */}
                <div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                    {activeOffer.title}
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-lg">
                    {activeOffer.description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-300 font-medium">
                  {activeOffer.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${activeOffer.accentText} shrink-0`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Row: Coupon Code & CTA Button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {/* Coupon Code Pill */}
                  <button
                    onClick={(e) => handleCopyCode(e, activeOffer.code)}
                    className="group/code flex items-center gap-2 px-3 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/15 hover:border-white/30 text-xs font-mono text-white transition-all shadow-sm"
                    title="Click to copy coupon code"
                  >
                    <Tag className="w-3.5 h-3.5 text-amber-400" />
                    <span className="tracking-wider font-bold">{activeOffer.code}</span>
                    {copiedCode === activeOffer.code ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-sans font-semibold">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-slate-400 group-hover/code:text-white transition-colors" />
                    )}
                  </button>

                  {/* Primary Claim CTA */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectCategory(activeOffer.categoryId)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide shadow-md transition-all"
                  >
                    <span>{activeOffer.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Visual Artwork Image */}
              <div className="w-full md:w-64 lg:w-72 h-44 md:h-auto shrink-0 relative rounded-xl overflow-hidden border border-white/10 shadow-inner group/img">
                <img
                  src={activeOffer.image}
                  alt={activeOffer.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to stylized SVG placeholder if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Verified badge watermark */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                  <div className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Survly Verified</span>
                  </div>
                  <span className="text-amber-400 font-bold">{activeOffer.discount}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Slide Progress Bar */}
        <div className="relative w-full h-1 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-indigo-400"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>

      {/* Quick Navigation Tabs: Click to jump directly to specific offers */}
      <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1">
        {OFFERS.map((offer, index) => {
          const isActive = index === currentIndex;
          return (
            <button
              key={offer.id}
              onClick={() => goToIndex(index)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-800 shadow-sm'
                  : 'bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? 'bg-indigo-400 animate-pulse' : 'bg-slate-300'
                }`}
              />
              <span>{offer.title.split(' ')[0]} {offer.title.split(' ')[1] || ''}</span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {offer.discount}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
