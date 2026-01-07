import React from 'react';

export function QuickStats({ stats }) {
    return (
        <div className="grid grid-cols-3 gap-3 px-4 mb-6">
            <div className="text-center group cursor-pointer bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-all">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gradient transition-transform duration-300 group-hover:scale-110">₹{stats.balance}</div>
                <div className="text-zinc-400 text-xs sm:text-sm mt-1 font-medium group-hover:text-zinc-300 transition-colors">Balance</div>
            </div>
            <div className="text-center group cursor-pointer bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-all">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gradient transition-transform duration-300 group-hover:scale-110">{stats.games}</div>
                <div className="text-zinc-400 text-xs sm:text-sm mt-1 font-medium group-hover:text-zinc-300 transition-colors">Games</div>
            </div>
            <div className="text-center group cursor-pointer bg-zinc-800/50 rounded-xl p-3 hover:bg-zinc-800 transition-all">
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gradient transition-transform duration-300 group-hover:scale-110">{stats.winRate}</div>
                <div className="text-zinc-400 text-xs sm:text-sm mt-1 font-medium group-hover:text-zinc-300 transition-colors">Win Rate</div>
            </div>
        </div>
    );
}
