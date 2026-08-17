import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, MapPin, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Check, Navigation, Home, Briefcase } from 'lucide-react';
import { db } from '../lib/firebase';
import { ref, push } from 'firebase/database';

interface BookingFlowModalProps {
  provider: any;
  service: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingFlowModal({ provider, service, isOpen, onClose }: BookingFlowModalProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStep(1); // Reset state when opened
      setSelectedDate('');
      setSelectedTime('');
      setAddress('');
      setIsProcessing(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !provider) return null;

  const basePrice = provider.price.split('/')[0];
  const totalAmount = parseInt(basePrice.replace(/[^0-9]/g, '')) + 50; // Base + 50 platform fee

  const dates = [
    { day: 'Today', date: 'Aug 17' },
    { day: 'Tomorrow', date: 'Aug 18' },
    { day: 'Mon', date: 'Aug 19' },
    { day: 'Tue', date: 'Aug 20' },
  ];

  const times = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'];

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4); // Success step
    }, 2000);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Select Date & Time</h3>
              <p className="text-slate-500 text-sm">When do you need the professional to arrive?</p>
            </div>
            
            <div className="space-y-3">
              <label className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-600" /> Choose Date
              </label>
              <div className="grid grid-cols-4 gap-3">
                {dates.map((d, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedDate(d.date)}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${selectedDate === d.date ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-white'}`}
                  >
                    <span className="text-xs font-bold uppercase">{d.day}</span>
                    <span className="text-sm font-medium">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" /> Choose Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                {times.map((t, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedTime(t)}
                    className={`py-3 px-2 rounded-xl border-2 text-sm font-bold transition-all ${selectedTime === t ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600 bg-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
               <button 
                 disabled={!selectedDate || !selectedTime}
                 onClick={handleNext}
                 className="bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors"
               >
                 Continue <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Service Address</h3>
              <p className="text-slate-500 text-sm">Where should the professional go?</p>
            </div>
            
            <button 
              onClick={() => {
                setAddress('Fetching location...');
                setTimeout(() => setAddress('123 Current Location St, Tech Park, City - 400001'), 800);
              }}
              className="w-full flex items-center gap-3 p-4 bg-indigo-50/50 hover:bg-indigo-50 border border-indigo-100 rounded-2xl transition-colors text-indigo-700 font-bold"
            >
              <Navigation className="w-5 h-5" />
              Use current location
            </button>

            <div className="space-y-3">
              <label className="font-bold text-slate-700 text-sm">Saved Addresses</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setAddress('A-404, Sunshine Apartments, MG Road, Andheri West, Mumbai')}
                  className={`p-4 border-2 rounded-2xl text-left transition-all flex flex-col gap-2 ${address.includes('A-404') ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 hover:border-indigo-200'}`}
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900"><Home className="w-4 h-4 text-slate-400" /> Home</div>
                  <div className="text-xs text-slate-500 line-clamp-2">A-404, Sunshine Apartments, MG Road...</div>
                </button>
                <button 
                  onClick={() => setAddress('Unit 12, Tech Hub, Sector 62, Noida')}
                  className={`p-4 border-2 rounded-2xl text-left transition-all flex flex-col gap-2 ${address.includes('Tech Hub') ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-100 hover:border-indigo-200'}`}
                >
                  <div className="flex items-center gap-2 font-bold text-slate-900"><Briefcase className="w-4 h-4 text-slate-400" /> Office</div>
                  <div className="text-xs text-slate-500 line-clamp-2">Unit 12, Tech Hub, Sector 62...</div>
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="font-bold text-slate-700 text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600" /> Detailed Address
              </label>
              <textarea 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House/Flat No., Building Name, Street, Area..."
                className="w-full h-32 p-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 focus:ring-0 resize-none outline-none transition-colors"
              />
            </div>

            <div className="pt-4 flex justify-between">
               <button 
                 onClick={handleBack}
                 className="text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors"
               >
                 <ArrowLeft className="w-5 h-5" /> Back
               </button>
               <button 
                 disabled={address.length < 5}
                 onClick={handleNext}
                 className="bg-indigo-600 disabled:bg-slate-300 disabled:cursor-not-allowed hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors"
               >
                 Continue <ArrowRight className="w-5 h-5" />
               </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Review & Confirm</h3>
              <p className="text-slate-500 text-sm">Check details before completing your booking.</p>
            </div>
            
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
               <div className="flex justify-between items-start border-b border-slate-200 pb-4">
                 <div>
                   <h4 className="font-bold text-slate-900">{service?.name || 'Service'}</h4>
                   <p className="text-slate-500 text-sm">by {provider.name}</p>
                 </div>
                 <div className="text-right">
                   <div className="font-bold text-slate-900">{basePrice}</div>
                   <div className="text-slate-400 text-xs">Base price</div>
                 </div>
               </div>

               <div className="space-y-3 py-2 border-b border-slate-200 pb-4">
                 <div className="flex items-start gap-3">
                   <Calendar className="w-5 h-5 text-indigo-600 shrink-0" />
                   <div>
                     <div className="font-semibold text-slate-800 text-sm">{selectedDate}</div>
                     <div className="text-slate-500 text-xs">{selectedTime}</div>
                   </div>
                 </div>
                 <div className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
                   <div className="font-semibold text-slate-800 text-sm max-w-[200px] truncate">
                     {address}
                   </div>
                 </div>
               </div>

               <div className="space-y-2 pt-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Service Fee</span>
                   <span className="font-medium text-slate-700">₹50</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg pt-2">
                   <span className="text-slate-900">Total to pay</span>
                   <span className="text-indigo-700">₹{totalAmount}</span>
                 </div>
               </div>
            </div>

            <div className="pt-4 flex justify-between">
               <button 
                 onClick={handleBack}
                 disabled={isProcessing}
                 className="text-slate-500 hover:text-slate-800 font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-colors disabled:opacity-50"
               >
                 <ArrowLeft className="w-5 h-5" /> Back
               </button>
               <button 
                 onClick={handleConfirm}
                 disabled={isProcessing}
                 className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-colors min-w-[160px] justify-center"
               >
                 {isProcessing ? (
                   <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                 ) : (
                   <>Confirm Booking <Check className="w-5 h-5" /></>
                 )}
               </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="py-8 flex flex-col items-center text-center space-y-4">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h3>
            <p className="text-slate-500 text-lg max-w-sm">
              Your appointment with <span className="font-bold text-slate-700">{provider.name}</span> has been successfully scheduled for {selectedDate} at {selectedTime}.
            </p>
            <div className="pt-8 w-full">
              <button 
                onClick={onClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        );
    }
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center px-4 sm:px-0 pb-4 sm:pb-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={step === 4 || isProcessing ? undefined : onClose}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md bg-white rounded-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          {step < 4 && (
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
              <div className="flex gap-2">
                {[1,2,3].map(i => (
                  <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-indigo-600' : i < step ? 'w-2 bg-indigo-200' : 'w-2 bg-slate-100'}`} />
                ))}
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto">
            {renderStep()}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
