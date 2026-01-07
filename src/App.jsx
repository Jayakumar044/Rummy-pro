import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { ProfileSection } from './features/profile/ProfileSection';
import { WalletSection } from './features/wallet/WalletSection';
import { StatisticsSection } from './features/statistics/StatisticsSection';
import { AchievementsSection } from './features/achievements/AchievementsSection';
import { ReferralsSection } from './features/referrals/ReferralsSection';
import { SettingsSection } from './features/settings/SettingsSection';
import { SupportSection } from './features/support/SupportSection';
import { useProfile } from './hooks/useProfile';
import { useWallet } from './hooks/useWallet';
import { menuItems } from './data/mockData';
import { ArrowLeft } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [activeSection, setActiveSection] = useState(null);
  const profileState = useProfile();
  const walletState = useWallet();

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };

  const handleBackToProfile = () => {
    setActiveSection(null);
  };

  const currentSectionLabel = activeSection
    ? menuItems.find(m => m.section === activeSection)?.label
    : 'Profile';

  const renderSection = () => {
    // If we have an active sub-section (like Wallet, Stats, etc. from the menu grid)
    if (activeSection) {
      const subSectionHeader = (
        <div className="flex items-center gap-4 mb-6 animate-slide-in">
          <button
            onClick={handleBackToProfile}
            className="w-10 h-10 flex items-center justify-center rounded-xl border-2 border-zinc-800 hover:border-yellow-500 transition-all hover:scale-110 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <h2 className="text-2xl font-black text-gradient uppercase tracking-tighter">
            {currentSectionLabel}
          </h2>
        </div>
      );

      return (
        <>
          {subSectionHeader}
          {(() => {
            switch (activeSection) {
              case 'wallet':
                return <WalletSection walletState={walletState} />;
              case 'statistics':
                return <StatisticsSection />;
              case 'achievements':
                return <AchievementsSection />;
              case 'referrals':
                return <ReferralsSection profileId={profileState.profileData.id} />;
              case 'settings':
                return <SettingsSection
                  profileData={profileState.profileData}
                  updateEmail={profileState.updateEmail}
                  updatePhone={profileState.updatePhone}
                  togglePreference={profileState.togglePreference}
                />;
              case 'support':
                return <SupportSection />;
              default:
                return <ProfileSection onMenuClick={handleMenuClick} profileState={profileState} />;
            }
          })()}
        </>
      );
    }

    // Default views based on bottom navigation tabs
    switch (activeTab) {
      case 'wallet':
        return <WalletSection walletState={walletState} />;
      case 'profile':
        return <ProfileSection onMenuClick={handleMenuClick} profileState={profileState} />;
      default:
        // For 'home' and 'games' which aren't implemented yet, show profile as fallback or a placeholder
        return <ProfileSection onMenuClick={handleMenuClick} profileState={profileState} />;
    }
  };

  return (
    <>
      <Layout>
        {renderSection()}
      </Layout>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={(id) => {
          setActiveTab(id);
          if (id !== 'profile') {
            setActiveSection(null);
          }
        }}
        onResetSection={() => setActiveSection(null)}
      />
    </>
  );
}
