import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Bell, MapPin, Star, MessageCircle, Phone,
  Wrench, Zap, Sparkles, Car, Settings, Scissors, MoreHorizontal,
  Home, Calendar, FileText, User, Users, LogOut, CheckCircle, ChevronRight, ChevronLeft, Loader2, ShoppingCart, ChevronDown, CircleUser,
  AirVent, Package, Siren, MessageSquare, Briefcase, ClipboardList, Smartphone, Headphones, Wallet, Ticket, CreditCard, Info
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

import ProfileSubPage from "./ProfileSubPage";
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
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(true);
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
          {role?.trim().toLowerCase() === 'provider' ? (
            <>
              <SidebarItem icon={Sparkles} label="Add service" active={activeTab === 'add_service'} onClick={() => setActiveTab('add_service')} minimized={isSidebarMinimized} />
              <SidebarItem icon={Briefcase} label="My services" active={activeTab === 'my_services'} onClick={() => setActiveTab('my_services')} minimized={isSidebarMinimized} />
            </>
          ) : (
            <>
              <SidebarItem icon={Sparkles} label="Home services" active={activeTab === 'home_services'} onClick={() => setActiveTab('home_services')} minimized={isSidebarMinimized} />
              <SidebarItem icon={Car} label="Vehicle care" active={activeTab === 'vehicle_care'} onClick={() => setActiveTab('vehicle_care')} minimized={isSidebarMinimized} />
              <SidebarItem icon={Scissors} label="Self care" active={activeTab === 'self_care'} onClick={() => setActiveTab('self_care')} minimized={isSidebarMinimized} />
            </>
          )}
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
          <div className="flex items-center gap-4">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('location')}
              className="flex items-center gap-2 text-sm text-slate-600 bg-white px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm min-w-[260px] justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                <span className="font-medium truncate">{location === 'Mumbai, MH' ? 'A-22, Lakshmi Narsimha ...' : location}</span>
              </div>
              <ChevronDown className="w-4 h-4 ml-2 text-slate-500 shrink-0" />
            </motion.button>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search for 'Waxing'" 
                className="w-[320px] bg-white border border-slate-200 text-sm text-slate-500 rounded-xl px-11 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-sm"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors flex items-center justify-center w-11 h-11"
            >
              <ShoppingCart className="w-5 h-5 text-slate-900" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('profile')}
              className="hover:bg-slate-100 rounded-full transition-colors flex items-center justify-center w-11 h-11"
            >
              <CircleUser className="w-6 h-6 text-slate-900" strokeWidth={1.5} />
            </motion.button>
          </div>
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
                role?.trim().toLowerCase() === 'provider' ? (
                  <ProviderDashboardView />
                ) : (
                  <UserDashboardView
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    activeProviders={activeProviders}
                    isLoadingProviders={isLoadingProviders}
                  />
                )
              )}
              {activeTab === 'add_service' && <AddServiceView />}
              {activeTab === 'my_services' && <MyServicesView />}
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
          {role?.trim().toLowerCase() === 'provider' ? (
            <>
              <MobileNavItem icon={Sparkles} label="Add service" active={activeTab === 'add_service'} onClick={() => setActiveTab('add_service')} />
              <MobileNavItem icon={Briefcase} label="My services" active={activeTab === 'my_services'} onClick={() => setActiveTab('my_services')} />
            </>
          ) : (
            <>
              <MobileNavItem icon={Sparkles} label="Home Care" active={activeTab === 'home_services'} onClick={() => setActiveTab('home_services')} />
              <MobileNavItem icon={Car} label="Vehicle" active={activeTab === 'vehicle_care'} onClick={() => setActiveTab('vehicle_care')} />
              <MobileNavItem icon={Scissors} label="Self Care" active={activeTab === 'self_care'} onClick={() => setActiveTab('self_care')} />
            </>
          )}
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

      <AppServiceAdvantages />

      <ProviderDetailsModal 
        provider={selectedProvider} 
        isOpen={!!selectedProvider} 
        onClose={() => setSelectedProvider(null)} 
      />
    </div>
  );
}

function AppServiceAdvantages() {
  return (
    <div className="mt-16 space-y-6">
      <h2 className="text-3xl font-bold text-slate-900">Survly app service advantages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#f5f5f5] rounded-2xl p-8 relative overflow-hidden min-h-[320px] flex flex-col justify-between group">
          <div className="z-10 relative pr-4">
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Professional installation</h3>
            <p className="text-slate-600 text-lg">Only top technicians trained by Survly.</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=60" 
            alt="Professional installation" 
            className="absolute bottom-0 right-0 w-48 h-48 object-cover rounded-tl-3xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="bg-[#f5f5f5] rounded-2xl p-8 relative overflow-hidden min-h-[320px] flex flex-col justify-between group">
          <div className="z-10 relative">
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">24×7 expert support</h3>
            <p className="text-slate-600 text-lg">Talk to experts who understand the product.</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60" 
            alt="Expert support" 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 object-cover rounded-t-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="bg-[#f5f5f5] rounded-2xl p-8 relative overflow-hidden min-h-[320px] flex flex-col justify-between group">
          <div className="z-10 relative">
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">Servicing 14,500+ pin codes</h3>
            <p className="text-slate-600 text-lg">We never outsource service to locals.</p>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1569336415962-a4bd9f69c07b?w=600&auto=format&fit=crop&q=60" 
            alt="Servicing locations" 
            className="absolute bottom-0 right-0 w-48 h-48 object-cover opacity-80 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
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

function AddServiceView() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    const Icon = iconMap[service?.iconName || 'Settings'];
    return (
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <button onClick={() => setSelectedService(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors bg-slate-100">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
              {Icon && <Icon className="w-8 h-8 text-indigo-500" />} Add {service?.name}
            </h1>
            <p className="text-slate-500">Set your pricing and experience for {service?.name.toLowerCase()}.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm max-w-2xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSelectedService(null); }}>
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pricing (per hour)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
                    <input type="number" placeholder="499" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-8 pr-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Experience</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                     <option>1-2 Years</option>
                     <option>3-5 Years</option>
                     <option>5+ Years</option>
                  </select>
                </div>
             </div>
             <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors">
               Save & Publish Service
             </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Add a Service</h1>
        <p className="text-slate-500">Select the category of service you want to provide.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = iconMap[service.iconName];
          return (
            <button
              key={service.id}
              onClick={() => setSelectedService(service.id)}
              className="group relative flex flex-col w-full text-left rounded-2xl border border-slate-200 bg-white hover:shadow-md hover:border-indigo-300 transition-all duration-300 overflow-hidden"
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
                      {Icon && <Icon className="w-12 h-12" />}
                    </div>
                  )}
                  
                  <div className="absolute bottom-3 left-4 p-2 rounded-xl shadow-lg border z-10 flex items-center justify-center w-12 h-12 bg-white border-slate-100 text-indigo-500 group-hover:bg-indigo-50 transition-colors">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                </div>
                
                <div className="pt-4 pb-5 px-5 bg-white flex-1">
                  <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-indigo-600 transition-colors">{service.name}</h4>
                  <p className="text-sm text-slate-500 line-clamp-1">{service.subtitle || 'Explore this category'}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MyServicesView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Services</h1>
        <p className="text-slate-500">Manage your added services and currently running services.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-indigo-500" /> Added Services
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-slate-900">Home Cleaning</h4>
                <p className="text-sm text-slate-500">₹499/hr • 4.8 Rating</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-medium text-slate-900">Electrical Repair</h4>
                <p className="text-sm text-slate-500">₹299/hr • 4.9 Rating</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Loader2 className="w-5 h-5 text-indigo-500 animate-spin" /> Running Services
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-slate-900">AC Servicing</h4>
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-md">In Progress</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">Customer: Rahul Sharma • Started 45m ago</p>
              <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <p className="text-xs text-slate-500 text-right">Estimated completion: 15 mins</p>
            </div>
          </div>
        </div>
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
  const [currentView, setCurrentView] = useState('main');

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

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (currentView !== 'main') {
    return <ProfileSubPage view={currentView} onBack={() => setCurrentView('main')} profile={profile} setProfile={setProfile} />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="flex items-center gap-6 mb-8 pt-4">
        <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner uppercase">
          {profile.name ? profile.name.charAt(0) : 'U'}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{profile.name || 'User Account'}</h2>
          <p className="text-slate-500">{profile.phone || profile.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div onClick={() => setCurrentView('bookings')} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-200 transition-all">
          <ClipboardList className="w-6 h-6 text-slate-700" />
          <span className="font-semibold text-slate-900 text-sm sm:text-base">My bookings</span>
        </div>
        <div onClick={() => setCurrentView('devices')} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-200 transition-all">
          <Smartphone className="w-6 h-6 text-slate-700" />
          <span className="font-semibold text-slate-900 text-sm sm:text-base">Native devices</span>
        </div>
        <div onClick={() => setCurrentView('support')} className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col gap-3 shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-200 transition-all">
          <Headphones className="w-6 h-6 text-slate-700" />
          <span className="font-semibold text-slate-900 text-sm sm:text-base">Help & support</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col">
          <ProfileListItem icon={FileText} label="My Plans" onClick={() => setCurrentView('plans')} />
          <ProfileListItem icon={Wallet} label="Wallet" onClick={() => setCurrentView('wallet')} />
          <ProfileListItem icon={Ticket} label="Passes & membership" onClick={() => setCurrentView('passes')} />
          <ProfileListItem icon={Star} label="My rating" onClick={() => setCurrentView('rating')} />
          <ProfileListItem icon={MapPin} label="Manage addresses" onClick={() => setCurrentView('addresses')} />
          <ProfileListItem icon={CreditCard} label="Manage payment methods" onClick={() => setCurrentView('payment')} />
          <ProfileListItem icon={Settings} label="Settings" onClick={() => setCurrentView('settings')} />
          <ProfileListItem icon={Info} label="About Survly" onClick={() => setCurrentView('about')} />
        </div>
      </div>

      <div onClick={() => setCurrentView('refer')} className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-sm gap-4 cursor-pointer hover:shadow-md transition-all">
        <div>
          <h3 className="text-xl font-bold text-slate-900">Refer & earn ₹50</h3>
          <p className="text-slate-600 text-sm mt-1">Get ₹50 when your friend completes their first booking.</p>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=150&auto=format&fit=crop&q=60" 
          alt="Gift Box"
          className="w-16 h-16 object-cover rounded-xl shrink-0 mix-blend-multiply"
        />
      </div>

      <div className="pt-6">
        <button 
          onClick={onLogout} 
          className="w-full sm:w-auto bg-white border border-red-200 text-red-600 hover:bg-red-50 font-semibold py-3 px-8 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mx-auto"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </div>
  );
}

function ProfileListItem({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex items-center justify-between p-4 sm:px-6 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-0 transition-colors">
      <div className="flex items-center gap-4">
        <Icon className="w-5 h-5 text-slate-600" />
        <span className="text-slate-800 font-medium text-sm sm:text-base">{label}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-slate-400" />
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

      {title === 'Self care' && <BeautyServicesSection />}
      {title === 'Vehicle care' && <VehicleCareSection />}
      {title === 'Home services' && <HomeServicesSection />}

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

function BeautyServicesSection() {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">Beauty services at your<br/>doorstep</h2>
        
        <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <ServiceIcon title="Salon for Women" image="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Spa for Women" image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150&auto=format&fit=crop&q=60" badge="44 mins" />
            <ServiceIcon title="Hair Studio for Women" image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Makeup, Saree & Styling" image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Salon Royale" image="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Massage for Men" image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=150&auto=format&fit=crop&q=60" badge="44 mins" />
            <ServiceIcon title="Hair cut for men" image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Bridal Packages" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/PreBridalPackages.webp?alt=media&token=11dfa8c8-170d-4531-b2ab-d520c37cd526" />
            <ServiceIcon title="Skin Care Clinic" image="https://images.unsplash.com/photo-1552693673-1bf958298935?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Yoga & Meditation classes" image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Therapy & Counseling" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/young-indian-man-consulting-with-professional-psychologist-sitting-indoor.webp?alt=media&token=cc681791-ac1e-4d72-9ff7-e99139a6cd88" />
            <ServiceIcon title="Tattoo & Piercing" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/photo-1565058379802-bbe93b2f703a.webp?alt=media&token=48bdd05b-f0e5-4be3-8b30-adabd96b3d0d" />
            <ServiceIcon title="Ayurveda & Alternative Medicine" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/ayurveda-20938663.webp?alt=media&token=bf303e5c-6fbc-4cc8-822e-c90ba3853914" />
          </div>
        </div>

        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-slate-800" />
            <div>
              <div className="text-2xl font-bold text-slate-900">4.8</div>
              <div className="text-sm text-slate-500">Service Rating*</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-slate-800" />
            <div>
              <div className="text-2xl font-bold text-slate-900">12M+</div>
              <div className="text-sm text-slate-500">Customers Globally*</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-full">
        <img 
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&auto=format&fit=crop&q=60" 
          alt="Hair Salon" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&auto=format&fit=crop&q=60" 
          alt="Haircut" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1615396899839-c99c121888b0?w=600&auto=format&fit=crop&q=60" 
          alt="Skin care facial" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&auto=format&fit=crop&q=60" 
          alt="Skin care products" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

function VehicleCareSection() {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">Vehicle care at your<br/>doorstep</h2>
        
        <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <ServiceIcon title="Oil Change" image="https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Brake Repair" image="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=150&auto=format&fit=crop&q=60" badge="30 mins" />
            <ServiceIcon title="Battery Replacement" image="https://images.unsplash.com/photo-1620064916958-605375619af8?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Tire Services" image="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="General Repair" image="https://images.unsplash.com/photo-1504222490345-c075b6008014?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Car Service" image="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=150&auto=format&fit=crop&q=60" badge="60 mins" />
            <ServiceIcon title="Advanced Mechanical & Fluid Services" image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Deep Cleaning & Aesthetics" image="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Electric Vehicle (EV) Services" image="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=150&auto=format&fit=crop&q=60" />
          </div>
        </div>

        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-slate-800" />
            <div>
              <div className="text-2xl font-bold text-slate-900">4.9</div>
              <div className="text-sm text-slate-500">Service Rating*</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-slate-800" />
            <div>
              <div className="text-2xl font-bold text-slate-900">8M+</div>
              <div className="text-sm text-slate-500">Customers Globally*</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-full">
        <img 
          src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&auto=format&fit=crop&q=60" 
          alt="Mechanic" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=600&auto=format&fit=crop&q=60" 
          alt="Car Wash" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=60" 
          alt="Car Driving" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&auto=format&fit=crop&q=60" 
          alt="Engine Repair" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

function HomeServicesSection() {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-4xl font-bold text-slate-900 leading-tight">Home services at your<br/>doorstep</h2>
        
        <div className="border border-slate-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="grid grid-cols-3 gap-y-8 gap-x-4">
            <ServiceIcon title="Visit & inspection" image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Tap or minor leak repair" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" badge="30 mins" />
            <ServiceIcon title="Toilet repair" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Pipe blockage removal" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Bathroom fitting installation" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Switchboard repair" image="https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Fan installation" image="https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Wiring replacement" image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60" badge="60 mins" />
            <ServiceIcon title="1 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="2 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Sofa Cleaning" image="https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Bathroom Cleaning" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Drain Jetting" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Geyser/Water Heater Installation & Repair" image="https://images.unsplash.com/photo-1585772391269-897c9b0e2586?w=150&auto=format&fit=crop&q=60" />
            <ServiceIcon title="Painting & Wall Putty" image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=60" />
          </div>
        </div>

        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-slate-800" />
            <div>
              <div className="text-2xl font-bold text-slate-900">4.8</div>
              <div className="text-sm text-slate-500">Service Rating*</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-slate-800" />
            <div>
              <div className="text-2xl font-bold text-slate-900">10M+</div>
              <div className="text-sm text-slate-500">Customers Globally*</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 h-full">
        <img 
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60" 
          alt="Cleaning Service" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&auto=format&fit=crop&q=60" 
          alt="Electrical Repair" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=60" 
          alt="Plumbing" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
        <img 
          src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=60" 
          alt="Painting" 
          className="w-full h-[280px] object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

function ServiceIcon({ title, image, badge }: { title: string, image: string, badge?: string }) {
  return (
    <div className="flex flex-col items-center text-center gap-3">
      <div className="relative">
        <div className="w-20 h-16 bg-[#f5f5f5] rounded-xl flex items-center justify-center overflow-hidden">
          <img src={image} alt={title} className="w-12 h-12 object-cover rounded-lg" />
        </div>
        {badge && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded shadow-sm text-[10px] font-medium text-emerald-600 border border-slate-100 whitespace-nowrap">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs font-medium text-slate-800 leading-tight px-1">{title}</span>
    </div>
  );
}
