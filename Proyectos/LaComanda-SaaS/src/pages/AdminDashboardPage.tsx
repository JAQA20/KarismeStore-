import React, { useState } from "react";
import type { Table, Product, User } from "../types";
import { SideNavBar } from "../components/SideNavBar";
import { Header } from "../components/Header";

interface AdminDashboardPageProps {
  tables: Table[];
  products: Product[];
  users: User[];
  totalSales: number;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onLogout: () => void;
  onNavigate: (screen: "tables" | "kitchen" | "dashboard") => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  tables,
  products,
  users,
  totalSales,
  onAddProduct,
  onLogout,
  onNavigate,
}) => {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState("Pizza");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStatus, setNewProductStatus] = useState<"active" | "low-stock" | "inactive">("active");

  const [searchTerm, setSearchTerm] = useState("");

  const activeTablesCount = tables.filter((t) => t.status === "occupied" || t.status === "pending-billing").length;
  const loadPercentage = Math.round((activeTablesCount / tables.length) * 100);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    onAddProduct({
      name: newProductName,
      category: newProductCategory,
      price: parseFloat(newProductPrice),
      status: newProductStatus,
      imageSrc: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=60", // Generic food image
      imageAlt: newProductName,
    });

    // Reset and close
    setNewProductName("");
    setNewProductPrice("");
    setNewProductStatus("active");
    setShowAddProductModal(false);
  };

  // Filter products or users based on header search if needed
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* Sidebar */}
      <SideNavBar
        currentScreen="dashboard"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="ml-72 min-h-screen pb-12">
        {/* Header */}
        <Header
          userName="Chef de Cuisine"
          userRole="Administrator"
          userImage="https://lh3.googleusercontent.com/aida-public/AB6AXuA9O9RuzrNKh7Mh-jGtz_6VnUtijVWQUPr9WrAKbKwNoAnNKcq7xRG3lkF5OYmkA_c6H6ienb9kCS-c5xFJcDCwEl97bnCV5PY7chwKPL0ulefPEvM6Pkv7YuyEVUXFzf0eI-o1mlIGTHanvLoG-x6e4GmXxYJilX_0b97-M0nSULdGygRimQKrWbg6CVPtJCeuGdySxfgrmIOP2T5dj_5Ns2S2l9N9-xdDYfvAH_hSma7D4UT4DbNNXQuDn6kNxjKZ_ZGHcQbtPwCt"
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search menu items, orders, or staff..."
        />

        {/* Dashboard Canvas */}
        <div className="p-8 space-y-8">
          {/* Summary Stats Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface border border-surface-variant/10 p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-secondary-container text-on-secondary-container rounded-lg">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <span className="text-green-600 font-label-bold text-label-bold flex items-center gap-0.5 text-xs">
                  +12%
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                </span>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant font-label-bold text-label-bold uppercase tracking-wider text-xs">
                  Total Sales Today
                </p>
                <h2 className="font-headline-lg text-headline-lg mt-1">
                  ${totalSales.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
              </div>
            </div>

            <div className="bg-surface border border-surface-variant/10 p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
                  <span className="material-symbols-outlined">table_restaurant</span>
                </div>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-[10px] font-bold">
                  {loadPercentage}% LOAD
                </span>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant font-label-bold text-label-bold uppercase tracking-wider text-xs">
                  Active Tables
                </p>
                <h2 className="font-headline-lg text-headline-lg mt-1">
                  {activeTablesCount}
                  <span className="text-body-lg font-normal text-on-surface-variant">
                    {" "}/ {tables.length}
                  </span>
                </h2>
              </div>
            </div>

            <div className="bg-surface border border-surface-variant/10 p-6 rounded-xl flex flex-col justify-between border-l-4 border-l-error hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-error-container text-on-error-container rounded-lg">
                  <span className="material-symbols-outlined">warning</span>
                </div>
                <button
                  onClick={() => alert("Low Stock: Chianti Classico (Beers coming soon)")}
                  className="text-error font-label-bold text-label-bold underline text-xs"
                >
                  View All
                </button>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant font-label-bold text-label-bold uppercase tracking-wider text-xs">
                  Inventory Alerts
                </p>
                <h2 className="font-headline-lg text-headline-lg mt-1">
                  07{" "}
                  <span className="text-body-sm font-normal text-error">
                    Items Low
                  </span>
                </h2>
              </div>
            </div>

            <div className="bg-surface border border-surface-variant/10 p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="p-2 bg-tertiary-container text-on-tertiary-container rounded-lg">
                  <span className="material-symbols-outlined">timer</span>
                </div>
                <span className="text-tertiary font-label-bold text-label-bold text-xs">
                  FAST
                </span>
              </div>
              <div className="mt-4">
                <p className="text-on-surface-variant font-label-bold text-label-bold uppercase tracking-wider text-xs">
                  Avg. Fulfillment
                </p>
                <h2 className="font-headline-lg text-headline-lg mt-1">
                  18{" "}
                  <span className="text-body-lg font-normal text-on-surface-variant">
                    mins
                  </span>
                </h2>
              </div>
            </div>
          </div>

          {/* Central Content: Chart & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Peak Hour Volume Chart */}
            <div className="lg:col-span-2 bg-surface border border-surface-variant/10 rounded-xl p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-title-md text-title-md">Peak Hour Volume</h3>
                  <p className="text-on-surface-variant text-body-sm">
                    Traffic flow per hour across all sections
                  </p>
                </div>
                <select className="bg-surface-container-low border-none rounded-lg px-4 py-2 text-label-bold outline-none focus:ring-1 focus:ring-primary text-xs">
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                </select>
              </div>

              {/* Simulated Chart */}
              <div className="relative h-64 w-full flex items-end gap-2 px-2 border-b border-surface-variant/20 pb-1">
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "30%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    12:00 (30%)
                  </span>
                </div>
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "45%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    14:00 (45%)
                  </span>
                </div>
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "60%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    16:00 (60%)
                  </span>
                </div>
                <div
                  className="flex-1 bg-primary group relative rounded-t-lg shadow-lg"
                  style={{ height: "95%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] whitespace-nowrap z-10">
                    19:00 (Peak)
                  </span>
                </div>
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "85%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    20:00 (85%)
                  </span>
                </div>
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "55%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    21:00 (55%)
                  </span>
                </div>
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "40%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    22:00 (40%)
                  </span>
                </div>
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "30%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    23:00 (30%)
                  </span>
                </div>
                <div
                  className="flex-1 bg-surface-container-highest hover:bg-primary transition-all duration-200 group relative rounded-t-lg"
                  style={{ height: "20%" }}
                >
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    00:00 (20%)
                  </span>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-[10px] text-on-surface-variant font-mono-data px-2">
                <span>12:00</span>
                <span>14:00</span>
                <span>16:00</span>
                <span>18:00</span>
                <span>20:00</span>
                <span>22:00</span>
                <span>00:00</span>
              </div>
            </div>

            {/* Staff Performance Sidebar */}
            <div className="bg-surface border border-surface-variant/10 rounded-xl p-6">
              <h3 className="font-title-md text-title-md mb-6">Staff Performance</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    alt="Staff Member"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAXc4lM1pvYefhApergUIkYWr5lgVIL39t4mceX4S0dmxEZ01AXfoJ4tU-rMb0v4xAwWCmDRGcj8uObKKi_S3h-HecKn7Z7teZBafm94VE3M__wMr4u9sJHZA5Cnj8OPK1kXWzQ4NsOM_pEAd-kctCiFL-NkYgTXG51twDZC0_wRF5fUpbjmhQck3tYIZUpL764YD_pMyJbuN7rGthWf0Nc7g9YRS5Rtan1ffZxhFgyWNlLf3nac1TeGXHErkt2ZPxmfnmhsbAxByr"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between text-sm">
                      <p className="font-label-bold text-label-bold">Marco Rossi</p>
                      <p className="text-mono-data text-primary font-bold">$1.2k</p>
                    </div>
                    <div className="w-full bg-surface-variant/30 h-1.5 rounded-full mt-2">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "88%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    alt="Staff Member"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC55BNAMFz37J952OEaQJRqbCv8286A2J-9GpDDQKh9NPG6UmpJcX_9LNgabBfDEGaNaTUgrVqaMf83ddIf6wEz2bRkBW79kEbJ81LdeCutWaGhZG-LS1TeuBKY1H_zofojYqWKiWd24KCJMKBNZPcA-8fxeO__EkruAMpJmoxMDBrx5694UrENJ7NBpqCAJsVjxfsgUGFRgb7KTSnHA2c7seYgtD6aU977MEExV8I_OigCZ1iY0QLLg_w4iJ0jPY4MwyPzXuES1eZc"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between text-sm">
                      <p className="font-label-bold text-label-bold">Elena Vance</p>
                      <p className="text-mono-data text-primary font-bold">$940</p>
                    </div>
                    <div className="w-full bg-surface-variant/30 h-1.5 rounded-full mt-2">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "72%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    alt="Staff Member"
                    className="w-10 h-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC55_PpKPzfkc4Yd807GL-zLZSl4rV9rE98PpQq9Bqg71FJKXW85cCed2PW5MGWj5LPjrzkwl5NMmjuiNFVosv2j0MGWaRI5NoU_BBSWI0bWbs0WXPMLgNTpIAwspdMTiW9uDayFt-pm0L0T4eVShs7gtNqSF1Bfh4R3FnlM85g9yPxJFzbepOYAH6dtc620cTjvOLSc8xuVlCawqVsIIcENXH8QSdAX9PYuUOG6S5pmxMBtZHUXu1goMJ-eg1lcE_2aJgyd1z8NUao"
                  />
                  <div className="flex-grow">
                    <div className="flex justify-between text-sm">
                      <p className="font-label-bold text-label-bold">Julian S.</p>
                      <p className="text-mono-data text-primary font-bold">$810</p>
                    </div>
                    <div className="w-full bg-surface-variant/30 h-1.5 rounded-full mt-2">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: "64%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => alert("Full staff reports downloaded.")}
                className="w-full mt-8 py-2 text-primary font-label-bold text-label-bold hover:bg-primary/5 rounded-lg transition-colors text-sm"
              >
                View All Staff Insights
              </button>
            </div>
          </div>

          {/* Lower Sections: User Mgmt & Product Editor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product/Menu Editor Preview */}
            <section className="bg-surface border border-surface-variant/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-surface-variant/10 flex justify-between items-center">
                <div>
                  <h3 className="font-title-md text-title-md">Product Editor</h3>
                  <p className="text-on-surface-variant text-body-sm">
                    Manage menu items and pricing
                  </p>
                </div>
                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-bold text-label-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all text-sm shadow-md shadow-primary/10"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  New Item
                </button>
              </div>

              <div className="divide-y divide-surface-variant/10 max-h-[300px] overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors"
                  >
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-16 h-16 rounded-lg object-cover bg-surface-container"
                    />
                    <div className="flex-grow">
                      <h4 className="font-label-bold text-label-bold text-base leading-tight">
                        {product.name}
                      </h4>
                      <p className="text-on-surface-variant text-xs mt-1">
                        Category: {product.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono-data text-base font-bold">${product.price.toFixed(2)}</p>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          product.status === "active"
                            ? "bg-green-100 text-green-700"
                            : product.status === "low-stock"
                            ? "bg-error-container text-on-error-container"
                            : "bg-surface-variant text-on-surface-variant"
                        }`}
                      >
                        {product.status.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => alert(`Edit panel for: ${product.name}`)}
                      className="p-2 text-outline hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* User Management */}
            <section className="bg-surface border border-surface-variant/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-surface-variant/10 flex justify-between items-center">
                <div>
                  <h3 className="font-title-md text-title-md">User Management</h3>
                  <p className="text-on-surface-variant text-body-sm">
                    Control system access and roles
                  </p>
                </div>
                <button
                  onClick={() => alert("Viewing complete user directory")}
                  className="text-primary font-label-bold text-label-bold hover:underline text-sm"
                >
                  View Directory
                </button>
              </div>
              <div className="p-6 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-on-surface-variant font-label-bold text-[10px] uppercase tracking-widest border-b border-surface-variant/10">
                      <th className="pb-4">User</th>
                      <th className="pb-4">Role</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-variant/10">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-surface-container-lowest/40 transition-colors">
                        <td className="py-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shadow-sm">
                            {user.initials}
                          </div>
                          <div>
                            <p className="font-label-bold text-label-bold leading-tight">
                              {user.name}
                            </p>
                            <p className="text-[10px] text-on-surface-variant mt-0.5">
                              {user.email}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 align-middle">
                          <span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 align-middle">
                          <div
                            className={`flex items-center gap-1.5 font-bold text-[10px] ${
                              user.status === "online" ? "text-green-600" : "text-on-surface-variant"
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.status === "online" ? "bg-green-600" : "bg-surface-variant"
                              }`}
                            ></div>
                            {user.status.toUpperCase()}
                          </div>
                        </td>
                        <td className="py-4 text-right align-middle">
                          <button
                            onClick={() => alert(`Actions menu for user: ${user.name}`)}
                            className="p-1 hover:bg-surface-container-low rounded transition-colors"
                          >
                            <span className="material-symbols-outlined text-outline text-lg">
                              more_vert
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>

        {/* Add Product Modal Overlay */}
        {showAddProductModal && (
          <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-surface rounded-xl p-8 max-w-md w-full shadow-2xl border border-surface-variant/20 animate-fade-in">
              <h3 className="font-headline-lg text-headline-lg-mobile text-primary mb-6">
                Add New Menu Item
              </h3>
              <form onSubmit={handleCreateProduct} className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-bold text-label-bold text-on-surface text-xs">
                    PRODUCT NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. Pepperoni Special"
                    className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-bold text-label-bold text-on-surface text-xs">
                    CATEGORY
                  </label>
                  <select
                    value={newProductCategory}
                    onChange={(e) => setNewProductCategory(e.target.value)}
                    className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                  >
                    <option value="Pizza">Pizza</option>
                    <option value="Beverages">Beverages</option>
                    <option value="Appetizers">Appetizers</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-bold text-label-bold text-on-surface text-xs">
                      PRICE ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      placeholder="e.g. 15.99"
                      className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-bold text-label-bold text-on-surface text-xs">
                      STOCK STATUS
                    </label>
                    <select
                      value={newProductStatus}
                      onChange={(e) => setNewProductStatus(e.target.value as any)}
                      className="w-full p-3 bg-surface-container-low rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                    >
                      <option value="active">Active</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="flex-1 py-3 border border-outline rounded-lg text-on-surface hover:bg-surface-container-low transition-colors text-sm font-label-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary text-on-primary rounded-lg hover:brightness-110 active:scale-95 transition-all text-sm font-label-bold shadow-md shadow-primary/10"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
