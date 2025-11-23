import { Button } from "@/components/ui/button";
import { Wallet as WalletIcon, Lock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

const WalletSummary = () => (
    <div className="space-y-6">
        <div className="glass-card overflow-hidden relative p-6 green-glow">
             <div className="flex items-start justify-between">
                <WalletIcon className="h-8 w-8 text-success" />
            </div>
            <p className="text-5xl font-bold font-headline mt-4 text-white">₹2,500</p>
            <p className="text-sm text-muted-foreground mt-1">Available Balance</p>
        </div>
        <div className="glass-card overflow-hidden relative p-6 gold-glow">
             <div className="flex items-start justify-between">
                <Lock className="h-8 w-8 text-secondary" />
            </div>
            <p className="text-5xl font-bold font-headline mt-4 text-white">₹500</p>
            <p className="text-sm text-muted-foreground mt-1">Locked in Escrow</p>
        </div>
    </div>
);

const WalletActions = () => (
    <div className="space-y-4 text-center">
        <Button size="lg" className="w-[90%] h-14 glass-card text-base font-semibold justify-center hover:bg-white/10 text-white">
            Withdraw Money
        </Button>
        <div className="flex items-center justify-center gap-2 p-2 text-secondary">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-xs font-semibold">ID Verification Needed</p>
        </div>
    </div>
);

const transactions = [
    { id: 1, type: "credit", title: "Transaction", date: "Den 4, 2023", amount: "+ ₹2,500", color: "text-success", iconColor: "text-success" },
    { id: 2, type: "debit", title: "Transaction", date: "Nov 4, 2023", amount: "- ₹500", color: "text-destructive", iconColor: "text-secondary" },
    { id: 3, type: "debit", title: "Transaction", date: "Nov 4, 2023", amount: "- ₹2,500", color: "text-destructive", iconColor: "text-purple-400" },
]

const TransactionHistory = () => (
    <div>
        <h2 className="text-xl font-bold text-white mb-4">Transaction History</h2>
        <div className="glass-card p-2">
             <div className="divide-y divide-white/10">
                {transactions.map(tx => (
                    <div className="px-2 flex items-center justify-between py-4" key={tx.id}>
                        <div className="flex items-center gap-4">
                            <div className={cn("p-3 rounded-full bg-white/5", tx.iconColor)}>
                                <WalletIcon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-white">{tx.title}</p>
                                <p className="text-sm text-muted-foreground">{tx.date}</p>
                            </div>
                        </div>
                        <p className={cn("font-bold text-lg", tx.color)}>{tx.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
)

export default function WalletPage() {
  return (
    <div className="p-4 space-y-8">
        <h1 className="text-3xl font-bold text-white pt-4">Wallet</h1>
        <WalletSummary />
        <WalletActions />
        <TransactionHistory />
    </div>
  );
}
