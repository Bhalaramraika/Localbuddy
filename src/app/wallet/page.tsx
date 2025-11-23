
'use client';
import { Wallet, Lock, ArrowDown, ArrowUp, AlertTriangle, ShieldCheck, CreditCard, Banknote, History, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress";
import * as React from 'react';
import { cn } from '@/lib/utils';

const TransactionItem = ({ icon, title, date, amount, color, type }: { icon: React.ReactNode, title: string, date: string, amount: string, color: string, type: string }) => (
  <div className={cn("flex items-center justify-between glass-pill p-3 my-2 hover:bg-neon-cyan/10 transition-all border border-transparent rounded-lg group cursor-pointer")}>
    <div className="flex items-center gap-4">
      <div className={cn(`p-3 rounded-full glass-pill transition-all duration-300 group-hover:scale-110`, `bg-${color.replace('text-','')}/10`)}>{icon}</div>
      <div>
        <p className="font-semibold text-white group-hover:text-neon-cyan transition-colors">{title}</p>
        <p className="text-xs text-gray-400">{date} - {type}</p>
      </div>
    </div>
    <p className={`font-bold text-lg ${color}`}>{amount}</p>
  </div>
);

const BalanceCard = ({ title, balance, icon, color, progress }: { title: string, balance: string, icon: React.ReactNode, color: string, progress: number }) => {
    const neonColor = color.replace('bg-','');
    
    return (
    <div className="glass-card p-6 relative overflow-hidden group">
        <div className={`absolute -top-1/4 -left-1/4 w-1/2 h-1/2 ${color}/30 rounded-full blur-3xl transition-all duration-500 group-hover:scale-150`}></div>
        <div className="relative z-10">
            <div className="flex items-start justify-between">
                <div>
                  <p className="text-4xl font-bold text-white">{balance}</p>
                  <p className="text-gray-400 mt-1">{title}</p>
                </div>
                {React.cloneElement(icon as React.ReactElement, { className: "w-8 h-8 text-neon-cyan transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6", style: { color: `var(--neon-${neonColor})`, filter: `drop-shadow(0 0 10px var(--neon-${neonColor}))` } })}
            </div>
            <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Spending Limit</span>
                    <span>₹{progress * 100} / ₹10000</span>
                </div>
                <Progress value={progress} className={`h-2 bg-black/40 [&>div]:bg-neon-${neonColor}`} />
            </div>
        </div>
    </div>
)};

const ActionMenuItem = ({icon, title, subtitle}: {icon: React.ReactNode, title: string, subtitle: string}) => (
    <div className="flex items-center p-3 glass-pill w-full hover:bg-white/10 transition-colors cursor-pointer rounded-lg group">
        <div className="p-2 bg-white/10 rounded-lg mr-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-neon-cyan/20">
            {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6 transition-colors duration-300 group-hover:text-neon-cyan'})}
        </div>
        <div className="flex-grow">
            <p className="font-semibold text-white">{title}</p>
            <p className="text-xs text-gray-400 group-hover:text-gray-300">{subtitle}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-neon-cyan" />
    </div>
);

export default function WalletPage() {
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Income', 'Outcome', 'Escrow'];

  const transactions = [
    { icon: <Wallet className="w-5 h-5 text-neon-green" />, title: "Task Payment: Plumber", date: "Dec 4, 2023", amount: "+ ₹500", color: "text-neon-green", type: "Income" },
    { icon: <ArrowUp className="w-5 h-5 text-neon-pink" />, title: "Material Purchase", date: "Dec 3, 2023", amount: "- ₹150", color: "text-neon-pink", type: "Outcome" },
    { icon: <ArrowDown className="w-5 h-5 text-neon-cyan" />, title: "Withdrawal to Bank", date: "Dec 1, 2023", amount: "- ₹2,500", color: "text-neon-cyan", type: "Outcome" },
    { icon: <Lock className="w-5 h-5 text-neon-gold" />, title: "Payment Locked", date: "Nov 28, 2023", amount: "₹1200", color: "text-neon-gold", type: "Escrow" },
    { icon: <Wallet className="w-5 h-5 text-neon-green" />, title: "Task Payment: Tech Fix", date: "Nov 25, 2023", amount: "+ ₹1200", color: "text-neon-green", type: "Income" },
    { icon: <ArrowUp className="w-5 h-5 text-neon-pink" />, title: "Platform Fee", date: "Nov 25, 2023", amount: "- ₹60", color: "text-neon-pink", type: "Outcome" },
    { icon: <Lock className="w-5 h-5 text-neon-gold" />, title: "Payment Locked: Cleaning", date: "Nov 22, 2023", amount: "₹2500", color: "text-neon-gold", type: "Escrow" },
    { icon: <Wallet className="w-5 h-5 text-neon-green" />, title: "Bonus Payout", date: "Nov 20, 2023", amount: "+ ₹300", color: "text-neon-green", type: "Income" },
  ];
  
  const filteredTransactions = transactions.filter(t => filter === 'All' || t.type === filter);

  const VerificationBanner = () => (
    <div className="flex items-center justify-center gap-2 text-neon-gold text-sm glass-card p-2 px-4 cursor-pointer hover:bg-neon-gold/10 transition-all transform hover:scale-105">
        <AlertTriangle className="w-4 h-4" />
        <span>ID Verification Needed for Higher Limits</span>
    </div>
  );

  return (
    <>
       <header className="glass-card p-4 text-center">
        <h1 className="text-3xl font-bold">Wallet & Finance</h1>
        <p className="text-gray-400 text-sm mt-1">Manage your funds and transactions securely</p>
       </header>

      <section className="flex flex-col gap-6">
        <BalanceCard 
            title="Available Balance"
            balance="₹2,500"
            icon={<Wallet />}
            color="bg-neon-green"
            progress={25}
        />
        <BalanceCard 
            title="Locked in Escrow"
            balance="₹3700"
            icon={<Lock />}
            color="bg-neon-gold"
            progress={37}
        />
      </section>

      <section className="flex flex-col items-center gap-3">
        <Button className="w-full text-white font-bold py-4 rounded-full text-lg h-14 cyan-glow-button transform hover:scale-105 transition-transform">
          Withdraw Money
        </Button>
        <VerificationBanner />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold px-2">Quick Actions</h2>
        <div className="flex flex-col gap-3 glass-card p-4">
            <ActionMenuItem icon={<CreditCard />} title="Manage Payment Methods" subtitle="Add or remove cards & UPI" />
            <ActionMenuItem icon={<Banknote />} title="Setup Auto-Withdrawal" subtitle="Weekly to your primary bank" />
            <ActionMenuItem icon={<History />} title="Download Statement" subtitle="Get PDF statement for any period" />
            <ActionMenuItem icon={<ShieldCheck />} title="Security Center" subtitle="Manage your account security" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold">Transaction History</h2>
            <div className="flex items-center gap-2 text-neon-cyan">
                <ShieldCheck className="w-6 h-6" />
                <span className="text-xs font-semibold">Secured</span>
            </div>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 -ml-4 pl-4">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap transform hover:-translate-y-0.5',
                filter === f
                  ? 'pill-active'
                  : 'glass-card text-gray-300 hover:bg-white/10'
              )}
            >
              {f}
            </button>
          ))}
        </div>
        
        <div className="flex flex-col gap-3 glass-card p-4">
          {filteredTransactions.length > 0 ? filteredTransactions.map((item, index) => (
            <TransactionItem
              key={index}
              icon={item.icon}
              title={item.title}
              date={item.date}
              amount={item.amount}
              color={item.color}
              type={item.type}
            />
          )) : (
            <div className="text-center text-gray-400 py-8 flex flex-col items-center">
                <Wallet className="w-12 h-12 text-gray-600 mb-4" />
                <p>No transactions found for this filter.</p>
                <p className="text-xs mt-1">Try selecting another category.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
