
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowUpRight, ArrowDownRight, Filter, 
  CreditCard, ArrowRight, Clock, DollarSign,
  BarChart4, Wallet as WalletIcon, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApp } from "@/context/AppContext";

const Wallet = () => {
  const { user, isOffline } = useApp();
  const [showTransactions, setShowTransactions] = useState(true);
  
  // Mock wallet data
  const walletData = {
    balance: 4350,
    pendingPayouts: 780,
    mPesaNumber: "+254 712 345 678",
    savings: 1200,
    savingsGoal: 5000,
    transactions: [
      {
        id: "tx-1",
        type: "credit",
        amount: 850,
        description: "Payment from Jumia Express",
        date: "Today, 2:30 PM",
        status: "completed"
      },
      {
        id: "tx-2",
        type: "debit",
        amount: 450,
        description: "M-Pesa Withdrawal",
        date: "Today, 11:15 AM",
        status: "completed"
      },
      {
        id: "tx-3",
        type: "credit",
        amount: 1200,
        description: "Payment from BuildRight Ltd",
        date: "Yesterday, 5:45 PM",
        status: "completed"
      },
      {
        id: "tx-4",
        type: "credit",
        amount: 780,
        description: "Payment from Mama Mboga Co-op",
        date: "Yesterday, 9:30 AM",
        status: "pending"
      },
      {
        id: "tx-5",
        type: "debit",
        amount: 800,
        description: "M-Pesa Withdrawal",
        date: "Oct 15, 3:20 PM",
        status: "completed"
      },
    ]
  };

  // Get transactions for the selected period
  const getFilteredTransactions = (period: string) => {
    switch (period) {
      case "today":
        return walletData.transactions.filter(tx => tx.date.includes("Today"));
      case "week":
        return walletData.transactions;
      case "month":
        return walletData.transactions;
      default:
        return walletData.transactions;
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">KaziWallet</h1>
        <p className="text-muted-foreground">Manage your earnings and payments</p>
      </div>

      <motion.div 
        className="kazi-card bg-gradient-to-br from-kazi-green to-green-700 text-white mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-white/80 mb-1">Available Balance</p>
            <h2 className="text-3xl font-bold">KES {walletData.balance}</h2>
            {walletData.pendingPayouts > 0 && (
              <div className="flex items-center mt-1 text-white/80 text-sm">
                <Clock size={14} className="mr-1" />
                <span>KES {walletData.pendingPayouts} pending</span>
              </div>
            )}
          </div>
          <WalletIcon size={24} className="text-white/60" />
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <Button className="kazi-button bg-white/20 text-white hover:bg-white/30 flex justify-center items-center">
            <ArrowUpRight size={16} className="mr-2" />
            Cash Out
          </Button>
          <Button className="kazi-button bg-white/20 text-white hover:bg-white/30 flex justify-center items-center">
            <ArrowDownRight size={16} className="mr-2" />
            Add Money
          </Button>
        </div>
      </motion.div>

      {/* Savings goal */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">Savings Goal</h3>
            <p className="text-sm text-muted-foreground">For emergency funds</p>
          </div>
          <button className="text-kazi-blue text-sm font-medium">Edit</button>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">{Math.round((walletData.savings / walletData.savingsGoal) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-bar-fill bg-kazi-green"
              style={{ width: `${(walletData.savings / walletData.savingsGoal) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Saved</p>
            <p className="font-medium">KES {walletData.savings}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Goal</p>
            <p className="font-medium">KES {walletData.savingsGoal}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-kazi-green rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-kazi-green"></div>
            <span className="ml-3 text-sm font-medium">Auto-save 5% of earnings</span>
          </label>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <h3 className="font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: CreditCard, label: "M-Pesa Out" },
            { icon: BarChart4, label: "Analytics" },
            { icon: Plus, label: "Add Card" }
          ].map((action, index) => (
            <button 
              key={index}
              className="kazi-card bg-card h-20 flex flex-col items-center justify-center"
            >
              <action.icon size={20} className="mb-2 text-muted-foreground" />
              <span className="text-xs">{action.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Transaction History</h3>
          <Button variant="ghost" size="sm" className="h-8 px-2">
            <Filter size={16} className="mr-1" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="today">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="today" className="flex-1">Today</TabsTrigger>
            <TabsTrigger value="week" className="flex-1">This Week</TabsTrigger>
            <TabsTrigger value="month" className="flex-1">This Month</TabsTrigger>
          </TabsList>
          
          {["today", "week", "month"].map(period => (
            <TabsContent key={period} value={period} className="mt-0">
              <div className="space-y-3">
                {getFilteredTransactions(period).map(transaction => (
                  <div key={transaction.id} className="kazi-card bg-card p-3">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full mr-3 flex items-center justify-center ${
                        transaction.type === 'credit' ? 'bg-green-100 text-kazi-green' : 'bg-red-100 text-red-500'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <ArrowDownRight size={20} />
                        ) : (
                          <ArrowUpRight size={20} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className={`font-semibold ${
                          transaction.type === 'credit' ? 'text-kazi-green' : 'text-muted-foreground'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'} KES {transaction.amount}
                        </p>
                        <p className={`text-xs ${
                          transaction.status === 'pending' ? 'text-amber-500' : 'text-muted-foreground'
                        }`}>
                          {transaction.status === 'pending' ? 'Pending' : 'Completed'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {getFilteredTransactions(period).length === 0 && (
                  <div className="text-center py-6">
                    <Clock className="mx-auto text-muted-foreground mb-2" size={24} />
                    <p className="text-muted-foreground">No transactions for this period</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* M-Pesa Link */}
      <motion.div 
        className="kazi-card bg-card mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <DollarSign size={18} className="text-kazi-green" />
              </div>
              <div>
                <h3 className="font-semibold">M-Pesa Linked</h3>
                <p className="text-sm text-muted-foreground">{walletData.mPesaNumber}</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <ArrowRight size={16} />
          </Button>
        </div>
      </motion.div>

      {/* Offline sync reminder if needed */}
      {isOffline && (
        <motion.div 
          className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <div className="flex items-start">
            <Clock className="text-amber-600 dark:text-amber-500 mt-0.5 mr-3" size={20} />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-400">Offline Mode Active</p>
              <p className="text-sm text-amber-700 dark:text-amber-500">
                Your wallet is currently in offline mode. Transactions will sync when you're back online.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Wallet;
