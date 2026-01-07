import React, { useState } from 'react';
import { User, Bell, Shield, Lock, ChevronRight, X, Mail, Phone, Key, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export function SettingsSection({ profileData, updateEmail, updatePhone, togglePreference }) {
    const [modalType, setModalType] = useState(null); // 'email', 'phone', 'password'
    const [inputValue, setInputValue] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
    const validatePassword = (pass) => /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/.test(pass);

    const handleUpdate = () => {
        setError('');

        if (modalType === 'email') {
            if (!validateEmail(inputValue)) {
                setError('Please enter a valid email address');
                return;
            }
            updateEmail(inputValue);
        }
        else if (modalType === 'phone') {
            if (!validatePhone(inputValue)) {
                setError('Enter a valid 10-digit phone number starting with 6-9');
                return;
            }
            updatePhone(inputValue);
        }
        else if (modalType === 'password') {
            if (!oldPassword) {
                setError('Please enter your current password');
                return;
            }
            if (!validatePassword(newPassword)) {
                setError('8-12 characters, must include Alphabet, Number & Special Character');
                return;
            }
            // Mock success for password
            console.log('Password updated');
        }

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setModalType(null);
            resetState();
        }, 1500);
    };

    const resetState = () => {
        setInputValue('');
        setOldPassword('');
        setNewPassword('');
        setError('');
        setShowPass(false);
    };

    const openModal = (type, currentVal = '') => {
        setModalType(type);
        setInputValue(currentVal);
    };

    const preferences = [
        { key: 'gameInvites', label: 'Game Invites' },
        { key: 'tournamentUpdates', label: 'Tournament Updates' },
        { key: 'promoOffers', label: 'Promotional Offers' }
    ];

    return (
        <div className="animate-slide-in space-y-6 pb-20">

            {/* 1. Account Settings Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl">
                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                        <User className="w-5 h-5 text-yellow-500" />
                    </div>
                    Account Settings
                </h3>

                <div className="space-y-4">
                    <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 group hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Email Address</span>
                            <button onClick={() => openModal('email', profileData.email)} className="text-yellow-500 text-[10px] font-black uppercase hover:underline">Change</button>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center"><Mail className="w-5 h-5 text-zinc-400" /></div>
                            <p className="text-white font-black tracking-tight">{profileData.email}</p>
                        </div>
                    </div>

                    <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 group hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Phone Number</span>
                            <button onClick={() => openModal('phone', profileData.phone)} className="text-yellow-500 text-[10px] font-black uppercase hover:underline">Change</button>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center"><Phone className="w-5 h-5 text-zinc-400" /></div>
                            <p className="text-white font-black tracking-tight">{profileData.phone}</p>
                        </div>
                    </div>

                    <button onClick={() => openModal('password')} className="w-full bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:border-yellow-500/30 transition-all">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center"><Lock className="w-5 h-5 text-zinc-400" /></div>
                            <p className="text-white font-black tracking-tight uppercase text-sm">Security & Password</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-yellow-500 transition-colors" />
                    </button>
                </div>
            </div>

            {/* 2. Preferences */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8">
                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <Bell className="w-5 h-5 text-blue-500" />
                    </div>
                    Preferences
                </h3>

                <div className="space-y-3">
                    {preferences.map((pref) => {
                        const isEnabled = profileData.preferences?.[pref.key];
                        return (
                            <button
                                key={pref.key}
                                onClick={() => togglePreference(pref.key)}
                                className="w-full flex items-center justify-between p-5 bg-zinc-950/40 border border-white/5 rounded-2xl hover:border-white/10 transition-all group"
                            >
                                <span className="text-zinc-400 font-bold text-xs uppercase tracking-wider group-hover:text-white transition-colors">{pref.label}</span>
                                <div className={`w-12 h-6 rounded-full transition-all relative ${isEnabled ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]' : 'bg-zinc-800'}`}>
                                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${isEnabled ? 'left-7' : 'left-1'}`}></div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Update Modal omitted for brevity, logic same as before but ensured to be included in final write */}
            {modalType && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fade-in" onClick={() => setModalType(null)}></div>
                    <div className="relative bg-zinc-900 w-full max-w-sm rounded-[3rem] border border-white/10 p-8 pt-12 animate-scale-in">
                        {showSuccess ? (
                            <div className="text-center py-10">
                                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-12 h-12 text-emerald-500 animate-bounce" /></div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Updated!</h3>
                                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Changes Saved Successfully</p>
                            </div>
                        ) : (
                            <>
                                <button onClick={() => setModalType(null)} className="absolute top-6 right-8 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"><X className="w-5 h-5 text-zinc-500" /></button>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 text-center px-4">Update {modalType}</h2>
                                <div className="space-y-5">
                                    {modalType === 'password' ? (
                                        <>
                                            <div className="space-y-2">
                                                <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest ml-4">Current Password</p>
                                                <div className="relative group">
                                                    <input type={showPass ? 'text' : 'password'} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder="Old Password" className="w-full bg-zinc-950 border-2 border-white/5 rounded-3xl p-5 pl-8 text-white font-bold focus:border-yellow-500/30 focus:outline-none transition-all placeholder:text-zinc-800" />
                                                    <button onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition-colors">{showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest ml-4">New Password</p>
                                                <div className="relative group">
                                                    <input type={showPass ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="8 to 12 chars" className="w-full bg-zinc-950 border-2 border-white/5 rounded-3xl p-5 pl-8 text-white font-bold focus:border-yellow-500/30 focus:outline-none transition-all placeholder:text-zinc-800" />
                                                </div>
                                                <p className="text-[8px] text-zinc-700 font-bold uppercase tracking-wider px-4">Must include alpha, num & special (@$!%*?&)</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="space-y-2">
                                            <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest ml-4">Enter New {modalType}</p>
                                            <div className="relative group">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-700 group-focus-within:text-yellow-500 transition-colors">{modalType === 'email' ? <Mail className="w-5 h-5" /> : <Phone className="w-5 h-5" />}</span>
                                                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={`New ${modalType}`} className="w-full bg-zinc-950 border-2 border-white/5 rounded-3xl p-6 pl-14 text-white font-bold focus:border-yellow-500/30 focus:outline-none transition-all placeholder:text-zinc-800" autoFocus />
                                            </div>
                                        </div>
                                    )}
                                    {error && <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 text-rose-500 animate-pulse"><AlertCircle className="w-4 h-4 flex-shrink-0" /><p className="text-[10px] font-black uppercase tracking-wider leading-tight">{error}</p></div>}
                                    <button onClick={handleUpdate} className="w-full py-6 rounded-3xl bg-yellow-500 text-black font-black uppercase tracking-widest shadow-2xl hover:scale-[1.02] active:scale-95 mt-4">Verify & Update</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
