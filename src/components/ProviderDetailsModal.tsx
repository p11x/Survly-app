import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Check } from 'lucide-react';
import { services } from '../data';

interface ProviderDetailsModalProps {
  provider: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProviderDetailsModal({ provider, isOpen, onClose }: ProviderDetailsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !provider) return null;

  const service = services.find(s => s.id === provider.serviceId) || services[0];
  const categoryName = service.name;
  const basePrice = provider.price.split('/')[0];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:px-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-full"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-100 shadow-sm border border-slate-200 z-10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Header Section */}
            <div className="p-8 pb-6 flex gap-6">
              {/* Provider Image */}
              <div className="w-28 h-28 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                <img src={service.image} alt={provider.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Provider Info */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-extrabold tracking-wider uppercase rounded-full w-max mb-3 border border-indigo-100">
                  {categoryName} SERVICE
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  {provider.name}
                </h2>
                <p className="text-sm text-slate-500 mb-3">
                  Leaks, taps, pipes, bathroom fittings and installations
                </p>
                <div className="flex items-center gap-4 text-[13px] font-medium">
                  <div className="flex items-center text-amber-600">
                    <Star className="w-4 h-4 fill-amber-500 mr-1" />
                    <span>{provider.rating} <span className="text-slate-400 font-normal">({provider.reviews} reviews)</span></span>
                  </div>
                  <div className="text-slate-500">{provider.distance || '2.1 km'} away</div>
                  <div className="flex items-center text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2"></span>
                    {provider.availability === 'open' ? 'Available today' : 'Currently busy'}
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="px-8 py-4">
              <h3 className="text-[11px] font-extrabold text-indigo-600 tracking-wider uppercase mb-3">About this professional</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed mb-5">
                A verified local {categoryName.toLowerCase()} team for household repairs, installations and urgent water leaks. You receive a price confirmation before work begins.
              </p>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 border border-slate-200 rounded-xl">
                  <div className="text-[11px] text-slate-500 mb-1">Experience</div>
                  <div className="font-bold text-slate-900">{provider.experience || '8+ years'}</div>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl">
                  <div className="text-[11px] text-slate-500 mb-1">Jobs completed</div>
                  <div className="font-bold text-slate-900">640+</div>
                </div>
                <div className="p-3 border border-slate-200 rounded-xl">
                  <div className="text-[11px] text-slate-500 mb-1">Service warranty</div>
                  <div className="font-bold text-slate-900">30 days</div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="px-8 py-6">
              <h3 className="text-[11px] font-extrabold text-indigo-600 tracking-wider uppercase mb-3">Transparent Pricing</h3>
              <div className="flex justify-between items-baseline mb-4">
                <h4 className="text-lg font-bold text-slate-900">Services & prices</h4>
                <span className="text-xs text-slate-400">Final price may vary after inspection</span>
              </div>

              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white">
                <div className="flex justify-between p-4 text-[14px]">
                  <span className="text-slate-700">Visit & inspection</span>
                  <span className="font-bold text-indigo-600">₹299</span>
                </div>
                <div className="flex justify-between p-4 text-[14px]">
                  <span className="text-slate-700">Tap or minor leak repair</span>
                  <span className="font-bold text-indigo-600">₹399</span>
                </div>
                <div className="flex justify-between p-4 text-[14px]">
                  <span className="text-slate-700">Toilet repair</span>
                  <span className="font-bold text-indigo-600">₹599</span>
                </div>
                <div className="flex justify-between p-4 text-[14px]">
                  <span className="text-slate-700">Pipe blockage removal</span>
                  <span className="font-bold text-indigo-600">₹799</span>
                </div>
                <div className="flex justify-between p-4 text-[14px]">
                  <span className="text-slate-700">Bathroom fitting installation</span>
                  <span className="font-bold text-indigo-600">₹999</span>
                </div>
              </div>
            </div>

            {/* Included Section */}
            <div className="px-8 pt-2 pb-8">
              <h3 className="text-[11px] font-extrabold text-indigo-600 tracking-wider uppercase mb-3">Included with every booking</h3>
              <div className="flex items-center text-[14px] text-slate-600">
                <Check className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                Verified professional and safety check
              </div>
            </div>
          </div>

          {/* Sticky Bottom Bar */}
          <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
            <div>
              <div className="text-[11px] text-slate-500 mb-0.5">Starting from</div>
              <div className="text-2xl font-bold text-indigo-700">{basePrice}</div>
            </div>
            <button className="bg-[#635BFF] hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-sm">
              Book this professional
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
