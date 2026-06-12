export interface Table {
  id: string;
  number: string;
  seats: number;
  diners?: number;
  status: "occupied" | "available" | "pending-billing";
  elapsedMinutes?: number;
  lastActivity?: string;
  currentTotal?: number;
}

export interface TicketItem {
  quantity: number;
  name: string;
  notes?: string;
}

export interface KitchenTicket {
  id: string;
  number: string;
  tableName: string;
  status: "preparing" | "new" | "completed";
  type: "urgent" | "normal";
  time: string;
  items: TicketItem[];
  instructions?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: "active" | "low-stock" | "inactive";
  imageSrc: string;
  imageAlt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "MANAGER" | "WAITER" | "KITCHEN";
  status: "online" | "offline";
  initials: string;
}

export interface KitchenStats {
  active: number;
  urgent: number;
  avgTime: string;
  completed: number;
}
