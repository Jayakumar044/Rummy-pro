import { Home, Gamepad2, CreditCard, User, Trophy, Users, BarChart2, Star, Settings, Headphones, Shield, Key, MessageSquare, Mail, HelpCircle, Book, ShieldAlert } from 'lucide-react';

export const stats = {
    balance: 25000,
    games: 156,
    winRate: '68%',
    totalWinnings: 124500,
    todayGames: 12,
    streak: 5
};

export const gameStats = [
    {
        id: 'points',
        label: 'Points Rummy',
        games: 85,
        wins: 61,
        winRate: '72%',
        winnings: 45000,
        color: 'bg-yellow-500',
        textColor: 'text-yellow-500',
        trend: [40, 55, 45, 70, 65, 80, 72]
    },
    {
        id: 'pool',
        label: 'Pool Rummy',
        games: 42,
        wins: 27,
        winRate: '64%',
        winnings: 32000,
        color: 'bg-emerald-500',
        textColor: 'text-emerald-500',
        trend: [30, 40, 50, 45, 60, 55, 64]
    },
    {
        id: 'deals',
        label: 'Deals Rummy',
        games: 29,
        wins: 17,
        winRate: '58%',
        winnings: 18500,
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
        trend: [20, 30, 25, 40, 50, 45, 58]
    }
];

export const monthlyPerformance = [
    { month: 'Jul', points: 120, winRate: 60 },
    { month: 'Aug', points: 150, winRate: 65 },
    { month: 'Sep', points: 110, winRate: 58 },
    { month: 'Oct', points: 180, winRate: 70 },
    { month: 'Nov', points: 200, winRate: 72 },
    { month: 'Dec', points: 190, winRate: 68 }
];

export const achievements = [
    {
        id: 1,
        title: 'Win Streak',
        description: 'Win consecutive games in any mode',
        icon: Trophy,
        currentStage: 2,
        stages: [
            { level: 1, target: 5, reward: 100, label: 'Bronze' },
            { level: 2, target: 10, reward: 250, label: 'Silver' },
            { level: 3, target: 20, reward: 500, label: 'Gold' }
        ],
        progress: 8,
        category: 'milestone'
    },
    {
        id: 2,
        title: 'High Roller',
        description: 'Win a single game with high stake',
        icon: Star,
        currentStage: 1,
        stages: [
            { level: 1, target: 1000, reward: 200, label: 'Bronze' },
            { level: 2, target: 5000, reward: 1000, label: 'Silver' },
            { level: 3, target: 10000, reward: 2500, label: 'Gold' }
        ],
        progress: 1200,
        category: 'earnings'
    },
    {
        id: 3,
        title: 'Referral King',
        description: 'Invite friends to join Rummy Pro',
        icon: Users,
        currentStage: 0,
        stages: [
            { level: 1, target: 5, reward: 500, label: 'Bronze' },
            { level: 2, target: 25, reward: 2000, label: 'Silver' },
            { level: 3, target: 100, reward: 10000, label: 'Gold' }
        ],
        progress: 3,
        category: 'social'
    },
    {
        id: 4,
        title: 'Game Master',
        description: 'Complete total games in a month',
        icon: Gamepad2,
        currentStage: 3,
        stages: [
            { level: 1, target: 50, reward: 300, label: 'Bronze' },
            { level: 2, target: 200, reward: 1500, label: 'Silver' },
            { level: 3, target: 500, reward: 5000, label: 'Gold' }
        ],
        progress: 500,
        category: 'milestone'
    }
];

export const referrals = [
    { name: 'Amit Kumar', date: '2 Jan', reward: '₹50' },
    { name: 'Suresh Raina', date: '31 Dec', reward: '₹50' },
    { name: 'Priya Sharma', date: '28 Dec', reward: '₹50' }
];

export const menuItems = [
    { icon: CreditCard, label: 'My Wallet & Transactions', section: 'wallet', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: BarChart2, label: 'Statistics', section: 'statistics', color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { icon: Star, label: 'Achievements', section: 'achievements', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { icon: Users, label: 'Friends & Referrals', section: 'referrals', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: Settings, label: 'Settings', section: 'settings', color: 'text-zinc-500', bg: 'bg-zinc-500/10' },
    { icon: Headphones, label: 'Support & Help', section: 'support', color: 'text-violet-500', bg: 'bg-violet-500/10' }
];

export const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Gamepad2, label: 'Games', id: 'games' },
    { icon: CreditCard, label: 'Wallet', id: 'wallet' },
    { icon: User, label: 'Profile', id: 'profile' }
];

export const helpTopics = [
    { title: 'How to Play', desc: 'New to Rummy? Start here', icon: HelpCircle },
    { title: 'Payment Issues', desc: 'Help with deposits & withdrawals', icon: CreditCard },
    { title: 'Game Rules', desc: 'Point calculations & variants', icon: Book },
    { title: 'Account Security', desc: 'Keep your account safe', icon: ShieldAlert }
];

export const contactOptions = [
    { icon: MessageSquare, label: 'Live Chat', value: '24/7 Available', color: 'from-emerald-500 to-teal-600' },
    { icon: Mail, label: 'Email Us', value: 'support@rummypro.com', color: 'from-blue-500 to-indigo-600' },
    { icon: Headphones, label: 'Call Support', value: '1800-RUMMY-PRO', color: 'from-yellow-400 to-orange-500' }
];
