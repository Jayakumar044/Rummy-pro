import React from 'react';

export function Layout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white overflow-x-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Scrollable Content */}
                <div className="px-4 sm:px-6 lg:px-8 pb-32 pt-6">
                    <div className="max-w-4xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
