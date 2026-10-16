
"use client";

import { useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  Search,
  Download,
  Mail,
  CalendarDays,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-hot-toast";

type SubscriberStatus = "active" | "unsubscribed";

type Subscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  status: SubscriberStatus;
};

type FilterStatus = "all" | SubscriberStatus;

const initialSubscribers: Subscriber[] = [
  {
    id: "SUB-1001",
    email: "ada@example.com",
    subscribedAt: "2026-10-12T10:30:00.000Z",
    status: "active",
  },
  {
    id: "SUB-1002",
    email: "chidi@example.com",
    subscribedAt: "2026-10-11T14:15:00.000Z",
    status: "active",
  },
  {
    id: "SUB-1003",
    email: "amara@example.com",
    subscribedAt: "2026-10-09T09:00:00.000Z",
    status: "unsubscribed",
  },
  {
    id: "SUB-1004",
    email: "emeka@example.com",
    subscribedAt: "2026-10-07T16:45:00.000Z",
    status: "active",
  },
  {
    id: "SUB-1005",
    email: "zara@example.com",
    subscribedAt: "2026-10-04T11:20:00.000Z",
    status: "active",
  },
];

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const NewsletterPage = () => {
  const [subscribers, setSubscribers] =
    useState<Subscriber[]>(initialSubscribers);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  const activeCount = subscribers.filter(
    (subscriber) => subscriber.status === "active"
  ).length;

  const unsubscribedCount = subscribers.filter(
    (subscriber) => subscriber.status === "unsubscribed"
  ).length;

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const matchesSearch = subscriber.email
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" || subscriber.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [subscribers, search, filter]);

  const toggleStatus = (id: string) => {
    setSubscribers((current) =>
      current.map((subscriber) =>
        subscriber.id === id
          ? {
              ...subscriber,
              status:
                subscriber.status === "active"
                  ? "unsubscribed"
                  : "active",
            }
          : subscriber
      )
    );

    const subscriber = subscribers.find((item) => item.id === id);

    if (subscriber) {
      toast.success(
        subscriber.status === "active"
          ? "Subscriber marked as unsubscribed"
          : "Subscriber reactivated"
      );
    }
  };

  const exportCSV = () => {
    if (filteredSubscribers.length === 0) {
      toast.error("There are no subscribers to export");
      return;
    }

    const escapeCSV = (value: string) =>
      `"${value.replace(/"/g, '""')}"`;

    const rows = [
      ["Subscriber ID", "Email", "Subscribed Date", "Status"],
      ...filteredSubscribers.map((subscriber) => [
        subscriber.id,
        subscriber.email,
        formatDate(subscriber.subscribedAt),
        subscriber.status,
      ]),
    ];

    const csv = rows
      .map((row) => row.map(escapeCSV).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "cedar-court-subscribers.csv";
    link.click();

    URL.revokeObjectURL(url);
    toast.success("Subscriber list exported");
  };

  const stats = [
    {
      label: "Total Subscribers",
      value: subscribers.length,
      icon: Users,
      description: "All recorded subscribers",
    },
    {
      label: "Active Subscribers",
      value: activeCount,
      icon: UserCheck,
      description: "Currently subscribed",
    },
    {
      label: "Unsubscribed",
      value: unsubscribedCount,
      icon: UserX,
      description: "No longer subscribed",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0c0a08] text-[#ede4d4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="max-w-[1500px] mx-auto space-y-8">
        {/* PAGE HEADER */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-6 bg-[#c4954a]" />
              <span className="font-['DM_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#c4954a]">
                Guest Relations
              </span>
            </div>

            <h1 className="font-['Fraunces'] text-3xl sm:text-4xl">
              Newsletter
            </h1>

            <p className="font-['Jost'] text-sm text-[#8a7d6a] mt-2">
              Manage your Cedar Circle email subscribers.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-xs tracking-widest uppercase hover:bg-[#d4a55a] transition-colors"
          >
            <Download size={16} />
            Export CSV
          </button>
        </div>

        {/* STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-['Jost'] text-sm text-[#8a7d6a]">
                      {stat.label}
                    </p>

                    <p className="font-['Fraunces'] text-3xl mt-3">
                      {stat.value.toLocaleString()}
                    </p>

                    <p className="font-['Jost'] text-xs text-[#8a7d6a] mt-2">
                      {stat.description}
                    </p>
                  </div>

                  <div className="p-3 border border-[rgba(196,149,74,0.2)] bg-[rgba(196,149,74,0.06)]">
                    <Icon size={21} className="text-[#c4954a]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUBSCRIBERS SECTION */}
        <section className="bg-[#161310] border border-[rgba(196,149,74,0.15)]">
          <div className="p-5 sm:p-6 border-b border-[rgba(196,149,74,0.1)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-['Fraunces'] text-xl">
                  Subscriber Directory
                </h2>

                <p className="text-xs text-[#8a7d6a] font-['Jost'] mt-1">
                  {filteredSubscribers.length} subscriber
                  {filteredSubscribers.length === 1 ? "" : "s"} displayed
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 sm:min-w-[260px]">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                  />

                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by email..."
                    className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] pl-10 pr-4 py-3 text-sm font-['Jost'] text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
                  />
                </div>

                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(event.target.value as FilterStatus)
                  }
                  className="bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] focus:outline-none focus:border-[#c4954a]"
                  aria-label="Filter subscribers by status"
                >
                  <option value="all">All subscribers</option>
                  <option value="active">Active</option>
                  <option value="unsubscribed">Unsubscribed</option>
                </select>
              </div>
            </div>
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[rgba(196,149,74,0.1)] bg-[#0c0a08]/50">
                  {["Subscriber", "Subscription Date", "Status", "Action"].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#8a7d6a] font-normal"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredSubscribers.map((subscriber) => (
                  <tr
                    key={subscriber.id}
                    className="border-b border-[rgba(196,149,74,0.07)] hover:bg-[rgba(196,149,74,0.025)] transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08]">
                          <Mail size={17} className="text-[#c4954a]" />
                        </div>

                        <div>
                          <p className="text-sm font-['Jost']">
                            {subscriber.email}
                          </p>
                          <p className="text-[10px] text-[#8a7d6a] mt-1">
                            {subscriber.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#8a7d6a]">
                        <CalendarDays size={15} />
                        {formatDate(subscriber.subscribedAt)}
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs capitalize border ${
                          subscriber.status === "active"
                            ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
                            : "border-white/10 bg-white/[0.03] text-[#8a7d6a]"
                        }`}
                      >
                        {subscriber.status === "active" ? (
                          <CheckCircle2 size={13} />
                        ) : (
                          <XCircle size={13} />
                        )}
                        {subscriber.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button
                        type="button"
                        onClick={() => toggleStatus(subscriber.id)}
                        className="inline-flex items-center gap-2 text-xs font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"
                      >
                        {subscriber.status === "active" ? (
                          <>
                            <UserX size={15} />
                            Unsubscribe
                          </>
                        ) : (
                          <>
                            <RotateCcw size={15} />
                            Reactivate
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredSubscribers.length === 0 && (
              <div className="py-16 text-center">
                <Users
                  size={30}
                  className="mx-auto text-[#8a7d6a] mb-3"
                />
                <p className="font-['Fraunces'] text-lg">
                  No subscribers found
                </p>
                <p className="text-sm text-[#8a7d6a] mt-2">
                  Try a different search or filter.
                </p>
              </div>
            )}
          </div>

          {/* MOBILE SUBSCRIBER CARDS */}
          <div className="md:hidden divide-y divide-[rgba(196,149,74,0.08)]">
            {filteredSubscribers.map((subscriber) => (
              <div key={subscriber.id} className="p-4 sm:p-5 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08]">
                    <Mail size={17} className="text-[#c4954a]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm break-all font-['Jost']">
                      {subscriber.email}
                    </p>
                    <p className="text-[10px] text-[#8a7d6a] mt-1">
                      {subscriber.id}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-[10px] px-2 py-1 capitalize border ${
                      subscriber.status === "active"
                        ? "border-emerald-500/20 text-emerald-400"
                        : "border-white/10 text-[#8a7d6a]"
                    }`}
                  >
                    {subscriber.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#8a7d6a]">
                  <CalendarDays size={14} />
                  Subscribed {formatDate(subscriber.subscribedAt)}
                </div>

                <button
                  type="button"
                  onClick={() => toggleStatus(subscriber.id)}
                  className="w-full min-h-10 flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.2)] text-xs text-[#c4954a] hover:bg-[rgba(196,149,74,0.06)] transition-colors"
                >
                  {subscriber.status === "active" ? (
                    <>
                      <UserX size={15} />
                      Unsubscribe
                    </>
                  ) : (
                    <>
                      <RotateCcw size={15} />
                      Reactivate
                    </>
                  )}
                </button>
              </div>
            ))}

            {filteredSubscribers.length === 0 && (
              <div className="py-12 px-4 text-center">
                <Users
                  size={28}
                  className="mx-auto text-[#8a7d6a] mb-3"
                />
                <p className="font-['Fraunces'] text-lg">
                  No subscribers found
                </p>
                <p className="text-sm text-[#8a7d6a] mt-2">
                  Try a different search or filter.
                </p>
              </div>
            )}
          </div>

          {/* TABLE FOOTER */}
          <div className="px-5 sm:px-6 py-4 border-t border-[rgba(196,149,74,0.1)] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p className="text-xs text-[#8a7d6a] font-['Jost']">
              Showing {filteredSubscribers.length} of {subscribers.length} subscribers
            </p>

            <p className="text-[10px] text-[#8a7d6a] font-['DM_Mono'] uppercase tracking-wider">
              Cedar Circle
            </p>
          </div>
        </section>

        {/* FRONTEND-ONLY NOTICE */}
        <p className="text-xs leading-relaxed text-[#8a7d6a]">
          Preview mode: subscriber records are mock data. Status changes only
          affect the current page session and are not saved to the database.
        </p>
      </div>
    </main>
  );
};

export default NewsletterPage;
