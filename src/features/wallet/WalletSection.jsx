import React, { useState } from 'react';
import { Clock, Gift, Plus, Minus, X, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Filter } from 'lucide-react';

export function WalletSection({ walletState }) {
    const { balance, transactions, addMoney, withdrawMoney, claimDailyReward, claimStreak, lastClaimDate, formatCurrency } = walletState;

    const [modalType, setModalType] = useState(null);
    const [amount, setAmount] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFullHistory, setShowFullHistory] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'deposit', 'withdrawal', 'reward'

    const presets = [100, 200, 500, 1000];
    const today = new Date().toDateString();
    const alreadyClaimed = lastClaimDate === today;

    const handleConfirm = () => {
        const amt = parseFloat(amount);
        if (!amt || amt <= 0) return;
        if (modalType === 'add') addMoney(amt);
        else withdrawMoney(amt);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setModalType(null);
            setAmount('');
        }, 1500);
    };

    const closeModal = () => {
        if (!showSuccess) {
            setModalType(null);
            setAmount('');
        }
    };

    const filteredTransactions = transactions.filter(txn => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'reward') return txn.game.toLowerCase().includes('reward') || txn.game.toLowerCase().includes('bonus');
        return txn.type === activeFilter;
    });

    const filterTabs = [
        { id: 'all', label: 'All', icon: Clock },
        { id: 'deposit', label: 'Added', icon: Plus },
        { id: 'withdrawal', label: 'Withdraw', icon: Minus },
        { id: 'reward', label: 'Rewards', icon: Gift }
    ];

    return (
        <div className="animate-slide-in space-y-6">

            {/* 1. Balance Card */}
            <div className="animate-rgb-flow rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse"></div>
                <div className="relative z-10">
                    <p className="text-white/70 font-bold text-xs uppercase tracking-[0.2em] mb-2">My Balance</p>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-3xl font-black text-white/50">₹</span>
                        <h2 className="text-5xl sm:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                            {formatCurrency(balance)}
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setModalType('add')} className="flex-1 bg-white text-zinc-900 font-black py-4 rounded-2xl hover:scale-105 transition-all shadow-xl">ADD CASH</button>
                        <button onClick={() => setModalType('withdraw')} className="flex-1 bg-black/20 backdrop-blur-md text-white border border-white/20 font-black py-4 rounded-2xl hover:bg-black/40 transition-all">WITHDRAW</button>
                    </div>
                </div>
            </div>

            {/* 2. Daily Rewards (7-Day Grid) */}
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-[2.5rem] border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-yellow-500" /> 7-Day Rewards
                    </h3>
                    <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-3 py-1 rounded-full border border-yellow-500/20 md:block hidden">+₹5 DAILY GROWTH</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                        const isActive = claimStreak >= day;
                        const isNext = (claimStreak === day - 1) && !alreadyClaimed;
                        return (
                            <div
                                key={day}
                                className={`relative p-3 rounded-2xl border flex flex-col items-center justify-center gap-1 transition-all ${isActive ? 'bg-emerald-500/10 border-emerald-500/30' :
                                        isNext ? 'bg-yellow-500 border-yellow-400 scale-110 shadow-lg shadow-yellow-500/20 z-10' :
                                            'bg-zinc-800/50 border-white/5'
                                    }`}
                            >
                                <span className={`text-[8px] font-black uppercase ${isActive ? 'text-emerald-500' : isNext ? 'text-black' : 'text-zinc-600'}`}>Day {day}</span>
                                <span className={`text-sm font-black ${isNext ? 'text-black' : 'text-white'}`}>₹{day * 5}</span>
                                {isActive && <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 shadow-lg"><CheckCircle2 className="w-2.5 h-2.5 text-white" /></div>}
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={claimDailyReward}
                    disabled={alreadyClaimed}
                    className={`w-full mt-6 py-4 rounded-2xl font-black uppercase tracking-[0.2em] transition-all ${alreadyClaimed
                            ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-600 text-black shadow-xl hover:scale-[1.02] active:scale-95'
                        }`}
                >
                    {alreadyClaimed ? 'Claimed Today' : 'Claim Today\'s Reward'}
                </button>
            </div>

            {/* 3. Transaction Controls with Filter Tabs */}
            <div className="space-y-4">
                <button
                    onClick={() => setShowFullHistory(!showFullHistory)}
                    className="w-full flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] hover:border-zinc-700 transition-all group"
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${showFullHistory ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-zinc-800 text-zinc-400'}`}>
                            <Clock className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <p className="text-white font-black text-sm uppercase tracking-wider">Transaction History</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{showFullHistory ? 'Hide details' : 'View all activity'}</p>
                        </div>
                    </div>
                    {showFullHistory ? <ChevronUp className="w-6 h-6 text-zinc-600 group-hover:text-blue-500 transition-colors" /> : <ChevronDown className="w-6 h-6 text-zinc-600 group-hover:text-blue-500 transition-colors" />}
                </button>

                {showFullHistory && (
                    <div className="animate-scale-in space-y-4 px-1">
                        {/* Filter Tabs */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {filterTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap font-black text-[10px] uppercase tracking-widest transition-all border-2 ${activeFilter === tab.id
                                            ? 'bg-white text-black border-white shadow-lg scale-105'
                                            : 'bg-zinc-900 text-zinc-500 border-zinc-800/50 hover:border-zinc-700'
                                        }`}
                                >
                                    <tab.icon className={`w-3.5 h-3.5 ${activeFilter === tab.id ? 'text-black' : 'text-zinc-600'}`} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Transction List */}
                        <div className="space-y-3">
                            {filteredTransactions.map((txn) => (
                                <div key={txn.id} className="flex items-center justify-between p-5 bg-zinc-900/40 border border-white/5 rounded-3xl backdrop-blur-sm hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${txn.type === 'win' ? 'bg-emerald-500/10 text-emerald-400' :
                                                txn.type === 'deposit' ? 'bg-blue-500/10 text-blue-400' :
                                                    'bg-rose-500/10 text-rose-400'
                                            }`}>
                                            {txn.type === 'deposit' ? (txn.game.includes('Reward') ? '🎁' : '💰') : '🏦'}
                                        </div>
                                        <div>
                                            <p className="font-black text-white text-xs uppercase flex items-center gap-2">{txn.game}</p>
                                            <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-[0.2em]">{txn.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-black text-sm ${txn.amount.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {txn.amount}
                                        </p>
                                        <p className="text-[8px] text-zinc-700 font-bold uppercase">{txn.status}</p>
                                    </div>
                                </div>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <div className="text-center py-16 bg-zinc-900/20 rounded-[2.5rem] border-2 border-dashed border-zinc-800/50">
                                    <Filter className="w-10 h-10 text-zinc-800 mx-auto mb-3 opacity-50" />
                                    <p className="text-zinc-700 font-black uppercase text-[10px] tracking-widest">No {activeFilter} transactions found</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal System */}
            {modalType && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-xl animate-fade-in" onClick={closeModal}></div>
                    <div className="relative bg-zinc-900 w-full max-w-sm rounded-[3rem] border border-white/10 p-8 animate-scale-in shadow-[0_32px_128px_-12px_rgba(0,0,0,0.8)]">
                        {showSuccess ? (
                            <div className="text-center py-10">
                                <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 className="w-14 h-14 text-emerald-500 animate-bounce" /></div>
                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Confirmed</h3>
                                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Wallet Updated</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">{modalType === 'add' ? 'Load Cash' : 'Withdraw'}</h2>
                                    <button onClick={closeModal} className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center"><X className="w-5 h-5 text-zinc-500" /></button>
                                </div>

                                <div className="grid grid-cols-4 gap-2 mb-8">
                                    {presets.map(p => (
                                        <button key={p} onClick={() => setAmount(p.toString())} className={`py-4 rounded-2xl text-[10px] font-black transition-all border-2 ${amount === p.toString() ? 'bg-yellow-500 text-black border-yellow-400 scale-110 shadow-lg' : 'bg-zinc-800 text-zinc-500 border-white/5'}`}>₹{p}</button>
                                    ))}
                                </div>

                                <div className="relative mb-8 group">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-zinc-700 group-focus-within:text-yellow-500 transition-colors">₹</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0.00"
                                        className="w-full bg-zinc-950 border-2 border-white/5 rounded-3xl p-8 pl-14 text-4xl font-black text-white focus:border-yellow-500/30 focus:outline-none transition-all placeholder:text-zinc-900"
                                        autoFocus
                                    />
                                </div>

                                <button onClick={handleConfirm} className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl ${modalType === 'add' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-rose-500 text-white hover:bg-rose-400'}`}>
                                    Process Transaction
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
