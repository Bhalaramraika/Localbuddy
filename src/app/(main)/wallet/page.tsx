import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser, transactions } from "@/lib/data";
import { ArrowDownLeft, ArrowUpRight, Plus, Minus, AlertTriangle, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WalletSummary = () => (
    <div className="space-y-4">
        <Card className="glass-card overflow-hidden relative cyan-glow">
            <CardContent className="p-6">
                <p className="text-sm text-cyan-200">Available Balance</p>
                <p className="text-5xl font-bold font-headline mt-1">₹{currentUser.walletBalance.toLocaleString()}</p>
            </CardContent>
        </Card>
        <Card className="glass-card overflow-hidden relative gold-glow">
            <CardContent className="p-6">
                <p className="text-sm text-amber-200">Locked in Escrow</p>
                <p className="text-5xl font-bold font-headline mt-1">₹{currentUser.escrowBalance.toLocaleString()}</p>
            </CardContent>
        </Card>
    </div>
);

const WalletActions = () => (
    <div className="space-y-4">
        <Button size="lg" className="w-full h-14 glass-card text-base font-semibold justify-center hover:bg-white/10">
            Withdraw Money
        </Button>
        <div className="flex items-center justify-center gap-2 p-2 glass-card text-amber-400">
            <AlertTriangle className="h-4 w-4" />
            <p className="text-xs font-semibold">ID Verification Needed</p>
        </div>
    </div>
);


const TransactionItem = ({ transaction }: { transaction: typeof transactions[0] }) => {
    const isCredit = transaction.type === "release" || transaction.type === "deposit";
    const amountColor = isCredit ? "text-primary" : "text-foreground";
    const sign = isCredit ? "+" : "-";

    const icons: { [key: string]: React.ReactNode } = {
        release: <Wallet className="h-5 w-5 text-primary" />,
        deposit: <Wallet className="h-5 w-5 text-primary" />,
        lock: <Wallet className="h-5 w-5 text-amber-400" />,
    }

    return (
        <div className="flex items-center justify-between py-4 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-white/5">
                    {icons[transaction.type]}
                </div>
                <div>
                    <p className="font-semibold">{transaction.taskName}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
            </div>
            <p className={`font-bold text-lg ${amountColor}`}>{sign}₹{transaction.amount.toLocaleString()}</p>
        </div>
    )
}

export default function WalletPage() {
  return (
    <div className="p-4 space-y-8">
        <h1 className="text-3xl font-bold font-headline pt-4">Wallet</h1>
        <WalletSummary />
        <WalletActions />
        
        <div>
            <h2 className="text-xl font-bold font-headline mb-2">Transaction History</h2>
            <div className="glass-card p-2">
                 <div className="divide-y divide-white/10">
                    {transactions.map(tx => (
                        <div className="px-2" key={tx.id}>
                         <TransactionItem transaction={tx} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
