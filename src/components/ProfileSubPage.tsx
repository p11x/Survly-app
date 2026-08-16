import React, { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { ref, update } from 'firebase/database';
import { 
  ChevronLeft, Calendar, Wallet, ClipboardList, Smartphone, Headphones, 
  Star, MapPin, CreditCard, Ticket, Info, FileText,
  Clock, CheckCircle, XCircle, Search, Shield, ChevronRight, Monitor, LogOut, ArrowRight, Zap, Gift,
  MessageCircle, Mail, Phone, Lock, EyeOff, Bell, UserX, Download, AlertTriangle, Plus
} from 'lucide-react';

export default function ProfileSubPage({ view, onBack, profile, setProfile }: any) {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const handleSave = async () => {
    if (auth.currentUser) {
      setSaving(true);
      try {
        const userRef = ref(db, `users/${auth.currentUser.uid}`);
        await update(userRef, { name: profile.name, phone: profile.phone, location: profile.location });
      } catch (error) {
        console.error("Error updating profile:", error);
      } finally {
        setSaving(false);
      }
    }
  };

  const renderSettings = () => (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">Full Name</label>
          <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})}/>
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-2 block">Phone Number</label>
          <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900" value={profile.phone} onChange={e=>setProfile({...profile, phone: e.target.value})}/>
        </div>
        <div className="md:col-span-2">
          <label className="text-sm font-semibold text-slate-700 mb-2 block">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-slate-900" value={profile.location} onChange={e=>setProfile({...profile, location: e.target.value})}/>
          </div>
        </div>
      </div>
      
      <div className="border-t border-slate-200 pt-8 space-y-6">
        <h3 className="text-lg font-bold text-slate-900">Preferences</h3>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-indigo-600" />
            <div>
              <p className="font-semibold text-slate-900">Push Notifications</p>
              <p className="text-sm text-slate-500">Receive alerts for booking updates</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center gap-4">
            <Mail className="w-6 h-6 text-indigo-600" />
            <div>
              <p className="font-semibold text-slate-900">Email Marketing</p>
              <p className="text-sm text-slate-500">Receive offers and newsletters</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
      </div>

      <div className="pt-4 flex justify-end gap-4 border-t border-slate-200">
        <button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-70 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2">
          {saving ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <CheckCircle className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><Wallet className="w-32 h-32" /></div>
        <div className="relative z-10">
          <p className="text-indigo-200 font-medium mb-2 uppercase tracking-wider text-sm">Survly Cash Balance</p>
          <h3 className="text-5xl font-black mb-6">₹1,250.00</h3>
          <div className="flex gap-4">
            <button className="bg-white text-indigo-900 font-bold py-3 px-6 rounded-xl hover:bg-indigo-50 transition-colors flex items-center gap-2 shadow-lg">
              <Plus className="w-5 h-5" /> Add Money
            </button>
            <button className="bg-indigo-800 border border-indigo-500 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-600 transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2"><Clock className="w-5 h-5" /> Recent Transactions</h4>
        <div className="space-y-4">
          {[
            { title: 'Added to Wallet', date: 'Oct 15, 2026', amount: '+₹500.00', status: 'Success', color: 'text-emerald-600' },
            { title: 'AC Servicing Payment', date: 'Oct 10, 2026', amount: '-₹899.00', status: 'Debited', color: 'text-slate-900' },
            { title: 'Referral Bonus', date: 'Oct 01, 2026', amount: '+₹50.00', status: 'Success', color: 'text-emerald-600' }
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:shadow-sm transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.amount.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {tx.amount.startsWith('+') ? <ArrowRight className="w-6 h-6 rotate-90" /> : <ArrowRight className="w-6 h-6 -rotate-90" />}
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">{tx.title}</h5>
                  <p className="text-sm text-slate-500">{tx.date} • {tx.status}</p>
                </div>
              </div>
              <span className={`font-bold text-lg ${tx.color}`}>{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex border-b border-slate-200">
        {['upcoming', 'past', 'cancelled'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 text-center font-bold text-sm sm:text-base capitalize border-b-2 transition-colors ${activeTab === tab ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>
      
      <div className="space-y-4 pt-4">
        {activeTab === 'upcoming' ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ClipboardList className="w-12 h-12 text-indigo-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No upcoming bookings</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Looks like you haven't scheduled any services. Ready to get things sorted?</p>
            <button className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-xl shadow-md hover:bg-indigo-500 transition-colors">Book a Service</button>
          </div>
        ) : activeTab === 'past' ? (
          [
            { service: 'Deep Home Cleaning', provider: 'Priya Singh', date: 'Sep 24, 2026', price: '₹1,200', rating: 5 },
            { service: 'AC Repair', provider: 'Amit Patel', date: 'Aug 12, 2026', price: '₹650', rating: 4 }
          ].map((b, i) => (
            <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 transition-all shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-lg text-slate-900">{b.service}</h4>
                  <p className="text-slate-500 flex items-center gap-1 mt-1"><UserX className="w-4 h-4"/> {b.provider}</p>
                </div>
                <div className="text-right">
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Completed</span>
                  <p className="font-bold text-slate-900 mt-2">{b.price}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-500 flex items-center gap-1"><Calendar className="w-4 h-4"/> {b.date}</p>
                <div className="flex items-center gap-3">
                  <button className="text-indigo-600 font-semibold text-sm hover:underline">View Invoice</button>
                  <button className="bg-slate-100 text-slate-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-slate-200 transition-colors">Rebook</button>
                </div>
              </div>
            </div>
          ))
        ) : (
           <p className="text-center text-slate-500 py-8">No cancelled bookings.</p>
        )}
      </div>
    </div>
  );

  const renderDevices = () => (
    <div className="space-y-6">
      <div className="bg-indigo-50 p-6 rounded-2xl flex items-start gap-4 mb-8">
        <Shield className="w-8 h-8 text-indigo-600 shrink-0" />
        <div>
          <h4 className="font-bold text-indigo-900 text-lg">Device Security</h4>
          <p className="text-indigo-700 mt-1">Review the devices where your account is currently logged in. You can revoke access at any time to keep your account secure.</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {[
          { name: 'iPhone 14 Pro', os: 'iOS 17', active: 'Active now', icon: Smartphone, isCurrent: true },
          { name: 'MacBook Air M2', os: 'macOS Sonoma', active: 'Last active 2 days ago', icon: Monitor, isCurrent: false },
          { name: 'Samsung Galaxy S23', os: 'Android 14', active: 'Last active Oct 1', icon: Smartphone, isCurrent: false }
        ].map((d, i) => (
          <div key={i} className="flex items-center justify-between p-5 border border-slate-200 rounded-2xl hover:shadow-sm transition-all">
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${d.isCurrent ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}>
                <d.icon className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-slate-900 flex items-center gap-2">
                  {d.name} {d.isCurrent && <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">This device</span>}
                </h5>
                <p className="text-sm text-slate-500 mt-1">{d.os} • {d.active}</p>
              </div>
            </div>
            {!d.isCurrent && (
              <button className="text-rose-600 p-2 hover:bg-rose-50 rounded-xl transition-colors" title="Log out device">
                <LogOut className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-6 rounded-2xl text-center hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
          <MessageCircle className="w-10 h-10 mx-auto text-indigo-400 group-hover:text-indigo-600 mb-3 transition-colors" />
          <h4 className="font-bold text-slate-900 mb-1">Live Chat</h4>
          <p className="text-xs text-slate-500">Wait time: ~2 mins</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl text-center hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
          <Phone className="w-10 h-10 mx-auto text-indigo-400 group-hover:text-indigo-600 mb-3 transition-colors" />
          <h4 className="font-bold text-slate-900 mb-1">Call Us</h4>
          <p className="text-xs text-slate-500">8AM - 10PM Daily</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-2xl text-center hover:bg-indigo-50 border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer group">
          <Mail className="w-10 h-10 mx-auto text-indigo-400 group-hover:text-indigo-600 mb-3 transition-colors" />
          <h4 className="font-bold text-slate-900 mb-1">Email</h4>
          <p className="text-xs text-slate-500">Usually replies in 24h</p>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {['How do I reschedule a booking?', 'What is your cancellation policy?', 'How are professionals verified?', 'What if I am not satisfied with the service?'].map((q, i) => (
            <div key={i} className="border border-slate-200 rounded-xl p-5 hover:border-indigo-300 cursor-pointer flex justify-between items-center group transition-colors">
              <span className="font-medium text-slate-800 group-hover:text-indigo-700">{q}</span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPlans = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-black text-slate-900 mb-4">Survly <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Plus</span></h3>
        <p className="text-lg text-slate-600 max-w-md mx-auto">Get exclusive benefits, priority support, and save up to ₹5000 a year.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-slate-200 p-8 rounded-3xl relative">
          <h4 className="text-xl font-bold text-slate-900 mb-2">Basic</h4>
          <p className="text-slate-500 mb-6">Standard account</p>
          <div className="text-4xl font-black text-slate-900 mb-8">Free</div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-slate-700"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Verified professionals</li>
            <li className="flex items-center gap-3 text-slate-700"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Standard pricing</li>
            <li className="flex items-center gap-3 text-slate-700"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0"/> Basic support</li>
            <li className="flex items-center gap-3 text-slate-400"><XCircle className="w-5 h-5 shrink-0"/> No priority booking</li>
            <li className="flex items-center gap-3 text-slate-400"><XCircle className="w-5 h-5 shrink-0"/> Standard cancellation fees</li>
          </ul>
          <button className="w-full bg-slate-100 text-slate-500 font-bold py-3 rounded-xl cursor-not-allowed">Current Plan</button>
        </div>
        
        <div className="border-2 border-indigo-600 bg-gradient-to-b from-indigo-50 to-white p-8 rounded-3xl relative shadow-xl transform scale-105">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-4 py-1 rounded-full text-sm shadow-md">MOST POPULAR</div>
          <h4 className="text-xl font-bold text-indigo-900 mb-2">Plus</h4>
          <p className="text-indigo-700 mb-6">For regular users</p>
          <div className="text-4xl font-black text-slate-900 mb-1">₹299<span className="text-lg text-slate-500 font-normal">/mo</span></div>
          <p className="text-sm text-emerald-600 font-bold mb-6">Save 20% on yearly billing</p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle className="w-5 h-5 text-indigo-600 shrink-0"/> 10% off on all services</li>
            <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle className="w-5 h-5 text-indigo-600 shrink-0"/> Priority customer support</li>
            <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle className="w-5 h-5 text-indigo-600 shrink-0"/> Zero cancellation fees</li>
            <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle className="w-5 h-5 text-indigo-600 shrink-0"/> Top-rated pros guarantee</li>
            <li className="flex items-center gap-3 text-slate-900 font-medium"><CheckCircle className="w-5 h-5 text-indigo-600 shrink-0"/> Exclusive partner offers</li>
          </ul>
          <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1">Upgrade to Plus</button>
        </div>
      </div>
    </div>
  );

  const renderAddresses = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-indigo-200 bg-indigo-50 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">DEFAULT</div>
          <div className="flex gap-4 items-start mb-4">
            <div className="bg-white p-3 rounded-xl shadow-sm"><MapPin className="w-6 h-6 text-indigo-600" /></div>
            <div>
              <h4 className="font-bold text-slate-900 text-lg">Home</h4>
              <p className="text-slate-600 mt-1 leading-relaxed">{profile.location || 'A-22, Lakshmi Narsimha Nagar, Mumbai, MH, 400001'}</p>
            </div>
          </div>
          <div className="flex gap-3 mt-4 pt-4 border-t border-indigo-100/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">Edit</button>
            <button className="text-sm font-semibold text-rose-600 hover:text-rose-800">Delete</button>
          </div>
        </div>

        <div className="border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-indigo-400 hover:bg-slate-50 transition-colors cursor-pointer min-h-[160px]">
          <div className="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900">Add New Address</h4>
          <p className="text-sm text-slate-500 mt-1">For your office or relatives</p>
        </div>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-slate-900 mb-4">Saved Cards</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-20"><CreditCard className="w-24 h-24" /></div>
          <div className="relative z-10 space-y-6">
            <div className="flex justify-between items-center">
              <span className="font-black italic text-xl">VISA</span>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">Default</span>
            </div>
            <div className="text-2xl font-mono tracking-widest mt-4">**** **** **** 4242</div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Card Holder</p>
                <p className="font-medium">{profile.name || 'User Name'}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Expires</p>
                <p className="font-medium">12/28</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center hover:border-indigo-400 hover:bg-slate-50 transition-colors cursor-pointer min-h-[200px]">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-3">
            <Plus className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-slate-900">Add New Card</h4>
          <p className="text-sm text-slate-500 mt-1">We support all major cards</p>
        </div>
      </div>

      <div className="pt-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Other Methods</h3>
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-white hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6 object-contain opacity-80" />
              <span className="font-medium text-slate-900">Add UPI ID</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
          <div className="p-4 flex items-center justify-between bg-white hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-4">
              <Wallet className="w-6 h-6 text-slate-500" />
              <span className="font-medium text-slate-900">Net Banking</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderRefer = () => (
    <div className="text-center space-y-8 py-4">
      <div className="relative inline-block">
        <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=60" className="w-56 h-56 mx-auto rounded-full object-cover shadow-2xl border-8 border-white z-10 relative"/>
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-30 -z-10"></div>
      </div>
      
      <div className="max-w-md mx-auto space-y-4">
        <h3 className="text-4xl font-black text-slate-900">Give ₹50, Get ₹50</h3>
        <p className="text-lg text-slate-600 leading-relaxed">Share your code. When a friend signs up and completes their first booking, you both earn ₹50 in Survly Cash!</p>
      </div>

      <div className="max-w-sm mx-auto bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-inner">
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">Your Referral Code</p>
        <div className="bg-white py-4 px-6 rounded-2xl text-4xl font-black tracking-widest text-indigo-600 border-2 border-indigo-200 border-dashed select-all mb-4">
          SURVLY50
        </div>
        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-2">
          <ClipboardList className="w-5 h-5" /> Copy Code
        </button>
      </div>

      <div className="flex justify-center gap-8 pt-6 border-t border-slate-100 max-w-sm mx-auto">
        <div className="text-center">
          <div className="text-3xl font-black text-slate-900">12</div>
          <div className="text-sm font-medium text-slate-500">Friends Joined</div>
        </div>
        <div className="w-px bg-slate-200"></div>
        <div className="text-center">
          <div className="text-3xl font-black text-emerald-600">₹600</div>
          <div className="text-sm font-medium text-slate-500">Total Earned</div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(view) {
      case 'settings': return renderSettings();
      case 'wallet': return renderWallet();
      case 'bookings': return renderBookings();
      case 'devices': return renderDevices();
      case 'support': return renderSupport();
      case 'plans': return renderPlans();
      case 'addresses': return renderAddresses();
      case 'payment': return renderPayment();
      case 'refer': return renderRefer();
      case 'passes': return <div className="text-center p-12"><Ticket className="w-20 h-20 mx-auto text-indigo-200 mb-6"/><h3 className="text-2xl font-bold text-slate-900 mb-2">No active passes</h3><p className="text-slate-500 max-w-sm mx-auto">Buy service passes to save up to 40% on multiple bookings. Check back later for offers.</p></div>;
      case 'rating': return <div className="text-center p-12"><Star className="w-24 h-24 mx-auto text-yellow-400 mb-6 fill-yellow-400 drop-shadow-md"/><h3 className="text-6xl font-black text-slate-900 mb-4">5.0</h3><p className="text-lg text-slate-600 font-medium max-w-sm mx-auto">Your customer rating is absolutely flawless! Professionals love serving you.</p></div>;
      case 'about': return <div className="text-center p-12 space-y-6"><div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-[2rem] flex items-center justify-center text-5xl font-black mx-auto mb-2 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform cursor-pointer">S</div><h3 className="text-3xl font-black text-slate-900">Survly</h3><p className="text-slate-500 font-mono">Version 2.4.1 (Build 8492)<br/>Made with ♥ in India</p><div className="flex flex-col max-w-xs mx-auto gap-3 pt-6"><button className="bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Terms of Service</button><button className="bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Privacy Policy</button><button className="bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Open Source Licenses</button></div></div>;
      default: return <p>Coming soon</p>;
    }
  };

  const titles: Record<string, string> = {
    settings: 'Account Settings', wallet: 'Wallet Balance', bookings: 'My Bookings', devices: 'Native Devices', support: 'Help & Support',
    plans: 'My Plans', passes: 'Passes & Membership', rating: 'My Rating', addresses: 'Manage Addresses', payment: 'Payment Methods', about: 'About Survly', refer: 'Refer & Earn'
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-right-8 duration-300 pb-12">
      <div className="flex items-center gap-4 mb-6 pt-4">
        <button onClick={onBack} className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-indigo-300 rounded-full transition-all shadow-sm group">
          <ChevronLeft className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 transition-colors"/>
        </button>
        <h2 className="text-3xl font-black text-slate-900">{titles[view] || view}</h2>
      </div>
      <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 shadow-sm">
        {renderContent()}
      </div>
    </div>
  );
}
