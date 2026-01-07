import React from 'react';
import { Book, ChevronRight, MessageSquare, Mail, Headphones, HelpCircle, Send } from 'lucide-react';
import { contactOptions, helpTopics } from '../../data/mockData';

export function SupportSection() {
    return (
        <div className="animate-slide-in space-y-8 pb-20">

            {/* 1. Primary Support Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactOptions.map((contact, i) => {
                    const Icon = contact.icon;
                    return (
                        <button
                            key={i}
                            className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-6 hover:border-yellow-500/30 transition-all group overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-white/10 transition-all"></div>
                            <div className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                {Icon && <Icon className="w-7 h-7 text-white" />}
                            </div>
                            <h4 className="text-white font-black uppercase text-sm tracking-widest mb-1">{contact.label}</h4>
                            <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-tighter">{contact.value}</p>
                        </button>
                    );
                })}
            </div>

            {/* 2. FAQ Section */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl">
                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                        <Book className="w-5 h-5 text-yellow-500" />
                    </div>
                    Frequently Asked Questions
                </h3>

                <div className="space-y-4">
                    {[
                        { q: 'How do I withdraw my winnings?', a: 'Go to Wallet > Withdraw and follow the steps. Minimum withdrawal is ₹100.' },
                        { q: 'What payment methods are supported?', a: 'We support all major UPI apps, Net Banking, and Debit/Credit Cards.' },
                        { q: 'How long does withdrawal take?', a: 'Withdrawals are processed instantly and usually reach your bank within 2-4 hours.' }
                    ].map((faq, i) => (
                        <details key={i} className="group bg-zinc-950/40 border border-white/5 rounded-3xl p-6 transition-all hover:border-white/10">
                            <summary className="text-white font-black text-xs uppercase tracking-tight cursor-pointer list-none flex items-center justify-between">
                                {faq.q}
                                <ChevronRight className="w-4 h-4 text-zinc-600 group-open:rotate-90 transition-transform" />
                            </summary>
                            <p className="text-zinc-500 font-bold text-xs mt-4 pl-1 border-l-2 border-yellow-500/50">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>

            {/* 3. Help Topics Grid */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>

                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-blue-500" />
                    </div>
                    Help Topics
                </h3>

                <div className="grid grid-cols-2 gap-4">
                    {helpTopics.map((topic, i) => {
                        const Icon = topic.icon;
                        return (
                            <button
                                key={i}
                                className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6 flex flex-col items-center text-center group hover:border-blue-500/30 transition-all"
                            >
                                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                                    {Icon && <Icon className="w-6 h-6 text-zinc-400 group-hover:text-blue-500 transition-colors" />}
                                </div>
                                <h5 className="text-white font-black uppercase text-[10px] tracking-widest mb-1">{topic.title}</h5>
                                <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-tighter">{topic.desc}</p>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 4. Support Ticket Banner */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border-2 border-yellow-500/10 rounded-[3rem] p-10 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">Still Need Help?</h3>
                <p className="text-zinc-500 font-bold text-sm mb-10 max-w-xs mx-auto">Our dedicated team is ready to assist you. Average response time is under 15 minutes.</p>
                <button className="bg-yellow-500 text-black font-black uppercase tracking-[0.2em] py-5 px-12 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto">
                    <Send className="w-5 h-5" /> Submit Ticket
                </button>
            </div>
        </div>
    );
}
