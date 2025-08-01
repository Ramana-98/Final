import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Mock data
const initialBalance = {
  available: 12000,
  pending: 2500,
  currency: "INR",
};

const initialTransactions = [
  {
    date: "2024-06-01",
    type: "Payment Received",
    amount: "+₹5,000",
    status: "Completed",
  },
  {
    date: "2024-05-28",
    type: "Withdrawal",
    amount: "+₹3,000",
    status: "Completed",
  },
  {
    date: "2024-05-25",
    type: "Bonus",
    amount: "+₹1,000",
    status: "Completed",
  },
  {
    date: "2024-05-20",
    type: "Payment Received",
    amount: "+₹7,000",
    status: "Pending",
  },
];

const paymentSchedule = [
  { project: "UI Redesign", nextRelease: "2024-06-07", status: "Scheduled" },
  { project: "API Integration", nextRelease: "2024-06-10", status: "Pending" },
];

export default function WalletPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isLoading, setIsLoading] = useState(false);

  // Link New Account dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [isSaving, setIsSaving] = useState(false);

  // Payment Settings state
  const [paymentSettingsOpen, setPaymentSettingsOpen] = useState(false);
  const [currentBankName, setCurrentBankName] = useState("HDFC Bank");
  const [currentUpiId, setCurrentUpiId] = useState("yourname@upi");
  const [currentPreferredCurrency, setCurrentPreferredCurrency] = useState("INR");
  const [isUpdatingSettings, setIsUpdatingSettings] = useState(false);

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount, 10);
    if (!withdrawAmount || isNaN(amount)) {
      toast.error("Please enter a withdrawal amount.");
      return;
    }
    if (amount < 500) {
      toast.error("Minimum withdrawal amount is ₹500.");
      return;
    }
    if (amount > balance.available) {
      toast.error("Insufficient balance.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Success: update balance and transactions
      setBalance(prev => ({ ...prev, available: prev.available - amount }));
      setTransactions(prev => [
        {
          date: new Date().toISOString().slice(0, 10),
          type: "Withdrawal",
          amount: `+₹${amount.toLocaleString()}`,
          status: "Completed",
        },
        ...prev,
      ]);
      setWithdrawAmount("");
      toast.success("Withdrawal successful!");
    }, 1500);
  };

  // UPI validation: must be in the format 'name@bank'
  const isValidUpi = (id: string) => /^[\w.-]+@[\w.-]+$/.test(id);

  const handleSaveAccount = () => {
    if (!bankName.trim() || !upiId.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isValidUpi(upiId)) {
      toast.error("Please enter a valid UPI ID (e.g., yourname@bank).\n");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setOpenDialog(false);
      setBankName("");
      setUpiId("");
      setCurrency("INR");
      toast.success("Account linked successfully!");
    }, 1200);
  };

  const handleUpdatePaymentSettings = () => {
    if (!currentBankName.trim() || !currentUpiId.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isValidUpi(currentUpiId)) {
      toast.error("Please enter a valid UPI ID (e.g., yourname@bank).");
      return;
    }
    setIsUpdatingSettings(true);
    setTimeout(() => {
      setIsUpdatingSettings(false);
      setPaymentSettingsOpen(false);
      toast.success("Payment settings updated successfully!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-200 dark:bg-gray-900 flex justify-center items-start py-8 px-2 transition-colors duration-200">
      <div className="w-full max-w-3xl flex flex-col gap-6 ">
      {/* Account Balance */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 bg-gradient-to-br from-[#ffffff] via-[#f1f5ff] to-[#ffffff] hover:bg-amber-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 dark:hover:bg-gray-700">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Account Balance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center sm:items-start">
          <div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">₹{balance.available.toLocaleString()}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Available</div>
          </div>
          <div>
              <div className="text-xl font-bold text-gray-900 dark:text-gray-100">₹{balance.pending.toLocaleString()}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Pending</div>
          </div>
        </CardContent>
      </Card>

        {/* Withdraw Funds */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 bg-gradient-to-br from-[#f7f8fa] via-[#e2e8f0] to-[#ffffff] hover:bg-blue-500 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 dark:hover:bg-gray-700">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Left: Form */}
              <div className="flex-1 w-full max-w-xs">
          <Input
            type="number"
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={e => setWithdrawAmount(e.target.value)}
                  className="mb-2 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  min={500}
                />
                <Button
                  variant="default"
                  className="bg-black text-white w-full mb-2 dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={handleWithdraw}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Withdraw to Bank"}
                </Button>
                {/* Link New Account Dialog Trigger */}
                <Button
                  variant="outline"
                  className="w-full mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                  onClick={() => setOpenDialog(true)}
                >
                  Link New Account
                </Button>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum withdrawal: ₹500</div>
              </div>
              {/* Right: Image */}
              <div className="flex-1 flex justify-center items-center">
                <img
                  src="src/atm-image.jpg"
                  alt="ATM Withdrawal"
                  className="max-w-[240px] max-h-[120px] rounded-md object-cover"
                />
              </div>
            </div>
        </CardContent>
      </Card>

        {/* Link New Account Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-gray-100">Link New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input
                placeholder="Bank Name"
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                disabled={isSaving}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                placeholder="UPI ID (e.g., yourname@bank)"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                disabled={isSaving}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Input
                placeholder="Preferred Currency (default: INR)"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                disabled={isSaving}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
              <Button
                className="w-full bg-black text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={handleSaveAccount}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Account"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

      {/* Transaction History */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 bg-gradient-to-br from-[#ffffff] via-[#fff7f1] to-[#ffffff] hover:bg-amber-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 dark:hover:bg-gray-700">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-center border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-2 border-b font-semibold text-gray-700 dark:text-gray-300">Date</th>
                  <th className="px-4 py-2 border-b font-semibold text-gray-700 dark:text-gray-300">Type</th>
                  <th className="px-4 py-2 border-b font-semibold text-gray-700 dark:text-gray-300">Amount</th>
                  <th className="px-4 py-2 border-b font-semibold text-gray-700 dark:text-gray-300">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-2 border-b text-center text-gray-900 dark:text-gray-100">{txn.date}</td>
                    <td className="px-4 py-2 border-b text-gray-900 dark:text-gray-100">{txn.type}</td>
                    <td className={`px-4 py-2 border-b font-semibold ${txn.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-gray-800 dark:text-gray-200'}`}>{txn.amount}</td>
                    <td className="px-4 py-2 border-b text-gray-900 dark:text-gray-100">{txn.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </CardContent>
      </Card>

      {/* Row 4: Payment Schedule and Payment Settings side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Payment Schedule */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 bg-gradient-to-br from-white/80 via-gray-100/60 to-white/80 backdrop-blur-md hover:bg-amber-50 dark:from-gray-800/80 dark:via-gray-700/60 dark:to-gray-800/80 dark:hover:bg-gray-700">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Payment Schedule</CardTitle>
          </CardHeader>
        <CardContent>
            <ul className="space-y-2 text-center">
            {paymentSchedule.map((p, i) => (
                <li
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2 text-center"
                >
                  <span className="font-medium text-gray-900 dark:text-gray-100">{p.project}:</span>
                  <a href="#" className="text-blue-600 hover:underline font-medium dark:text-blue-400 dark:hover:text-blue-300">{p.nextRelease}</a>
                  <span className="text-gray-500 dark:text-gray-400">({p.status})</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Payment Settings */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 bg-gradient-to-br from-white/80 via-gray-100/60 to-white/80 backdrop-blur-md  hover:bg-amber-50 dark:from-gray-800/80 dark:via-gray-700/60 dark:to-gray-800/80 dark:hover:bg-gray-700">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="text-gray-900 dark:text-gray-100">Bank: <span className="font-medium">{currentBankName}</span></div>
          <div className="text-gray-900 dark:text-gray-100">UPI: <span className="font-medium">{currentUpiId}</span></div>
          <div className="text-gray-900 dark:text-gray-100">Preferred Currency: <span className="font-medium">{currentPreferredCurrency}</span></div>
          <Button 
            variant="outline" 
            className="mt-2 w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            onClick={() => setPaymentSettingsOpen(true)}
          >
            Edit Payment Settings
          </Button>
        </CardContent>
      </Card>
      </div>

      {/* Payment Settings Modal */}
      <Dialog open={paymentSettingsOpen} onOpenChange={setPaymentSettingsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">Edit Payment Settings</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="bank-name" className="text-gray-900 dark:text-gray-100">Bank Name</Label>
              <Input
                id="bank-name"
                placeholder="Enter bank name"
                value={currentBankName}
                onChange={(e) => setCurrentBankName(e.target.value)}
                disabled={isUpdatingSettings}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="upi-id" className="text-gray-900 dark:text-gray-100">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@bank"
                value={currentUpiId}
                onChange={(e) => setCurrentUpiId(e.target.value)}
                disabled={isUpdatingSettings}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="currency" className="text-gray-900 dark:text-gray-100">Preferred Currency</Label>
              <Select 
                value={currentPreferredCurrency} 
                onValueChange={setCurrentPreferredCurrency}
                disabled={isUpdatingSettings}
              >
                <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setPaymentSettingsOpen(false)}
              disabled={isUpdatingSettings}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdatePaymentSettings}
              disabled={isUpdatingSettings}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isUpdatingSettings ? "Updating..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
}
