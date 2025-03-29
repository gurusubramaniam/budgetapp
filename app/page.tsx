"use client"
import React, { useState, JSX, useRef } from "react";

export default function Home() {
  const desc = useRef<HTMLInputElement>(null);
  const amount = useRef<HTMLInputElement>(null);
  const type = useRef<HTMLSelectElement>(null);
  const initialValues = [
    {description: "Checking", amount: 100, type: "Expense"},
    {description: "Checking", amount: 100, type: "Expense"},
    {description: "Checking", amount: 100, type: "Expense"},
    {description: "Checking", amount: 100, type: "Expense"},
    {description: "Salary", amount: 100, type: "Income"},
    {description: "Checking", amount: 100, type: "Expense"},
    {description: "Savings", amount: 100, type: "Savings"},
    {description: "Checking", amount: 100, type: "Expense"},
    {description: "Salary", amount: 100, type: "Income"},
    {description: "Savings", amount: 100, type: "Savings"},
    {description: "Salary", amount: 100, type: "Income"},
    {description: "Salary", amount: 100, type: "Income"}
  ]
  const [budgetItems, setBudgetItems] = useState<{ description: string | undefined; amount: Number | undefined; type: string | undefined }[]>(initialValues);
  const handleUpdateBudget = () => {
    const description = desc.current?.value;
    const amountValue = amount.current?.value;
    const typeValue = type.current?.value;

    // Validation: Do not update state if description or amount is empty
    if (!description || !amountValue) {
      alert("Description and Amount are required!");
      return;
    }

    setBudgetItems([
      ...budgetItems,
      {
        description,
        amount: parseInt(amountValue),
        type: typeValue,
      },
    ]);
  };

  const AddBudgetItem = (): JSX.Element => {
    return (
      <div className="flex flex-wrap w-full gap-4">
        <div className="relative mt-6 w-full sm:w-auto lg:flex-1">
          <input
            type="text"
            ref={desc}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_standard"
            className="left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Description
          </label>
        </div>
        <div className="relative mt-6 w-full sm:w-auto lg:flex-1">
          <label htmlFor="type" className="sr-only">
            Type
          </label>
          <select
            id="type"
            className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            name="type"
            ref={type}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
            <option value="Savings">Savings</option>
          </select>
        </div>

        <div className="relative mt-6 w-full lg:flex-1">
          <input
            ref={amount}
            type="number"
            name="amount"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="floating_standard"
            className="left-0 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            Amount
          </label>
        </div>

        <button
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-md text-base px-6 h-[60px] w-full sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 shadow-md transition-all duration-200"
          onClick={handleUpdateBudget}
        >
          Add
        </button>
      </div>
    );
  };

  const BudgetDisplay = (): JSX.Element => {
    // Group budget items by type
    const groupedItems = budgetItems.reduce((groups, item) => {
      if (!item.type) return groups; // Skip items without a type
      if (!groups[item.type]) {      // If the group for this type doesn't exist yet
        groups[item.type] = [];      // Initialize it as an empty array
      }
      groups[item.type].push(item);  // Add the current item to the appropriate group

      return groups;                 // Return the updated groups object
    }, {} as Record<string, { description: string | undefined; amount: Number | undefined; type: string | undefined }[]>);

    return (
      <div className="overflow-hidden mt-10">
        <table className="table-fixed w-full text-sm text-center">
          <caption className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Budget Overview
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-500">
            <tr>
              <th className="px-2 sm:px-6 py-3 w-1/3">Description</th>
              <th className="px-2 sm:px-6 py-3 w-1/3">Type</th>
              <th className="px-2 sm:px-6 py-3 w-1/3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedItems).map((type) => (
              <React.Fragment key={type}>
                {/* Group Header */}
                <tr className="bg-gray-200">
                  <td colSpan={3} className="px-2 sm:px-6 py-2 font-bold text-left">
                    {type}
                  </td>
                </tr>
                {/* Group Items */}
                {groupedItems[type].map((item, index) => (
                  <tr
                    key={index}
                    className={`bg-white border-b border-gray-200 ${
                      type === "Expense"
                        ? "text-red-500"
                        : type === "Savings"
                        ? "text-orange-500"
                        : type === "Income"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    <td className="px-2 sm:px-6 py-4 truncate">{item.description}</td>
                    <td className="px-2 sm:px-6 py-4 truncate">{item.type}</td>
                    <td className="px-2 sm:px-6 py-4 truncate">$ {item.amount?.toString()}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center text-center px-4 sm:px-10 lg:px-40">
      <h1 className="text-2xl font-bold mb-4">Budget App</h1>
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold mb-2">Create New Budget Item</h2>
        <AddBudgetItem />
        <BudgetDisplay />
      </div>
    </div>
  );
}
