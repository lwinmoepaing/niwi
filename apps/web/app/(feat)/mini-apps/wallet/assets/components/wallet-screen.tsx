"use client";
import React, { useRef, useState } from "react";
import Card from "./Card";
import toast from "react-hot-toast";
import { CircleDollarSign, WalletIcon } from "lucide-react";

type TransactionType = {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: string;
};

export default function WalletScreen() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTransactionType(e.target.value);
  };
  const handleTransaction = () => {
    const amount = (() => {
      const value = parseFloat(amountRef?.current?.value ?? "");
      if (!value) toast.error("Please Enter Amount");
      return value;
    })();
    const date = (() => {
      const value = dateRef?.current?.value;
      if (!value) toast.error("Please Enter Date");
      return value;
    })();
    const description = descriptionRef?.current?.value;

    if (!isNaN(amount) && description && date) {
      const newTransaction = {
        id: Date.now(),
        type: transactionType,
        description,
        date,
        amount,
      };
      setTransactions((prev) => [...prev, newTransaction]);
      if (transactionType === "expense") {
        setExpenseTotal((prev) => prev + amount);
      } else {
        setIncomeTotal((prev) => prev + amount);
      }
    }

    if (amountRef.current) amountRef.current.value = ""; // Clear the input field after adding
    if (descriptionRef.current) descriptionRef.current.value = ""; // Clear the input field after adding
    if (dateRef.current) dateRef.current.value = ""; // Clear the input field after adding
  };

  const handleDelete = (id: number) => {
    setTransactions((prev) => {
      const transactionToDelete = prev.find(
        (transaction) => transaction.id === id
      );

      if (transactionToDelete) {
        // Update the total based on the type of transaction being deleted
        if (transactionToDelete.type === "expense") {
          setExpenseTotal(expenseTotal - transactionToDelete.amount);
        } else {
          setIncomeTotal(incomeTotal - transactionToDelete.amount);
        }
      }

      // Remove the transaction from the list
      return prev.filter((transaction) => transaction.id !== id);
    });
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div>
          <Card
            title="Total Expenses"
            amount={expenseTotal}
            icon={() => <CircleDollarSign />}
          />
        </div>
        <div>
          <Card
            title="Total Incomes"
            amount={incomeTotal}
            icon={() => <WalletIcon />}
          />
        </div>
      </div>

      <div className="flex flex-row justify-between mt-4 space-x-2">
        {/* form */}
        <div>
          <div>
            <div className="h-[40px] w-full px-[10px] dark:bg-[#111119] flex flex-col items-center space-y-2">
              <div className="flex flex-col">
                <label>Amount</label>
                <input
                  className="w-[140px] h-full bg-[#f9f9f9] dark:bg-[#1c1c25] dark:text-[#f9f9f9] outline-none  ring-0 px-1 rounded-md"
                  ref={amountRef}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Transaction Date</label>
                <input
                  type="date"
                  placeholder="Add Income"
                  className="w-[140px] h-full bg-[#f9f9f9] dark:bg-[#1c1c25] dark:text-[#f9f9f9] outline-none ring-0 px-1 rounded-md"
                  ref={dateRef}
                  required
                />
              </div>
              <div className="flex flex-col">
                <label>Type</label>
                <select
                  value={transactionType}
                  onChange={handleTypeChange}
                  className="w-[140px] h-full bg-[#f9f9f9] dark:bg-[#1c1c25] dark:text-[#f9f9f9] outline-none ring-0 px-1 rounded-md"
                  required
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label>Description</label>
                <input
                  className="w-[140px] h-[50px] bg-[#f9f9f9] dark:bg-[#1c1c25] dark:text-[#f9f9f9] outline-none px-1 rounded-md"
                  ref={descriptionRef}
                  required
                />
              </div>

              <button
                onClick={handleTransaction}
                className="rounded-md hover:bg-[#f9f9f9] hover:dark:bg-[#1c1c25] text-xs flex flex-row px-[10px] py-[4px]"
              >
                Save
              </button>
            </div>
          </div>
        </div>
        {/* list */}
        <div className="w-full">
          <div>
            <h1 className="font-bold text-xl">Transactions</h1>
            <p className="text-sm">Recent transitions from your wallet</p>
          </div>
          <div>
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Description</th>

                  <th className="py-2 px-4 border-b">Amount</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="py-2 px-4 border-b">
                      <p
                        className={` text-lg ${transaction.type === "expense" ? "text-red-500" : "text-green-500"}`}
                      >
                        {transaction.description}
                      </p>
                      <p className="text-xs text-[#1c1c25] dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </td>

                    <td className="py-2 px-4 border-b">
                      ${transaction.amount}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
