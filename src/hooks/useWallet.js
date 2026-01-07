import { useState, useEffect } from 'react';

export function useWallet() {
    const [balance, setBalance] = useState(() => {
        const saved = localStorage.getItem('walletBalance');
        return saved ? parseFloat(saved) : 25000;
    });

    const [transactions, setTransactions] = useState(() => {
        const saved = localStorage.getItem('walletTransactions');
        return saved ? JSON.parse(saved) : [];
    });

    const [lastClaimDate, setLastClaimDate] = useState(() => {
        return localStorage.getItem('lastClaimDate') || '';
    });

    const [claimStreak, setClaimStreak] = useState(() => {
        const saved = localStorage.getItem('claimStreak');
        return saved ? parseInt(saved) : 0;
    });

    useEffect(() => {
        localStorage.setItem('walletBalance', balance.toString());
    }, [balance]);

    useEffect(() => {
        localStorage.setItem('walletTransactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('lastClaimDate', lastClaimDate);
        localStorage.setItem('claimStreak', claimStreak.toString());
    }, [lastClaimDate, claimStreak]);

    const addMoney = (amount) => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) return;
        setBalance(prev => prev + numAmount);
        addTransaction('deposit', numAmount, 'Wallet Deposit');
    };

    const withdrawMoney = (amount) => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0 || numAmount > balance) return;
        setBalance(prev => prev - numAmount);
        addTransaction('withdrawal', numAmount, 'Bank Withdrawal');
    };

    const addTransaction = (type, amount, game) => {
        const newTx = {
            id: Date.now(),
            type,
            amount: `${type === 'win' || type === 'deposit' ? '+' : '-'}${amount.toLocaleString('en-IN')}`,
            game,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: type === 'withdrawal' ? 'pending' : 'completed'
        };
        setTransactions(prev => [newTx, ...prev]);
    };

    const claimDailyReward = () => {
        const today = new Date().toDateString();
        if (lastClaimDate === today) {
            alert('You have already claimed your reward for today!');
            return false;
        }

        const nextStreak = (claimStreak % 7) + 1;
        const rewardAmount = nextStreak * 5; // Day 1: 5, Day 2: 10, ..., Day 7: 35

        setBalance(prev => prev + rewardAmount);
        setClaimStreak(nextStreak);
        setLastClaimDate(today);
        addTransaction('deposit', rewardAmount, `Day ${nextStreak} Reward`);
        return true;
    };

    return {
        balance,
        transactions,
        addMoney,
        withdrawMoney,
        claimDailyReward,
        claimStreak,
        lastClaimDate,
        formatCurrency: (val) => val.toLocaleString('en-IN')
    };
}
