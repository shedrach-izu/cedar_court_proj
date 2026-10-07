"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Users,
  Crown,
  Wallet,
  CalendarDays,
  X,
} from "lucide-react";

type GuestTier = "Platinum" | "Gold" | "Silver";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  nationality: string;
  stays: number;
  total: number;
  tier: GuestTier;
  lastStay: string;
  joined: string;
}

const INPUT = `
  w-full
  bg-[#0c0a08]
  border
  border-[rgba(196,149,74,0.15)]
  px-3 py-2.5
  text-sm
  font-['Jost']
  text-[#ede4d4]
  outline-none
  transition-colors
  focus:border-[rgba(196,149,74,0.5)]
  placeholder:text-[#8a7d6a]/50
`;

const mockGuests: Guest[] = [
  {
    id: "GST-001",
    name: "Daniel Okafor",
    email: "daniel.okafor@email.com",
    phone: "+234 803 456 7890",
    nationality: "Nigerian",
    stays: 12,
    total: 4850000,
    tier: "Platinum",
    lastStay: "Oct 04, 2026",
    joined: "Jan 12, 2025",
  },
  {
    id: "GST-002",
    name: "Amelia Williams",
    email: "amelia.williams@email.com",
    phone: "+44 7700 900123",
    nationality: "British",
    stays: 8,
    total: 2950000,
    tier: "Gold",
    lastStay: "Sep 28, 2026",
    joined: "Mar 21, 2025",
  },
  {
    id: "GST-003",
    name: "Chinedu Eze",
    email: "chinedu.eze@email.com",
    phone: "+234 806 123 4567",
    nationality: "Nigerian",
    stays: 6,
    total: 1850000,
    tier: "Gold",
    lastStay: "Sep 19, 2026",
    joined: "May 08, 2025",
  },
  {
    id: "GST-004",
    name: "Sophia Anderson",
    email: "sophia.anderson@email.com",
    phone: "+1 202 555 0198",
    nationality: "American",
    stays: 3,
    total: 920000,
    tier: "Silver",
    lastStay: "Aug 30, 2026",
    joined: "Jul 14, 2026",
  },
  {
    id: "GST-005",
    name: "Ibrahim Musa",
    email: "ibrahim.musa@email.com",
    phone: "+234 809 987 6543",
    nationality: "Nigerian",
    stays: 9,
    total: 3400000,
    tier: "Platinum",
    lastStay: "Aug 22, 2026",
    joined: "Feb 03, 2025",
  },
  {
    id: "GST-006",
    name: "Grace Thompson",
    email: "grace.thompson@email.com",
    phone: "+1 415 555 0182",
    nationality: "American",
    stays: 5,
    total: 1420000,
    tier: "Silver",
    lastStay: "Aug 11, 2026",
    joined: "Apr 17, 2026",
  },
];

function TierBadge({ tier }: { tier: GuestTier }) {
  const tierStyles: Record<GuestTier, string> = {
    Platinum:
      "text-[#ede4d4] border-[#ede4d4]/30 bg-[#ede4d4]/5",
    Gold:
      "text-[#c4954a] border-[rgba(196,149,74,0.35)] bg-[rgba(196,149,74,0.05)]",
    Silver:
      "text-[#8a7d6a] border-[#8a7d6a]/30 bg-[#8a7d6a]/5",
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-2.5 py-1
        border
        text-[9px]
        tracking-[0.12em]
        uppercase
        ${tierStyles[tier]}
      `}
    >
      {tier}
    </span>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#8a7d6a]">
            {label}
          </p>

          <h3 className="mt-2 font-['Fraunces'] text-2xl text-[#ede4d4]">
            {value}
          </h3>

          <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
            {description}
          </p>
        </div>

        <div className="w-9 h-9 flex items-center justify-center border border-[rgba(196,149,74,0.15)] text-[#c4954a]">
          <Icon size={17} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

export default function GuestsPage() {
  const [guests] = useState<Guest[]>(mockGuests);
  const [search, setSearch] = useState("");
  const [viewGuest, setViewGuest] = useState<Guest | null>(null);

  const filteredGuests = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return guests;

    return guests.filter(
      (guest) =>
        guest.name.toLowerCase().includes(query) ||
        guest.email.toLowerCase().includes(query) ||
        guest.id.toLowerCase().includes(query)
    );
  }, [guests, search]);

  const totalSpend = guests.reduce(
    (sum, guest) => sum + guest.total,
    0
  );

  const totalStays = guests.reduce(
    (sum, guest) => sum + guest.stays,
    0
  );

  const platinumGuests = guests.filter(
    (guest) => guest.tier === "Platinum"
  ).length;

  return (
    <div className="space-y-6">
      {/* ========================= */}
      {/* PAGE HEADER */}
      {/* ========================= */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#c4954a]">
            Guest Management
          </p>

          <h1 className="mt-1 font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Guests
          </h1>

          <p className="mt-1 font-['Jost'] text-sm text-[#8a7d6a]">
            Manage guest profiles, stays and spending history.
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full sm:w-72">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guests..."
            className={`${INPUT} pl-9 text-xs`}
          />
        </div>
      </div>

      {/* ========================= */}
      {/* STATS */}
      {/* ========================= */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Guests"
          value={guests.length.toString()}
          description="Registered guests"
        />

        <StatCard
          icon={CalendarDays}
          label="Total Stays"
          value={totalStays.toString()}
          description="Completed stays"
        />

        <StatCard
          icon={Wallet}
          label="Guest Spend"
          value={`₦${(totalSpend / 1000000).toFixed(1)}M`}
          description="Lifetime spending"
        />

        <StatCard
          icon={Crown}
          label="Platinum Guests"
          value={platinumGuests.toString()}
          description="Highest tier members"
        />
      </div>

      {/* ========================= */}
      {/* GUEST TABLE */}
      {/* ========================= */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">
        {/* TABLE HEADER */}
        <div className="px-5 py-4 border-b border-[rgba(196,149,74,0.1)] flex items-center justify-between">
          <div>
            <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
              Guest Directory
            </h2>

            <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
              {filteredGuests.length}{" "}
              {filteredGuests.length === 1 ? "guest" : "guests"} found
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-xs font-['DM_Mono']">
            <thead>
              <tr className="border-b border-[rgba(196,149,74,0.1)]">
                {[
                  "Guest",
                  "Email",
                  "Stays",
                  "Total Spend",
                  "Tier",
                  "Last Stay",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-left py-3 px-4 text-[9px] text-[#8a7d6a] tracking-[0.15em] uppercase font-normal"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredGuests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)] transition-colors"
                >
                  {/* NAME */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08] text-[#c4954a] font-['Fraunces']">
                        {guest.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="text-[#ede4d4]">
                          {guest.name}
                        </p>

                        <p className="mt-0.5 text-[9px] text-[#8a7d6a]">
                          {guest.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* EMAIL */}
                  <td className="py-4 px-4 text-[#8a7d6a]">
                    {guest.email}
                  </td>

                  {/* STAYS */}
                  <td className="py-4 px-4 text-[#ede4d4]">
                    {guest.stays}
                  </td>

                  {/* TOTAL */}
                  <td className="py-4 px-4 text-[#c4954a]">
                    ₦{guest.total.toLocaleString()}
                  </td>

                  {/* TIER */}
                  <td className="py-4 px-4">
                    <TierBadge tier={guest.tier} />
                  </td>

                  {/* LAST STAY */}
                  <td className="py-4 px-4 text-[#8a7d6a]">
                    {guest.lastStay}
                  </td>

                  {/* ACTION */}
                  <td className="py-4 px-4">
                    <button
                      onClick={() => setViewGuest(guest)}
                      className="w-8 h-8 flex items-center justify-center border border-transparent text-[#8a7d6a] hover:border-[rgba(196,149,74,0.2)] hover:text-[#c4954a] transition-colors"
                      title="View guest"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPTY STATE */}
        {filteredGuests.length === 0 && (
          <div className="py-16 text-center">
            <Users
              size={28}
              strokeWidth={1}
              className="mx-auto text-[#8a7d6a]"
            />

            <p className="mt-3 font-['Fraunces'] text-lg text-[#ede4d4]">
              No guests found
            </p>

            <p className="mt-1 font-['Jost'] text-sm text-[#8a7d6a]">
              Try searching with another name or email.
            </p>
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* GUEST DETAILS MODAL */}
      {/* ========================= */}

      {viewGuest && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75"
          onClick={() => setViewGuest(null)}
        >
          <div
            className="w-full max-w-lg bg-[#161310] border border-[rgba(196,149,74,0.15)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="px-5 py-4 border-b border-[rgba(196,149,74,0.1)] flex items-center justify-between">
              <div>
                <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#c4954a]">
                  Guest Profile
                </p>

                <h2 className="mt-1 font-['Fraunces'] text-xl text-[#ede4d4]">
                  {viewGuest.name}
                </h2>
              </div>

              <button
                onClick={() => setViewGuest(null)}
                className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"
              >
                <X size={17} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="p-5">
              {/* PROFILE TOP */}
              <div className="flex items-center gap-4 pb-5 border-b border-[rgba(196,149,74,0.08)]">
                <div className="w-14 h-14 flex items-center justify-center bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] text-[#c4954a] font-['Fraunces'] text-xl">
                  {viewGuest.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                    {viewGuest.name}
                  </h3>

                  <p className="font-['Jost'] text-xs text-[#8a7d6a]">
                    {viewGuest.email}
                  </p>

                  <div className="mt-2">
                    <TierBadge tier={viewGuest.tier} />
                  </div>
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-5 space-y-3">
                <DetailRow label="Guest ID" value={viewGuest.id} />
                <DetailRow label="Phone" value={viewGuest.phone} />
                <DetailRow
                  label="Nationality"
                  value={viewGuest.nationality}
                />
                <DetailRow
                  label="Total Stays"
                  value={viewGuest.stays.toString()}
                />
                <DetailRow
                  label="Total Spend"
                  value={`₦${viewGuest.total.toLocaleString()}`}
                  highlight
                />
                <DetailRow
                  label="Last Stay"
                  value={viewGuest.lastStay}
                />
                <DetailRow
                  label="Member Since"
                  value={viewGuest.joined}
                />
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="px-5 py-4 border-t border-[rgba(196,149,74,0.1)] flex justify-end">
              <button
                onClick={() => setViewGuest(null)}
                className="
                  px-5 py-2.5
                  border border-[rgba(196,149,74,0.25)]
                  text-[#c4954a]
                  font-['DM_Mono']
                  text-[9px]
                  tracking-[0.15em]
                  uppercase
                  hover:bg-[rgba(196,149,74,0.08)]
                  transition-colors
                "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[rgba(196,149,74,0.06)] pb-3">
      <span className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
        {label}
      </span>

      <span
        className={`font-['Jost'] text-sm text-right ${
          highlight ? "text-[#c4954a]" : "text-[#ede4d4]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}