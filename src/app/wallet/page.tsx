import { Wallet, Lock, ArrowDown, ArrowUp, AlertTriangle } from 'lucide-react';

const TransactionItem = ({ icon, title, date, amount, color }: { icon: React.ReactNode, title: string, date: string, amount: string, color: string }) => (
  <div className="flex items-center justify-between glass-pill p-3 rounded-2xl">
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-full bg-gray-800`}>{icon}</div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
    </div>
    <p className={`font-bold ${color}`}>{amount}</p>
  </div>
);

export default function WalletPage() {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-8 text-white pb-28">
       <h1 className="text-3xl font-bold text-center">Wallet & Finance</h1>

      {/* Balance Cards */}
      <section className="flex flex-col gap-6">
        {/* Available Balance */}
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-green/30 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-4xl font-bold text-white">₹2,500</p>
              <p className="text-gray-400 mt-1">Available Balance</p>
            </div>
            <Wallet className="w-8 h-8 text-neon-green" />
          </div>
        </div>

        {/* Escrow Balance */}
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neon-gold/30 rounded-full blur-3xl"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-4xl font-bold text-white">₹500</p>
              <p className="text-gray-400 mt-1">Locked in Escrow</p>
            </div>
            <Lock className="w-8 h-8 text-neon-gold" />
          </div>
        </div>
      </section>

      {/* Action Button */}
      <section className="flex flex-col items-center gap-3">
        <button className="w-full glass-card text-white font-bold py-4 rounded-full text-lg">
          Withdraw Money
        </button>
        <div className="flex items-center gap-2 text-neon-gold text-sm">
          <AlertTriangle className="w-4 h-4" />
          <span>ID Verification Needed</span>
        </div>
      </section>

      {/* Transaction History */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Transaction History</h2>
        <div className="flex flex-col gap-3">
          <TransactionItem
            icon={<Wallet className="w-5 h-5 text-neon-green" />}
            title="Task Payment"
            date="Dec 4, 2023"
            amount="+ ₹2,500"
            color="text-neon-green"
          />
          <TransactionItem
            icon={<ArrowUp className="w-5 h-5 text-neon-pink" />}
            title="Material Purchase"
            date="Nov 4, 2023"
            amount="- ₹500"
            color="text-neon-pink"
          />
          <TransactionItem
             icon={<ArrowDown className="w-5 h-5 text-neon-cyan" />}
             title="Withdrawal"
             date="Nov 4, 2023"
             amount="- ₹2,500"
             color="text-neon-cyan"
           />
        </div>
      </section>
    </div>
  );
}
