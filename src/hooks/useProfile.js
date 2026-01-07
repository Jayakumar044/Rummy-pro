import { useState } from 'react';

export function useProfile() {
    const generateReferralCode = () => {
        return 'RP' + Math.random().toString(36).substr(2, 6).toUpperCase();
    };

    const defaultPrefs = {
        gameInvites: true,
        tournamentUpdates: true,
        promoOffers: false
    };

    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Safety: Merge defaults if preferences are missing from storage
            return {
                ...parsed,
                preferences: parsed.preferences || defaultPrefs
            };
        }

        return {
            name: 'Rajesh Kumar',
            id: generateReferralCode(),
            avatar: null,
            email: 'rajesh.kumar@example.com',
            phone: '+91 98765 43210',
            joinDate: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
            preferences: defaultPrefs
        };
    });

    const [tempData, setTempData] = useState({ ...profileData });
    const [isEditing, setIsEditing] = useState(false);
    const [showImageOptions, setShowImageOptions] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
        setTempData({ ...profileData });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setTempData({ ...profileData });
        setShowImageOptions(false);
    };

    const handleSaveEdit = () => {
        const newData = { ...tempData };
        setProfileData(newData);
        localStorage.setItem('userProfile', JSON.stringify(newData));
        setIsEditing(false);
        setShowImageOptions(false);
    };

    const updateEmail = (newEmail) => {
        const newData = { ...profileData, email: newEmail };
        setProfileData(newData);
        setTempData(newData);
        localStorage.setItem('userProfile', JSON.stringify(newData));
    };

    const updatePhone = (newPhone) => {
        const newData = { ...profileData, phone: newPhone };
        setProfileData(newData);
        setTempData(newData);
        localStorage.setItem('userProfile', JSON.stringify(newData));
    };

    const togglePreference = (key) => {
        setProfileData(prev => {
            const currentPrefs = prev.preferences || defaultPrefs;
            const newPrefs = { ...currentPrefs, [key]: !currentPrefs[key] };
            const newData = { ...prev, preferences: newPrefs };
            localStorage.setItem('userProfile', JSON.stringify(newData));
            return newData;
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setTempData({ ...tempData, avatar: reader.result });
            };
            reader.readAsDataURL(file);
            setShowImageOptions(false);
        }
    };

    const handleRemoveImage = () => {
        setTempData({ ...tempData, avatar: null });
        setShowImageOptions(false);
    };

    return {
        profileData,
        tempData,
        setTempData,
        isEditing,
        showImageOptions,
        setShowImageOptions,
        handleEditClick,
        handleCancelEdit,
        handleSaveEdit,
        handleImageUpload,
        handleRemoveImage,
        updateEmail,
        updatePhone,
        togglePreference
    };
}
