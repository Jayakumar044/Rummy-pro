import React from 'react';

export function EarningsSummary({ stats }) {
    return (
        <div className="grid grid-cols-3 gap-3 px-4">
            <div className="text-center bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-3 border border-green-800/30">
                <div className="text-lg sm:text-xl font-bold text-green-400">₹{stats.totalWinnings}</div>
                <div className="text-zinc-400 text-xs mt-1">Total Won</div>
            </div>
            <div className="text-center bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-3 border border-blue-800/30">
                <div className="text-lg sm:text-xl font-bold text-blue-400">{stats.todayGames}</div>
                <div className="text-zinc-400 text-xs mt-1">Today</div>
            </div>
            <div className="text-center bg-gradient-to-br from-orange-900/30 to-orange-800/20 rounded-xl p-3 border border-orange-800/30">
                <div className="text-lg sm:text-xl font-bold text-orange-400">{stats.streak} 🔥</div>
                <div className="text-zinc-400 text-xs mt-1">Win Streak</div>
            </div>
        </div>
    );
}
