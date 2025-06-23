import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../contexts/FirebaseContext";
import "./Dashboard.css";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [activeSection, setActiveSection] = useState("home");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [transferDestination, setTransferDestination] = useState("");
  const [showTransferModal, setShowTransferModal] = useState(false);

  const navigate = useNavigate();
  const { currentUser, logout, getCollection, createDocument } = useFirebase();

  // Cargar datos cuando el componente se monta
  useEffect(() => {
    if (currentUser) {
      loadUserData(currentUser.uid);
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  // Cargar datos del usuario desde Firestore
  const loadUserData = async (userId) => {
    try {
      setLoading(true);

      // Cargar cuentas (simuladas por ahora)
      setAccounts([
        {
          id: "cuenta-corriente",
          type: "Cuenta Corriente",
          number: "0012-3456-7890-1234",
          balance: 1250000,
          currency: "CLP",
        },
        {
          id: "cuenta-ahorro",
          type: "Cuenta de Ahorro",
          number: "0012-3456-7890-5678",
          balance: 3750000,
          currency: "CLP",
        },
        {
          id: "cuenta-inversion",
          type: "Cuenta de Inversión",
          number: "0012-9876-5432-1098",
          balance: 5000000,
          currency: "CLP",
        },
      ]);

      // Cargar transacciones (simuladas por ahora)
      setTransactions([
        {
          id: "trans1",
          date: new Date(2025, 4, 10),
          description: "Transferencia a Juan Pérez",
          amount: -150000,
          type: "transfer",
          category: "Transferencias",
          account: "Cuenta Corriente",
        },
        {
          id: "trans2",
          date: new Date(2025, 4, 9),
          description: "Depósito de nómina",
          amount: 1500000,
          type: "deposit",
          category: "Ingresos",
          account: "Cuenta Corriente",
        },
        {
          id: "trans3",
          date: new Date(2025, 4, 8),
          description: "Pago Supermercado Jumbo",
          amount: -75000,
          type: "payment",
          category: "Alimentación",
          account: "Cuenta Corriente",
        },
        {
          id: "trans4",
          date: new Date(2025, 4, 7),
          description: "Retiro Cajero Automático",
          amount: -50000,
          type: "withdrawal",
          category: "Retiros",
          account: "Cuenta Corriente",
        },
        {
          id: "trans5",
          date: new Date(2025, 4, 6),
          description: "Pago Cuenta Luz",
          amount: -35000,
          type: "payment",
          category: "Servicios",
          account: "Cuenta Corriente",
        },
      ]);

      // Aquí podrías cargar datos reales desde Firestore
      // const accountsData = await getCollection(`users/${userId}/accounts`);
      // const transactionsData = await getCollection(`users/${userId}/transactions`);
      // setAccounts(accountsData);
      // setTransactions(transactionsData);
    } catch (err) {
      console.error("Error cargando datos:", err);
      setError("Error al cargar los datos. Por favor intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  // Realizar una transferencia
  const handleTransfer = async (e) => {
    e.preventDefault();

    if (!transferAmount || !transferDestination) {
      setError("Por favor complete todos los campos");
      return;
    }

    try {
      // Aquí implementarías la lógica real de transferencia
      const newTransaction = {
        date: new Date(),
        description: `Transferencia a ${transferDestination}`,
        amount: -parseInt(transferAmount),
        type: "transfer",
        category: "Transferencias",
        account: "Cuenta Corriente",
      };

      // Actualizar el estado local para reflejar la transferencia
      setTransactions([newTransaction, ...transactions]);

      // Actualizar el saldo de la cuenta
      const updatedAccounts = accounts.map((account) => {
        if (account.id === "cuenta-corriente") {
          return {
            ...account,
            balance: account.balance - parseInt(transferAmount),
          };
        }
        return account;
      });

      setAccounts(updatedAccounts);

      // Cerrar el modal y limpiar los campos
      setShowTransferModal(false);
      setTransferAmount("");
      setTransferDestination("");

      // En una implementación real, guardarías esto en Firestore
      // await createDocument(`users/${currentUser.uid}/transactions`, newTransaction);
    } catch (err) {
      console.error("Error realizando transferencia:", err);
      setError(
        "Error al realizar la transferencia. Por favor intente nuevamente."
      );
    }
  };

  // Cerrar sesión
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      setError("Error al cerrar sesión. Por favor intente nuevamente.");
    }
  };

  // Formatear montos en pesos chilenos
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Formatear fechas
  const formatDate = (date) => {
    return new Intl.DateTimeFormat("es-CL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <div className="bank-dashboard">
      {/* Sidebar de navegación */}
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
              <button onClick={() => setActiveSection("accounts")}>
                <i className="icon-accounts"></i> Mis Cuentas
              </button>
            </li>
            <li className={activeSection === "transfers" ? "active" : ""}>
              <button onClick={() => setActiveSection("transfers")}>
                <i className="icon-transfers"></i> Transferencias
              </button>
            </li>
            <li className={activeSection === "payments" ? "active" : ""}>
              <button onClick={() => setActiveSection("payments")}>
                <i className="icon-payments"></i> Pagos
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/inversiones")}>
                <i className="icon-investments"></i> Inversiones
              </button>
            </li>
            <li className={activeSection === "profile" ? "active" : ""}>
              <button onClick={() => setActiveSection("profile")}>
                <i className="icon-profile"></i> Mi Perfil
              </button>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">
            <i className="icon-logout"></i> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="header-search">
            <input type="text" placeholder="Buscar..." />
            <button>
              <i className="icon-search"></i>
            </button>
          </div>

          <div className="header-actions">
            <button className="notification-button">
              <i className="icon-notification"></i>
              <span className="notification-badge">3</span>
            </button>

            <div className="user-profile">
              <div className="user-avatar">
                {currentUser?.email?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="user-info">
                <span className="user-name">
                  {currentUser?.email?.split("@")[0] || "Usuario"}
                </span>
                <span className="user-email">{currentUser?.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido del dashboard */}
        <div className="dashboard-content">
          <h2 className="welcome-message">Bienvenido a tu Banca en Línea</h2>

          {error && <div className="error-message">{error}</div>}

          {/* Resumen de cuentas */}
          <section className="accounts-summary">
            <div className="section-header">
              <h3>Mis Cuentas</h3>
              <button className="view-all-button">Ver todas</button>
            </div>

            <div className="accounts-grid">
              {accounts.map((account) => (
                <div key={account.id} className="account-card">
                  <div className="account-info">
                    <h4>{account.type}</h4>
                    <p className="account-number">{account.number}</p>
                  </div>
                  <div className="account-balance">
                    <span className="balance-label">Saldo Disponible</span>
                    <span className="balance-amount">
                      {formatCurrency(account.balance)}
                    </span>
                  </div>
                  <div className="account-actions">
                    <button onClick={() => setShowTransferModal(true)}>
                      Transferir
                    </button>
                    <button>Ver Detalles</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Acciones rápidas */}
          <section className="quick-actions">
            <div className="section-header">
              <h3>Acciones Rápidas</h3>
            </div>

            <div className="actions-grid">
              <button
                className="action-card"
                onClick={() => setShowTransferModal(true)}
              >
                <i className="icon-transfer"></i>
                <span>Transferir</span>
              </button>
              <button className="action-card">
                <i className="icon-pay"></i>
                <span>Pagar</span>
              </button>
              <button className="action-card">
                <i className="icon-qr"></i>
                <span>Pago QR</span>
              </button>
              <button className="action-card">
                <i className="icon-card"></i>
                <span>Tarjetas</span>
              </button>
            </div>
          </section>

          {/* Últimas transacciones */}
          <section className="recent-transactions">
            <div className="section-header">
              <h3>Últimas Transacciones</h3>
              <button className="view-all-button">Ver todas</button>
            </div>

            <div className="transactions-list">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className={`transaction-item ${transaction.amount < 0 ? "outgoing" : "incoming"
                    }`}
                >
                  <div className="transaction-icon">
                    <i className={`icon-${transaction.type}`}></i>
                  </div>
                  <div className="transaction-details">
                    <h4>{transaction.description}</h4>
                    <p>
                      {formatDate(transaction.date)} • {transaction.category}
                    </p>
                  </div>
                  <div className="transaction-amount">
                    <span>{formatCurrency(transaction.amount)}</span>
                    <p>{transaction.account}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Modal de transferencia */}
      {showTransferModal && (
        <div className="modal-overlay">
          <div className="transfer-modal">
            <div className="modal-header">
              <h3>Realizar Transferencia</h3>
              <button
                className="close-button"
                onClick={() => setShowTransferModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleTransfer} className="transfer-form">
              <div className="form-group">
                <label>Cuenta de Origen</label>
                <select defaultValue="cuenta-corriente">
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.type} - {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Destinatario</label>
                <input
                  type="text"
                  value={transferDestination}
                  onChange={(e) => setTransferDestination(e.target.value)}
                  placeholder="Nombre o RUT del destinatario"
                  required
                />
              </div>

              <div className="form-group">
                <label>Banco Destino</label>
                <select defaultValue="banco-bulla">
                  <option value="banco-bulla">BullaBank</option>
                  <option value="banco-estado">Banco Estado</option>
                  <option value="banco-santander">Banco Santander</option>
                  <option value="banco-chile">Banco de Chile</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Cuenta</label>
                <select defaultValue="cuenta-corriente">
                  <option value="cuenta-corriente">Cuenta Corriente</option>
                  <option value="cuenta-vista">Cuenta Vista</option>
                  <option value="cuenta-ahorro">Cuenta de Ahorro</option>
                </select>
              </div>

              <div className="form-group">
                <label>Monto</label>
                <input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Monto a transferir"
                  min="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descripción (opcional)</label>
                <input
                  type="text"
                  placeholder="Descripción de la transferencia"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowTransferModal(false)}
                  className="cancel-button"
                >
                  Cancelar
                </button>
                <button type="submit" className="confirm-button">
                  Transferir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
