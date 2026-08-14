import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wrench, Zap, Sparkles, Car, Settings, Scissors, AirVent, Package, Siren } from 'lucide-react';
import { services } from '../data';

const iconMap: Record<string, any> = {
  Wrench, Zap, Sparkles, Car, Settings, Scissors, AirVent, Package, Siren
};

const categorySubServices: Record<string, {name: string, price: string}[]> = {
  plumbing: [
    { name: "Visit & inspection", price: "₹299" },
    { name: "Tap or minor leak repair", price: "₹399" },
    { name: "Toilet repair", price: "₹599" },
    { name: "Pipe blockage removal", price: "₹799" },
    { name: "Bathroom fitting installation", price: "₹999" }
  ],
  electrical: [
    { name: "Visit & inspection", price: "₹199" },
    { name: "Switchboard repair", price: "₹349" },
    { name: "Fan installation", price: "₹499" },
    { name: "Wiring replacement", price: "₹1299" }
  ],
  cleaning: [
    { name: "1 BHK Deep Cleaning", price: "₹1499" },
    { name: "2 BHK Deep Cleaning", price: "₹1999" },
    { name: "Sofa Cleaning", price: "₹499" },
    { name: "Bathroom Cleaning", price: "₹399" }
  ]
};

export default function CategoryDetail({ 
  categoryId, 
  onClose,
  onSubServiceSelect 
}: { 
  categoryId: string; 
  onClose: () => void;
  onSubServiceSelect: (subService: string) => void;
}) {
  const service = services.find(s => s.id === categoryId);
  if (!service) return null;

  const Icon = iconMap[service.iconName] || Settings;
  
  // Default to plumbing if we don't have mocked sub-services for this category
  const subServices = categorySubServices[categoryId] || categorySubServices.plumbing;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm relative mb-8"
    >
      {/* Top Banner Section */}
      <div className="bg-gradient-to-b from-[#F3F0FF] to-white px-8 pt-8 pb-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-50 shadow-sm border border-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex gap-5 items-center">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-[0_8px_20px_rgba(99,91,255,0.12)] border border-indigo-50 shrink-0">
            <Icon className="w-10 h-10 text-[#635BFF]" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-[#635BFF] text-[11px] font-extrabold tracking-wider uppercase mb-1.5">
              Service Category
            </h3>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">
              {service.name}
            </h2>
            <p className="text-[14px] text-slate-500">
              {service.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Services List Section */}
      <div className="px-8 pb-8 pt-2">
        <h3 className="text-[#635BFF] text-[11px] font-extrabold tracking-wider uppercase mb-2">
          Choose what you need
        </h3>
        
        <div className="flex justify-between items-baseline mb-5">
          <h4 className="text-[22px] font-bold text-slate-900">
            Available services
          </h4>
          <span className="text-[11px] text-slate-500 font-medium">
            Prices shown are starting estimates
          </span>
        </div>

        <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 bg-white">
          {subServices.map((sub, idx) => (
            <button 
              key={idx}
              onClick={() => onSubServiceSelect(sub.name)}
              className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50 transition-colors group"
            >
              <div>
                <div className="text-[15px] font-semibold text-[#635BFF] mb-0.5 group-hover:text-indigo-700 transition-colors">
                  {sub.name}
                </div>
                <div className="text-[12px] text-slate-500">
                  View professionals and book this service
                </div>
              </div>
              <div className="text-[15px] font-bold text-[#635BFF] group-hover:text-indigo-700 transition-colors">
                {sub.price}
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
