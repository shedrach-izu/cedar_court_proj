// "use client";

// import { useState } from "react";
// import {
//   Building2,
//   Clock3,
//   CreditCard,
//   Save,
//   Settings as SettingsIcon,
//   ShieldCheck,
//   MapPin,
//   Mail,
//   Phone,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// type SettingsState = {
//   hotelName: string;
//   email: string;
//   phone: string;
//   address: string;
//   checkInTime: string;
//   checkOutTime: string;
//   currency: string;
//   taxRate: string;
//   maintenanceMode: boolean;
// };

// const INPUT = `
//   w-full
//   bg-[#0c0a08]
//   border
//   border-[rgba(196,149,74,0.15)]
//   px-3 py-2.5
//   text-sm
//   font-['Jost']
//   text-[#ede4d4]
//   outline-none
//   transition-colors
//   focus:border-[rgba(196,149,74,0.5)]
//   placeholder:text-[#8a7d6a]/50
// `;

// const LABEL = `
//   block
//   mb-2
//   text-[9px]
//   font-['DM_Mono']
//   text-[#8a7d6a]
//   tracking-[0.18em]
//   uppercase
// `;

// function FormField({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <label className={LABEL}>{label}</label>
//       {children}
//     </div>
//   );
// }

// function SectionHeader({
//   icon: Icon,
//   title,
//   description,
// }: {
//   icon: React.ElementType;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="flex items-start gap-3 pb-4 border-b border-[rgba(196,149,74,0.1)]">
//       <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.15)] text-[#c4954a]">
//         <Icon size={16} strokeWidth={1.5} />
//       </div>

//       <div>
//         <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
//           {title}
//         </h2>

//         <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default function SettingsPage() {
//   const [settings, setSettings] = useState<SettingsState>({
//     hotelName: "Cedar Court Serviced Apartments",
//     email: "hello@cedarcourt.ng",
//     phone: "+234 1 700 2000",
//     address: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria",
//     checkInTime: "14:00",
//     checkOutTime: "12:00",
//     currency: "NGN",
//     taxRate: "10",
//     maintenanceMode: false,
//   });

//   const [saving, setSaving] = useState(false);

//   const set = (
//     key: Exclude<keyof SettingsState, "maintenanceMode">
//   ) => (
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setSettings((current) => ({
//       ...current,
//       [key]: event.target.value,
//     }));
//   };

//   const toggleMaintenance = () => {
//     setSettings((current) => ({
//       ...current,
//       maintenanceMode: !current.maintenanceMode,
//     }));
//   };

//   const handleSave = async () => {
//     setSaving(true);

//     // Mock save for now.
//     await new Promise((resolve) => setTimeout(resolve, 700));

//     setSaving(false);

//     toast.success("Settings saved successfully.");
//   };

//   return (
//     <div className="space-y-6">
//       {/* ========================= */}
//       {/* PAGE HEADER */}
//       {/* ========================= */}

//       <div>
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 flex items-center justify-center border border-[rgba(196,149,74,0.15)] text-[#c4954a]">
//             <SettingsIcon size={17} strokeWidth={1.5} />
//           </div>

//           <div>
//             <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#c4954a]">
//               Administration
//             </p>

//             <h1 className="mt-1 font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//               Settings
//             </h1>
//           </div>
//         </div>

//         <p className="mt-3 font-['Jost'] text-sm text-[#8a7d6a]">
//           Manage your property information, operations and booking settings.
//         </p>
//       </div>

//       {/* ========================= */}
//       {/* SETTINGS GRID */}
//       {/* ========================= */}

//       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//         {/* ========================= */}
//         {/* PROPERTY DETAILS */}
//         {/* ========================= */}

//         <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5 sm:p-6">
//           <SectionHeader
//             icon={Building2}
//             title="Property Details"
//             description="Basic information about Cedar Court."
//           />

//           <div className="mt-5 space-y-5">
//             <FormField label="Property Name">
//               <div className="relative">
//                 <Building2
//                   size={14}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
//                 />

//                 <input
//                   value={settings.hotelName}
//                   onChange={set("hotelName")}
//                   className={`${INPUT} pl-9`}
//                 />
//               </div>
//             </FormField>

//             <FormField label="Email">
//               <div className="relative">
//                 <Mail
//                   size={14}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
//                 />

//                 <input
//                   type="email"
//                   value={settings.email}
//                   onChange={set("email")}
//                   className={`${INPUT} pl-9`}
//                 />
//               </div>
//             </FormField>

//             <FormField label="Phone">
//               <div className="relative">
//                 <Phone
//                   size={14}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
//                 />

//                 <input
//                   value={settings.phone}
//                   onChange={set("phone")}
//                   className={`${INPUT} pl-9`}
//                 />
//               </div>
//             </FormField>

//             <FormField label="Address">
//               <div className="relative">
//                 <MapPin
//                   size={14}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
//                 />

//                 <input
//                   value={settings.address}
//                   onChange={set("address")}
//                   className={`${INPUT} pl-9`}
//                 />
//               </div>
//             </FormField>
//           </div>
//         </div>

//         {/* ========================= */}
//         {/* OPERATIONS */}
//         {/* ========================= */}

//         <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5 sm:p-6">
//           <SectionHeader
//             icon={Clock3}
//             title="Operations"
//             description="Configure your property's daily operations."
//           />

//           <div className="mt-5 space-y-5">
//             {/* CHECK IN / OUT */}

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <FormField label="Check-in Time">
//                 <div className="relative">
//                   <Clock3
//                     size={14}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] pointer-events-none"
//                   />

//                   <input
//                     type="time"
//                     value={settings.checkInTime}
//                     onChange={set("checkInTime")}
//                     className={`${INPUT} pl-9`}
//                   />
//                 </div>
//               </FormField>

//               <FormField label="Check-out Time">
//                 <div className="relative">
//                   <Clock3
//                     size={14}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] pointer-events-none"
//                   />

//                   <input
//                     type="time"
//                     value={settings.checkOutTime}
//                     onChange={set("checkOutTime")}
//                     className={`${INPUT} pl-9`}
//                   />
//                 </div>
//               </FormField>
//             </div>

//             {/* CURRENCY */}

//             <FormField label="Currency">
//               <div className="relative">
//                 <CreditCard
//                   size={14}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] pointer-events-none"
//                 />

//                 <select
//                   value={settings.currency}
//                   onChange={set("currency")}
//                   className={`${INPUT} pl-9 appearance-none cursor-pointer`}
//                 >
//                   <option value="NGN">NGN — Nigerian Naira</option>
//                   <option value="USD">USD — US Dollar</option>
//                   <option value="GBP">GBP — British Pound</option>
//                   <option value="EUR">EUR — Euro</option>
//                 </select>
//               </div>
//             </FormField>

//             {/* SERVICE CHARGE */}

//             <FormField label="Service Charge (%)">
//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 value={settings.taxRate}
//                 onChange={set("taxRate")}
//                 className={INPUT}
//               />
//             </FormField>

//             {/* MAINTENANCE */}

//             <div className="pt-4 border-t border-[rgba(196,149,74,0.1)]">
//               <div className="flex items-center justify-between gap-5">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <ShieldCheck
//                       size={14}
//                       className={
//                         settings.maintenanceMode
//                           ? "text-[#c4954a]"
//                           : "text-[#8a7d6a]"
//                       }
//                     />

//                     <p className="text-sm font-['Jost'] text-[#ede4d4]">
//                       Maintenance Mode
//                     </p>
//                   </div>

//                   <p className="mt-1 text-xs font-['DM_Mono'] text-[#8a7d6a] leading-relaxed">
//                     Disable new bookings while maintenance is active.
//                   </p>
//                 </div>

//                 {/* TOGGLE */}

//                 <button
//                   type="button"
//                   onClick={toggleMaintenance}
//                   aria-label="Toggle maintenance mode"
//                   aria-pressed={settings.maintenanceMode}
//                   className={`
//                     relative
//                     w-12
//                     h-6
//                     shrink-0
//                     border
//                     transition-all
//                     duration-200
//                     ${
//                       settings.maintenanceMode
//                         ? "bg-[rgba(196,149,74,0.15)] border-[#c4954a]"
//                         : "bg-transparent border-[rgba(196,149,74,0.2)]"
//                     }
//                   `}
//                 >
//                   <span
//                     className={`
//                       absolute
//                       top-1/2
//                       -translate-y-1/2
//                       w-4
//                       h-4
//                       transition-all
//                       duration-200
//                       ${
//                         settings.maintenanceMode
//                           ? "left-[26px] bg-[#c4954a]"
//                           : "left-1 bg-[#8a7d6a]"
//                       }
//                     `}
//                   />
//                 </button>
//               </div>

//               {/* WARNING */}

//               {settings.maintenanceMode && (
//                 <div className="mt-4 px-3 py-2.5 border border-[rgba(196,149,74,0.15)] bg-[rgba(196,149,74,0.04)]">
//                   <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.12em] text-[#c4954a]">
//                     Maintenance mode is active
//                   </p>

//                   <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
//                     Guests will not be able to create new apartment bookings.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ========================= */}
//       {/* SAVE AREA */}
//       {/* ========================= */}

//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
//         <div>
//           <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
//             Configuration
//           </p>

//           <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
//             Changes are currently stored locally.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={handleSave}
//           disabled={saving}
//           className="
//             inline-flex
//             items-center
//             justify-center
//             gap-2
//             px-7
//             py-3.5
//             bg-[#c4954a]
//             text-[#0c0a08]
//             font-['DM_Mono']
//             text-[9px]
//             tracking-[0.15em]
//             uppercase
//             hover:bg-[#d4a55b]
//             disabled:opacity-60
//             disabled:cursor-not-allowed
//             transition-colors
//           "
//         >
//           <Save size={14} />

//           {saving ? "Saving..." : "Save Settings"}
//         </button>
//       </div>
//     </div>
//   );
// }











"use client";

import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Building2,
  Clock3,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ShieldCheck,
  Save,
  LoaderCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

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

const DEFAULT_SETTINGS: SettingsState = {
  hotelName: "Cedar Court Serviced Apartments",
  email: "hello@cedarcourt.ng",
  phone: "+234 1 700 2000",
  address: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  currency: "NGN",
  taxRate: "10",
  maintenanceMode: false,
};

const INPUT_CLASS =
  "w-full min-w-0 bg-[#0c0a08] border border-[rgba(196,149,74,0.16)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] outline-none transition-colors focus:border-[#c4954a] disabled:opacity-50";

const LABEL_CLASS =
  "mb-2 block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#8a7d6a]";

type SettingsResponse = {
  settings?: Partial<SettingsState>;
  message?: string;
};

function SettingsPage() {
  const [settings, setSettings] =
    useState<SettingsState>(DEFAULT_SETTINGS);

  const [loadingSettings, setLoadingSettings] = useState(true);
  const [saving, setSaving] = useState(false);

  // Load saved settings from MongoDB when the page opens.
  useEffect(() => {
    let active = true;

    const fetchSettings = async () => {
      try {
        const response = await api.get<SettingsResponse>("/settings");

        const data = response.data.settings ?? response.data;

        if (!active) return;

        setSettings({
          hotelName: data.hotelName ?? DEFAULT_SETTINGS.hotelName,
          email: data.email ?? DEFAULT_SETTINGS.email,
          phone: data.phone ?? DEFAULT_SETTINGS.phone,
          address: data.address ?? DEFAULT_SETTINGS.address,
          checkInTime:
            data.checkInTime ?? DEFAULT_SETTINGS.checkInTime,
          checkOutTime:
            data.checkOutTime ?? DEFAULT_SETTINGS.checkOutTime,
          currency: data.currency ?? DEFAULT_SETTINGS.currency,
          taxRate: String(data.taxRate ?? DEFAULT_SETTINGS.taxRate),
          maintenanceMode:
            data.maintenanceMode ?? DEFAULT_SETTINGS.maintenanceMode,
        });
      } catch (error) {
        console.error("Failed to fetch settings:", error);

        if (active) {
          toast.error("Could not load saved settings.");
        }
      } finally {
        if (active) {
          setLoadingSettings(false);
        }
      }
    };

    fetchSettings();

    return () => {
      active = false;
    };
  }, []);

  const updateField = <K extends keyof SettingsState>(
    field: K,
    value: SettingsState[K]
  ) => {
    setSettings((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // Save the current form values through the settings API.
  const handleSave = async () => {
    if (saving || loadingSettings) return;

    try {
      setSaving(true);

      const payload = {
        ...settings,
        taxRate: Number(settings.taxRate),
      };

      const response = await api.put<SettingsResponse>(
        "/settings",
        payload
      );

      const saved = response.data.settings;

      if (saved) {
        setSettings({
          hotelName: saved.hotelName ?? settings.hotelName,
          email: saved.email ?? settings.email,
          phone: saved.phone ?? settings.phone,
          address: saved.address ?? settings.address,
          checkInTime: saved.checkInTime ?? settings.checkInTime,
          checkOutTime: saved.checkOutTime ?? settings.checkOutTime,
          currency: saved.currency ?? settings.currency,
          taxRate: String(saved.taxRate ?? settings.taxRate),
          maintenanceMode:
            saved.maintenanceMode ?? settings.maintenanceMode,
        });
      }

      toast.success(
        response.data.message || "Settings saved successfully."
      );
    } catch (error: unknown) {
      console.error("Failed to save settings:", error);

      let message = "Unable to save settings. Please try again.";

      if (
        error &&
        typeof error === "object" &&
        "response" in error
      ) {
        const response = (
          error as {
            response?: {
              data?: { message?: string };
            };
          }
        ).response;

        message = response?.data?.message || message;
      }

      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const SectionHeading = ({
    icon,
    title,
    description,
  }: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }) => (
    <div className="mb-6 flex items-start gap-3 border-b border-[rgba(196,149,74,0.12)] pb-5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(196,149,74,0.18)] text-[#c4954a]">
        {icon}
      </div>

      <div>
        <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
          {title}
        </h2>
        <p className="mt-1 text-xs font-['Jost'] text-[#8a7d6a]">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0c0a08] px-5 py-8 text-[#ede4d4] md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1450px]">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-[rgba(196,149,74,0.2)] text-[#c4954a]">
              <SettingsIcon size={17} />
            </div>

            <div>
              <p className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#c4954a]">
                Administration
              </p>
              <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">
                Settings
              </h1>
            </div>
          </div>

          <p className="text-sm font-['Jost'] text-[#8a7d6a]">
            Manage your property information, operations and booking
            settings.
          </p>
        </div>

        {loadingSettings && (
          <div className="mb-5 flex items-center gap-2 text-xs text-[#c4954a]">
            <LoaderCircle size={15} className="animate-spin" />
            Loading saved property settings...
          </div>
        )}

        {/* SETTINGS CARDS */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
          {/* PROPERTY DETAILS */}
          <section className="border border-[rgba(196,149,74,0.13)] bg-[#161310] p-5 sm:p-6">
            <SectionHeading
              icon={<Building2 size={17} />}
              title="Property Details"
              description="Basic information about Cedar Court."
            />

            <div className="space-y-5">
              <div>
                <label className={LABEL_CLASS} htmlFor="hotelName">
                  Property Name
                </label>
                <div className="relative">
                  <Building2
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                  />
                  <input
                    id="hotelName"
                    value={settings.hotelName}
                    onChange={(e) =>
                      updateField("hotelName", e.target.value)
                    }
                    disabled={loadingSettings || saving}
                    className={`${INPUT_CLASS} pl-9`}
                    placeholder="Property name"
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="email">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                  />
                  <input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) =>
                      updateField("email", e.target.value)
                    }
                    disabled={loadingSettings || saving}
                    className={`${INPUT_CLASS} pl-9`}
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="phone">
                  Phone
                </label>
                <div className="relative">
                  <Phone
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                  />
                  <input
                    id="phone"
                    type="tel"
                    value={settings.phone}
                    onChange={(e) =>
                      updateField("phone", e.target.value)
                    }
                    disabled={loadingSettings || saving}
                    className={`${INPUT_CLASS} pl-9`}
                    placeholder="+234..."
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="address">
                  Address
                </label>
                <div className="relative">
                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                  />
                  <input
                    id="address"
                    value={settings.address}
                    onChange={(e) =>
                      updateField("address", e.target.value)
                    }
                    disabled={loadingSettings || saving}
                    className={`${INPUT_CLASS} pl-9`}
                    placeholder="Property address"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* OPERATIONS */}
          <section className="border border-[rgba(196,149,74,0.13)] bg-[#161310] p-5 sm:p-6">
            <SectionHeading
              icon={<Clock3 size={17} />}
              title="Operations"
              description="Configure your property's daily operations."
            />

            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className={LABEL_CLASS}
                    htmlFor="checkInTime"
                  >
                    Check-in Time
                  </label>
                  <input
                    id="checkInTime"
                    type="time"
                    value={settings.checkInTime}
                    onChange={(e) =>
                      updateField("checkInTime", e.target.value)
                    }
                    disabled={loadingSettings || saving}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label
                    className={LABEL_CLASS}
                    htmlFor="checkOutTime"
                  >
                    Check-out Time
                  </label>
                  <input
                    id="checkOutTime"
                    type="time"
                    value={settings.checkOutTime}
                    onChange={(e) =>
                      updateField("checkOutTime", e.target.value)
                    }
                    disabled={loadingSettings || saving}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="currency">
                  Currency
                </label>
                <div className="relative">
                  <CreditCard
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
                  />
                  <select
                    id="currency"
                    value={settings.currency}
                    onChange={(e) =>
                      updateField("currency", e.target.value)
                    }
                    disabled={loadingSettings || saving}
                    className={`${INPUT_CLASS} appearance-none pl-9`}
                  >
                    <option value="NGN">NGN — Nigerian Naira</option>
                    <option value="GBP">GBP — British Pound</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={LABEL_CLASS} htmlFor="taxRate">
                  Service Charge (%)
                </label>
                <input
                  id="taxRate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={settings.taxRate}
                  onChange={(e) =>
                    updateField("taxRate", e.target.value)
                  }
                  disabled={loadingSettings || saving}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-[rgba(196,149,74,0.12)] pt-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 text-[#8a7d6a]"
                  />
                  <div>
                    <p className="text-sm font-['Jost'] text-[#ede4d4]">
                      Maintenance Mode
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-[#8a7d6a]">
                      Disable new bookings while maintenance is active.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={settings.maintenanceMode}
                  aria-label="Toggle maintenance mode"
                  disabled={loadingSettings || saving}
                  onClick={() =>
                    updateField(
                      "maintenanceMode",
                      !settings.maintenanceMode
                    )
                  }
                  className={`relative h-6 w-12 shrink-0 border transition-colors disabled:opacity-50 ${
                    settings.maintenanceMode
                      ? "border-[#c4954a] bg-[#c4954a]"
                      : "border-[rgba(196,149,74,0.25)] bg-[#0c0a08]"
                  }`}
                >
                  <span
                    className={`absolute top-[3px] h-4 w-4 transition-all ${
                      settings.maintenanceMode
                        ? "left-[25px] bg-[#0c0a08]"
                        : "left-[3px] bg-[#8a7d6a]"
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* SAVE SETTINGS */}
        <div className="mt-8 flex flex-col gap-5 border-t border-[rgba(196,149,74,0.1)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-['DM_Mono'] text-[10px] uppercase tracking-widest text-[#8a7d6a]">
              Configuration
            </p>
            <p className="mt-1 text-xs text-[#8a7d6a]">
              Changes are saved to your property settings.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loadingSettings}
            className="flex items-center justify-center gap-2 bg-[#c4954a] px-7 py-3 text-xs font-['DM_Mono'] uppercase tracking-widest text-[#0c0a08] transition-colors hover:bg-[#d4a55a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <LoaderCircle size={15} className="animate-spin" />
            ) : (
              <Save size={15} />
            )}

            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
