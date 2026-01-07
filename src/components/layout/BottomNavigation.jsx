import React from 'react';
import { Home, Gamepad2, CreditCard, User } from 'lucide-react';
import { navItems } from '../../data/mockData';

export function BottomNavigation({ activeTab, onTabChange, onResetSection }) {
    const handleTabClick = (id) => {
        onTabChange(id);
        onResetSection();
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t-2 border-zinc-900 shadow-2xl z-40">
            <div className="max-w-7xl mx-auto flex justify-around items-center px-4 py-3">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleTabClick(item.id)}
                        className="group flex flex-col items-center gap-1 py-2 px-3 sm:px-6 min-w-[60px] transition-all duration-300 hover:scale-110"
                    >
                        <div className={`transition-all duration-300 ${activeTab === item.id ? 'scale-110' : ''}`}>
                            <item.icon
                                className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${activeTab === item.id
                                        ? 'text-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]'
                                        : 'text-zinc-500 group-hover:text-zinc-300'
                                    }`}
                            />
                        </div>
                        <span className={`text-xs font-semibold transition-all duration-300 ${activeTab === item.id ? 'text-yellow-500' : 'text-zinc-500 group-hover:text-zinc-300'
                            }`}>
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
