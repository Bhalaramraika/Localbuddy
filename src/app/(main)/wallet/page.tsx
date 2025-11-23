import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser, transactions } from "@/lib/data";
import { ArrowDownLeft, ArrowUpRight, Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const WalletSummary = () => (
    <Card className="bg-card/60 dark:bg-card/40 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-lg rounded-2xl">
        <CardHeader>
            <CardTitle className="text-muted-foreground text-sm font-medium">Available Balance</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-5xl font-bold font-headline">₹{currentUser.walletBalance.toLocaleString()}</p>
            <p className="text-gold-yellow mt-2 font-semibold">
                Locked in Escrow: ₹{currentUser.escrowBalance.toLocaleString()}
            </p>
            <div className="flex gap-4 mt-6">
                <Button className="flex-1 h-12 bg-primary">
                    <Plus className="mr-2 h-5 w-5"/> Add Money
                </Button>
                <Button variant="outline" className="flex-1 h-12 bg-transparent">
                    <Minus className="mr-2 h-5 w-5"/> Withdraw
                </Button>
            </div>
        </CardContent>
    </Card>
);

const TransactionItem = ({ transaction }: { transaction: typeof transactions[0] }) => {
    const isCredit = transaction.type === "release" || transaction.type === "deposit";
    const Icon = isCredit ? ArrowDownLeft : ArrowUpRight;
    const amountColor = isCredit ? "text-trust-green" : "text-foreground";
    const sign = isCredit ? "+" : "-";

    return (
        <div className="flex items-center justify-between py-4 animate-fade-in-up">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${isCredit ? 'bg-trust-green/20' : 'bg-muted'}`}>
                    <Icon className={`h-5 w-5 ${isCredit ? 'text-trust-green' : 'text-muted-foreground'}`} />
                </div>
                <div>
                    <p className="font-semibold">{transaction.taskName}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className={`font-bold text-lg ${amountColor}`}>{sign}₹{transaction.amount.toLocaleString()}</p>
                <Badge variant={transaction.status === 'Success' ? 'default' : 'secondary'} 
                       className={`${transaction.status === 'Success' ? 'bg-trust-green/20 text-trust-green' : 'bg-gold-yellow/20 text-gold-yellow'}`}>
                    {transaction.status}
                </Badge>
            </div>
        </div>
    )
}

export default function WalletPage() {
  return (
    <div className="p-4 space-y-8">
        <h1 className="text-3xl font-bold font-headline pt-4">Wallet</h1>
        <WalletSummary />
        
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Transaction History</h2>
            <div className="space-y-2">
                {transactions.map(tx => (
                    <TransactionItem key={tx.id} transaction={tx} />
                ))}
            </div>
        </div>
    </div>
  );
}
