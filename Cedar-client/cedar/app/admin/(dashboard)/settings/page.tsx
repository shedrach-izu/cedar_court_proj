"use client";

import { useState } from "react";
import {
  Building2,
  Clock3,
  CreditCard,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import { toast } from "react-hot-toast";

type SettingsState = {
  hotelName: string;
  email: string;
  phone: string;
  address: string;
  checkInTime: string;
  checkOutTime: string;
  currency: string;
  taxRate: string;
  maintenanceMode: boolean;
};

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

const LABEL = `
  block
  mb-2
  text-[9px]
  font-['DM_Mono']
  text-[#8a7d6a]
  tracking-[0.18em]
  uppercase
`;

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 pb-4 border-b border-[rgba(196,149,74,0.1)]">
      <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.15)] text-[#c4954a]">
        <Icon size={16} strokeWidth={1.5} />
      </div>

      <div>
        <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
          {title}
        </h2>

        <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsState>({
    hotelName: "Cedar Court Serviced Apartments",
    email: "hello@cedarcourt.ng",
    phone: "+234 1 700 2000",
    address: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    currency: "NGN",
    taxRate: "10",
    maintenanceMode: false,
  });

  const [saving, setSaving] = useState(false);

  const set = (
    key: Exclude<keyof SettingsState, "maintenanceMode">
  ) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: event.target.value,
    }));
  };

  const toggleMaintenance = () => {
    setSettings((current) => ({
      ...current,
      maintenanceMode: !current.maintenanceMode,
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    // Mock save for now.
    await new Promise((resolve) => setTimeout(resolve, 700));

    setSaving(false);

    toast.success("Settings saved successfully.");
  };

  return (
    <div className="space-y-6">
      {/* ========================= */}
      {/* PAGE HEADER */}
      {/* ========================= */}

      <div>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center border border-[rgba(196,149,74,0.15)] text-[#c4954a]">
            <SettingsIcon size={17} strokeWidth={1.5} />
          </div>

          <div>
            <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#c4954a]">
              Administration
            </p>

            <h1 className="mt-1 font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
              Settings
            </h1>
          </div>
        </div>

        <p className="mt-3 font-['Jost'] text-sm text-[#8a7d6a]">
          Manage your property information, operations and booking settings.
        </p>
      </div>

      {/* ========================= */}
      {/* SETTINGS GRID */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ========================= */}
        {/* PROPERTY DETAILS */}
        {/* ========================= */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5 sm:p-6">
          <SectionHeader
            icon={Building2}
            title="Property Details"
            description="Basic information about Cedar Court."
          />

          <div className="mt-5 space-y-5">
            <FormField label="Property Name">
              <div className="relative">
                <Building2
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                />

                <input
                  value={settings.hotelName}
                  onChange={set("hotelName")}
                  className={`${INPUT} pl-9`}
                />
              </div>
            </FormField>

            <FormField label="Email">
              <div className="relative">
                <Mail
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                />

                <input
                  type="email"
                  value={settings.email}
                  onChange={set("email")}
                  className={`${INPUT} pl-9`}
                />
              </div>
            </FormField>

            <FormField label="Phone">
              <div className="relative">
                <Phone
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                />

                <input
                  value={settings.phone}
                  onChange={set("phone")}
                  className={`${INPUT} pl-9`}
                />
              </div>
            </FormField>

            <FormField label="Address">
              <div className="relative">
                <MapPin
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                />

                <input
                  value={settings.address}
                  onChange={set("address")}
                  className={`${INPUT} pl-9`}
                />
              </div>
            </FormField>
          </div>
        </div>

        {/* ========================= */}
        {/* OPERATIONS */}
        {/* ========================= */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5 sm:p-6">
          <SectionHeader
            icon={Clock3}
            title="Operations"
            description="Configure your property's daily operations."
          />

          <div className="mt-5 space-y-5">
            {/* CHECK IN / OUT */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Check-in Time">
                <div className="relative">
                  <Clock3
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] pointer-events-none"
                  />

                  <input
                    type="time"
                    value={settings.checkInTime}
                    onChange={set("checkInTime")}
                    className={`${INPUT} pl-9`}
                  />
                </div>
              </FormField>

              <FormField label="Check-out Time">
                <div className="relative">
                  <Clock3
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] pointer-events-none"
                  />

                  <input
                    type="time"
                    value={settings.checkOutTime}
                    onChange={set("checkOutTime")}
                    className={`${INPUT} pl-9`}
                  />
                </div>
              </FormField>
            </div>

            {/* CURRENCY */}

            <FormField label="Currency">
              <div className="relative">
                <CreditCard
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] pointer-events-none"
                />

                <select
                  value={settings.currency}
                  onChange={set("currency")}
                  className={`${INPUT} pl-9 appearance-none cursor-pointer`}
                >
                  <option value="NGN">NGN — Nigerian Naira</option>
                  <option value="USD">USD — US Dollar</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="EUR">EUR — Euro</option>
                </select>
              </div>
            </FormField>

            {/* SERVICE CHARGE */}

            <FormField label="Service Charge (%)">
              <input
                type="number"
                min="0"
                max="100"
                value={settings.taxRate}
                onChange={set("taxRate")}
                className={INPUT}
              />
            </FormField>

            {/* MAINTENANCE */}

            <div className="pt-4 border-t border-[rgba(196,149,74,0.1)]">
              <div className="flex items-center justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck
                      size={14}
                      className={
                        settings.maintenanceMode
                          ? "text-[#c4954a]"
                          : "text-[#8a7d6a]"
                      }
                    />

                    <p className="text-sm font-['Jost'] text-[#ede4d4]">
                      Maintenance Mode
                    </p>
                  </div>

                  <p className="mt-1 text-xs font-['DM_Mono'] text-[#8a7d6a] leading-relaxed">
                    Disable new bookings while maintenance is active.
                  </p>
                </div>

                {/* TOGGLE */}

                <button
                  type="button"
                  onClick={toggleMaintenance}
                  aria-label="Toggle maintenance mode"
                  aria-pressed={settings.maintenanceMode}
                  className={`
                    relative
                    w-12
                    h-6
                    shrink-0
                    border
                    transition-all
                    duration-200
                    ${
                      settings.maintenanceMode
                        ? "bg-[rgba(196,149,74,0.15)] border-[#c4954a]"
                        : "bg-transparent border-[rgba(196,149,74,0.2)]"
                    }
                  `}
                >
                  <span
                    className={`
                      absolute
                      top-1/2
                      -translate-y-1/2
                      w-4
                      h-4
                      transition-all
                      duration-200
                      ${
                        settings.maintenanceMode
                          ? "left-[26px] bg-[#c4954a]"
                          : "left-1 bg-[#8a7d6a]"
                      }
                    `}
                  />
                </button>
              </div>

              {/* WARNING */}

              {settings.maintenanceMode && (
                <div className="mt-4 px-3 py-2.5 border border-[rgba(196,149,74,0.15)] bg-[rgba(196,149,74,0.04)]">
                  <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.12em] text-[#c4954a]">
                    Maintenance mode is active
                  </p>

                  <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
                    Guests will not be able to create new apartment bookings.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* SAVE AREA */}
      {/* ========================= */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
            Configuration
          </p>

          <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
            Changes are currently stored locally.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            px-7
            py-3.5
            bg-[#c4954a]
            text-[#0c0a08]
            font-['DM_Mono']
            text-[9px]
            tracking-[0.15em]
            uppercase
            hover:bg-[#d4a55b]
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition-colors
          "
        >
          <Save size={14} />

          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
}