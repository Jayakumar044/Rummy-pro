import React, { useState } from 'react';
import { Target, Trophy, Star, Filter, CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import { achievements } from '../../data/mockData';

export function AchievementsSection() {
    const [activeFilter, setActiveFilter] = useState('all');

    const totalAchievements = achievements.length;
    const completedAchievements = achievements.reduce((acc, ach) => {
        return acc + (ach.currentStage === ach.stages.length ? 1 : 0);
    }, 0);
    const overallProgress = (completedAchievements / totalAchievements) * 100;

    const filteredAchievements = achievements.filter(ach => {
        const isCompleted = ach.currentStage === ach.stages.length;
        if (activeFilter === 'all') return true;
        if (activeFilter === 'completed') return isCompleted;
        if (activeFilter === 'in-progress') return !isCompleted;
        return true;
    });

    const getStageColor = (label) => {
        switch (label.toLowerCase()) {
            case 'bronze': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'silver': return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
            case 'gold': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
            default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
        }
    };

    return (
        <div className="animate-slide-in space-y-8 pb-10">

            {/* Achievement Dashboard */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse"></div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-white font-black text-2xl uppercase tracking-tighter">Achievement Progress</h3>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">Unlock Rewards & Trophies</p>
                        </div>
                        <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center rotate-3 shadow-xl">
                            <Trophy className="w-8 h-8 text-black" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-zinc-950/50 rounded-2xl p-5 border border-white/5">
                            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Total Badges</p>
                            <p className="text-3xl font-black text-white">{completedAchievements}/{totalAchievements}</p>
                        </div>
                        <div className="bg-zinc-950/50 rounded-2xl p-5 border border-white/5">
                            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">Mastery Score</p>
                            <p className="text-3xl font-black text-emerald-500">{Math.round(overallProgress)}%</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Overall Completion</p>
                            <p className="text-xs font-black text-yellow-500">{Math.round(overallProgress)}%</p>
                        </div>
                        <div className="w-full h-3 bg-zinc-950 rounded-full border border-white/5 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(234,179,8,0.3)]"
                                style={{ width: `${overallProgress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['all', 'in-progress', 'completed'].map(filter => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 whitespace-nowrap ${activeFilter === filter
                            ? 'bg-white text-black border-white shadow-lg scale-105'
                            : 'bg-transparent text-zinc-600 border-zinc-800 hover:border-zinc-700'
                            }`}
                    >
                        {filter.replace('-', ' ')}
                    </button>
                ))}
            </div>

            {/* Achievement Cards */}
            <div className="grid gap-6">
                {filteredAchievements.map((ach) => {
                    const isCompleted = ach.currentStage === ach.stages.length;
                    const nextStage = !isCompleted ? ach.stages[ach.currentStage] : ach.stages[ach.stages.length - 1];
                    const prevStageTarget = ach.currentStage > 0 ? ach.stages[ach.currentStage - 1].target : 0;

                    const stageProgress = Math.min(
                        100,
                        ((ach.progress - prevStageTarget) / (nextStage.target - prevStageTarget)) * 100
                    );

                    return (
                        <div
                            key={ach.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 hover:border-zinc-700 transition-all group overflow-hidden relative"
                        >
                            {!isCompleted && (
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {(() => {
                                        const Icon = ach.icon;
                                        return Icon ? <Icon className="w-24 h-24" /> : null;
                                    })()}
                                </div>
                            )}

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${isCompleted ? 'bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-zinc-800 border border-white/5'}`}>
                                        {(() => {
                                            const Icon = ach.icon;
                                            return Icon ? <Icon className={`w-7 h-7 ${isCompleted ? 'text-emerald-500' : 'text-zinc-500'}`} /> : null;
                                        })()}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-white font-black text-lg uppercase tracking-tight flex items-center gap-2">
                                            {ach.title}
                                            {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                                        </h4>
                                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest line-clamp-1">{ach.description}</p>

                                        {/* Stages Indicator */}
                                        <div className="flex gap-1 mt-3">
                                            {ach.stages.map((stage, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`px-3 py-1 rounded-full text-[8px] font-black uppercase border transition-all ${idx < ach.currentStage
                                                        ? 'bg-emerald-500 border-emerald-400 text-black'
                                                        : idx === ach.currentStage
                                                            ? getStageColor(stage.label)
                                                            : 'bg-zinc-950 border-white/5 text-zinc-800'
                                                        }`}
                                                >
                                                    {stage.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center md:items-end gap-3 min-w-[140px]">
                                    <div className="text-center md:text-right">
                                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">Next Reward</p>
                                        <p className={`text-xl font-black ${isCompleted ? 'text-emerald-500' : 'text-yellow-500'}`}>
                                            {isCompleted ? 'CLAIMED' : `₹${nextStage.reward}`}
                                        </p>
                                    </div>
                                    {!isCompleted && (
                                        <div className="w-full space-y-2">
                                            <div className="flex justify-between text-[8px] font-black text-zinc-500 uppercase">
                                                <span>{ach.progress}/{nextStage.target}</span>
                                                <span>{Math.round(stageProgress)}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden border border-white/5">
                                                <div
                                                    className="h-full bg-yellow-500 rounded-full shadow-[0_0_8px_rgba(234,179,8,0.2)]"
                                                    style={{ width: `${stageProgress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Hover Action (Visual) */}
                            {!isCompleted && (
                                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between group-hover:bg-zinc-950/20 transition-all rounded-b-2xl">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-4 h-4 text-zinc-600" />
                                        <span className="text-[9px] text-zinc-500 font-black uppercase">Continue Progress</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-yellow-500 transform group-hover:translate-x-1 transition-all" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
