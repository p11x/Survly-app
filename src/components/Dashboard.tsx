import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Bell, MapPin, Star, MessageCircle, Phone,
  Wrench, Zap, Sparkles, Car, Settings, Scissors, MoreHorizontal,
  Home, Calendar, FileText, User, LogOut, CheckCircle, ChevronRight, ChevronLeft, Loader2,
  AirVent, Package, Siren, MessageSquare
} from 'lucide-react';
import { services, providers } from '../data';
import { Role } from '../types';
import { auth, db } from '../lib/firebase';
import { ref, get, update } from 'firebase/database';
import ParticleBackground from './ParticleBackground';
import Typewriter from './Typewriter';
import MessagesView from './MessagesView';

const iconMap: Record<string, any> = {
  Wrench, Zap, Sparkles, Car, Settings, Scissors, MoreHorizontal, AirVent, Package, Siren
};

import SkeletonProviderCard from './SkeletonProviderCard';
import ProviderCard from './ProviderCard';
import ProviderDetailsModal from './ProviderDetailsModal';
import CategoryDetail from './CategoryDetail';

const emojiMap: Record<string, string> = {
  Wrench: '🔧',
  Zap: '⚡',
  Sparkles: '✨',
  Car: '🚗',
  Settings: '⚙️',
  Scissors: '✂️',
  MoreHorizontal: '⋯',
  AirVent: '❄️',
  Package: '📦',
  Siren: '🚨'
};

interface DashboardProps {
  role: Role;
  onLogout: () => void;
}

export default function Dashboard({ role, onLogout }: DashboardProps) {
  const [activeCategory, setActiveCategory] = useState(services[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [location, setLocation] = useState('Mumbai, MH');
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isLoadingProviders, setIsLoadingProviders] = useState(false);

  useEffect(() => {
    setIsLoadingProviders(true);
    const timer = setTimeout(() => {
      setIsLoadingProviders(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const activeProviders = providers.filter(
    (p) => p.serviceId === activeCategory && p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50/50 relative">
      <ParticleBackground />
      
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex flex-col relative border-r border-slate-800 bg-slate-950 backdrop-blur-xl transition-all duration-300 ease-in-out z-50 ${isSidebarMinimized ? 'w-[88px]' : 'w-[280px]'}`}>
        
        {/* Floating Toggle Button */}
        <button 
          onClick={() => setIsSidebarMinimized(!isSidebarMinimized)}
          className="absolute -right-3.5 top-12 bg-slate-800 border border-slate-700 rounded-full p-1.5 text-slate-400 hover:text-white shadow-sm transition-colors z-40 hidden md:block"
          title={isSidebarMinimized ? "Expand Sidebar" : "Minimize Sidebar"}
        >
          {isSidebarMinimized ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div className={`p-6 flex items-center h-24 ${isSidebarMinimized ? 'justify-center' : 'gap-3'}`}>
          <div className="w-10 h-10 shrink-0 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="font-bold text-lg text-white">S</span>
          </div>
          {!isSidebarMinimized && (
            <motion.span 
               initial={{ opacity: 0, width: 0 }}
               animate={{ opacity: 1, width: 'auto' }}
               exit={{ opacity: 0, width: 0 }}
               className="text-2xl font-bold tracking-tight text-white overflow-hidden whitespace-nowrap"
            >
              Survly
            </motion.span>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto custom-scrollbar">
          {!isSidebarMinimized && (
            <div className="px-4 text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4 mt-2">
              {role} Panel
            </div>
          )}
          <SidebarItem icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} minimized={isSidebarMinimized} />
          <SidebarItem icon={Sparkles} label="Home services" active={activeTab === 'home_services'} onClick={() => setActiveTab('home_services')} minimized={isSidebarMinimized} />
          <SidebarItem icon={Car} label="Vehicle care" active={activeTab === 'vehicle_care'} onClick={() => setActiveTab('vehicle_care')} minimized={isSidebarMinimized} />
          <SidebarItem icon={Scissors} label="Self care" active={activeTab === 'self_care'} onClick={() => setActiveTab('self_care')} minimized={isSidebarMinimized} />
          <SidebarItem icon={Calendar} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} minimized={isSidebarMinimized} />
          <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} minimized={isSidebarMinimized} />
          <SidebarItem icon={FileText} label="Requirements" active={activeTab === 'req'} onClick={() => setActiveTab('req')} minimized={isSidebarMinimized} />
          <SidebarItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} minimized={isSidebarMinimized} />
        </nav>

        <div className="p-4 m-4">
          {!isSidebarMinimized ? (
            <button onClick={onLogout} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium text-slate-400 bg-slate-900/50 border border-slate-800/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all shadow-sm">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          ) : (
            <button onClick={onLogout} title="Sign Out" className="flex items-center justify-center w-11 h-11 rounded-xl mx-auto text-slate-400 bg-slate-900/50 border border-slate-800/60 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all shadow-sm">
              <LogOut className="w-4 h-4 shrink-0" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Header - Fixed & Independent */}
        <header className="px-10 h-20 shrink-0 w-full flex items-center justify-between border-b border-slate-200/50 bg-white/60 backdrop-blur-xl sticky top-0 z-40 transition-all duration-300">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('location')}
            className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          >
            <MapPin className="w-4 h-4 text-indigo-500" />
            <span className="font-medium">{location}</span>
            <ChevronRight className="w-4 h-4 ml-1 text-slate-400" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative text-slate-500 p-2 hover:text-indigo-600 transition-colors group"
          >
            <Bell className="w-6 h-6 group-hover:animate-ring" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse-slow"></span>
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 pb-32 md:pb-6 custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute inset-0 p-6 pb-32 md:pb-6 overflow-y-auto custom-scrollbar"
            >
              {activeTab === 'home' && (
                role === 'user' ? (
                  <UserDashboardView
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeProviders={activeProviders}
                    isLoadingProviders={isLoadingProviders}
                  />
                ) : (
                  <ProviderDashboardView />
                )
              )}
              {activeTab === 'home_services' && <FilteredProvidersView categoryIds={['cleaning', 'plumbing', 'electrical', 'appliance']} title="Home services" />}
              {activeTab === 'vehicle_care' && <FilteredProvidersView categoryIds={['vehicle']} title="Vehicle care" />}
              {activeTab === 'self_care' && <FilteredProvidersView categoryIds={['beauty']} title="Self care" />}
              {activeTab === 'bookings' && <BookingsView />}
              {activeTab === 'messages' && <MessagesView />}
              {activeTab === 'req' && <RequirementsView />}
              {activeTab === 'profile' && <ProfileView role={role} onLogout={onLogout} />}
              {activeTab === 'location' && (
                <LocationView 
                  current={location} 
                  onSelect={(loc: string) => {
                    setLocation(loc);
                    setActiveTab('home');
                  }} 
                  onCancel={() => setActiveTab('home')} 
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-200 p-3 pb-safe z-50">
        <div className="flex overflow-x-auto hide-scrollbar gap-6 px-2">
          <MobileNavItem icon={Home} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <MobileNavItem icon={Sparkles} label="Home Care" active={activeTab === 'home_services'} onClick={() => setActiveTab('home_services')} />
          <MobileNavItem icon={Car} label="Vehicle" active={activeTab === 'vehicle_care'} onClick={() => setActiveTab('vehicle_care')} />
          <MobileNavItem icon={Scissors} label="Self Care" active={activeTab === 'self_care'} onClick={() => setActiveTab('self_care')} />
          <MobileNavItem icon={Calendar} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
        <MobileNavItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
        <MobileNavItem icon={FileText} label="Requests" active={activeTab === 'req'} onClick={() => setActiveTab('req')} />
        <MobileNavItem icon={User} label="Profile" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>
      </nav>
    </div>
  );
}

// Sub-components

function SidebarItem({ icon: Icon, label, active, onClick, minimized }: any) {
  return (
    <button
      onClick={onClick}
      title={minimized ? label : undefined}
      className={`relative flex items-center group rounded-xl transition-all ${
        minimized ? 'justify-center p-3 aspect-square mx-auto w-12' : 'px-4 py-3 gap-3 w-full'
      } ${
        active ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-white'
      }`}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active-indicator"
          className="absolute inset-0 bg-indigo-500/10 border border-indigo-500/20 rounded-xl -z-10"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`relative flex items-center justify-center ${active ? '' : 'group-hover:scale-110 transition-transform duration-200'}`}>
        <Icon className={`w-5 h-5 shrink-0 ${active ? 'stroke-[2.5px]' : 'stroke-2'}`} />
      </div>
      {!minimized && <span className="whitespace-nowrap overflow-hidden">{label}</span>}
    </button>
  );
}

function MobileNavItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 shrink-0 min-w-[64px]">
      <div className={`p-2 rounded-full transition-all ${active ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500'}`}>
         <Icon className="w-6 h-6" />
      </div>
      <span className={`text-[10px] font-medium ${active ? 'text-indigo-600' : 'text-slate-500'}`}>{label}</span>
    </button>
  );
}

function UserDashboardView({ activeCategory, setActiveCategory, searchQuery, setSearchQuery, activeProviders, isLoadingProviders }: any) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showCategoryDetail, setShowCategoryDetail] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // rough width of a card + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasDragged(false);
    if (scrollContainerRef.current) {
      setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setHasDragged(false), 50);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    if (scrollContainerRef.current) {
      const x = e.pageX - scrollContainerRef.current.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed multiplier
      if (Math.abs(walk) > 5) {
        setHasDragged(true);
      }
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Search & Banner */}
      <div className="space-y-6">
        <div className="mb-8">
           <h2 className="text-3xl font-bold text-slate-900 mb-2">
             Find your next <Typewriter phrases={['Home Service', 'Plumbing Fix', 'Electrical Repair', 'Deep Clean']} />
           </h2>
           <p className="text-slate-500">Hand-picked certified professionals with real-time availability.</p>
        </div>

        <motion.div 
          layout
          className="relative max-w-xl transition-all duration-300 focus-within:w-full focus-within:max-w-2xl"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
          <input
            type="text"
            placeholder="Search for providers or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="relative bg-white border border-slate-200 rounded-full py-3 pl-12 pr-4 text-sm w-full text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all shadow-sm focus:shadow-lg focus:-translate-y-0.5"
          />
        </motion.div>
      </div>

      {/* Categories Horizontal List */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-slate-900">Categories</h3>
          <div className="flex items-center gap-2 hidden md:flex">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('left')}
              className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors focus:outline-none"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              onClick={() => scroll('right')}
              className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors focus:outline-none"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
        <motion.div 
          ref={scrollContainerRef} 
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className={`flex gap-4 overflow-x-auto pb-6 hide-scrollbar pt-2 transition-all ${
            isDragging ? 'cursor-grabbing select-none snap-none' : 'cursor-grab snap-x'
          }`}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {services.map((service) => {
            const Icon = iconMap[service.iconName];
            const isActive = activeCategory === service.id;
            return (
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}
                whileHover={{ y: -6 }}
                key={service.id}
                onClick={(e) => {
                  if (hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                    return;
                  }
                  setActiveCategory(service.id);
                  setShowCategoryDetail(true);
                }}
                className={`group snap-start relative flex flex-col min-w-[260px] w-[260px] text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'border-indigo-400 bg-indigo-50/20 shadow-[0_8px_30px_rgba(99,102,241,0.2)] ring-1 ring-indigo-400'
                    : 'border-slate-200 bg-white hover:shadow-md'
                }`}
              >
                <div className="relative z-10 w-full h-full flex flex-col bg-white rounded-[15px] overflow-hidden">
                  <div className="h-32 w-full relative overflow-hidden">
                    {service.image ? (
                      <>
                        <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center transition-transform duration-600 ease-out group-hover:scale-110 text-slate-300">
                        <Icon className="w-12 h-12" />
                      </div>
                    )}
                    
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      viewport={{ once: true }}
                      className={`absolute bottom-3 left-4 p-2 rounded-xl shadow-lg border z-10 flex items-center justify-center w-12 h-12 ${
                      isActive ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-100 text-indigo-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </motion.div>
                  </div>
                  
                  <div className="pt-4 pb-5 px-5 bg-white flex-1">
                    <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">{service.name}</h4>
                    <p className="text-sm text-slate-500 line-clamp-1">{service.subtitle || 'Explore this category'}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showCategoryDetail && (
          <CategoryDetail 
            categoryId={activeCategory} 
            onClose={() => setShowCategoryDetail(false)} 
            onSubServiceSelect={(sub) => {
              // Can smoothly scroll down to providers or handle sub-service logic
              document.getElementById('providers-list')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        )}
      </AnimatePresence>

      {/* Providers List */}
      <motion.div 
        id="providers-list"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium text-slate-900">Available Providers</h3>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-xs font-semibold text-slate-600">{isLoadingProviders ? 'Searching...' : `${activeProviders.length} found`}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {isLoadingProviders ? (
              Array.from({ length: 3 }).map((_, i) => (
                <SkeletonProviderCard key={`skeleton-${i}`} />
              ))
            ) : activeProviders.length > 0 ? (
              activeProviders.map((provider: any) => (
                <ProviderCard 
                  key={provider.id} 
                  provider={provider} 
                  onViewDetails={() => setSelectedProvider(provider)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3 shadow-sm"
              >
                <Search className="w-8 h-8 text-slate-300" />
                <p>No providers found for this category.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>



      <ProviderDetailsModal 
        provider={selectedProvider} 
        isOpen={!!selectedProvider} 
        onClose={() => setSelectedProvider(null)} 
      />
    </div>
  );
}


function ProviderDashboardView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
       <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Provider Dashboard</h1>
        <p className="text-slate-500">Manage your incoming requests and schedule.</p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Today's Earnings" value="₹12,500.00" trend="+12%" />
          <StatCard title="Active Requests" value="3" trend="Pending" />
          <StatCard title="Profile Rating" value="4.8" trend="124 Reviews" />
       </div>

       <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[300px] flex items-center justify-center shadow-sm">
          <div className="text-center space-y-3">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Bell className="w-8 h-8 text-slate-400" />
             </div>
             <h3 className="text-xl font-medium text-slate-900">No new requests</h3>
             <p className="text-slate-500 text-sm">We'll notify you when someone needs your services nearby.</p>
          </div>
       </div>
    </div>
  );
}

function StatCard({ title, value, trend }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:border-indigo-200 transition-all shadow-sm">
       <p className="text-slate-500 uppercase tracking-widest text-xs font-semibold">{title}</p>
       <div className="flex items-end justify-between mt-4">
          <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
          <span className="text-indigo-600 text-sm font-medium">{trend}</span>
       </div>
    </div>
  );
}

function BookingsView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Bookings</h1>
        <p className="text-slate-500">Manage your upcoming and past appointments.</p>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center shadow-sm text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
          <Calendar className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-medium text-slate-900">No active bookings</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-sm">You haven't booked any services yet. Head over to the home page to explore available providers.</p>
      </div>
    </div>
  );
}

function RequirementsView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Requirements</h1>
          <p className="text-slate-500">Track and manage your custom service requests.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm">
          Post Requirement
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center shadow-sm text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
          <FileText className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-medium text-slate-900">No requirements posted</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-sm">Can't find exactly what you need? Post a custom requirement and let providers come to you.</p>
      </div>
    </div>
  );
}

function ProfileView({ role, onLogout }: any) {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', location: 'Mumbai, MH' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        try {
          const userRef = ref(db, `users/${auth.currentUser.uid}`);
          const snapshot = await get(userRef);
          const data = snapshot.exists() ? snapshot.val() : {};
          setProfile({
            name: data.name || auth.currentUser.displayName || '',
            email: data.email || auth.currentUser.email || '',
            phone: data.phone || auth.currentUser.phoneNumber || '',
            location: data.location || 'Mumbai, MH'
          });
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (auth.currentUser) {
      setSaving(true);
      try {
        const userRef = ref(db, `users/${auth.currentUser.uid}`);
        await update(userRef, {
          name: profile.name,
          phone: profile.phone,
          location: profile.location
        });
        // Feedback can be given via toast or button state
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setSaving(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Profile Settings</h1>
        <p className="text-slate-500">Manage your account details and preferences.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner uppercase">
            {profile.name ? profile.name.charAt(0) : 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{profile.name || 'User Account'}</h2>
            <p className="text-slate-500 capitalize">{role} Account</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Full Name</label>
              <input 
                type="text" 
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Email Address</label>
              <input 
                type="email" 
                value={profile.email}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 opacity-70 cursor-not-allowed" 
                readOnly 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <input 
                type="tel" 
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Location</label>
              <input 
                type="text" 
                value={profile.location}
                onChange={(e) => setProfile({...profile, location: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900" 
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
             <button 
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm"
             >
                {saving ? 'Saving...' : 'Save Changes'}
             </button>
             <button 
                onClick={onLogout} 
                className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2.5 rounded-xl transition-all shadow-sm"
             >
                Sign Out
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilteredProvidersView({ categoryIds, title }: { categoryIds: string[], title: string }) {
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const activeProviders = providers.filter(p => categoryIds.includes(p.serviceId));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500">Find top-rated professionals for {title.toLowerCase()}.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {activeProviders.length > 0 ? (
          activeProviders.map((provider: any) => (
            <ProviderCard 
              key={provider.id} 
              provider={provider} 
              onViewDetails={() => setSelectedProvider(provider)}
            />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3 shadow-sm">
            <Search className="w-8 h-8 text-slate-300" />
            <p>No providers found for this category.</p>
          </div>
        )}
      </div>

      <ProviderDetailsModal 
        provider={selectedProvider} 
        isOpen={!!selectedProvider} 
        onClose={() => setSelectedProvider(null)} 
      />
    </div>
  );
}

function LocationView({ current, onSelect, onCancel }: { current: string, onSelect: (loc: string) => void, onCancel: () => void }) {
  const [inputValue, setInputValue] = useState(current);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (inputValue.trim().length < 3) {
        setSuggestions([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(inputValue + ", India")}&limit=5`);
        const data = await res.json();
        if (data.features) {
          setSuggestions(data.features.map((f: any) => {
            const p = f.properties;
            const parts = [p.name, p.street, p.locality, p.district, p.city || p.town, p.state].filter(Boolean);
            return { display_name: [...new Set(parts)].join(', ') };
          }));
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (showDropdown) {
        fetchSuggestions();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, showDropdown]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSelect(inputValue.trim());
    }
  };

  const handleSelectSuggestion = (suggestion: any) => {
    setInputValue(suggestion.display_name);
    setShowDropdown(false);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setIsSearching(true);
        try {
          const res = await fetch(`https://photon.komoot.io/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
          const data = await res.json();
          if (data && data.features && data.features.length > 0) {
            const p = data.features[0].properties;
            const parts = [p.name, p.street, p.locality, p.district, p.city || p.town, p.state].filter(Boolean);
            setInputValue([...new Set(parts)].join(', '));
          } else {
            setInputValue('New Delhi, DL');
          }
        } catch (error) {
           setInputValue('New Delhi, DL');
        } finally {
          setIsSearching(false);
        }
      }, () => {
        setInputValue('New Delhi, DL');
      });
    } else {
      setInputValue('New Delhi, DL');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Location</h1>
          <p className="text-slate-500">Set your location to see relevant providers and services nearby.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-slate-700">Enter your city, zip code, or address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
              <input
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="e.g. Indiranagar, Bengaluru"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-12 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all text-lg"
              />
              {isSearching && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 animate-spin" />
              )}
            </div>
            
            {showDropdown && suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                <ul className="max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li 
                      key={index}
                      onClick={() => handleSelectSuggestion(suggestion)}
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 flex items-start gap-3"
                    >
                      <MapPin className="w-4 h-4 text-slate-400 mt-1 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 truncate">{suggestion.display_name.split(',')[0]}</p>
                        <p className="text-xs text-slate-500 truncate">{suggestion.display_name}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100 mt-12">
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-semibold py-2.5 px-6 rounded-xl transition-colors"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
              Use Current Location
            </button>
            <div className="flex-1"></div>
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold py-2.5 px-6 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-8 rounded-xl transition-all shadow-sm"
            >
              Save Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
