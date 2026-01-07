import React from 'react';
import { ArrowLeft, Edit, X } from 'lucide-react';

export function Header({
    title,
    showBack,
    onBack,
    showEdit,
    isEditing,
    onEditToggle
}) {
    return (
        <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex items-center gap-4">
                    {showBack ? (
                        <button
                            onClick={onBack}
                            className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-2 border-zinc-800 hover:border-yellow-500 hover:bg-zinc-900 transition-all duration-300 hover:scale-110">
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 hover:text-yellow-500 transition-colors" />
                        </button>
                    ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12"></div>
                    )}
                </div>

                <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold animate-slide-in ${title === 'Profile' ? 'fire-text' : 'text-gradient'}`}>
                    {title}
                </h1>

                {showEdit ? (
                    <button
                        onClick={onEditToggle}
                        className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-300 hover:scale-110 relative overflow-hidden"
                        style={{
                            borderColor: isEditing ? '#ef4444' : '#eab308',
                            backgroundColor: isEditing ? 'rgba(239, 68, 68, 0.1)' : 'rgba(234, 179, 8, 0.1)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        {isEditing ? (
                            <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 relative z-10 transition-transform group-hover:rotate-90 duration-300" />
                        ) : (
                            <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 relative z-10 transition-transform group-hover:rotate-12 duration-300" />
                        )}
                    </button>
                ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12"></div>
                )}
            </div>
        </div>
    );
}
