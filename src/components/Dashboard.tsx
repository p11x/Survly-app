import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Bell, MapPin, Star, MessageCircle, Phone,
  Wrench, Zap, Sparkles, Plus, Clock, Car, Settings, Scissors, MoreHorizontal,
  Home, Calendar, FileText, User, Users, LogOut, CheckCircle, ChevronRight, ChevronLeft, Loader2, ShoppingCart, ChevronDown, CircleUser,
  AirVent, Package, Siren, MessageSquare, Briefcase, ClipboardList, Smartphone, Headphones, Wallet, Ticket, CreditCard, Info
, XCircle, Gift, Share2, Copy, TrendingUp, Camera, Shield, Check , Banknote,
  Paintbrush, Bug, Hammer, Flower2, Sun, Shirt, ShieldCheck, Flame
} from 'lucide-react';
import { services, providers, categorySubServices } from '../data';
import { Role } from '../types';
import { auth, db } from '../lib/firebase';
import { ref, get, update, onValue } from 'firebase/database';
import ParticleBackground from './ParticleBackground';
import Typewriter from './Typewriter';
import MessagesView from './MessagesView';

const iconMap: Record<string, any> = {
  Wrench, Zap, Sparkles, Plus, Clock, Car, Settings, Scissors, MoreHorizontal, AirVent, Package, Siren,
  Paintbrush, Bug, Hammer, Flower2, Sun, Shirt, ShieldCheck, Shield
};

import ProfileSubPage from "./ProfileSubPage";
import SkeletonProviderCard from './SkeletonProviderCard';
import ProviderCard from './ProviderCard';
import ProviderDetailsModal from './ProviderDetailsModal';
import CategoryDetail from './CategoryDetail';
import AdvancedOffersSlideshow from './AdvancedOffersSlideshow';

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
  Siren: '🚨',
  Paintbrush: '🎨',
  Bug: '🐜',
  Hammer: '🔨',
  Flower2: '🌱',
  Sun: '☀️',
  Shirt: '👔',
  ShieldCheck: '🛡️',
  Shield: '🔒'
};

interface DashboardProps {
  role: Role;
  onLogout: () => void;
}

export default function Dashboard({ role, onLogout }: DashboardProps) {
  const [activeCategory, setActiveCategory] = useState(services[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [chatContext, setChatContext] = useState<any>(null);

  useEffect(() => {
    const handleOpenChat = (e: any) => {
      setChatContext(e.detail);
      setActiveTab('messages');
    };
    window.addEventListener('open-chat', handleOpenChat as EventListener);
    return () => window.removeEventListener('open-chat', handleOpenChat as EventListener);
  }, []);
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
          <SidebarItem icon={FileText} label={role?.trim().toLowerCase() === 'provider' ? "User requests" : "Requirements"} active={activeTab === 'req'} onClick={() => setActiveTab('req')} minimized={isSidebarMinimized} />
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
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search for 'Waxing'" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[260px] sm:w-[320px] bg-white border border-slate-200 text-sm text-slate-700 placeholder:text-slate-400 rounded-xl px-11 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow shadow-xs"
              />
            </div>
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
              {activeTab === 'messages' && <MessagesView initialContext={chatContext} />}
              {activeTab === 'req' && (role?.trim().toLowerCase() === 'provider' ? <UserRequestsView /> : <RequirementsView />)}
              {activeTab === 'profile' && <ProfileView role={role} onLogout={onLogout} />}
              {activeTab === 'refer' && <ReferPage />}
              {activeTab !== 'refer' && activeTab !== 'location' && <ReferAndEarnBanner onClick={() => setActiveTab('refer')} />}
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
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [showCategoryDetail, setShowCategoryDetail] = useState(true);

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

      {/* Advanced Offers Slideshow */}
      <AdvancedOffersSlideshow 
        onSelectCategory={(catId) => {
          setActiveCategory(catId);
          setShowCategoryDetail(true);
        }}
      />

      {/* Categories 4x4 Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Categories</h3>
            <p className="text-xs text-slate-500 mt-0.5">Explore all 16 on-demand services available in your area</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
            16 Services
          </span>
        </div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 pt-2"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.04
              }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {services.map((service) => {
            const Icon = iconMap[service.iconName] || Settings;
            const isActive = activeCategory === service.id;
            return (
              <motion.button
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                }}
                whileHover={{ y: -5 }}
                key={service.id}
                onClick={() => {
                  setActiveCategory(service.id);
                  setShowCategoryDetail(true);
                }}
                className={`group relative flex flex-col w-full text-left rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isActive
                    ? 'border-indigo-500 bg-indigo-50/20 shadow-[0_8px_30px_rgba(99,102,241,0.2)] ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div className="relative z-10 w-full h-full flex flex-col bg-white rounded-[15px] overflow-hidden">
                  <div className="h-28 sm:h-32 w-full relative overflow-hidden bg-slate-100">
                    {service.image ? (
                      <>
                        <img 
                          src={service.image} 
                          alt={service.name} 
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                        <Icon className="w-10 h-10" />
                      </div>
                    )}
                    
                    <div className={`absolute bottom-2.5 left-3 p-2 rounded-xl shadow-md border z-10 flex items-center justify-center w-10 h-10 transition-colors ${
                      isActive ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-white border-slate-100 text-indigo-600 group-hover:bg-indigo-50'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="p-3.5 sm:p-4 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-indigo-600 transition-colors line-clamp-1">{service.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{service.subtitle || 'Explore this category'}</p>
                    </div>
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
function LocationView({ current, onSelect, onCancel }: { current: string, onSelect: (loc: string) => void, onCancel: () => void }) {
  const [search, setSearch] = useState('');
  const popularCities = ['Mumbai, MH', 'Delhi, DL', 'Bengaluru, KA', 'Hyderabad, TS', 'Chennai, TN', 'Pune, MH'];
  
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
        <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Select Location</h2>
          <p className="text-slate-500">Choose your city to find services nearby</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search for your city..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
        />
      </div>

      <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors">
        <MapPin className="w-5 h-5" /> Use my current location
      </button>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Popular Cities</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {popularCities.map(city => (
            <button 
              key={city}
              onClick={() => onSelect(city)}
              className={`p-4 rounded-xl border text-sm font-bold transition-all ${current === city ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:shadow-sm'}`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}










function BeautyServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Beauty services at your<br/><span className="text-indigo-600">doorstep</span></h2>
        <div className="border border-slate-200 rounded-[2rem] p-8 bg-white/80 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 relative z-10">
            <ServiceIcon title="Salon for Women" image="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Salon for Women", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Spa for Women" image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=150&auto=format&fit=crop&q=60" badge="44 mins" onClick={() => onSelectSubService?.({title: "Spa for Women", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80", badge: "44 mins"})} />
            <ServiceIcon title="Hair Studio for Women" image="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Hair Studio for Women", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Makeup, Saree & Styling" image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Makeup, Saree & Styling", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Salon Royale" image="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Salon Royale", image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Massage for Men" image="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=150&auto=format&fit=crop&q=60" badge="44 mins" onClick={() => onSelectSubService?.({title: "Massage for Men", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&auto=format&fit=crop&q=80", badge: "44 mins"})} />
            <ServiceIcon title="Hair cut for men" image="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Hair cut for men", image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bridal Packages" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/PreBridalPackages.webp?alt=media&token=11dfa8c8-170d-4531-b2ab-d520c37cd526" onClick={() => onSelectSubService?.({title: "Bridal Packages", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/PreBridalPackages.webp?alt=media&token=11dfa8c8-170d-4531-b2ab-d520c37cd526"})} />
            <ServiceIcon title="Skin Care Clinic" image="https://images.unsplash.com/photo-1552693673-1bf958298935?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Skin Care Clinic", image: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Yoga & Meditation classes" image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Yoga & Meditation classes", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Therapy & Counseling" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/young-indian-man-consulting-with-professional-psychologist-sitting-indoor.webp?alt=media&token=cc681791-ac1e-4d72-9ff7-e99139a6cd88" onClick={() => onSelectSubService?.({title: "Therapy & Counseling", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/young-indian-man-consulting-with-professional-psychologist-sitting-indoor.webp?alt=media&token=cc681791-ac1e-4d72-9ff7-e99139a6cd88"})} />
            <ServiceIcon title="Tattoo & Piercing" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/photo-1565058379802-bbe93b2f703a.webp?alt=media&token=48bdd05b-f0e5-4be3-8b30-adabd96b3d0d" onClick={() => onSelectSubService?.({title: "Tattoo & Piercing", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/photo-1565058379802-bbe93b2f703a.webp?alt=media&token=48bdd05b-f0e5-4be3-8b30-adabd96b3d0d"})} />
            <ServiceIcon title="Ayurveda & Alternative Medicine" image="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/ayurveda-20938663.webp?alt=media&token=bf303e5c-6fbc-4cc8-822e-c90ba3853914" onClick={() => onSelectSubService?.({title: "Ayurveda & Alternative Medicine", image: "https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/ayurveda-20938663.webp?alt=media&token=bf303e5c-6fbc-4cc8-822e-c90ba3853914"})} />
          </div>
        </div>
        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <Star className="w-8 h-8 text-indigo-500" />
            <div>
              <div className="text-2xl font-black text-slate-900">4.9/5</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
      <SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
          "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80"
        ]}
        badge="Premium Care"
        stats={{ value1: "100%", label1: "Verified Experts", value2: "4.9/5", label2: "Average Rating" }}
      />
    </div>
  );
}

function VehicleCareSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Vehicle care at your<br/><span className="text-indigo-600">doorstep</span></h2>
        <div className="border border-slate-200 rounded-[2rem] p-8 bg-white/80 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 relative z-10">
            <ServiceIcon title="Car Cleaning" image="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Car Cleaning", image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bike Service" image="https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bike Service", image: "https://images.unsplash.com/photo-1589716806898-052ab65551bd?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Car oil service" image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Car oil service", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Vehicle inspection" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Vehicle inspection", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Brake inspection & service" image="https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Brake inspection & service", image: "https://images.unsplash.com/photo-1558522195-e1201b090344?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Roadside assistance" image="https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Roadside assistance", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&auto=format&fit=crop&q=80"})} />
          </div>
        </div>
      </div>
      <SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&q=80",
          "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80"
        ]}
        badge="Expert Mechanics"
        stats={{ value1: "30 Min", label1: "Response Time", value2: "10k+", label2: "Vehicles Serviced" }}
      />
    </div>
  );
}

function HomeServicesSection({ onSelectSubService }: { onSelectSubService?: (sub: {title: string, image: string, badge?: string}) => void }) {
  return (
    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8 relative z-10">
        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">Home services at your<br/><span className="text-indigo-600">doorstep</span></h2>
        <div className="border border-slate-200 rounded-[2rem] p-8 bg-white/80 backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="grid grid-cols-3 gap-y-8 gap-x-4 relative z-10">
            <ServiceIcon title="Visit & inspection" image="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Visit & inspection", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Tap or minor leak repair" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" badge="30 mins" onClick={() => onSelectSubService?.({title: "Tap or minor leak repair", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80", badge: "30 mins"})} />
            <ServiceIcon title="Toilet repair" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Toilet repair", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Pipe blockage removal" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Pipe blockage removal", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bathroom fitting installation" image="https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bathroom fitting installation", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Switchboard repair" image="https://images.unsplash.com/photo-1558522195-e1201b090344?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Switchboard repair", image: "https://images.unsplash.com/photo-1558522195-e1201b090344?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Fan installation" image="https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Fan installation", image: "https://images.unsplash.com/photo-1519643381401-22c77e60520e?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Wiring replacement" image="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=150&auto=format&fit=crop&q=60" badge="60 mins" onClick={() => onSelectSubService?.({title: "Wiring replacement", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&auto=format&fit=crop&q=80", badge: "60 mins"})} />
            <ServiceIcon title="1 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "1 BHK Deep Cleaning", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="2 BHK Deep Cleaning" image="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "2 BHK Deep Cleaning", image: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Sofa Cleaning" image="https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Sofa Cleaning", image: "https://images.unsplash.com/photo-1558211583-d26f610c1eb1?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Bathroom Cleaning" image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Bathroom Cleaning", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Drain Jetting" image="https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Drain Jetting", image: "https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Geyser/Water Heater Installation & Repair" image="https://images.unsplash.com/photo-1585772391269-897c9b0e2586?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Geyser/Water Heater Installation & Repair", image: "https://images.unsplash.com/photo-1585772391269-897c9b0e2586?w=800&auto=format&fit=crop&q=80"})} />
            <ServiceIcon title="Painting & Wall Putty" image="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=150&auto=format&fit=crop&q=60" onClick={() => onSelectSubService?.({title: "Painting & Wall Putty", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80"})} />
          </div>
        </div>
        <div className="flex items-center gap-12 pt-4">
          <div className="flex items-center gap-4">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
            <div>
              <div className="text-2xl font-black text-slate-900">1M+</div>
              <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Happy Homes</div>
            </div>
          </div>
        </div>
      </div>
      <SectionVisuals 
        images={[
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80",
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
        ]}
        badge="Trusted Pros"
        stats={{ value1: "1M+", label1: "Happy Homes", value2: "₹1Cr", label2: "Insurance Cover" }}
      />
    </div>
  );
}


function MyPlansView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium px-4 md:px-0">
        <ChevronLeft className="w-5 h-5" /> Back to Profile
      </button>

      <div className="bg-white border border-slate-200 rounded-[2rem] p-8 md:p-14 shadow-sm text-center">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Survly <span className="text-violet-600">Plus</span></h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-12">
          Get exclusive benefits, priority support, and save up to ₹5000 a year.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          {/* Basic Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col">
            <h3 className="text-lg font-bold text-slate-900">Basic</h3>
            <p className="text-slate-500 text-sm mb-6">Standard account</p>
            <div className="text-4xl font-black text-slate-900 mb-8">Free</div>
            
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">Verified professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">Standard pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="text-slate-700">Basic support</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-500">No priority booking</span>
              </div>
              <div className="flex items-center gap-3 opacity-60">
                <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                <span className="text-slate-500">Standard cancellation fees</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl font-bold bg-slate-50 text-slate-500 border border-slate-200 cursor-default">
              Current Plan
            </button>
          </div>

          {/* Plus Card */}
          <div className="bg-slate-50/50 border-[3px] border-violet-500 rounded-3xl p-8 flex flex-col relative shadow-[0_0_40px_rgba(139,92,246,0.15)]">
            <div className="absolute -top-[14px] right-8 bg-gradient-to-r from-violet-600 to-purple-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm">
              MOST POPULAR
            </div>
            <h3 className="text-lg font-bold text-slate-900">Plus</h3>
            <p className="text-violet-600 text-sm mb-6">For regular users</p>
            <div className="flex items-end gap-1 mb-2">
              <div className="text-4xl font-black text-slate-900">₹299</div>
              <div className="text-slate-500 font-medium mb-1">/mo</div>
            </div>
            <p className="text-emerald-600 text-sm font-bold mb-8">Save 20% on yearly billing</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">10% off on all services</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Priority customer support</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Zero cancellation fees</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Top-rated pros guarantee</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-violet-600 shrink-0" />
                <span className="text-slate-700">Exclusive partner offers</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
              Upgrade to Plus
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

function PlaceholderView({ title, onBack }: { title: string, onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-16 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center h-[55vh]">
        <div className="w-20 h-20 bg-indigo-50/80 rounded-full flex items-center justify-center text-indigo-500 mb-6">
          <Settings className="w-10 h-10" />
        </div>
        <h2 className="text-[26px] font-bold text-slate-900 mb-3 tracking-tight">{title}</h2>
        <p className="text-slate-500 max-w-md text-[15px] leading-relaxed">
          This section is currently being updated to meet our stunning and enterprise-grade aesthetic standards. Check back soon!
        </p>
      </div>
    </div>
  );
}


function WalletView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-indigo-200 font-medium mb-2 flex items-center gap-2"><Wallet className="w-5 h-5"/> Available Balance</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">₹1,250<span className="text-xl text-indigo-300 font-medium">.00</span></h2>
          </div>
          <button className="bg-white text-indigo-900 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto">
            + Add Money
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400"/> Recent Transactions</h3>
        <div className="space-y-4">
          {[
            { title: 'Added to wallet', date: 'Today, 2:30 PM', amount: '+ ₹500', type: 'credit' },
            { title: 'AC Service Payment', date: 'Yesterday, 11:15 AM', amount: '- ₹299', type: 'debit' },
            { title: 'Referral Bonus', date: 'Aug 12, 4:00 PM', amount: '+ ₹50', type: 'credit' },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'credit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {tx.type === 'credit' ? <Plus className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{tx.title}</h4>
                  <p className="text-sm text-slate-500">{tx.date}</p>
                </div>
              </div>
              <div className={`font-black text-lg ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                {tx.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembershipsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-[2.5rem] p-10 md:p-14 shadow-xl text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center mb-6 shadow-lg border border-white/30">
            <Ticket className="w-10 h-10 text-white drop-shadow-md" />
          </div>
          <h2 className="text-4xl font-black mb-3 drop-shadow-md">Survly Elite Pass</h2>
          <p className="text-amber-100 text-lg max-w-lg mx-auto mb-8 font-medium">You don't have an active membership pass. Upgrade to get exclusive perks.</p>
          <button className="bg-white text-orange-600 font-bold text-lg py-4 px-10 rounded-full shadow-xl hover:scale-105 transition-transform">
            Explore Passes
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Your Average Rating</h3>
          <div className="text-7xl font-black text-slate-900 my-4 flex items-center gap-2">
            4.8 <Star className="w-12 h-12 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-slate-500 font-medium">Based on 12 recent services</p>
        </div>
        
        <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex flex-col justify-center">
          <h4 className="font-bold text-slate-900 mb-6">Rating Breakdown</h4>
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1 w-12 font-medium text-slate-600">
                {stars} <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: stars === 5 ? '80%' : stars === 4 ? '15%' : stars === 3 ? '5%' : '0%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AddressesView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Saved Addresses</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add New
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { type: 'Home', address: 'A-22, Lakshmi Narsimha Apartments, Andheri West, Mumbai, MH 400053', icon: Home, default: true },
          { type: 'Office', address: 'TechPark Block C, 4th Floor, Powai, Mumbai, MH 400076', icon: Briefcase, default: false }
        ].map((addr, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative group hover:border-indigo-200 transition-colors">
            {addr.default && <span className="absolute top-6 right-6 bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">DEFAULT</span>}
            <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center mb-6 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <addr.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{addr.type}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{addr.address}</p>
            <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
              <button className="text-indigo-600 font-semibold text-sm hover:text-indigo-800">Edit</button>
              <button className="text-red-500 font-semibold text-sm hover:text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Payment Methods</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Card
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="flex justify-between items-start relative z-10">
            <CreditCard className="w-10 h-10 text-white/80" />
            <span className="font-black italic text-xl">VISA</span>
          </div>
          <div className="relative z-10">
            <div className="text-2xl font-mono tracking-widest mb-2 opacity-90">•••• •••• •••• 4242</div>
            <div className="flex justify-between text-sm opacity-60 font-medium tracking-widest uppercase">
              <span>Pavan Teja K</span>
              <span>12/25</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-500 transition-colors cursor-pointer min-h-[220px]">
          <Plus className="w-10 h-10 mb-4" />
          <span className="font-bold text-lg text-slate-600">Add New Payment Method</span>
          <p className="text-sm mt-2 text-center">Support for Credit, Debit, and UPI</p>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <h2 className="text-2xl font-black text-slate-900 px-2">App Settings</h2>

      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Push Notifications</h4>
            <p className="text-slate-500 text-sm mt-1">Receive updates about your bookings</p>
          </div>
          <div className="w-14 h-8 bg-indigo-500 rounded-full p-1 cursor-pointer transition-colors">
            <div className="w-6 h-6 bg-white rounded-full translate-x-6 shadow-sm"></div>
          </div>
        </div>
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Email Updates</h4>
            <p className="text-slate-500 text-sm mt-1">Offers, newsletters, and receipts</p>
          </div>
          <div className="w-14 h-8 bg-slate-200 rounded-full p-1 cursor-pointer transition-colors">
            <div className="w-6 h-6 bg-white rounded-full shadow-sm"></div>
          </div>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 text-lg">Location Services</h4>
            <p className="text-slate-500 text-sm mt-1">Allow Survly to access your precise location</p>
          </div>
          <div className="w-14 h-8 bg-indigo-500 rounded-full p-1 cursor-pointer transition-colors">
            <div className="w-6 h-6 bg-white rounded-full translate-x-6 shadow-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-[2rem] mx-auto flex items-center justify-center shadow-xl shadow-indigo-200 mb-8 transform -rotate-3 hover:rotate-0 transition-transform">
           <span className="font-black text-5xl text-white">S</span>
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Survly</h2>
        <p className="text-slate-500 font-medium text-lg mb-2">Version 2.0.4 (Build 4921)</p>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">The premium home service and utility platform for the modern world. Built with ❤️</p>

        <div className="flex justify-center gap-4">
          <button className="text-indigo-600 font-bold px-6 py-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">Terms of Service</button>
          <button className="text-indigo-600 font-bold px-6 py-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
}

function NativeDevicesView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Native Devices</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Device
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-center gap-6 group hover:border-indigo-200 transition-colors">
          <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-50 transition-colors shrink-0 border border-slate-100">
            <Smartphone className="w-10 h-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-bold text-slate-900">iPhone 14 Pro</h3>
              <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <p className="text-slate-500 text-sm">Last synced: Just now</p>
            <button className="text-indigo-600 text-sm font-semibold mt-3">Manage Device</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2.5rem] p-10 md:p-14 shadow-xl text-center text-white">
        <Headphones className="w-16 h-16 mx-auto mb-6 opacity-90 drop-shadow-md" />
        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight drop-shadow-sm">How can we help you?</h2>
        <p className="text-indigo-100 text-lg max-w-lg mx-auto mb-10">Our enterprise support team is available 24/7 to assist you with any questions or concerns.</p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl w-full sm:w-auto shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-3">
            <MessageCircle className="w-5 h-5" /> Chat with us
          </button>
          <button className="bg-indigo-700/50 backdrop-blur-sm border border-white/20 text-white font-bold px-8 py-4 rounded-2xl w-full sm:w-auto shadow-lg hover:bg-indigo-700/70 transition-colors flex items-center justify-center gap-3">
            <Phone className="w-5 h-5" /> Call Support
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {['How do I cancel a booking?', 'What is the refund policy?', 'How do I apply a promo code?'].map((q, i) => (
            <div key={i} className="p-4 border border-slate-100 rounded-2xl flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
              <span className="font-semibold text-slate-700">{q}</span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}




function ProfileBookingsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">My Bookings</h2>
         <div className="flex gap-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold">Upcoming</button>
            <button className="bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors px-4 py-2 rounded-xl text-sm font-bold">Past</button>
         </div>
      </div>

      <div className="space-y-4">
        {[
          { service: 'Deep Home Cleaning', date: 'Oct 24, 2026 • 10:00 AM', status: 'Upcoming', provider: 'Urban Cleaners', price: '₹1,499' },
          { service: 'AC Servicing', date: 'Oct 26, 2026 • 2:00 PM', status: 'Upcoming', provider: 'CoolTech Experts', price: '₹599' }
        ].map((booking, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row justify-between gap-6 hover:border-indigo-200 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className="bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block">{booking.status}</span>
                <h3 className="text-lg font-bold text-slate-900">{booking.service}</h3>
                <p className="text-slate-500 font-medium text-sm mt-1">{booking.date}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-6 h-6 bg-slate-200 rounded-full"></div>
                  <span className="text-sm text-slate-600 font-medium">{booking.provider}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between">
               <span className="text-xl font-black text-slate-900">{booking.price}</span>
               <button className="text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors mt-4 md:mt-0">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}



function EarningsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-emerald-200 font-medium mb-2 flex items-center gap-2"><Wallet className="w-5 h-5"/> This Week's Earnings</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tight">₹14,250<span className="text-xl text-emerald-300 font-medium">.00</span></h2>
          </div>
          <button className="bg-white text-emerald-900 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto">
            Withdraw Funds
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-indigo-500"/> Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
               <span className="text-slate-500 font-medium">Completed Jobs</span>
               <span className="text-slate-900 font-bold text-lg">24</span>
            </div>
            <div className="flex justify-between items-center pb-4 border-b border-slate-50">
               <span className="text-slate-500 font-medium">Cancellation Rate</span>
               <span className="text-emerald-500 font-bold text-lg">1.2%</span>
            </div>
            <div className="flex justify-between items-center">
               <span className="text-slate-500 font-medium">Total Hours</span>
               <span className="text-slate-900 font-bold text-lg">42 hrs</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2"><Clock className="w-5 h-5 text-slate-400"/> Recent Payouts</h3>
          <div className="space-y-4">
            {[
              { date: 'Oct 15, 2026', amount: '₹12,400', status: 'Completed' },
              { date: 'Oct 08, 2026', amount: '₹15,200', status: 'Completed' },
              { date: 'Oct 01, 2026', amount: '₹9,800', status: 'Completed' },
            ].map((tx, i) => (
              <div key={i} className="flex justify-between items-center pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                <div>
                  <h4 className="font-bold text-slate-900">{tx.date}</h4>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">{tx.status}</span>
                </div>
                <div className="font-black text-lg text-slate-900">{tx.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailabilityView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Manage Availability</h2>
         <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-500">Currently Accepting Jobs</span>
            <div className="w-12 h-6 bg-emerald-500 rounded-full p-1 cursor-pointer transition-colors shadow-inner flex items-center justify-end">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
         </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day, i) => (
          <div key={day} className="p-6 border-b border-slate-50 last:border-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4 w-40">
              <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${i === 6 ? 'bg-slate-200' : 'bg-indigo-500 flex items-center justify-end'}`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
              <span className={`font-bold ${i === 6 ? 'text-slate-400' : 'text-slate-900'}`}>{day}</span>
            </div>
            
            {i !== 6 ? (
              <div className="flex items-center gap-3">
                 <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">09:00 AM</div>
                 <span className="text-slate-400 font-medium">to</span>
                 <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 shadow-sm">06:00 PM</div>
              </div>
            ) : (
              <span className="text-slate-400 font-medium text-sm italic mr-auto sm:mr-0 pl-[56px] sm:pl-0">Unavailable (Day Off)</span>
            )}
            
            <button className="text-indigo-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BusinessProfileView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <h2 className="text-2xl font-black text-slate-900 px-2 mb-6">Business Profile</h2>

      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col gap-8">
        
        <div className="flex items-center gap-6 pb-8 border-b border-slate-100">
           <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-black shrink-0 relative group cursor-pointer overflow-hidden border-2 border-dashed border-indigo-200">
              <Briefcase className="w-10 h-10" />
              <div className="absolute inset-0 bg-indigo-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
           </div>
           <div>
              <h3 className="text-xl font-bold text-slate-900">Pavan's Expert Cleaning</h3>
              <p className="text-slate-500 mt-1">Professional Home Services & Cleaning</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide flex items-center gap-1"><Shield className="w-3 h-3"/> Verified Partner</span>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md">Since 2023</span>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Business Name</label>
            <input type="text" defaultValue="Pavan's Expert Cleaning" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Registration Type</label>
            <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
              <option>Individual / Freelancer</option>
              <option>Registered Company (LLC)</option>
              <option>Partnership</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-slate-700 mb-2">Business Description</label>
            <textarea rows={4} defaultValue="Providing top-notch deep cleaning and home maintenance services with 5+ years of experience. Fully equipped and professionally trained." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"></textarea>
          </div>
        </div>
        
        <div className="flex justify-end pt-4 border-t border-slate-100">
           <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
             Save Changes
           </button>
        </div>
      </div>
    </div>
  );
}

function ServiceAreasView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Service Areas</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Area
         </button>
      </div>
      
      <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
         <div className="flex items-center gap-4 mb-8 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
            <MapPin className="w-6 h-6 text-indigo-500 shrink-0" />
            <p className="text-slate-700 font-medium text-sm">You are currently servicing within a <span className="font-bold text-indigo-700">15 km</span> radius of your primary location.</p>
            <button className="ml-auto text-indigo-600 font-bold text-sm bg-white px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm shrink-0">Change Radius</button>
         </div>

         <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-indigo-100 bg-indigo-50/30 rounded-2xl">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Andheri West & East</h4>
                    <p className="text-slate-500 text-sm">Mumbai, MH 400053</p>
                  </div>
               </div>
               <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">Primary</span>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl group hover:border-slate-300 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Juhu & Vile Parle</h4>
                    <p className="text-slate-500 text-sm">Mumbai, MH</p>
                  </div>
               </div>
               <button className="text-red-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl group hover:border-slate-300 transition-colors">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Bandra West</h4>
                    <p className="text-slate-500 text-sm">Mumbai, MH</p>
                  </div>
               </div>
               <button className="text-red-500 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
            </div>
         </div>
      </div>
    </div>
  );
}

function PayoutMethodsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>

      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">Payout Methods</h2>
         <button className="flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <Plus className="w-5 h-5"/> Add Account
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-[2rem] p-8 shadow-xl text-white relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm border border-white/20 font-semibold text-sm">Primary Account</div>
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="relative z-10 mt-8">
            <h4 className="font-bold text-lg mb-1 opacity-90">HDFC Bank</h4>
            <div className="text-2xl font-mono tracking-widest mb-2 opacity-90">•••• •••• 9821</div>
            <div className="flex justify-between text-sm opacity-60 font-medium tracking-widest uppercase">
              <span>Pavan Teja K</span>
              <span>IFSC: HDFC0001234</span>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 hover:border-indigo-200 hover:text-indigo-500 transition-colors cursor-pointer min-h-[220px]">
          <Plus className="w-10 h-10 mb-4" />
          <span className="font-bold text-lg text-slate-600">Add Bank Account</span>
          <p className="text-sm mt-2 text-center max-w-xs">Add another bank account or UPI ID to receive payments.</p>
        </div>
      </div>
    </div>
  );
}

function PerformanceView({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8 space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold text-sm px-4 md:px-0">
        <ChevronLeft className="w-4 h-4" strokeWidth={2.5} /> Back to Profile
      </button>
      
      <div className="flex items-center justify-between px-2">
         <h2 className="text-2xl font-black text-slate-900">My Performance</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-[2rem] p-10 shadow-xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <h3 className="text-xl font-bold mb-2 relative z-10">Overall Rating</h3>
          <div className="text-7xl font-black my-4 flex items-center gap-2 relative z-10 drop-shadow-md">
            4.9 <Star className="w-12 h-12 fill-white text-white drop-shadow-sm" />
          </div>
          <p className="font-medium text-amber-100 relative z-10">Top 5% of Providers in Mumbai</p>
        </div>
        
        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 flex flex-col justify-center shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <h4 className="font-bold text-slate-900 mb-6">Recent Customer Feedback</h4>
          <div className="space-y-4">
             <div className="pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-1">
                   <div className="flex text-amber-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                   <span className="text-xs text-slate-400 font-medium">2 days ago</span>
                </div>
                <p className="text-slate-700 text-sm">"Pavan was very professional and did an amazing deep clean of our apartment. Highly recommended!"</p>
             </div>
             <div>
                <div className="flex items-center justify-between mb-1">
                   <div className="flex text-amber-400"><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/><Star className="w-3 h-3 fill-current"/></div>
                   <span className="text-xs text-slate-400 font-medium">1 week ago</span>
                </div>
                <p className="text-slate-700 text-sm">"On time, polite, and very efficient work."</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function ProfileView({ role, onLogout }: any) {
  const [profile, setProfile] = useState({ name: 'Pavan Teja K', email: '', phone: '9885112379', location: 'Mumbai, MH' });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('main');
  const isProvider = role?.trim().toLowerCase() === 'provider';

  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        try {
          const userRef = ref(db, `users/${auth.currentUser.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setProfile(snapshot.val());
          }
        } catch (error) {
          console.error("Error fetching profile", error);
        }
      }
      setLoading(false);
    };
    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;

  const getInitials = (name: string) => name ? name.charAt(0).toUpperCase() : 'U';

  if (activeTab === 'plans') {
    return <MyPlansView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Wallet') {
    return <WalletView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Passes & Membership') {
    return <MembershipsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'My Rating') {
    return <RatingsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Manage Addresses') {
    return <AddressesView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Manage Payment Methods') {
    return <PaymentsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Settings') {
    return <SettingsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'About Survly') {
    return <AboutView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Native Devices') {
    return <NativeDevicesView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Help & Support') {
    return <SupportView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'My Bookings') {
    return <ProfileBookingsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Business Profile') {
    return <BusinessProfileView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Availability') {
    return <AvailabilityView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Earnings') {
    return <EarningsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'My Performance') {
    return <PerformanceView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Service Areas') {
    return <ServiceAreasView onBack={() => setActiveTab('main')} />;
  } else if (activeTab === 'Payout Methods') {
    return <PayoutMethodsView onBack={() => setActiveTab('main')} />;
  } else if (activeTab !== 'main') {
    return <PlaceholderView title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1').trim()} onBack={() => setActiveTab('main')} />;
  }


  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-8">
      
      {/* Header Profile Info */}
      <div className="flex items-center gap-6 px-2 mb-2">
        <div className="w-[100px] h-[100px] bg-[#EEF2FF] text-[#4F46E5] rounded-full flex items-center justify-center text-[36px] font-bold shrink-0 shadow-sm">
          {getInitials(profile.name)}
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-[28px] font-bold text-slate-900 tracking-tight leading-tight">{profile.name || 'User'}</h1>
          <p className="text-slate-500 text-[15px] mt-1">{profile.phone || 'Phone not added'}</p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button onClick={() => setActiveTab(isProvider ? 'Earnings' : 'My Bookings')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          {isProvider ? <Wallet className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} /> : <ClipboardList className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />}
          <span className="font-semibold text-[15px] text-slate-900">{isProvider ? 'Earnings' : 'My bookings'}</span>
        </button>
        <button onClick={() => setActiveTab(isProvider ? 'Availability' : 'Native Devices')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          {isProvider ? <Clock className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} /> : <Smartphone className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />}
          <span className="font-semibold text-[15px] text-slate-900">{isProvider ? 'Availability' : 'Native devices'}</span>
        </button>
        <button onClick={() => setActiveTab('Help & Support')} className="bg-white border border-slate-100 rounded-[20px] p-6 flex flex-col items-start gap-4 hover:border-indigo-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all text-left shadow-[0_2px_10px_rgba(0,0,0,0.02)] h-[132px] justify-between">
          <Headphones className="w-[22px] h-[22px] text-slate-700" strokeWidth={1.5} />
          <span className="font-semibold text-[15px] text-slate-900">Help & support</span>
        </button>
      </div>

      {/* Menu List */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] mt-2">
        {isProvider ? (
          <>
            <MenuListItem icon={Briefcase} title="Business Profile" onClick={() => setActiveTab('Business Profile')} />
            <MenuListItem icon={CreditCard} title="Payout Methods" onClick={() => setActiveTab('Payout Methods')} />
            <MenuListItem icon={Star} title="My Performance" onClick={() => setActiveTab('My Performance')} />
            <MenuListItem icon={MapPin} title="Service Areas" onClick={() => setActiveTab('Service Areas')} />
            <MenuListItem icon={Settings} title="Settings" onClick={() => setActiveTab('Settings')} />
            <MenuListItem icon={Info} title="About Survly" isLast={true} onClick={() => setActiveTab('About Survly')} />
          </>
        ) : (
          <>
            <MenuListItem icon={FileText} title="My Plans" onClick={() => setActiveTab('plans')} />
            <MenuListItem icon={Wallet} title="Wallet" onClick={() => setActiveTab('Wallet')} />
            <MenuListItem icon={Ticket} title="Passes & membership" onClick={() => setActiveTab('Passes & Membership')} />
            <MenuListItem icon={Star} title="My rating" onClick={() => setActiveTab('My Rating')} />
            <MenuListItem icon={MapPin} title="Manage addresses" onClick={() => setActiveTab('Manage Addresses')} />
            <MenuListItem icon={CreditCard} title="Manage payment methods" onClick={() => setActiveTab('Manage Payment Methods')} />
            <MenuListItem icon={Settings} title="Settings" onClick={() => setActiveTab('Settings')} />
            <MenuListItem icon={Info} title="About Survly" isLast={true} onClick={() => setActiveTab('About Survly')} />
          </>
        )}
      </div>
    </div>
  );
}


function MenuListItem({ icon: Icon, title, isLast = false, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-slate-50 transition-colors ${!isLast ? 'border-b border-slate-100/80' : ''}`}
    >
      <div className="flex items-center gap-4">
        <Icon className="w-[18px] h-[18px] text-slate-500" strokeWidth={1.5} />
        <span className="font-medium text-slate-700 text-[15px]">{title}</span>
      </div>
      <ChevronRight className="w-[18px] h-[18px] text-slate-300" strokeWidth={2} />
    </button>
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


function SectionVisuals({ images, badge, stats }: any) {
  return (
    <div className="relative h-[600px] w-full hidden lg:block">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50/50 rounded-full blur-[100px] -z-10"></div>

       <motion.div
         initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
         whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.7 }}
         className="absolute top-8 right-8 w-[75%] h-[70%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border-[8px] border-white z-10"
       >
         <img src={images[0]} alt="Showcase" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/20 to-transparent"></div>
       </motion.div>

       <motion.div
         initial={{ opacity: 0, x: -50, rotate: 2 }}
         whileInView={{ opacity: 1, x: 0, rotate: -4 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 0.7, delay: 0.2 }}
         className="absolute bottom-12 left-0 w-[60%] h-[55%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(8,_112,_184,_0.15)] border-[8px] border-white z-20"
       >
         <img src={images[1]} alt="Showcase 2" className="w-full h-full object-cover" />
       </motion.div>

       <motion.div
         animate={{ y: [0, -12, 0] }}
         transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
         className="absolute top-20 left-4 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4 z-30"
       >
         <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
           <CheckCircle className="w-6 h-6" />
         </div>
         <div>
           <div className="text-xl font-black text-slate-900">{stats.value1}</div>
           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stats.label1}</div>
         </div>
       </motion.div>

       <motion.div
         animate={{ y: [0, 12, 0] }}
         transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
         className="absolute bottom-28 right-0 bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4 z-30"
       >
         <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
           <Star className="w-6 h-6 fill-amber-500" />
         </div>
         <div>
           <div className="text-xl font-black text-slate-900">{stats.value2}</div>
           <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stats.label2}</div>
         </div>
       </motion.div>

       <motion.div
         initial={{ scale: 0 }}
         whileInView={{ scale: 1 }}
         viewport={{ once: true }}
         transition={{ type: "spring", delay: 0.5 }}
         className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl font-black tracking-widest uppercase text-sm border-4 border-white z-40"
       >
         {badge}
       </motion.div>
    </div>
  );
}

function AppServiceAdvantages() {
  return (
    <div className="mt-20 mb-10 space-y-8 max-w-6xl mx-auto">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Survly app service advantages</h2>
        <p className="text-slate-500 text-lg">Experience the best-in-class home services with our trusted professionals.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-white border border-slate-100/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(79,70,229,0.06)] hover:border-indigo-100 rounded-[28px] p-8 relative overflow-hidden flex flex-col group transition-all duration-300">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50/80 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
             <Star className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Professional<br/>installation</h3>
          <p className="text-slate-500 text-[17px] leading-relaxed">Only top technicians trained by Survly are assigned to your tasks.</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white border border-slate-100/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(16,185,129,0.06)] hover:border-emerald-100 rounded-[28px] p-8 relative overflow-hidden flex flex-col group transition-all duration-300">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-50/80 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
           <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
             <Shield className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Verified<br/>professionals</h3>
          <p className="text-slate-500 text-[17px] leading-relaxed">100% background verified and highly experienced experts.</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-slate-100/60 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(245,158,11,0.06)] hover:border-amber-100 rounded-[28px] p-8 relative overflow-hidden flex flex-col group transition-all duration-300">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-50/80 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
           <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform duration-300">
             <Banknote className="w-7 h-7" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Guaranteed<br/>pricing</h3>
          <p className="text-slate-500 text-[17px] leading-relaxed">No hidden costs. Transparent pricing before you book.</p>
        </div>
      </div>
    </div>
  );
}

function BookingsView() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [localBookings, setLocalBookings] = useState<any[]>([]);

  useEffect(() => {
    const bookingsRef = ref(db, 'bookings');
    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const bookingsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        setLocalBookings(bookingsArray);
      } else {
        setLocalBookings([]);
      }
    }, (error) => {
      console.error("Error listening to bookings:", error);
    });

    return () => unsubscribe();
  }, [activeTab]);
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Your Bookings</h1>
          <p className="text-slate-500 text-lg">Manage your upcoming and past appointments.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> New Booking
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="flex border-b border-slate-200">
          {['upcoming', 'past', 'cancelled'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-5 text-center font-bold text-sm sm:text-base capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>
              {tab}
            </button>
          ))}
        </div>
        
        <div className="p-8">
          {activeTab === 'upcoming' ? (
            localBookings.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-indigo-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <Calendar className="w-12 h-12 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">No active bookings</h3>
                <p className="text-slate-500 text-lg max-w-sm mx-auto mb-8">You haven't booked any services yet. Explore our top-rated professionals to get started.</p>
                <button className="bg-slate-900 text-white font-bold py-4 px-8 rounded-xl shadow-md hover:bg-slate-800 transition-colors">Explore Services</button>
              </div>
            ) : (
              <div className="space-y-4">
                {localBookings.map((b, i) => (
                  <div key={b.id || i} className="border border-indigo-200 rounded-2xl p-6 hover:shadow-md transition-all bg-indigo-50/30 group cursor-pointer flex flex-col sm:flex-row gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                      <Calendar className="w-8 h-8 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-xl text-slate-900">{b.service}</h4>
                        <span className="bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">Upcoming</span>
                      </div>
                      <p className="text-slate-500 flex items-center gap-2 mb-2 font-medium"><User className="w-4 h-4"/> {b.provider}</p>
                      <p className="text-slate-500 flex items-center gap-2 mb-4 font-medium"><Clock className="w-4 h-4"/> {b.date} at {b.time}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-indigo-100">
                        <p className="font-black text-slate-900 text-lg">{b.price}</p>
                        <div className="flex items-center gap-3">
                          <button className="text-rose-600 font-bold text-sm hover:underline px-2 py-1">Cancel</button>
                          <button className="bg-indigo-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors">View Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : activeTab === 'past' ? (
            <div className="space-y-4">
              {[
                { service: 'Deep Home Cleaning', provider: 'Priya Singh', date: 'Sep 24, 2026', price: '₹1,200', rating: 5, icon: Sparkles },
                { service: 'AC Repair & Maintenance', provider: 'Amit Patel', date: 'Aug 12, 2026', price: '₹650', rating: 4, icon: AirVent }
              ].map((b, i) => (
                <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 hover:shadow-md transition-all bg-white group cursor-pointer flex flex-col sm:flex-row gap-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                    <b.icon className="w-8 h-8 text-slate-400 group-hover:text-indigo-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-xl text-slate-900">{b.service}</h4>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">Completed</span>
                    </div>
                    <p className="text-slate-500 flex items-center gap-2 mb-4 font-medium"><User className="w-4 h-4"/> {b.provider} <span className="text-slate-300">•</span> <Calendar className="w-4 h-4"/> {b.date}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <p className="font-black text-slate-900 text-lg">{b.price}</p>
                      <div className="flex items-center gap-3">
                        <button className="text-indigo-600 font-bold text-sm hover:underline px-2 py-1">View Invoice</button>
                        <button className="bg-indigo-50 text-indigo-700 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-indigo-100 transition-colors">Rebook</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
               <p className="text-lg text-slate-500 font-medium">No cancelled bookings in your history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UserRequestsView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">User Requests</h1>
        <p className="text-slate-500 text-lg">Browse custom service requirements posted by users near you.</p>
      </div>

      <div className="space-y-6">
        {[
          {
            id: 1,
            title: 'Complete 3BHK Deep Cleaning',
            budget: '₹2,500 - ₹4,000',
            location: 'Bandra West, Mumbai',
            time: '2 hours ago',
            description: 'Looking for a professional team to deep clean a recently renovated 3BHK apartment. Requires specialized floor cleaning and bathroom sanitization.',
            user: { name: 'Ananya Sharma', phone: '+91 98765 43210', rating: '4.9' },
            tags: ['Cleaning', 'Deep Clean', 'Urgent']
          },
          {
            id: 2,
            title: 'Smart Home Lighting Installation',
            budget: '₹1,500 - ₹2,000',
            location: 'Andheri East, Mumbai',
            time: '5 hours ago',
            description: 'Need an electrician to install 10 smart switches and setup Philips Hue ambient lighting in living room.',
            user: { name: 'Karan Patel', phone: '+91 91234 56789', rating: '4.8' },
            tags: ['Electrical', 'Smart Home']
          },
          {
            id: 3,
            title: 'Bathroom Leak Repair & Tiles Fix',
            budget: '₹800 - ₹1,200',
            location: 'Juhu, Mumbai',
            time: '1 day ago',
            description: 'Minor pipe leak in the master bathroom sink. Also need 2 cracked tiles replaced (I have the replacement tiles).',
            user: { name: 'Rohit Mehta', phone: '+91 99887 76655', rating: '4.7' },
            tags: ['Plumbing', 'Repair']
          }
        ].map(req => (
          <div key={req.id} className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              <div className="flex-1 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{req.title}</h3>
                  <div className="flex gap-2">
                    {req.tags.map(tag => (
                      <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-bold px-2.5 py-1 rounded-md">{tag}</span>
                    ))}
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm md:text-base leading-relaxed">{req.description}</p>
                
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Wallet className="w-5 h-5 text-indigo-500" />
                    <span className="font-semibold">{req.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-sm">{req.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-sm">{req.time}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-72 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contact Info</h4>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 font-bold rounded-full flex items-center justify-center shrink-0">
                    {req.user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{req.user.name}</div>
                    <div className="flex items-center gap-1 text-xs font-medium text-slate-500 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {req.user.rating} User Rating
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-medium">{req.user.phone}</span>
                  </div>
                  
                  <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                    <MessageCircle className="w-5 h-5" /> Chat with user
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequirementsView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">My Requirements</h1>
          <p className="text-slate-500 text-lg">Track and manage your custom service requests.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <FileText className="w-5 h-5" /> Post Requirement
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center shadow-sm text-center min-h-[400px]">
            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 border border-slate-100 shadow-inner transform -rotate-3">
              <FileText className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No requirements posted</h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">Can't find exactly what you need? Post a custom requirement detailing your task, and let relevant professionals reach out to you with quotes.</p>
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md">Create Your First Post</button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10"><Zap className="w-32 h-32" /></div>
             <div className="relative z-10">
               <h3 className="text-xl font-bold mb-3 text-indigo-50">How it works?</h3>
               <ul className="space-y-4">
                 <li className="flex gap-3 text-indigo-100"><div className="w-6 h-6 rounded-full bg-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">1</div> Post your custom task details and budget.</li>
                 <li className="flex gap-3 text-indigo-100"><div className="w-6 h-6 rounded-full bg-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">2</div> Get quotes from verified professionals.</li>
                 <li className="flex gap-3 text-indigo-100"><div className="w-6 h-6 rounded-full bg-indigo-700 font-bold flex items-center justify-center shrink-0 text-sm">3</div> Compare, chat, and hire the best fit.</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function MyServicesView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">My Services</h1>
          <p className="text-slate-500 text-lg">Manage your added services and currently running services.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Add Service
        </button>
      </div>
        
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600"><Briefcase className="w-6 h-6" /></div>
              Added Services
            </h3>
            <span className="bg-slate-100 text-slate-600 font-bold px-3 py-1 rounded-full text-sm">2 Active</span>
          </div>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex justify-between items-center group hover:bg-white hover:border-indigo-200 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 text-indigo-500"><Sparkles className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Home Cleaning</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">₹499/hr <span className="w-1 h-1 rounded-full bg-slate-300"></span> <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/> 4.8</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-indigo-500 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
            <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50 flex justify-between items-center group hover:bg-white hover:border-indigo-200 transition-colors cursor-pointer shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-indigo-100 text-indigo-500"><Zap className="w-6 h-6"/></div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Electrical Repair</h4>
                  <p className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-2">₹299/hr <span className="w-1 h-1 rounded-full bg-slate-300"></span> <Star className="w-3 h-3 text-yellow-400 fill-yellow-400"/> 4.9</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:text-indigo-500 transition-all -translate-x-2 group-hover:translate-x-0" />
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600 relative">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
              </div>
              Running Now
            </h3>
          </div>
          <div className="space-y-4">
            <div className="p-5 rounded-2xl border border-indigo-200 bg-indigo-50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex justify-between items-start mb-4 pl-2">
                <div>
                  <h4 className="font-bold text-indigo-950 text-lg">AC Servicing</h4>
                  <p className="text-sm text-indigo-700/80 font-medium mt-1">Started 45 mins ago</p>
                </div>
                <span className="px-3 py-1 bg-white text-indigo-700 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm border border-indigo-100">In Progress</span>
              </div>
              <div className="pl-2 flex items-center justify-between border-t border-indigo-100/50 pt-4 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-200 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm">V</div>
                  <span className="text-sm font-bold text-indigo-900">Vidyut Bros</span>
                </div>
                <button className="text-indigo-600 font-bold text-sm hover:bg-white px-3 py-1.5 rounded-lg transition-colors">Details</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function AddServiceView() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [customSubServices, setCustomSubServices] = useState<any[]>([]);
  const [selectedSubServices, setSelectedSubServices] = useState<Record<string, boolean>>({});
  const [subServicePrices, setSubServicePrices] = useState<Record<string, {min: string, max: string}>>({});
  const [newSubService, setNewSubService] = useState({ name: '', minPrice: '', maxPrice: '', description: '', image: '' });

  const handleSelectCategory = (id: string) => {
    setSelectedService(id);
    setCustomSubServices([]);
    setSelectedSubServices({});
    setSubServicePrices({});
    setNewSubService({ name: '', minPrice: '', maxPrice: '', description: '', image: '' });
  };

  const handleAddCustomService = () => {
    if (newSubService.name.trim() && newSubService.minPrice.trim() && newSubService.maxPrice.trim()) {
      setCustomSubServices([...customSubServices, { ...newSubService, price: `₹${newSubService.minPrice} - ₹${newSubService.maxPrice}` }]);
      setSelectedSubServices({ ...selectedSubServices, [newSubService.name]: true });
      setSubServicePrices({ ...subServicePrices, [newSubService.name]: { min: newSubService.minPrice, max: newSubService.maxPrice } });
      setNewSubService({ name: '', minPrice: '', maxPrice: '', description: '', image: '' });
    }
  };

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    const Icon = iconMap[service?.iconName || 'Settings'];
    const defaultSubServices = service ? categorySubServices[service.id] || categorySubServices.plumbing : [];
    const allSubServices = [...defaultSubServices, ...customSubServices];

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 pb-12">
        <div className="flex items-center gap-4 border-b border-slate-200 pb-6 pt-4">
          <button onClick={() => setSelectedService(null)} className="p-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-indigo-300 rounded-full transition-all shadow-sm group">
            <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors" />
          </button>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-3">
              {Icon && <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Icon className="w-8 h-8" /></div>} 
              Add {service?.name}
            </h1>
            <p className="text-slate-500 mt-1">Select the specific services you provide and set your estimated price range.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSelectedService(null); }}>
             
             <div className="space-y-4">
               <h3 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Available Sub-services</h3>
               
               {allSubServices.map((sub, idx) => {
                 const isChecked = selectedSubServices[sub.name] || false;
                 return (
                   <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border ${isChecked ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-200 bg-slate-50'} transition-all gap-4`}>
                     <div className="flex items-center gap-3">
                       <input 
                         type="checkbox" 
                         className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer shrink-0"
                         checked={isChecked}
                         onChange={(e) => {
                           const checked = e.target.checked;
                           setSelectedSubServices({ ...selectedSubServices, [sub.name]: checked });
                           if (checked && !subServicePrices[sub.name]) {
                             const basePrice = sub.price.replace(/[^0-9]/g, '');
                             setSubServicePrices({ ...subServicePrices, [sub.name]: { min: basePrice, max: (parseInt(basePrice || '0') + 500).toString() } });
                           }
                         }}
                       />
                       <div className="flex items-center gap-3">
                         {sub.image && <img src={sub.image} alt={sub.name} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />}
                         <div>
                           <div className={`font-semibold ${isChecked ? 'text-indigo-900' : 'text-slate-700'}`}>{sub.name}</div>
                           <div className="text-xs text-slate-500">Suggested: {sub.price}</div>
                           {sub.description && <div className="text-xs text-slate-500 mt-0.5 line-clamp-1 max-w-[200px] sm:max-w-xs">{sub.description}</div>}
                         </div>
                       </div>
                     </div>
                     
                     {isChecked && (
                       <div className="flex items-center gap-2 pl-8 sm:pl-0 shrink-0">
                         <label className="text-sm font-bold text-slate-600 whitespace-nowrap">Price Range:</label>
                         <div className="flex items-center gap-2">
                           <div className="relative w-24">
                             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                             <input 
                               type="number" 
                               placeholder="Min"
                               value={subServicePrices[sub.name]?.min || ''}
                               onChange={(e) => setSubServicePrices({ ...subServicePrices, [sub.name]: { ...subServicePrices[sub.name], min: e.target.value } })}
                               className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-7 pr-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900" 
                               required 
                             />
                           </div>
                           <span className="text-slate-400 font-medium text-sm">to</span>
                           <div className="relative w-24">
                             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                             <input 
                               type="number" 
                               placeholder="Max"
                               value={subServicePrices[sub.name]?.max || ''}
                               onChange={(e) => setSubServicePrices({ ...subServicePrices, [sub.name]: { ...subServicePrices[sub.name], max: e.target.value } })}
                               className="w-full bg-white border border-slate-300 rounded-lg py-2 pl-7 pr-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900" 
                               required 
                             />
                           </div>
                         </div>
                       </div>
                     )}
                   </div>
                 );
               })}
             </div>

             <div className="bg-slate-50 border border-slate-200 border-dashed rounded-xl p-6 mt-6">
                <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Plus className="w-5 h-5 text-indigo-500"/> Add a custom service</h4>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                    <input 
                      type="text" 
                      placeholder="E.g., Special deep cleaning" 
                      value={newSubService.name}
                      onChange={(e) => setNewSubService({ ...newSubService, name: e.target.value })}
                      className="flex-1 bg-white border border-slate-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900"
                    />
                    
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="relative w-full sm:w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                        <input 
                          type="number" 
                          placeholder="Min"
                          value={newSubService.minPrice}
                          onChange={(e) => setNewSubService({ ...newSubService, minPrice: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-7 pr-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900"
                        />
                      </div>
                      <span className="text-slate-400 font-medium text-sm">to</span>
                      <div className="relative w-full sm:w-28">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                        <input 
                          type="number" 
                          placeholder="Max"
                          value={newSubService.maxPrice}
                          onChange={(e) => setNewSubService({ ...newSubService, maxPrice: e.target.value })}
                          className="w-full bg-white border border-slate-300 rounded-lg py-3 pl-7 pr-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <textarea 
                      placeholder="About the service (optional)" 
                      value={newSubService.description}
                      onChange={(e) => setNewSubService({ ...newSubService, description: e.target.value })}
                      rows={2}
                      className="w-full bg-white border border-slate-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm font-medium text-slate-900 resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Service Images (optional)</label>
                    <div className="flex items-center gap-4">
                      {newSubService.image ? (
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
                           <img src={newSubService.image} alt="Preview" className="w-full h-full object-cover" />
                           <button type="button" onClick={() => setNewSubService({ ...newSubService, image: '' })} className="absolute top-1 right-1 bg-white/80 p-1 rounded-full hover:bg-white shadow-sm"><XCircle className="w-4 h-4 text-red-500"/></button>
                        </div>
                      ) : (
                        <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-slate-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-colors">
                           <Camera className="w-6 h-6 text-slate-400 mb-1" />
                           <span className="text-xs font-semibold text-slate-500">Upload</span>
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                             if (e.target.files && e.target.files[0]) {
                               setNewSubService({ ...newSubService, image: URL.createObjectURL(e.target.files[0]) });
                             }
                           }} />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button 
                      type="button" 
                      onClick={handleAddCustomService}
                      disabled={!newSubService.name.trim() || !newSubService.minPrice.trim() || !newSubService.maxPrice.trim()}
                      className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed text-white font-bold py-2.5 px-6 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Add Custom Service
                    </button>
                  </div>
                </div>
             </div>

             <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
               <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500"/> Trust & Safety</h4>
               <p className="text-sm text-slate-600 mb-4 leading-relaxed">Providing accurate information helps build trust with customers and increases your booking rate.</p>
               <ul className="space-y-3 text-sm text-slate-600 font-medium">
                 <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div> Background checks are required for new services.</li>
                 <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></div> Standard commission rates apply.</li>
               </ul>
             </div>
             
             <div className="border-t border-slate-100 pt-8 flex justify-end gap-4">
               <button type="button" onClick={() => setSelectedService(null)} className="px-8 py-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancel</button>
               <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-2">
                 <Sparkles className="w-5 h-5" /> Save & Publish Services
               </button>
             </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Add New Service</h1>
        <p className="text-slate-500 text-lg">Select a category below to list your expertise and start receiving bookings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {services.map(service => {
          const Icon = iconMap[service.iconName || 'Settings'];
          return (
            <div key={service.id} onClick={() => handleSelectCategory(service.id)} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md cursor-pointer hover:border-indigo-400 group transition-all">
              <div className="w-16 h-16 bg-slate-50 rounded-[1.25rem] flex items-center justify-center mb-4 group-hover:bg-indigo-50 group-hover:scale-110 transition-all border border-slate-100 group-hover:border-indigo-100 shadow-inner">
                {Icon && <Icon className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />}
              </div>
              <span className="font-bold text-slate-900 mb-1">{service.name}</span>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">Tap to setup</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProviderDashboardView() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12">
       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
         <div className="space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Provider Dashboard</h1>
          <p className="text-slate-500 text-lg">Manage your incoming requests, earnings, and schedule.</p>
         </div>
         <div className="flex items-center gap-3">
           <button className="bg-white border border-slate-200 text-slate-700 px-4 py-3 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:bg-slate-50 flex items-center gap-2">
             <Calendar className="w-5 h-5" /> Schedule
           </button>
           <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2">
             <Zap className="w-5 h-5" /> Go Online
           </button>
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white group cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform"><Wallet className="w-24 h-24" /></div>
             <div className="relative z-10">
               <p className="text-indigo-200 uppercase tracking-widest text-xs font-bold mb-4">Today's Earnings</p>
               <h3 className="text-4xl font-black mb-2">₹12,500</h3>
               <span className="text-emerald-400 text-sm font-bold flex items-center gap-1"><ChevronRight className="w-4 h-4 -rotate-90"/> +12% from yesterday</span>
             </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Bell className="w-24 h-24 text-indigo-600" /></div>
             <div className="relative z-10">
               <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-4">Active Requests</p>
               <h3 className="text-4xl font-black text-slate-900 mb-2">3</h3>
               <span className="text-amber-500 text-sm font-bold flex items-center gap-1"><Clock className="w-4 h-4"/> 1 Urgent</span>
             </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all hover:-translate-y-1">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Star className="w-24 h-24 text-yellow-500" /></div>
             <div className="relative z-10">
               <p className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-4">Profile Rating</p>
               <h3 className="text-4xl font-black text-slate-900 mb-2">4.8</h3>
               <span className="text-slate-500 text-sm font-bold flex items-center gap-1"><Users className="w-4 h-4"/> 124 Reviews</span>
             </div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 space-y-6">
           <h3 className="text-xl font-bold text-slate-900">Recent Requests</h3>
           <div className="bg-white border border-slate-200 rounded-3xl p-8 min-h-[300px] flex flex-col items-center justify-center shadow-sm text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 border border-slate-100 shadow-inner">
                 <Bell className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No new requests</h3>
              <p className="text-slate-500 text-lg max-w-sm mx-auto">We'll notify you instantly when someone needs your services nearby.</p>
           </div>
         </div>
         
         <div className="space-y-6">
           <h3 className="text-xl font-bold text-slate-900">Performance</h3>
           <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">Response Rate</span>
                  <span className="font-black text-indigo-600">98%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-indigo-600 h-2 rounded-full" style={{width: '98%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">Job Completion</span>
                  <span className="font-black text-emerald-500">100%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-emerald-500 h-2 rounded-full" style={{width: '100%'}}></div></div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-bold text-slate-700">On-Time Arrival</span>
                  <span className="font-black text-amber-500">92%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden"><div className="bg-amber-500 h-2 rounded-full" style={{width: '92%'}}></div></div>
              </div>
           </div>
         </div>
       </div>
    </div>
  );
}
function FilteredProvidersView({ categoryIds, title }: { categoryIds: string[], title: string }) {
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [selectedSubService, setSelectedSubService] = useState<{title: string, image: string, badge?: string} | null>(null);
  const activeProviders = providers.filter(p => categoryIds.includes(p.serviceId));

  if (selectedSubService) {
    return (
      <>
        <SubServiceDetailView 
          subService={selectedSubService} 
          onBack={() => setSelectedSubService(null)} 
          providers={activeProviders}
          onSelectProvider={setSelectedProvider}
        />
        <ProviderDetailsModal 
          provider={selectedProvider} 
          isOpen={!!selectedProvider} 
          onClose={() => setSelectedProvider(null)} 
        />
      </>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500">Find top-rated professionals for {title.toLowerCase()}.</p>
      </div>

      {title === 'Self care' && <BeautyServicesSection onSelectSubService={setSelectedSubService} />}
      {title === 'Vehicle care' && <VehicleCareSection onSelectSubService={setSelectedSubService} />}
      {title === 'Home services' && <HomeServicesSection onSelectSubService={setSelectedSubService} />}

      <div className="pt-8">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-2xl font-bold text-slate-900">All {title} Providers</h3>
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
      </div>

      <ProviderDetailsModal 
        provider={selectedProvider} 
        isOpen={!!selectedProvider} 
        onClose={() => setSelectedProvider(null)} 
      />
    </div>
  );
}
function SubServiceDetailView({ subService, onBack, providers, onSelectProvider }: any) {
  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-right-8 duration-300 pb-12">
      <button onClick={onBack} className="p-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-indigo-300 rounded-full transition-all shadow-sm group flex items-center gap-2">
        <ChevronLeft className="w-5 h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
        <span className="font-bold text-slate-600 group-hover:text-indigo-600 transition-colors pr-2">Back</span>
      </button>

      <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
          <img src={subService.image.replace(/w=150/, "w=800")} alt={subService.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          {subService.badge && (
            <div className="absolute top-6 left-6 bg-white px-4 py-1.5 rounded-full shadow-lg text-xs font-black text-emerald-600 tracking-wider uppercase">
              {subService.badge}
            </div>
          )}
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4 leading-tight">{subService.title}</h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Professional, high-quality {subService.title.toLowerCase()} services provided by verified experts. We ensure complete safety, hygiene, and top-tier service standards at your doorstep.
            </p>
          </div>
          
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> Survly Promise
            </h4>
            <ul className="space-y-2 text-sm font-medium text-slate-600">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Verified Professionals</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> 30-Day Service Guarantee</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Transparent Pricing</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-slate-900">Available Professionals</h3>
          <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">{providers.length} Available</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {providers.length > 0 ? (
            providers.map((provider: any) => (
              <ProviderCard 
                key={provider.id} 
                provider={provider} 
                onViewDetails={() => onSelectProvider(provider)}
              />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center gap-3 shadow-sm">
              <Search className="w-8 h-8 text-slate-300" />
              <p>No providers available right now. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
      
      
    </div>
  );
}
function ServiceIcon({ title, image, badge, onClick }: { title: string, image: string, badge?: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center text-center gap-3 cursor-pointer group">
      <div className="relative">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-[1.25rem] flex items-center justify-center overflow-hidden border border-slate-100 shadow-sm group-hover:border-indigo-300 group-hover:shadow-lg transition-all duration-300">
          <img src={image} alt={title} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300" />
        </div>
        {badge && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded shadow-sm text-[10px] font-bold text-emerald-600 border border-slate-100 whitespace-nowrap z-10">
            {badge}
          </div>
        )}
      </div>
      <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight px-1 group-hover:text-indigo-600 transition-colors">{title}</span>
    </div>
  );
}


function ReferAndEarnBanner({ onClick }: { onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50/50 border border-indigo-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-[28px] p-8 flex items-center justify-between cursor-pointer hover:shadow-[0_8px_30px_rgba(99,102,241,0.08)] hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group max-w-6xl mx-auto"
    >
      <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors duration-300"></div>
      <div className="relative z-10 pr-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/80 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Gift className="w-3.5 h-3.5" /> Rewards
        </div>
        <h3 className="text-2xl md:text-[28px] font-black text-slate-900 mb-2 tracking-tight">Refer & earn ₹50</h3>
        <p className="text-slate-600 text-[16px] md:text-lg max-w-md">Get ₹50 directly in your wallet when your friend completes their first booking.</p>
      </div>
      <div className="absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
        <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-30 rounded-full"></div>
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/gift-box-4993181-4161820.png" alt="Gift" className="w-full h-full object-contain relative drop-shadow-xl" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.innerHTML = '<span class="text-[80px]">🎁</span>'; }} />
      </div>
    </div>
  );
}

function ReferPage() {
  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 pb-12 pt-4">
      {/* Page Header */}
      <div className="text-center mb-10">
        <div className="w-24 h-24 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-violet-100 rounded-full blur-xl opacity-60"></div>
            <img src="https://firebasestorage.googleapis.com/v0/b/survly-c13e9.firebasestorage.app/o/giftbox.png?alt=media&token=d1f5e8b4-5c9c-4c4f-9e7c-0a1b2c3d4e5f" alt="Gift" className="w-full h-full object-contain relative z-10 drop-shadow-lg" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="text-6xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">🎁</span>'; }} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Refer & Earn ₹50</h1>
        <p className="text-slate-500 max-w-sm mx-auto text-[15px]">
          Invite your friends to Survly. They get <span className="font-bold text-slate-700">₹50 off</span> their first booking, and you get <span className="font-bold text-violet-600">₹50 in your wallet!</span>
        </p>
      </div>

      {/* Steps */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-10 shadow-sm mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          
          <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-0.5 bg-slate-100 -z-10"></div>
          
          <div className="text-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100/50">
              <Share2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">1. Share link</h4>
            <p className="text-sm text-slate-500 px-2">Share your unique referral link with friends.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100/50">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">2. Friend books</h4>
            <p className="text-sm text-slate-500 px-2">Your friend signs up and completes a booking.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm border border-indigo-100/50">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">3. You both earn</h4>
            <p className="text-sm text-slate-500 px-2">Both get ₹50 added to your Survly wallets.</p>
          </div>
        </div>
      </div>

      {/* Share Section */}
      <div className="bg-gradient-to-br from-[#F8F5FF] to-white border border-violet-100 rounded-[2rem] p-8 md:p-10 text-center shadow-sm">
        <h3 className="font-bold text-slate-900 mb-6 text-lg">Your referral code</h3>
        <div className="flex items-center justify-center gap-3 mb-6 max-w-sm mx-auto">
          <div className="bg-white border border-slate-200 px-6 py-4 rounded-2xl font-mono text-2xl font-black tracking-widest text-slate-800 shadow-sm w-full">
            SURVLY50
          </div>
          <button className="bg-violet-100 text-violet-600 p-4 rounded-2xl hover:bg-violet-200 hover:text-violet-700 transition-colors shadow-sm shrink-0 border border-violet-200">
            <Copy className="w-6 h-6" />
          </button>
        </div>
        <button className="w-full max-w-sm mx-auto bg-violet-600 text-white font-bold py-4 rounded-2xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-200 flex items-center justify-center gap-2 text-lg">
          <Share2 className="w-5 h-5" /> Share with friends
        </button>
      </div>
    </div>
  );
}
