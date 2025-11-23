import { Button } from "@/components/ui/button";
import { Wallet as WalletIcon, Lock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const WalletSummary = () => (
    <div className="space-y-6">
        <div className="glass-card overflow-hidden relative p-6 green-glow">
             <div className="flex items-start justify-between">
                <WalletIcon className="h-8 w-8 text-success" />
            </div>
            <p className="text-5xl font-bold font-headline mt-4 text-white drop-shadow-md">₹2,500</p>
            <p className="text-sm text-white/70 mt-1 drop-shadow-sm">Available Balance</p>
        </div>
        <div className="glass-card overflow-hidden relative p-6 gold-glow">
             <div className="flex items-start justify-between">
                <Lock className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-5xl font-bold font-headline mt-4 text-white drop-shadow-md">₹500</p>
            <p className="text-sm text-white/70 mt-1 drop-shadow-sm">Locked in Escrow</p>
        </div>
    </div>
);

const WalletActions = () => (
    <div className="space-y-4 text-center glass-card p-4">
        <Button size="lg" className="w-full h-14 glass-card text-base font-semibold justify-center bg-white/10 hover:bg-white/20 text-white">
            Withdraw Money
        </Button>
        <div className="flex items-center justify-center gap-2 p-2 text-secondary">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-xs font-semibold drop-shadow-sm">ID Verification Needed</p>
        </div>
    </div>
);

const transactions = [
    { id: 1, type: "credit", title: "Transaction", date: "Den 4, 2023", amount: "+ ₹2,500", color: "text-success", iconColor: "text-success" },
    { id: 2, type: "debit", title: "Transaction", date: "Nov 4, 2023", amount: "- ₹500", color: "text-destructive", iconColor: "text-secondary" },
    { id: 3, type: "debit", title: "Transaction", date: "Nov 4, 2023", amount: "- ₹2,500", color: "text-destructive", iconColor: "text-purple-400" },
]

const TransactionHistory = () => (
    <div className="glass-card p-4">
        <h2 className="text-xl font-bold text-white mb-4 px-2 drop-shadow-md">Transaction History</h2>
        <div className="glass-card p-2">
             <div className="divide-y divide-white/10">
                {transactions.map(tx => (
                    <div className="px-2 flex items-center justify-between py-4" key={tx.id}>
                        <div className="flex items-center gap-4">
                            <div className={cn("p-3 rounded-full glass-card", tx.iconColor)}>
                                <WalletIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-white drop-shadow-md">{tx.title}</p>
                                <p className="text-sm text-white/70 drop-shadow-sm">{tx.date}</p>
                            </div>
                        </div>
                        <p className={cn("font-bold text-lg drop-shadow-md", tx.color)}>{tx.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default function WalletPage() {
  return (
    <div className="p-4 space-y-8 pt-10">
        <div className="px-2">
            <h1 className="text-3xl font-bold text-white pt-4 drop-shadow-lg">Wallet</h1>
        </div>
        <WalletSummary />
        <WalletActions />
        <TransactionHistory />
    </div>
  );
}
