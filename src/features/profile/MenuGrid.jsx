import React from 'react';
import { ChevronRight } from 'lucide-react';
import { menuItems } from '../../data/mockData';

export function MenuGrid({ onMenuClick }) {
    return (
        <div className="mt-4 sm:mt-6 space-y-3 grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    onClick={() => onMenuClick(item.section)}
                    className="group w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                >
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} ${item.hoverColor} rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg`}>
                            <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-semibold text-sm sm:text-base text-white group-hover:text-yellow-400 transition-colors duration-300">{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-yellow-500 flex-shrink-0 transition-all duration-300 group-hover:translate-x-1" />
                </button>
            ))}
        </div>
    );
}
