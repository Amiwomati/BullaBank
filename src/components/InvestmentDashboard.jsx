import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "./InvestmentDashboard.css";

const InvestmentDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [selectedFund, setSelectedFund] = useState(null);
  const navigate = useNavigate();

  const transactionsToReview = [
    { id: 1, name: "Fondo Común A", category: "Inversión", amount: 1000.0, date: "Ayer" },
    { id: 2, name: "Fondo Común B", category: "Inversión", amount: 1500.0, date: "Ayer" },
    { id: 3, name: "Fondo Común C", category: "Inversión", amount: -500.0, date: "Ayer" },
    { id: 4, name: "Fondo Común D", category: "Inversión", amount: 2000.0, date: "27 de Nov" },
    { id: 5, name: "Fondo Común E", category: "Inversión", amount: 1200.0, date: "27 de Nov" },
  ];

  const spendingData = [
    { name: "Semana 1", amount: 3000 },
    { name: "Semana 2", amount: 2000 },
    { name: "Semana 3", amount: 1500 },
    { name: "Semana 4", amount: 1000 },
  ];

  const monthlyIncomeData = [
    { name: "Ene", income: 2400 },
    { name: "Feb", income: 2210 },
    { name: "Mar", income: 2290 },
    { name: "Abr", income: 2000 },
  ];

  const fundData = {
    "Fondo Común A": [
      { month: "Ene", amount: 1000 },
      { month: "Feb", amount: 1400 },
      { month: "Mar", amount: 1500 },
      { month: "Abr", amount: 1600 },
    ],
    "Fondo Común B": [
      { month: "Ene", amount: 1500 },
      { month: "Feb", amount: 1600 },
      { month: "Mar", amount: 1700 },
      { month: "Abr", amount: 1800 },
    ],
    "Fondo Común C": [
      { month: "Ene", amount: 100 },
      { month: "Feb", amount: 150 },
      { month: "Mar", amount: 200 },
      { month: "Abr", amount: 250 },
    ],
    "Fondo Común D": [
      { month: "Ene", amount: 600 },
      { month: "Feb", amount: 700 },
      { month: "Mar", amount: 800 },
      { month: "Abr", amount: 900 },
    ],
    "Fondo Común E": [
      { month: "Ene", amount: 150 },
      { month: "Feb", amount: 250 },
      { month: "Mar", amount: 350 },
      { month: "Abr", amount: 450 },
    ],
  };

  const calculateTotalIncome = () => {
    return monthlyIncomeData.reduce((total, month) => total + month.income, 0);
  };

  const calculateTotalSpending = () => {
    return transactionsToReview.reduce((total, tx) => total + tx.amount, 0);
  };

  const netWorth = calculateTotalIncome() + calculateTotalSpending();

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 2,
    }).format(amount);

  const handleFundClick = (fund) => {
    setSelectedFund(fund);
    setActiveSection("fundDetail");
  };

  return (
    <div className="bank-dashboard">
      <aside className="sidebar">
        <div className="logo">
          <h1>BullaBank</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === "dashboard" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveSection("dashboard");
                  navigate("/dashboard");
                }}
              >
                📊 Inicio
              </button>
            </li>
            <li className={activeSection === "accounts" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveSection("accounts");
                  navigate("/accounts");
                }}
              >
                🏦 Mis Cuentas
              </button>
            </li>
            <li className={activeSection === "transfers" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveSection("transfers");
                  navigate("/transfers");
                }}
              >
                💸 Transferencias
              </button>
            </li>
            <li className={activeSection === "payments" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveSection("payments");
                  navigate("/payments");
                }}
              >
                💳 Pagos
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/inversiones")}>
                📈 Inversiones
              </button>
            </li>
            <li className={activeSection === "profile" ? "active" : ""}>
              <button
                onClick={() => {
                  setActiveSection("profile");
                  navigate("/profile");
                }}
              >
                👤 Mi Perfil
              </button>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <button
            onClick={() => {
              /* Lógica para cerrar sesión */
            }}
            className="logout-button"
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="main-content">
        <h2>Dashboard</h2>
        <div className="summary">
          <p>Total Ingresos: {formatCurrency(calculateTotalIncome())}</p>
          <p>Total Gastos: {formatCurrency(calculateTotalSpending())}</p>
          <p>Valor Neto: {formatCurrency(netWorth)}</p>
        </div>

        <section className="charts-section">
          <div className="chart-card">
            <div className="chart-header">Gastos Mensuales</div>
            {selectedFund ? (
              <LineChart width={500} height={300} data={fundData[selectedFund]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
              </LineChart>
            ) : (
              <BarChart width={500} height={300} data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            )}
          </div>
        </section>

        <section className="transactions-review">
          <div className="section-header">
            <h3>Transacciones A Revisar</h3>
            <button className="view-all">VER TODAS ↗</button>
          </div>
          <ul>
            {transactionsToReview.map((tx) => (
              <li
                key={tx.id}
                className="transaction-item"
                onClick={() => handleFundClick(tx.name)}
              >
                <input type="checkbox" />
                <span className="transaction-name">{tx.name}</span>
                {tx.category && (
                  <span className={`category-badge ${tx.category.toLowerCase()}`}>
                    {tx.category.toUpperCase()}
                  </span>
                )}
                <span
                  className={`transaction-amount ${
                    tx.amount < 0 ? "negative" : "positive"
                  }`}
                >
                  {formatCurrency(Math.abs(tx.amount))}
                </span>
              </li>
            ))}
          </ul>
          <button className="mark-reviewed">Marcar todo como revisado</button>
        </section>
      </main>
    </div>
  );
};

export default InvestmentDashboard;
