import React from 'react';
import { Camera, Upload, Trash2, Check, Edit, X } from 'lucide-react';

export function ProfileHeader({
    profileData,
    tempData,
    isEditing,
    setTempData,
    handleSaveEdit,
    showImageOptions,
    setShowImageOptions,
    handleImageUpload,
    handleRemoveImage,
    onEditToggle,
    onCancelEdit
}) {
    return (
        <div className="relative py-6 sm:py-8 lg:py-10 bg-gradient-to-br from-zinc-900 to-zinc-900/50 rounded-2xl lg:rounded-3xl border border-zinc-800 hover-lift animate-scale-in overflow-hidden">

            {/* Custom Header within Card */}
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={isEditing ? onCancelEdit : onEditToggle}
                    className="group w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border-2 transition-all duration-300 hover:scale-110 relative overflow-hidden backdrop-blur-md"
                    style={{
                        borderColor: isEditing ? '#ef4444' : '#eab308',
                        backgroundColor: isEditing ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.1)'
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/20 to-yellow-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    {isEditing ? (
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 relative z-10 transition-transform group-hover:rotate-90 duration-300" />
                    ) : (
                        <Edit className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 relative z-10 transition-transform group-hover:rotate-12 duration-300" />
                    )}
                </button>
            </div>

            <div className="text-center mb-4">
                <h1 className="text-3xl sm:text-4xl font-black mb-2 fire-text uppercase tracking-wider">
                    User Profile
                </h1>
            </div>

            {/* Avatar */}
            <div className="flex justify-center mb-4 sm:mb-6 relative">
                <div className="relative group">
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse-ring"></div>
                    {tempData.avatar ? (
                        <img
                            src={tempData.avatar}
                            alt="Profile"
                            className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-zinc-900 object-cover transition-all duration-500 group-hover:border-yellow-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-yellow-500/50"
                        />
                    ) : (
                        <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-zinc-900 transition-all duration-500 group-hover:border-yellow-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-yellow-500/50 animate-float"></div>
                    )}
                    {isEditing && (
                        <button
                            onClick={() => setShowImageOptions(!showImageOptions)}
                            className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-3 border-zinc-900 hover:scale-125 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 animate-scale-in"
                        >
                            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                        </button>
                    )}

                    {showImageOptions && isEditing && (
                        <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl shadow-2xl border-2 border-zinc-700 overflow-hidden z-30 min-w-[240px] animate-slide-in">
                            <label className="block px-5 py-4 hover:bg-zinc-700/50 cursor-pointer transition-all duration-300 group">
                                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Upload className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-white block">Upload Photo</span>
                                        <span className="text-xs text-zinc-400">Choose from gallery</span>
                                    </div>
                                </div>
                            </label>
                            {tempData.avatar && (
                                <button onClick={handleRemoveImage} className="w-full px-5 py-4 hover:bg-zinc-700/50 transition-all duration-300 text-left group border-t border-zinc-700/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <Trash2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="font-semibold text-white block">Remove Photo</span>
                                            <span className="text-xs text-zinc-400">Delete current picture</span>
                                        </div>
                                    </div>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Name and ID */}
            <div className="text-center mb-6 sm:mb-8 px-4">
                {isEditing ? (
                    <div className="relative">
                        <input
                            type="text"
                            value={tempData.name}
                            onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                            className="relative text-xl sm:text-2xl lg:text-3xl font-bold mb-2 bg-zinc-800/50 border-2 border-zinc-700/50 focus:border-yellow-500/50 rounded-xl px-4 py-3 text-center w-full max-w-xs mx-auto focus:outline-none transition-all duration-300 text-white placeholder-zinc-500"
                            placeholder="Enter your name"
                            autoFocus
                        />
                    </div>
                ) : (
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 text-white animate-slide-in">{profileData.name}</h2>
                )}
                <p className="text-zinc-400 text-sm sm:text-base font-medium">ID: <span className="text-yellow-500">{profileData.id}</span></p>
                <p className="text-zinc-500 text-xs sm:text-sm mt-1">Member since {profileData.joinDate}</p>
            </div>

            {isEditing && (
                <div className="flex justify-center mb-6 animate-scale-in">
                    <button
                        onClick={handleSaveEdit}
                        className="group relative flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 hover:scale-105 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                        <Check className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Save Changes</span>
                    </button>
                </div>
            )}
        </div>
    );
}
