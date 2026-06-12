import React, { useState } from "react";
import type { Table } from "../types";
import { SideNavBar } from "../components/SideNavBar";
import { Header } from "../components/Header";

interface TableViewPageProps {
  tables: Table[];
  onUpdateTable: (tableId: string, updates: Partial<Table>) => void;
  onLogout: () => void;
  onNavigate: (screen: "tables" | "kitchen" | "dashboard") => void;
}

export const TableViewPage: React.FC<TableViewPageProps> = ({
  tables,
  onUpdateTable,
  onLogout,
  onNavigate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "available" | "occupied" | "pending-billing">("all");

  // Calculate dynamic stats
  const availableCount = tables.filter((t) => t.status === "available").length;
  const busyCount = tables.filter((t) => t.status !== "available").length;
  const activeTablesCount = tables.filter((t) => t.status === "occupied" || t.status === "pending-billing").length;

  // Filter tables
  const filteredTables = tables.filter((table) => {
    const matchesSearch = table.number.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || table.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenOrder = (tableId: string) => {
    onUpdateTable(tableId, {
      status: "occupied",
      diners: Math.floor(Math.random() * 4) + 2, // 2 to 5 diners
      elapsedMinutes: 1,
      lastActivity: "Table opened",
      currentTotal: 0.0,
    });
  };

  const handleAddItems = (tableId: string, currentTotal: number = 0) => {
    const randomAmount = parseFloat((Math.random() * 30 + 10).toFixed(2));
    onUpdateTable(tableId, {
      currentTotal: parseFloat((currentTotal + randomAmount).toFixed(2)),
      lastActivity: "Added drinks & starters",
      elapsedMinutes: Math.floor(Math.random() * 15) + 10,
    });
  };

  const handleRequestBill = (tableId: string) => {
    onUpdateTable(tableId, {
      status: "pending-billing",
      lastActivity: "Bill requested",
    });
  };

  const handleProcessPayment = (tableId: string, finalBill: number = 0) => {
    alert(`Payment of $${finalBill} processed successfully! Table is now free.`);
    onUpdateTable(tableId, {
      status: "available",
      diners: undefined,
      elapsedMinutes: undefined,
      lastActivity: undefined,
      currentTotal: undefined,
    });
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* Sidebar navigation */}
      <SideNavBar
        currentScreen="tables"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Canvas */}
      <main className="ml-72 min-h-screen pb-24">
        {/* Header */}
        <Header
          userName="Lucia Gomez"
          userRole="Lead Waiter"
          userImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDbShtDmVJg5OOAgeUrdZfWj6PIHXfOnFaIC982l56nfgUHS8wydy7HgsYcSB-P7EihN6NWc58ABSbqkpiC1aVEX4Ld7dkaEux1ztGs0jZHFpJdCh9Ek6IDfyPgCAXT0G00falkAe3EUFA3-zARq0oE-QTGJfKois6TeL4PH5nHhy9xhp61rAvXXSy4dOXkr3cdn8m2A4vQKcXF_nwiTxCFDBLhs1ScvgqM6_ARMludWM2Um8ulYaOXKppUTvP6FmgLxDrcz-Z_19YC"
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search table numbers (e.g. 08)..."
          middleContent={
            <div className="flex gap-2 bg-surface-container px-3 py-1.5 rounded-full border border-surface-variant/20">
              <div className="flex items-center gap-1.5 px-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                <span className="text-label-bold font-label-bold">{availableCount} Free</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 border-l border-surface-variant/20">
                <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                <span className="text-label-bold font-label-bold">{busyCount} Busy</span>
              </div>
            </div>
          }
        />

        {/* Table Grid Section */}
        <section className="p-margin-desktop">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Main Dining Room
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                Real-time floor status monitor
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const filterCycles: ("all" | "available" | "occupied" | "pending-billing")[] = [
                    "all",
                    "available",
                    "occupied",
                    "pending-billing",
                  ];
                  const nextIndex = (filterCycles.indexOf(statusFilter) + 1) % filterCycles.length;
                  setStatusFilter(filterCycles[nextIndex]);
                }}
                className="bg-surface-container-highest px-4 py-2 rounded-lg font-label-bold text-label-bold flex items-center gap-2 hover:bg-surface-variant/50 transition-colors"
              >
                <span className="material-symbols-outlined text-base">filter_list</span>
                Filter: {statusFilter.toUpperCase()}
              </button>
              <button
                onClick={() => alert("Floor Map design is active.")}
                className="bg-surface-container-highest px-4 py-2 rounded-lg font-label-bold text-label-bold flex items-center gap-2 hover:bg-surface-variant/50 transition-colors"
              >
                <span className="material-symbols-outlined text-base">grid_view</span>
                Floor Map
              </button>
            </div>
          </div>

          {/* Table Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-gutter">
            {filteredTables.length > 0 ? (
              filteredTables.map((table) => {
                const isOccupied = table.status === "occupied";
                const isPendingBilling = table.status === "pending-billing";
                const isAvailable = table.status === "available";

                // Border indicator color
                let borderBarColor = "bg-green-500";
                if (isOccupied) borderBarColor = "bg-primary";
                if (isPendingBilling) borderBarColor = "bg-[#facc15]";

                return (
                  <div
                    key={table.id}
                    className="bg-surface-container-lowest border border-surface-variant/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className={`h-1.5 ${borderBarColor}`}></div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            {isOccupied && (
                              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-[10px] font-label-bold uppercase tracking-wider">
                                Occupied
                              </span>
                            )}
                            {isAvailable && (
                              <span className="bg-green-500/10 text-green-700 px-2 py-0.5 rounded text-[10px] font-label-bold uppercase tracking-wider">
                                Available
                              </span>
                            )}
                            {isPendingBilling && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-[10px] font-label-bold uppercase tracking-wider">
                                Pending Billing
                              </span>
                            )}
                            <h3 className="font-mono-data text-headline-lg-mobile mt-1">
                              {table.number}
                            </h3>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-label-bold text-label-bold text-on-surface-variant">
                              {table.seats} Seats
                            </span>
                            {table.diners && (
                              <span className="text-on-surface-variant text-[11px]">
                                {table.diners} Diners
                              </span>
                            )}
                            {table.elapsedMinutes !== undefined && (
                              <span className={`font-mono-data text-body-sm mt-1 ${isPendingBilling ? "text-error" : "text-primary"}`}>
                                {table.elapsedMinutes}m elapsed
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Order Info Card */}
                        {!isAvailable ? (
                          <div className="bg-surface-container-low rounded-lg p-3 mb-4">
                            <div className="flex items-center justify-between text-body-sm mb-1">
                              <span className="text-on-surface-variant">Last activity:</span>
                              <span className="font-label-bold truncate max-w-[120px]">{table.lastActivity}</span>
                            </div>
                            <div className="flex items-center justify-between text-body-sm">
                              <span className="text-on-surface-variant">
                                {isPendingBilling ? "Final Total:" : "Current Total:"}
                              </span>
                              <span className="font-mono-data font-bold">
                                ${table.currentTotal?.toFixed(2)}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="h-[76px] flex items-center justify-center border-2 border-dashed border-surface-variant/30 rounded-lg mb-4">
                            <span className="text-on-surface-variant opacity-40 italic text-body-sm">
                              No active order
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="p-4 pt-0">
                      {isAvailable && (
                        <button
                          onClick={() => handleOpenOrder(table.id)}
                          className="w-full bg-white border border-outline text-on-surface font-label-bold text-label-bold py-3 rounded-lg hover:bg-surface-container transition-all"
                        >
                          Open Order
                        </button>
                      )}
                      {isOccupied && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddItems(table.id, table.currentTotal)}
                            className="flex-1 bg-white border border-outline text-on-surface font-label-bold text-label-bold py-3 rounded-lg hover:bg-surface-container transition-all text-xs"
                          >
                            Add Items
                          </button>
                          <button
                            onClick={() => handleRequestBill(table.id)}
                            className="flex-1 bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all text-xs"
                          >
                            Request Bill
                          </button>
                        </div>
                      )}
                      {isPendingBilling && (
                        <button
                          onClick={() => handleProcessPayment(table.id, table.currentTotal)}
                          className="w-full bg-primary text-on-primary font-label-bold text-label-bold py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all"
                        >
                          Process Payment
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full py-16 text-center text-on-surface-variant/60">
                <span className="material-symbols-outlined text-4xl block mb-2">table_restaurant</span>
                No tables match the search filter.
              </div>
            )}
          </div>
        </section>

        {/* Dynamic Summary Bar */}
        <div className="fixed bottom-0 right-0 left-72 bg-surface-container-highest/90 backdrop-blur-md p-4 flex items-center justify-between border-t border-surface-variant/20 z-30">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-label-bold font-label-bold opacity-60 uppercase text-[10px]">
                Total Active Tables
              </span>
              <span className="font-title-md text-title-md">{activeTablesCount} / {tables.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-bold font-label-bold opacity-60 uppercase text-[10px]">
                Average Stay
              </span>
              <span className="font-title-md text-title-md">54 Min</span>
            </div>
            <div className="flex flex-col">
              <span className="text-label-bold font-label-bold opacity-60 uppercase text-[10px]">
                Active Orders
              </span>
              <span className="font-title-md text-title-md">9 Kitchen • 5 Bar</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => alert("Support ticket created successfully.")}
              className="bg-white px-6 py-2.5 rounded-lg font-label-bold text-label-bold border border-outline hover:bg-surface-container-low transition-colors"
            >
              Report Issue
            </button>
            <button
              onClick={() => alert("Current Shift Summary downloaded.")}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-bold text-label-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
            >
              Shift Summary
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
