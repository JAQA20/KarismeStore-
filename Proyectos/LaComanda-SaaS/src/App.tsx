import { useState } from "react";
import type { Table, KitchenTicket, Product, User, KitchenStats } from "./types";
import { LoginPage } from "./pages/LoginPage";
import { TableViewPage } from "./pages/TableViewPage";
import { KitchenMonitorPage } from "./pages/KitchenMonitorPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";

function App() {
  const [currentScreen, setCurrentScreen] = useState<"login" | "tables" | "kitchen" | "dashboard">("login");

  // Shared Tables State
  const [tables, setTables] = useState<Table[]>([
    {
      id: "t1",
      number: "Table 08",
      seats: 4,
      diners: 4,
      status: "occupied",
      elapsedMinutes: 42,
      lastActivity: "Drinks served",
      currentTotal: 124.50,
    },
    {
      id: "t2",
      number: "Table 12",
      seats: 6,
      status: "available",
    },
    {
      id: "t3",
      number: "Table 03",
      seats: 2,
      diners: 2,
      status: "pending-billing",
      elapsedMinutes: 75,
      lastActivity: "Bill requested",
      currentTotal: 78.20,
    },
    {
      id: "t4",
      number: "Table 21",
      seats: 5,
      diners: 5,
      status: "occupied",
      elapsedMinutes: 18,
      lastActivity: "Mains ordering",
      currentTotal: 45.00,
    },
    {
      id: "t5",
      number: "Table 05",
      seats: 4,
      status: "available",
    },
    {
      id: "t6",
      number: "Table 11",
      seats: 2,
      diners: 2,
      status: "occupied",
      elapsedMinutes: 125,
      lastActivity: "Desserts served",
      currentTotal: 212.00,
    },
    {
      id: "t7",
      number: "Table 15",
      seats: 8,
      status: "available",
    },
    {
      id: "t8",
      number: "Table 01",
      seats: 3,
      diners: 3,
      status: "occupied",
      elapsedMinutes: 5,
      lastActivity: "Water served",
      currentTotal: 0.00,
    },
  ]);

  // Shared Kitchen Tickets State
  const [tickets, setTickets] = useState<KitchenTicket[]>([
    {
      id: "tick1",
      number: "1024",
      tableName: "Table 12",
      status: "preparing",
      type: "urgent",
      time: "18:45",
      items: [
        { quantity: 2, name: "Wagyu Ribeye", notes: "Medium Rare • No Butter" },
        { quantity: 1, name: "Truffle Risotto", notes: "Extra Parmesan" },
        { quantity: 1, name: "Sea Bass Crudo" },
      ],
      instructions: "Allergy: Peanuts. Please wipe station before prep.",
    },
    {
      id: "tick2",
      number: "1028",
      tableName: "Table 04",
      status: "preparing",
      type: "normal",
      time: "08:12",
      items: [
        { quantity: 4, name: "Classic Burger", notes: "Well Done, No Onions" },
        { quantity: 2, name: "Caesar Salad" },
        { quantity: 2, name: "Sweet Potato Fries" },
      ],
    },
    {
      id: "tick3",
      number: "1029",
      tableName: "Table 21",
      status: "preparing",
      type: "normal",
      time: "04:30",
      items: [
        { quantity: 1, name: "Pasta Carbonara", notes: "Gluten Free Penne" },
        { quantity: 1, name: "Margherita Pizza" },
      ],
    },
    {
      id: "tick4",
      number: "1030",
      tableName: "Bar 02",
      status: "new",
      type: "normal",
      time: "01:15",
      items: [
        { quantity: 2, name: "Buffalo Wings" },
        { quantity: 1, name: "Loaded Nachos" },
      ],
    },
  ]);

  // Shared Products State
  const [products, setProducts] = useState<Product[]>([
    {
      id: "p1",
      name: "Margherita D.O.P",
      category: "Pizza",
      price: 18.50,
      status: "active",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrlEz3ZmhPYYwnPZ5KXwIam05XKDp3wjkS9fksJRa3jcAZWBccSEfFpEtkt1DeYIBS0y6pZ3G3UFXmxV8txtN8xZB47zXfgAB-gd5tSSIL6kpaUfSjHjIBlc7E6D_q2Rs-XqIKDG4evikpF1_cEHcpl6hankugDQqYfcLEjAzH6uv5J3XUGMl76sf1hST2r527ZbaadWJjEMFFFCG2QfrCWgyKNUbCwOpIhOD3br3aAYDVhITM33J25uyfWgqxtTNyETUQ70YcbyfE",
      imageAlt: "Pizza Margherita",
    },
    {
      id: "p2",
      name: "Chianti Classico",
      category: "Beverages",
      price: 42.00,
      status: "low-stock",
      imageSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPHR5uAog1YeA9G0Ms1jZH-OcPwryVP7aUQki_vV35j_lSAfk4z6VL56Zbm-I0W77heCxob3zf3_rR83GP1ZDaJq4TcMbo7zWtNJeZivnFfuVaXkiqjHJLK6v2dd1nNiIi_ZdzSRgHkfd0ReBkjyzZX41dJ2fLoRTHo3705nWD97uQmL8OBrSND8XdqDmJnJ0gThmahlS_yBT489cYlEtX5gS15qaV89L13nsVbfRR6cf__fAL3fW8SK7WLi1mK3vZW0gq1N48FdAY",
      imageAlt: "Red Wine Glass",
    },
  ]);

  // Shared Users State
  const [users] = useState<User[]>([
    {
      id: "u1",
      name: "Alberto Sarti",
      email: "alberto@lacomanda.com",
      role: "MANAGER",
      status: "online",
      initials: "AS",
    },
    {
      id: "u2",
      name: "Lucia G.",
      email: "lucia.g@lacomanda.com",
      role: "WAITER",
      status: "offline",
      initials: "LG",
    },
  ]);

  // Shared Financials & Stats
  const [totalSales, setTotalSales] = useState<number>(4285.50);
  const [kitchenStats, setKitchenStats] = useState<KitchenStats>({
    active: 4,
    urgent: 1,
    avgTime: "18m",
    completed: 42,
  });

  // Login handler
  const handleLogin = (role: "WAITER" | "KITCHEN" | "MANAGER") => {
    if (role === "WAITER") {
      setCurrentScreen("tables");
    } else if (role === "KITCHEN") {
      setCurrentScreen("kitchen");
    } else {
      setCurrentScreen("dashboard");
    }
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentScreen("login");
  };

  // Table Update handler (which can affect totalSales if billing is processed)
  const handleUpdateTable = (tableId: string, updates: Partial<Table>) => {
    setTables((prevTables) =>
      prevTables.map((t) => {
        if (t.id === tableId) {
          // Detect when payment was processed (transition from pending-billing to available)
          if (t.status === "pending-billing" && updates.status === "available") {
            setTotalSales((prevSales) => prevSales + (t.currentTotal || 0));
          }
          return { ...t, ...updates };
        }
        return t;
      })
    );
  };

  // Kitchen Ticket Completion handler
  const handleCompleteTicket = (ticketId: string) => {
    setTickets((prevTickets) =>
      prevTickets.map((t) => (t.id === ticketId ? { ...t, status: "completed" } : t))
    );
    // Increment completed counter, decrement active counter
    setKitchenStats((prev) => ({
      ...prev,
      completed: prev.completed + 1,
      active: Math.max(0, prev.active - 1),
    }));
  };

  // Add Product handler
  const handleAddProduct = (newProd: Omit<Product, "id">) => {
    const productWithId: Product = {
      ...newProd,
      id: `p${products.length + 1}`,
    };
    setProducts((prevProducts) => [...prevProducts, productWithId]);
  };

  // Router dispatcher
  const renderScreen = () => {
    switch (currentScreen) {
      case "login":
        return <LoginPage onLogin={handleLogin} />;
      case "tables":
        return (
          <TableViewPage
            tables={tables}
            onUpdateTable={handleUpdateTable}
            onLogout={handleLogout}
            onNavigate={setCurrentScreen}
          />
        );
      case "kitchen":
        return (
          <KitchenMonitorPage
            tickets={tickets}
            stats={kitchenStats}
            onCompleteTicket={handleCompleteTicket}
            onLogout={handleLogout}
            onNavigate={setCurrentScreen}
          />
        );
      case "dashboard":
        return (
          <AdminDashboardPage
            tables={tables}
            products={products}
            users={users}
            totalSales={totalSales}
            onAddProduct={handleAddProduct}
            onLogout={handleLogout}
            onNavigate={setCurrentScreen}
          />
        );
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return <>{renderScreen()}</>;
}

export default App;
