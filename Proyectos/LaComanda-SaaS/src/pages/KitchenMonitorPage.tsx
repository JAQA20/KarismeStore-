import React from "react";
import type { KitchenTicket, KitchenStats } from "../types";
import { SideNavBar } from "../components/SideNavBar";
import { Header } from "../components/Header";

interface KitchenMonitorPageProps {
  tickets: KitchenTicket[];
  stats: KitchenStats;
  onCompleteTicket: (ticketId: string) => void;
  onLogout: () => void;
  onNavigate: (screen: "tables" | "kitchen" | "dashboard") => void;
}

export const KitchenMonitorPage: React.FC<KitchenMonitorPageProps> = ({
  tickets,
  stats,
  onCompleteTicket,
  onLogout,
  onNavigate,
}) => {
  const activeTickets = tickets.filter((t) => t.status !== "completed");

  return (
    <div className="dark bg-surface-dim text-on-surface min-h-screen flex overflow-hidden w-full">
      {/* SideNavBar */}
      <SideNavBar
        currentScreen="kitchen"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <main className="ml-72 flex-grow h-screen flex flex-col bg-surface-dim text-on-surface">
        {/* Header */}
        <Header
          userName="Chef Marco"
          userRole="Executive Chef"
          userImage="https://lh3.googleusercontent.com/aida-public/AB6AXuDF5G192Xbar20BskAJ_WvxE3XJebjhN_pTdYnO9Z4Nk0_9MaGxAcQqEjrEwo4VAGRx15hmwKjsRSNobb3-YsDv5m-YcwlmgumndHApr9TW7Bzw35ZHZ7affB6nP0dGe6dUfTurtDOhnz6LV3JRxTzt6s_OFPrrvIXR4rproQqmCJKjvubwB8TwDV0l8lcmpdB2o5y1T7Hgd2ukIrvseqbjpm8f-xK8lNrjnoZi0jQEpqmSQEq80w2oFVV-uvXaltwYyg_JuKG7qfV9"
          title="Kitchen Monitor"
          subtitle={
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-high rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-label-bold text-label-bold text-on-surface-variant uppercase text-xs">
                Kitchen Live
              </span>
            </div>
          }
        />

        {/* KDS Ticket Grid Area */}
        <section className="flex-grow p-gutter bg-surface-container-lowest dark:bg-surface-dim overflow-x-auto flex">
          <div className="flex h-full gap-4 min-w-max pb-4">
            {activeTickets.length > 0 ? (
              activeTickets.map((ticket) => {
                const isUrgent = ticket.type === "urgent";
                const isNew = ticket.status === "new";

                return (
                  <article
                    key={ticket.id}
                    className={`flex flex-col w-80 bg-surface dark:bg-inverse-surface rounded-xl border-2 shadow-xl overflow-hidden h-full max-h-[calc(100vh-140px)] transition-all ${
                      isUrgent
                        ? "border-error urgent-pulse"
                        : "border-surface-variant/20"
                    } ${isNew ? "opacity-90 grayscale-[0.1]" : ""}`}
                  >
                    {/* Ticket Header */}
                    <header
                      className={`p-4 flex justify-between items-start ${
                        isUrgent
                          ? "bg-error text-on-error"
                          : isNew
                          ? "bg-surface-container-highest text-on-surface-variant"
                          : "bg-secondary-container text-on-secondary-container"
                      }`}
                    >
                      <div>
                        <span className="font-mono-data text-mono-data text-xs opacity-85">
                          #{ticket.number}
                        </span>
                        <h2 className="font-headline-lg text-headline-lg leading-tight">
                          {ticket.tableName}
                        </h2>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-1 ${
                            isUrgent
                              ? "bg-white/20 text-white"
                              : isNew
                              ? "bg-on-surface-variant/20 text-on-surface-variant"
                              : "bg-secondary/20 text-secondary-container"
                          }`}
                        >
                          {ticket.status.toUpperCase()}
                        </span>
                        <span
                          className={`font-mono-data text-lg ${
                            isUrgent ? "text-white" : "text-on-surface"
                          }`}
                        >
                          {ticket.time}
                        </span>
                      </div>
                    </header>

                    {/* Ticket Body Items */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4">
                      {ticket.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="w-8 h-8 bg-surface-container-highest dark:bg-surface-variant flex items-center justify-center font-bold text-lg rounded shrink-0">
                            {item.quantity}
                          </div>
                          <div className="flex-grow">
                            <p className="font-title-md text-title-md text-on-surface dark:text-inverse-on-surface">
                              {item.name}
                            </p>
                            {item.notes && (
                              <p
                                className={`font-body-sm text-body-sm italic mt-1 ${
                                  isUrgent ? "text-error font-bold uppercase" : "text-on-surface-variant"
                                }`}
                              >
                                {item.notes}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Ticket Footer / Instructions & Ready Button */}
                    <footer className="p-4 bg-surface-container-low dark:bg-inverse-surface border-t border-surface-variant/10 space-y-3">
                      {ticket.instructions && (
                        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                          <p className="font-label-bold text-label-bold text-error uppercase mb-1 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              warning
                            </span>
                            Instructions
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface dark:text-inverse-on-surface">
                            {ticket.instructions}
                          </p>
                        </div>
                      )}
                      <button
                        onClick={() => onCompleteTicket(ticket.id)}
                        className="w-full bg-primary text-on-primary font-headline-lg-mobile text-headline-lg-mobile py-4 rounded-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined">
                          check_circle
                        </span>
                        Ready
                      </button>
                    </footer>
                  </article>
                );
              })
            ) : (
              <div className="flex items-center justify-center w-80 border-2 border-dashed border-surface-variant/30 rounded-xl h-full max-h-[calc(100vh-140px)] p-6 text-center">
                <div className="text-on-surface-variant/60">
                  <span className="material-symbols-outlined text-4xl block mb-2">restaurant</span>
                  No active orders in queue!
                </div>
              </div>
            )}

            {/* KDS Stats Column */}
            <article className="flex flex-col w-64 h-full max-h-[calc(100vh-140px)]">
              <div className="bg-surface-container dark:bg-surface-container-high rounded-xl p-4 space-y-4">
                <h3 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest text-xs">
                  Kitchen Stats
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface dark:bg-inverse-surface p-3 rounded-lg border border-surface-variant/10 text-center">
                    <p className="text-2xl font-bold text-primary">
                      {activeTickets.length}
                    </p>
                    <p className="font-label-bold text-[10px] text-on-surface-variant uppercase">
                      Active
                    </p>
                  </div>
                  <div className="bg-surface dark:bg-inverse-surface p-3 rounded-lg border border-surface-variant/10 text-center">
                    <p className="text-2xl font-bold text-error">
                      {activeTickets.filter((t) => t.type === "urgent").length}
                    </p>
                    <p className="font-label-bold text-[10px] text-on-surface-variant uppercase">
                      Urgent
                    </p>
                  </div>
                  <div className="bg-surface dark:bg-inverse-surface p-3 rounded-lg border border-surface-variant/10 text-center">
                    <p className="text-2xl font-bold text-secondary">
                      {stats.avgTime}
                    </p>
                    <p className="font-label-bold text-[10px] text-on-surface-variant uppercase">
                      Avg Time
                    </p>
                  </div>
                  <div className="bg-surface dark:bg-inverse-surface p-3 rounded-lg border border-surface-variant/10 text-center">
                    <p className="text-2xl font-bold text-tertiary">
                      {stats.completed}
                    </p>
                    <p className="font-label-bold text-[10px] text-on-surface-variant uppercase">
                      Completed
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest border-b border-surface-variant/20 pb-2 text-xs">
                    Top Items Today
                  </h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface dark:text-inverse-on-surface">
                      Burger
                    </span>
                    <span className="font-mono-data font-bold">24</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface dark:text-inverse-on-surface">
                      Risotto
                    </span>
                    <span className="font-mono-data font-bold">18</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface dark:text-inverse-on-surface">
                      Crudo
                    </span>
                    <span className="font-mono-data font-bold">14</span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Kitchen Status Bar */}
        <footer className="h-12 bg-surface-variant/10 dark:bg-surface-container-high border-t border-surface-variant/10 flex items-center px-margin-desktop justify-between shrink-0">
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">
                timer
              </span>
              <span className="font-mono-data text-body-sm text-on-surface-variant">
                Last Update: 14:30:05
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                cloud_done
              </span>
              <span className="font-label-bold text-label-bold text-on-surface-variant text-xs">
                Synced with POS-01
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => alert("KDS Summary Printed.")}
              className="flex items-center gap-2 px-4 py-1 rounded bg-tertiary text-on-tertiary font-label-bold text-label-bold hover:brightness-110 text-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print Summary
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};
