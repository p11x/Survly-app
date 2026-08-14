import { motion } from 'motion/react';
import { Star, CheckCircle, Heart } from 'lucide-react';
import React from 'react';
import { services } from '../data';

export default function ProviderCard({ provider, onViewDetails }: any) {
  const service = services.find(s => s.id === provider.serviceId) || services[0];
  const categoryName = service.name;
  
  // Clean up price (remove /hr)
  const basePrice = provider.price.split('/')[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      whileHover={{ y: -6 }}
      className="group bg-white border border-slate-200 rounded-[14px] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden"
    >
      {/* Cover Image Section */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 shrink-0">
        <img 
          src={service.image} // Using service image for the hero shot
          alt={provider.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
        />
        
        {/* Floating Badges */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow-sm">
            {categoryName}
          </div>
        </div>
        <div className="absolute top-3 right-3">
          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-500 hover:text-red-500 hover:bg-white transition-colors shadow-sm">
            <Heart className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        {/* Verified Badge */}
        {provider.verified && (
          <div className="flex items-center gap-1.5 mb-2">
            <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-50" strokeWidth={2.5} />
            <span className="text-[11px] font-extrabold text-emerald-600 tracking-wider uppercase">Verified</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl leading-tight font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {provider.name}
        </h3>

        {/* Subtitle */}
        <p className="text-[13px] text-slate-500 mb-3">
          Expert {categoryName} • {categoryName}
        </p>

        {/* Rating Row */}
        <div className="flex items-center text-[13px] text-slate-500 mb-4">
          <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1.5" />
          <span className="font-bold text-amber-600 mr-1.5">{provider.rating}</span>
          <span>{provider.reviews} reviews • {provider.distance || '2.1 km'}</span>
        </div>

        <hr className="border-slate-100 mb-4" />

        {/* Stats Grid */}
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] gap-3 mb-5 items-center">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 mb-0.5">From</span>
            <span className="text-[15px] font-bold text-slate-900">{basePrice}</span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-400 mb-0.5">Arrival</span>
            <span className="text-[15px] font-bold text-slate-900">35 min</span>
          </div>
          <div className="w-px h-6 bg-slate-200"></div>
          <div className="flex flex-col text-right">
            <span className="text-[11px] text-slate-400 mb-0.5">Jobs</span>
            <span className="text-[15px] font-bold text-slate-900">840+</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-auto">
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={onViewDetails}
            className="w-full bg-[#635BFF] hover:bg-indigo-600 text-white text-[15px] font-bold py-3 rounded-xl transition-colors shadow-sm"
          >
            View professional
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
