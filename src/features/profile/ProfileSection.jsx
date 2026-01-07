import React from 'react';
import { ProfileHeader } from './ProfileHeader';
import { QuickStats } from './QuickStats';
import { EarningsSummary } from './EarningsSummary';
import { MenuGrid } from './MenuGrid';
import { stats } from '../../data/mockData';

export function ProfileSection({ onMenuClick, profileState }) {
    const {
        profileData,
        tempData,
        setTempData,
        isEditing,
        showImageOptions,
        setShowImageOptions,
        handleSaveEdit,
        handleImageUpload,
        handleRemoveImage,
        handleEditClick,
        handleCancelEdit
    } = profileState;

    return (
        <>
            <div className="animate-slide-in">
                <ProfileHeader
                    profileData={profileData}
                    tempData={tempData}
                    isEditing={isEditing}
                    setTempData={setTempData}
                    handleSaveEdit={handleSaveEdit}
                    showImageOptions={showImageOptions}
                    setShowImageOptions={setShowImageOptions}
                    handleImageUpload={handleImageUpload}
                    handleRemoveImage={handleRemoveImage}
                    onEditToggle={handleEditClick}
                    onCancelEdit={handleCancelEdit}
                />
                <div className="mt-4">
                    <QuickStats stats={stats} />
                    <EarningsSummary stats={stats} />
                </div>
            </div>

            <MenuGrid onMenuClick={onMenuClick} />
        </>
    );
}
