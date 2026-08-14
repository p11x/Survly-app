import React from 'react';
import { motion } from 'motion/react';

export default function SkeletonProviderCard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col relative overflow-hidden"
    >
      {/* Shimmer gradient overlay */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer pointer-events-none z-10"></div>
      
      <div className="flex items-start justify-between mb-6">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-xl bg-slate-100 animate-pulse-slow border border-slate-50"></div>
          <div className="space-y-3 py-1">
            <div className="h-4 w-32 bg-slate-100 rounded-md animate-pulse-slow"></div>
            <div className="h-3 w-24 bg-slate-50 rounded-md animate-pulse-slow delay-75"></div>
          </div>
        </div>
        <div className="text-right space-y-2 py-1">
           <div className="h-2 w-16 bg-slate-50 rounded-full ml-auto animate-pulse-slow"></div>
           <div className="h-6 w-20 bg-slate-100 rounded-md ml-auto animate-pulse-slow delay-75"></div>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-3">
        <div className="flex-1 h-12 bg-slate-100 rounded-xl animate-pulse-slow delay-100"></div>
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl animate-pulse-slow delay-150"></div>
        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl animate-pulse-slow delay-200"></div>
      </div>
    </motion.div>
  );
}
