import React, { useState } from 'react';
import { BarChart2, TrendingUp, Gamepad2, Trophy, Filter, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';
import { gameStats, monthlyPerformance, stats } from '../../data/mockData';

export function StatisticsSection() {
    const [timeFilter, setTimeFilter] = useState('monthly');
    const [selectedVariant, setSelectedVariant] = useState('all');

    const totalGames = gameStats.reduce((acc, curr) => acc + curr.games, 0);
    const totalWins = gameStats.reduce((acc, curr) => acc + curr.wins, 0);
    const overallWinRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0;

    const filteredStats = selectedVariant === 'all'
        ? gameStats
        : gameStats.filter(s => s.id === selectedVariant);

    return (
        <div className="animate-slide-in space-y-6 pb-20">

            {/* 1. Overall Performance Dashboard */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mt-32 blur-3xl animate-pulse"></div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Account Analytics</h3>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Your Rummy Career Summary</p>
                        </div>
                        <div className="flex gap-2">
                            {['daily', 'weekly', 'monthly'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setTimeFilter(f)}
                                    className={`px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${timeFilter === f ? 'bg-blue-500 text-white shadow-lg' : 'bg-zinc-950 text-zinc-600 border border-white/5'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-4 h-4 text-emerald-500" />
                                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Win Rate</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white">{overallWinRate}%</span>
                                <div className="flex items-center text-emerald-500 text-[10px] font-bold mb-1">
                                    <ArrowUpRight className="w-3 h-3" />
                                    <span>+2.4%</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-zinc-950/40 border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <Gamepad2 className="w-4 h-4 text-blue-500" />
                                <span className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Total Games</span>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black text-white">{totalGames}</span>
                                <div className="text-zinc-700 text-[10px] font-bold mb-1 uppercase tracking-tighter">Played</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Variant Mastery Bars */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                        </div>
                        Variant Performance
                    </h3>
                    <select
                        onChange={(e) => setSelectedVariant(e.target.value)}
                        className="bg-zinc-950 border border-white/5 rounded-xl px-4 py-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest focus:outline-none focus:border-yellow-500/30"
                    >
                        <option value="all">All Modes</option>
                        <option value="points">Points Rummy</option>
                        <option value="pool">Pool Rummy</option>
                        <option value="deals">Deals Rummy</option>
                    </select>
                </div>

                <div className="space-y-6">
                    {filteredStats.map((stat) => (
                        <div key={stat.id} className="space-y-3 p-4 bg-zinc-950/20 rounded-3xl border border-white/5 group hover:border-yellow-500/20 transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${stat.color} animate-pulse`}></div>
                                    <span className="text-white font-black text-xs uppercase tracking-tight">{stat.label}</span>
                                </div>
                                <span className={`text-xs font-black ${stat.textColor}`}>{stat.winRate} Win Rate</span>
                            </div>

                            <div className="flex items-end gap-1 h-12">
                                {stat.trend.map((val, i) => (
                                    <div
                                        key={i}
                                        className={`flex-1 ${stat.color} rounded-t-lg transition-all duration-500 group-hover:scale-y-110 opacity-40 group-hover:opacity-100 shadow-[0_0_15px_rgba(234,179,8,0.1)]`}
                                        style={{ height: `${val}%` }}
                                    ></div>
                                ))}
                            </div>

                            <div className="flex justify-between text-[10px] font-black text-zinc-600 uppercase tracking-widest pt-2">
                                <span>{stat.games} Games</span>
                                <span className="text-white">₹{stat.winnings.toLocaleString()} Won</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Monthly Win Trend Chart (Visual Simulation) */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>

                <div className="relative z-10">
                    <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-emerald-500" />
                        </div>
                        Winnings Trend
                    </h3>

                    <div className="flex items-end justify-between h-40 gap-2 px-2">
                        {monthlyPerformance.map((data, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                                <div className="relative w-full flex flex-col items-center gap-1">
                                    {/* Winrate bubble on hover */}
                                    <div className="absolute -top-8 bg-white text-black text-[8px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {data.winRate}%
                                    </div>
                                    {/* Bar with RGB shadow */}
                                    <div
                                        className="w-full bg-zinc-800 rounded-t-xl transition-all duration-700 group-hover:bg-blue-500 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                                        style={{ height: `${(data.points / 250) * 100}%` }}
                                    ></div>
                                </div>
                                <span className="text-[10px] font-black text-zinc-700 uppercase">{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 4. Filter Info */}
            <div className="text-center px-10">
                <p className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                    Data synced in real-time with your active game sessions. Unofficial variants are excluded from tracking.
                </p>
            </div>
        </div>
    );
}
