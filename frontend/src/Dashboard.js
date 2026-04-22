import { useState, useEffect } from "react";
import "./App.css";

function Dashboard() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const addExpense = async () => {
    await fetch("https://abcproj.onrender.com/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, amount, category })
    });

    getExpenses();
  };

  const getExpenses = async () => {
    const res = await fetch("https://abcproj.onrender.com/expenses", {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });

    const data = await res.json();
    setExpenses(data);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="container">

      <h1>💰 Expense Manager</h1>

      <div className="card">
        <h2>Add Expense</h2>

        <input placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
        <input placeholder="Amount" onChange={(e)=>setAmount(e.target.value)} />
        <input placeholder="Category" onChange={(e)=>setCategory(e.target.value)} />

        <button onClick={addExpense}>Add Expense</button>
      </div>

      <div className="card">
        <h2>Your Expenses</h2>

        <ul>
          {expenses.map((e, i) => (
            <li key={i}>
              <span>{e.title}</span>
              <span>₹{e.amount}</span>
              <span>{e.category}</span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}

export default Dashboard;
