import React, { useState } from 'react';
import { Copy, Check, Share2, Users, Calendar, Filter, ChevronDown, ChevronUp, MessageSquare, Mail, Facebook, Send } from 'lucide-react';

export function ReferralsSection({ profileId }) {
    const [copiedCode, setCopiedCode] = useState(false);
    const [showGuide, setShowGuide] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [showShareOptions, setShowShareOptions] = useState(false);

    // Mock Referrals Data
    const [referralsList] = useState([
        { id: 1, name: 'Amit Sharma', joinDate: '2024-01-05', status: 'Active', earned: 50, firstDeposit: true },
        { id: 2, name: 'Suresh Raina', joinDate: '2024-01-03', status: 'Pending', earned: 0, firstDeposit: false },
        { id: 3, name: 'Priya Patel', joinDate: '2023-12-28', status: 'Active', earned: 50, firstDeposit: true },
        { id: 4, name: 'Rahul Verma', joinDate: '2023-12-25', status: 'Inactive', earned: 0, firstDeposit: false },
    ]);

    const handleCopyReferral = () => {
        navigator.clipboard.writeText(profileId);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const shareText = `Hey! Join me on Rummy Pro and get ₹100 Welcome Bonus. Use my referral code: ${profileId}`;

    const socialPlatforms = [
        { name: 'WhatsApp', icon: MessageSquare, color: 'bg-[#25D366]', url: `https://wa.me/?text=${encodeURIComponent(shareText)}` },
        { name: 'Telegram', icon: Send, color: 'bg-[#0088cc]', url: `https://t.me/share/url?url=${encodeURIComponent('https://rummypro.app')}&text=${encodeURIComponent(shareText)}` },
        { name: 'Facebook', icon: Facebook, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://rummypro.app')}` },
        { name: 'SMS', icon: Mail, color: 'bg-zinc-600', url: `sms:?body=${encodeURIComponent(shareText)}` }
    ];

    const filteredReferrals = referralsList.filter(ref => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'active') return ref.status === 'Active';
        if (activeFilter === 'pending') return ref.status === 'Pending';
        return true;
    });

    return (
        <div className="animate-slide-in space-y-6 pb-10">

            {/* 1. Main Referral Card */}
            <div className="animate-rgb-flow rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>
                <div className="relative z-10 text-center">
                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-lg">Invite & Earn!</h3>
                    <p className="text-white/80 font-bold text-sm mb-8">Get <span className="text-white text-lg underline decoration-yellow-500 underline-offset-4">₹50</span> for every friend who joins & plays</p>

                    <div className="bg-black/20 backdrop-blur-2xl rounded-3xl p-6 mb-6 border border-white/10 shadow-inner">
                        <p className="text-white/40 text-[9px] font-black uppercase tracking-[0.2em] mb-3">Your Unique Code</p>
                        <div className="flex items-center justify-between bg-zinc-950/40 rounded-2xl p-4 border border-white/5 group">
                            <span className="text-2xl font-black text-white tracking-widest pl-2 font-mono">{profileId}</span>
                            <button
                                onClick={handleCopyReferral}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-xs uppercase transition-all active:scale-90 ${copiedCode ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-zinc-100 shadow-xl'}`}
                            >
                                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copiedCode ? 'COPIED' : 'COPY'}
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowShareOptions(true)}
                        className="w-full bg-zinc-950/40 backdrop-blur-xl text-white border border-white/20 font-black py-5 rounded-2xl hover:bg-zinc-950/60 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                    >
                        <Share2 className="w-6 h-6 text-yellow-500" /> Share Invitation
                    </button>
                </div>
            </div>

            {/* 2. Instructions Guide (Hide/Unhide) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden">
                <button
                    onClick={() => setShowGuide(!showGuide)}
                    className="w-full flex items-center justify-between p-6 text-white"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                            <Users className="w-5 h-5 text-yellow-500" />
                        </div>
                        <p className="font-black text-sm uppercase tracking-wider">How to earn ₹50?</p>
                    </div>
                    {showGuide ? <ChevronUp className="w-5 h-5 text-zinc-500" /> : <ChevronDown className="w-5 h-5 text-zinc-500" />}
                </button>

                {showGuide && (
                    <div className="px-6 pb-8 space-y-4 animate-slide-in">
                        {[
                            { step: '01', title: 'Share Code', desc: 'Share your referral code via Social Media platforms' },
                            { step: '02', title: 'Friend Joins', desc: 'Your friend registers on Rummy Pro using your code' },
                            { step: '03', title: 'First Play', desc: 'Referrer gets ₹50 once friend adds money & plays its 1st game' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-4 bg-zinc-800/30 rounded-2xl border border-white/5">
                                <span className="text-xl font-black text-yellow-500/30 font-mono tracking-tighter">{item.step}</span>
                                <div>
                                    <p className="text-white font-bold text-sm uppercase">{item.title}</p>
                                    <p className="text-zinc-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 3. Referral Details & Filters */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h4 className="text-white font-black text-sm uppercase tracking-widest">Referred Friends</h4>
                    <div className="flex items-center gap-2">
                        <Filter className="w-4 h-4 text-zinc-600" />
                        <select
                            value={activeFilter}
                            onChange={(e) => setActiveFilter(e.target.value)}
                            className="bg-transparent text-zinc-400 text-[10px] font-black uppercase outline-none"
                        >
                            <option value="all">EVERY DATE</option>
                            <option value="active">ACTIVE ONLY</option>
                            <option value="pending">PENDING</option>
                        </select>
                    </div>
                </div>

                <div className="space-y-3">
                    {filteredReferrals.map((ref) => (
                        <div key={ref.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl group hover:border-zinc-700 transition-all">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center font-black text-white border border-white/5">
                                        {ref.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-white font-black text-sm">{ref.name}</p>
                                        <div className="flex items-center gap-2 text-[8px] text-zinc-500 font-bold uppercase">
                                            <Calendar className="w-3 h-3" /> {ref.joinDate}
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${ref.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                                    ref.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                                        'bg-zinc-800 text-zinc-600 border border-white/5'
                                    }`}>
                                    {ref.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-zinc-950/50 rounded-2xl p-4 border border-white/5">
                                    <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">Benefit</p>
                                    <p className={`text-lg font-black ${ref.earned > 0 ? 'text-emerald-500' : 'text-zinc-700'}`}>₹{ref.earned}</p>
                                </div>
                                <div className="bg-zinc-950/50 rounded-2xl p-4 border border-white/5">
                                    <p className="text-zinc-600 text-[9px] font-black uppercase tracking-widest mb-1">First Play</p>
                                    <p className={`text-lg font-black ${ref.firstDeposit ? 'text-blue-500' : 'text-zinc-700'}`}>
                                        {ref.firstDeposit ? 'YES' : 'NO'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Social Sharing Modal */}
            {showShareOptions && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setShowShareOptions(false)}></div>
                    <div className="relative bg-zinc-900 w-full max-w-sm rounded-t-[3rem] sm:rounded-[3rem] border border-white/10 p-8 pt-12 animate-scale-in">
                        <button onClick={() => setShowShareOptions(false)} className="absolute top-6 right-8 w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"><X className="w-5 h-5 text-zinc-500" /></button>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-8 text-center">Share via</h3>

                        <div className="grid grid-cols-2 gap-4">
                            {socialPlatforms.map((platform) => (
                                <a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex flex-col items-center gap-3 p-6 bg-zinc-800/50 rounded-[2rem] border border-white/5 hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 group"
                                >
                                    <div className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform`}>
                                        <platform.icon className="w-7 h-7 text-white" />
                                    </div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{platform.name}</span>
                                </a>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5">
                            <p className="text-[10px] text-zinc-500 font-black uppercase text-center mb-4">Or Copy Link</p>
                            <div className="flex items-center gap-2 bg-zinc-950 rounded-2xl p-2 pl-4 border border-white/5">
                                <span className="text-[10px] text-zinc-700 font-bold truncate">https://rummypro.app/ref/{profileId}</span>
                                <button onClick={handleCopyReferral} className="bg-white text-black text-[10px] font-black px-4 py-2 rounded-xl">COPY</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// X icon helper (since not in lucide)
const X = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
