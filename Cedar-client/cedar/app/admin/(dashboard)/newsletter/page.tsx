// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   Users,
//   UserCheck,
//   UserX,
//   Search,
//   Download,
//   Mail,
//   CalendarDays,
//   CheckCircle2,
//   XCircle,
//   RotateCcw,
//   PenLine,
//   Send,
//   Eye,
//   X,
//   LoaderCircle,
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import api from "@/lib/api";

// type SubscriberStatus = "active" | "unsubscribed";
// type FilterStatus = "all" | SubscriberStatus;

// type Subscriber = {
//   id: string;
//   email: string;
//   subscribedAt: string;
//   status: SubscriberStatus;
// };

// const formatDate = (date: string) => {
//   if (!date || Number.isNaN(new Date(date).getTime())) {
//     return "—";
//   }

//   return new Date(date).toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const NewsletterPage = () => {
//   const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
//   const [loadingSubscribers, setLoadingSubscribers] = useState(true);
//   const [subscriberError, setSubscriberError] = useState("");
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState<FilterStatus>("all");

//   // Newsletter composer state
//   const [composerOpen, setComposerOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [sending, setSending] = useState(false);

//   const [subject, setSubject] = useState("");
//   const [heading, setHeading] = useState("");
//   const [message, setMessage] = useState("");
//   const [ctaText, setCtaText] = useState("Explore Cedar Court");
//   const [ctaUrl, setCtaUrl] = useState("");

//   // Fetch real subscribers from the backend.
//   const fetchSubscribers = async () => {
//     try {
//       setLoadingSubscribers(true);
//       setSubscriberError("");

//       const response = await api.get("/newsletter/all");
//       const records = response.data?.subscribers;

//       if (!Array.isArray(records)) {
//         throw new Error("The server returned an invalid subscriber list.");
//       }

//       const formattedSubscribers: Subscriber[] = records.map(
//         (subscriber: any) => ({
//           id: String(subscriber.id ?? subscriber._id),
//           email: subscriber.email,
//           subscribedAt: subscriber.subscribedAt,
//           status: subscriber.status,
//         })
//       );

//       setSubscribers(formattedSubscribers);
//     } catch (error: any) {
//       console.error("Failed to fetch newsletter subscribers:", error);

//       const errorMessage =
//         error?.response?.data?.message ||
//         "Unable to load subscribers. Please try again.";

//       setSubscriberError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoadingSubscribers(false);
//     }
//   };

//   useEffect(() => {
//     void fetchSubscribers();
//   }, []);

//   const activeCount = subscribers.filter(
//     (subscriber) => subscriber.status === "active"
//   ).length;

//   const unsubscribedCount = subscribers.filter(
//     (subscriber) => subscriber.status === "unsubscribed"
//   ).length;

//   const filteredSubscribers = useMemo(() => {
//     return subscribers.filter((subscriber) => {
//       const matchesSearch = subscriber.email
//         .toLowerCase()
//         .includes(search.toLowerCase());

//       const matchesFilter =
//         filter === "all" || subscriber.status === filter;

//       return matchesSearch && matchesFilter;
//     });
//   }, [subscribers, search, filter]);

//   const resetComposer = () => {
//     setComposerOpen(false);
//     setPreviewOpen(false);
//     setSubject("");
//     setHeading("");
//     setMessage("");
//     setCtaText("Explore Cedar Court");
//     setCtaUrl("");
//   };

//   // Persist subscription status changes in the database.
//   const toggleStatus = async (id: string) => {
//     const subscriber = subscribers.find((item) => item.id === id);

//     if (!subscriber || updatingId) return;

//     const newStatus: SubscriberStatus =
//       subscriber.status === "active" ? "unsubscribed" : "active";

//     try {
//       setUpdatingId(id);

//       await api.patch(`/newsletter/${id}/status`, {
//         status: newStatus,
//       });

//       setSubscribers((current) =>
//         current.map((item) =>
//           item.id === id ? { ...item, status: newStatus } : item
//         )
//       );

//       toast.success(
//         newStatus === "unsubscribed"
//           ? "Subscriber marked as unsubscribed"
//           : "Subscriber reactivated"
//       );
//     } catch (error: any) {
//       console.error("Failed to update subscriber status:", error);

//       toast.error(
//         error?.response?.data?.message ||
//           "Unable to update subscriber status."
//       );
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const exportCSV = () => {
//     if (filteredSubscribers.length === 0) {
//       toast.error("There are no subscribers to export");
//       return;
//     }

//     const escapeCSV = (value: string) =>
//       `"${String(value).replace(/"/g, '""')}"`;

//     const rows = [
//       ["Subscriber ID", "Email", "Subscribed Date", "Status"],
//       ...filteredSubscribers.map((subscriber) => [
//         subscriber.id,
//         subscriber.email,
//         formatDate(subscriber.subscribedAt),
//         subscriber.status,
//       ]),
//     ];

//     const csv = rows
//       .map((row) => row.map(escapeCSV).join(","))
//       .join("\r\n");

//     const blob = new Blob(["\uFEFF" + csv], {
//       type: "text/csv;charset=utf-8;",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     link.href = url;
//     link.download = "cedar-court-subscribers.csv";
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     URL.revokeObjectURL(url);

//     toast.success("Subscriber list exported");
//   };

//   const handleSendNewsletter = async () => {
//     if (!subject.trim() || !heading.trim() || !message.trim()) {
//       toast.error("Please complete the subject, heading, and message.");
//       return;
//     }

//     if (ctaUrl.trim()) {
//       try {
//         const url = new URL(ctaUrl.trim());

//         if (!["http:", "https:"].includes(url.protocol)) {
//           toast.error(
//             "The button URL must start with http:// or https://."
//           );
//           return;
//         }
//       } catch {
//         toast.error("Please enter a valid button URL.");
//         return;
//       }
//     }

//     if (activeCount === 0) {
//       toast.error("There are no active subscribers to receive this newsletter.");
//       return;
//     }

//     const confirmed = window.confirm(
//       `Send this newsletter to all currently active Cedar Circle subscribers? Active subscribers: ${activeCount}. Unsubscribed users must be excluded.`
//     );

//     if (!confirmed) return;

//     try {
//       setSending(true);

//       const response = await api.post("/newsletter/send", {
//         subject: subject.trim(),
//         heading: heading.trim(),
//         message: message.trim(),
//         ctaText: ctaText.trim(),
//         ctaUrl: ctaUrl.trim(),
//       });

//       const sent = response.data?.sent;
//       const failed = response.data?.failed;

//       if (typeof sent === "number") {
//         if (typeof failed === "number" && failed > 0) {
//           toast.error(
//             `Newsletter sent to ${sent} subscriber(s). ${failed} delivery(s) failed.`
//           );
//         } else {
//           toast.success(
//             `Newsletter successfully sent to ${sent} subscriber(s).`
//           );
//         }
//       } else {
//         toast.success(
//           response.data?.message ||
//             "Newsletter sending request completed."
//         );
//       }

//       resetComposer();
//     } catch (error: any) {
//       console.error("Failed to send newsletter:", error);

//       toast.error(
//         error?.response?.data?.message ||
//           "Unable to send newsletter. Check your backend connection."
//       );
//     } finally {
//       setSending(false);
//     }
//   };

//   const stats = [
//     {
//       label: "Total Subscribers",
//       value: subscribers.length,
//       icon: Users,
//       description: "All recorded subscribers",
//     },
//     {
//       label: "Active Subscribers",
//       value: activeCount,
//       icon: UserCheck,
//       description: "Currently subscribed",
//     },
//     {
//       label: "Unsubscribed",
//       value: unsubscribedCount,
//       icon: UserX,
//       description: "No longer subscribed",
//     },
//   ];

//   return (
//     <main className="min-h-screen bg-[#0c0a08] text-[#ede4d4] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
//       <div className="max-w-[1500px] mx-auto space-y-8">
//         {/* PAGE HEADER */}
//         <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
//           <div>
//             <div className="flex items-center gap-2 mb-3">
//               <div className="h-px w-6 bg-[#c4954a]" />
//               <span className="font-['DM_Mono'] text-[10px] tracking-[0.25em] uppercase text-[#c4954a]">
//                 Guest Relations
//               </span>
//             </div>

//             <h1 className="font-['Fraunces'] text-3xl sm:text-4xl">
//               Newsletter
//             </h1>

//             <p className="font-['Jost'] text-sm text-[#8a7d6a] mt-2">
//               Manage your Cedar Circle email subscribers.
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//             <button
//               type="button"
//               onClick={() => {
//                 setComposerOpen(true);
//                 setPreviewOpen(false);
//               }}
//               className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 border border-[rgba(196,149,74,0.4)] text-[#c4954a] font-['Jost'] font-semibold text-xs tracking-widest uppercase hover:bg-[rgba(196,149,74,0.08)] transition-colors"
//             >
//               <PenLine size={16} />
//               Compose Newsletter
//             </button>

//             <button
//               type="button"
//               onClick={exportCSV}
//               className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-xs tracking-widest uppercase hover:bg-[#d4a55a] transition-colors"
//             >
//               <Download size={16} />
//               Export CSV
//             </button>
//           </div>
//         </div>

//         {/* COMPOSE NEWSLETTER MODAL */}
//         {composerOpen && (
//           <div
//             className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto p-3 sm:p-6"
//             onClick={(event) => {
//               if (event.target === event.currentTarget && !sending) {
//                 resetComposer();
//               }
//             }}
//           >
//             <div className="min-h-full flex items-start sm:items-center justify-center py-4">
//               <section
//                 role="dialog"
//                 aria-modal="true"
//                 aria-labelledby="newsletter-composer-title"
//                 className="w-full max-w-3xl bg-[#161310] border border-[rgba(196,149,74,0.25)] shadow-2xl"
//               >
//                 {/* MODAL HEADER */}
//                 <div className="flex items-start justify-between gap-4 p-5 sm:p-7 border-b border-[rgba(196,149,74,0.15)]">
//                   <div>
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="h-px w-6 bg-[#c4954a]" />
//                       <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase text-[#c4954a]">
//                         Cedar Circle
//                       </span>
//                     </div>

//                     <h2
//                       id="newsletter-composer-title"
//                       className="font-['Fraunces'] text-2xl sm:text-3xl"
//                     >
//                       Compose Newsletter
//                     </h2>

//                     <p className="text-xs sm:text-sm text-[#8a7d6a] mt-2">
//                       Create an email for your subscribed guests.
//                     </p>
//                   </div>

//                   <button
//                     type="button"
//                     onClick={resetComposer}
//                     disabled={sending}
//                     aria-label="Close newsletter composer"
//                     className="p-2 text-[#8a7d6a] hover:text-[#c4954a] disabled:opacity-50"
//                   >
//                     <X size={20} />
//                   </button>
//                 </div>

//                 {/* AUDIENCE NOTICE */}
//                 <div className="mx-5 mt-5 sm:mx-7 flex items-start gap-3 border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
//                   <Users
//                     size={18}
//                     className="text-emerald-400 shrink-0 mt-0.5"
//                   />

//                   <div>
//                     <p className="text-sm text-[#ede4d4]">
//                       Audience: Active subscribers only
//                     </p>

//                     <p className="text-xs leading-relaxed text-[#8a7d6a] mt-1">
//                       Recipients must be selected from the database at send
//                       time. Unsubscribed users must always be excluded by the
//                       backend.
//                     </p>

//                     <p className="text-xs text-[#8a7d6a] mt-2">
//                       {loadingSubscribers
//                         ? "Loading audience count..."
//                         : `${activeCount} active subscriber(s) currently listed.`}
//                     </p>
//                   </div>
//                 </div>

//                 {/* COMPOSER FORM */}
//                 <form
//                   onSubmit={(event) => {
//                     event.preventDefault();
//                     void handleSendNewsletter();
//                   }}
//                   className="p-5 sm:p-7 space-y-5"
//                 >
//                   <div>
//                     <label
//                       htmlFor="newsletter-subject"
//                       className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
//                     >
//                       Email Subject *
//                     </label>

//                     <input
//                       id="newsletter-subject"
//                       type="text"
//                       required
//                       maxLength={180}
//                       value={subject}
//                       onChange={(event) => setSubject(event.target.value)}
//                       placeholder="A little luxury, just for you..."
//                       className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="newsletter-heading"
//                       className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
//                     >
//                       Main Heading *
//                     </label>

//                     <input
//                       id="newsletter-heading"
//                       type="text"
//                       required
//                       maxLength={180}
//                       value={heading}
//                       onChange={(event) => setHeading(event.target.value)}
//                       placeholder="An exceptional stay awaits"
//                       className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
//                     />
//                   </div>

//                   <div>
//                     <label
//                       htmlFor="newsletter-message"
//                       className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
//                     >
//                       Newsletter Message *
//                     </label>

//                     <textarea
//                       id="newsletter-message"
//                       required
//                       rows={7}
//                       maxLength={10000}
//                       value={message}
//                       onChange={(event) => setMessage(event.target.value)}
//                       placeholder="Write your announcement, special offer, seasonal update, or message to your guests..."
//                       className="w-full resize-y bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm leading-7 text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
//                     />

//                     <p className="text-right text-[10px] text-[#8a7d6a] mt-1">
//                       {message.length}/10,000 characters
//                     </p>
//                   </div>

//                   {/* OPTIONAL CALL TO ACTION */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label
//                         htmlFor="newsletter-cta-text"
//                         className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
//                       >
//                         Button Text
//                       </label>

//                       <input
//                         id="newsletter-cta-text"
//                         type="text"
//                         maxLength={60}
//                         value={ctaText}
//                         onChange={(event) => setCtaText(event.target.value)}
//                         placeholder="Explore Cedar Court"
//                         className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
//                       />
//                     </div>

//                     <div>
//                       <label
//                         htmlFor="newsletter-cta-url"
//                         className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
//                       >
//                         Button URL (optional)
//                       </label>

//                       <input
//                         id="newsletter-cta-url"
//                         type="url"
//                         value={ctaUrl}
//                         onChange={(event) => setCtaUrl(event.target.value)}
//                         placeholder="https://yourwebsite.com"
//                         className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
//                       />
//                     </div>
//                   </div>

//                   {/* ACTION BUTTONS */}
//                   <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 border-t border-[rgba(196,149,74,0.12)]">
//                     <button
//                       type="button"
//                       disabled={sending}
//                       onClick={() => setPreviewOpen((current) => !current)}
//                       className="inline-flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.25)] px-5 py-3 text-xs uppercase tracking-widest text-[#ede4d4] hover:border-[#c4954a] disabled:opacity-50"
//                     >
//                       <Eye size={16} />
//                       {previewOpen ? "Hide Preview" : "Preview Email"}
//                     </button>

//                     <button
//                       type="submit"
//                       disabled={
//                         sending ||
//                         loadingSubscribers ||
//                         activeCount === 0 ||
//                         !subject.trim() ||
//                         !heading.trim() ||
//                         !message.trim()
//                       }
//                       className="inline-flex items-center justify-center gap-2 bg-[#c4954a] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0a08] hover:bg-[#d4a55a] disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {sending ? (
//                         <>
//                           <LoaderCircle size={16} className="animate-spin" />
//                           Sending...
//                         </>
//                       ) : (
//                         <>
//                           <Send size={16} />
//                           Send to Active Subscribers
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 </form>

//                 {/* EMAIL PREVIEW */}
//                 {previewOpen && (
//                   <div className="px-5 pb-6 sm:px-7 sm:pb-7">
//                     <div className="border border-[rgba(196,149,74,0.2)] bg-[#0c0a08]">
//                       <div className="border-b border-[rgba(196,149,74,0.15)] p-4">
//                         <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//                           Email Preview
//                         </p>

//                         <p className="text-sm text-[#ede4d4] mt-2 break-words">
//                           <span className="text-[#8a7d6a]">Subject: </span>
//                           {subject || "Your newsletter subject"}
//                         </p>
//                       </div>

//                       <div className="p-6 sm:p-10 text-center">
//                         <p className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase text-[#c4954a]">
//                           CEDAR COURT
//                         </p>

//                         <div className="h-px w-12 bg-[#c4954a] mx-auto my-6" />

//                         <h3 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//                           {heading || "Your newsletter heading"}
//                         </h3>

//                         <p className="text-sm leading-7 text-[#b6a995] mt-6 whitespace-pre-wrap break-words text-left">
//                           {message ||
//                             "Your newsletter message will appear here."}
//                         </p>

//                         {ctaUrl.trim() && (
//                           <div className="mt-8">
//                             <span className="inline-flex items-center justify-center bg-[#c4954a] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0a08]">
//                               {ctaText.trim() || "Explore Cedar Court"}
//                             </span>
//                           </div>
//                         )}

//                         <div className="h-px bg-[rgba(196,149,74,0.15)] mt-10 mb-5" />

//                         <p className="text-[10px] leading-5 text-[#8a7d6a]">
//                           You are receiving this email because you subscribed
//                           to Cedar Circle.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </section>
//             </div>
//           </div>
//         )}

//         {/* STATISTICS */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
//           {stats.map((stat) => {
//             const Icon = stat.icon;

//             return (
//               <div
//                 key={stat.label}
//                 className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-5 sm:p-6"
//               >
//                 <div className="flex items-start justify-between gap-3">
//                   <div>
//                     <p className="font-['Jost'] text-sm text-[#8a7d6a]">
//                       {stat.label}
//                     </p>

//                     <p className="font-['Fraunces'] text-3xl mt-3">
//                       {stat.value.toLocaleString()}
//                     </p>

//                     <p className="font-['Jost'] text-xs text-[#8a7d6a] mt-2">
//                       {stat.description}
//                     </p>
//                   </div>

//                   <div className="p-3 border border-[rgba(196,149,74,0.2)] bg-[rgba(196,149,74,0.06)]">
//                     <Icon size={21} className="text-[#c4954a]" />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* SUBSCRIBER DIRECTORY */}
//         <section className="bg-[#161310] border border-[rgba(196,149,74,0.15)]">
//           <div className="p-5 sm:p-6 border-b border-[rgba(196,149,74,0.1)]">
//             <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
//               <div>
//                 <h2 className="font-['Fraunces'] text-xl">
//                   Subscriber Directory
//                 </h2>

//                 <p className="text-xs text-[#8a7d6a] font-['Jost'] mt-1">
//                   {filteredSubscribers.length} subscriber
//                   {filteredSubscribers.length === 1 ? "" : "s"} displayed
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3">
//                 <div className="relative flex-1 sm:min-w-[260px]">
//                   <Search
//                     size={16}
//                     className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
//                   />

//                   <input
//                     type="search"
//                     value={search}
//                     onChange={(event) => setSearch(event.target.value)}
//                     placeholder="Search by email..."
//                     className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] pl-10 pr-4 py-3 text-sm font-['Jost'] text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
//                   />
//                 </div>

//                 <select
//                   value={filter}
//                   onChange={(event) =>
//                     setFilter(event.target.value as FilterStatus)
//                   }
//                   className="bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] focus:outline-none focus:border-[#c4954a]"
//                   aria-label="Filter subscribers by status"
//                 >
//                   <option value="all">All subscribers</option>
//                   <option value="active">Active</option>
//                   <option value="unsubscribed">Unsubscribed</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* LOADING AND ERROR STATES */}
//           {loadingSubscribers ? (
//             <div className="py-16 text-center">
//               <LoaderCircle
//                 size={28}
//                 className="mx-auto text-[#c4954a] mb-3 animate-spin"
//               />
//               <p className="text-sm text-[#8a7d6a]">
//                 Loading subscribers...
//               </p>
//             </div>
//           ) : subscriberError ? (
//             <div className="px-5 py-12 text-center">
//               <p className="text-sm text-red-400 mb-4">{subscriberError}</p>
//               <button
//                 type="button"
//                 onClick={() => void fetchSubscribers()}
//                 className="border border-[rgba(196,149,74,0.3)] px-5 py-2.5 text-xs uppercase tracking-widest text-[#c4954a] hover:bg-[rgba(196,149,74,0.06)]"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : (
//             <>
//               {/* DESKTOP TABLE */}
//               <div className="hidden md:block overflow-x-auto">
//                 <table className="w-full text-left">
//                   <thead>
//                     <tr className="border-b border-[rgba(196,149,74,0.1)] bg-[#0c0a08]/50">
//                       {[
//                         "Subscriber",
//                         "Subscription Date",
//                         "Status",
//                         "Action",
//                       ].map((columnHeading) => (
//                         <th
//                           key={columnHeading}
//                           className="px-6 py-4 text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#8a7d6a] font-normal"
//                         >
//                           {columnHeading}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {filteredSubscribers.map((subscriber) => (
//                       <tr
//                         key={subscriber.id}
//                         className="border-b border-[rgba(196,149,74,0.07)] hover:bg-[rgba(196,149,74,0.025)] transition-colors"
//                       >
//                         <td className="px-6 py-5">
//                           <div className="flex items-center gap-3">
//                             <div className="h-10 w-10 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08]">
//                               <Mail size={17} className="text-[#c4954a]" />
//                             </div>

//                             <div>
//                               <p className="text-sm font-['Jost']">
//                                 {subscriber.email}
//                               </p>
//                               <p className="text-[10px] text-[#8a7d6a] mt-1">
//                                 {subscriber.id}
//                               </p>
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-6 py-5">
//                           <div className="flex items-center gap-2 text-sm text-[#8a7d6a]">
//                             <CalendarDays size={15} />
//                             {formatDate(subscriber.subscribedAt)}
//                           </div>
//                         </td>

//                         <td className="px-6 py-5">
//                           <span
//                             className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs capitalize border ${
//                               subscriber.status === "active"
//                                 ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400"
//                                 : "border-white/10 bg-white/[0.03] text-[#8a7d6a]"
//                             }`}
//                           >
//                             {subscriber.status === "active" ? (
//                               <CheckCircle2 size={13} />
//                             ) : (
//                               <XCircle size={13} />
//                             )}
//                             {subscriber.status}
//                           </span>
//                         </td>

//                         <td className="px-6 py-5">
//                           <button
//                             type="button"
//                             disabled={updatingId === subscriber.id}
//                             onClick={() => void toggleStatus(subscriber.id)}
//                             className="inline-flex items-center gap-2 text-xs font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                           >
//                             {updatingId === subscriber.id ? (
//                               <>
//                                 <LoaderCircle
//                                   size={15}
//                                   className="animate-spin"
//                                 />
//                                 Updating...
//                               </>
//                             ) : subscriber.status === "active" ? (
//                               <>
//                                 <UserX size={15} />
//                                 Unsubscribe
//                               </>
//                             ) : (
//                               <>
//                                 <RotateCcw size={15} />
//                                 Reactivate
//                               </>
//                             )}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>

//                 {filteredSubscribers.length === 0 && (
//                   <div className="py-16 text-center">
//                     <Users
//                       size={30}
//                       className="mx-auto text-[#8a7d6a] mb-3"
//                     />
//                     <p className="font-['Fraunces'] text-lg">
//                       No subscribers found
//                     </p>
//                     <p className="text-sm text-[#8a7d6a] mt-2">
//                       Try a different search or filter.
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* MOBILE SUBSCRIBER CARDS */}
//               <div className="md:hidden divide-y divide-[rgba(196,149,74,0.08)]">
//                 {filteredSubscribers.map((subscriber) => (
//                   <div
//                     key={subscriber.id}
//                     className="p-4 sm:p-5 space-y-4"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="h-10 w-10 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08]">
//                         <Mail size={17} className="text-[#c4954a]" />
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p className="text-sm break-all font-['Jost']">
//                           {subscriber.email}
//                         </p>
//                         <p className="text-[10px] text-[#8a7d6a] mt-1">
//                           {subscriber.id}
//                         </p>
//                       </div>

//                       <span
//                         className={`shrink-0 text-[10px] px-2 py-1 capitalize border ${
//                           subscriber.status === "active"
//                             ? "border-emerald-500/20 text-emerald-400"
//                             : "border-white/10 text-[#8a7d6a]"
//                         }`}
//                       >
//                         {subscriber.status}
//                       </span>
//                     </div>

//                     <div className="flex items-center gap-2 text-xs text-[#8a7d6a]">
//                       <CalendarDays size={14} />
//                       Subscribed {formatDate(subscriber.subscribedAt)}
//                     </div>

//                     <button
//                       type="button"
//                       disabled={updatingId === subscriber.id}
//                       onClick={() => void toggleStatus(subscriber.id)}
//                       className="w-full min-h-10 flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.2)] text-xs text-[#c4954a] hover:bg-[rgba(196,149,74,0.06)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {updatingId === subscriber.id ? (
//                         <>
//                           <LoaderCircle size={15} className="animate-spin" />
//                           Updating...
//                         </>
//                       ) : subscriber.status === "active" ? (
//                         <>
//                           <UserX size={15} />
//                           Unsubscribe
//                         </>
//                       ) : (
//                         <>
//                           <RotateCcw size={15} />
//                           Reactivate
//                         </>
//                       )}
//                     </button>
//                   </div>
//                 ))}

//                 {filteredSubscribers.length === 0 && (
//                   <div className="py-12 px-4 text-center">
//                     <Users
//                       size={28}
//                       className="mx-auto text-[#8a7d6a] mb-3"
//                     />
//                     <p className="font-['Fraunces'] text-lg">
//                       No subscribers found
//                     </p>
//                     <p className="text-sm text-[#8a7d6a] mt-2">
//                       Try a different search or filter.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </>
//           )}

//           {/* TABLE FOOTER */}
//           <div className="px-5 sm:px-6 py-4 border-t border-[rgba(196,149,74,0.1)] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
//             <p className="text-xs text-[#8a7d6a] font-['Jost']">
//               Showing {filteredSubscribers.length} of {subscribers.length}{" "}
//               subscribers
//             </p>

//             <p className="text-[10px] text-[#8a7d6a] font-['DM_Mono'] uppercase tracking-wider">
//               Cedar Circle
//             </p>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export default NewsletterPage;












"use client";

import { useEffect, useMemo, useState } from "react";
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
  PenLine,
  Send,
  Eye,
  X,
  LoaderCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

type SubscriberStatus = "active" | "unsubscribed";
type FilterStatus = "all" | SubscriberStatus;

type Subscriber = {
  id: string; // MongoDB _id, used for backend operations
  subscriptionId: string; // Custom ID displayed to the admin
  email: string;
  subscribedAt: string;
  status: SubscriberStatus;
};

const formatDate = (date: string) => {
  if (!date || Number.isNaN(new Date(date).getTime())) {
    return "—";
  }

  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const NewsletterPage = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [subscriberError, setSubscriberError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");

  // Newsletter composer state
  const [composerOpen, setComposerOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const [subject, setSubject] = useState("");
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");
  const [ctaText, setCtaText] = useState("Explore Cedar Court");
  const [ctaUrl, setCtaUrl] = useState("");

  // Fetch real subscribers from the backend.
  const fetchSubscribers = async () => {
    try {
      setLoadingSubscribers(true);
      setSubscriberError("");

      const response = await api.get("/newsletter/all");
      const records = response.data?.subscribers;

      if (!Array.isArray(records)) {
        throw new Error("The server returned an invalid subscriber list.");
      }

      const formattedSubscribers: Subscriber[] = records.map(
        (subscriber: any) => ({
          // Keep MongoDB _id for status updates.
          id: String(subscriber._id ?? subscriber.id ?? ""),

          // Use the custom ID for display.
          // The fallback supports older records that have not been migrated.
          subscriptionId: String(
            subscriber.subscriptionId ??
              subscriber._id ??
              subscriber.id ??
              "Pending ID"
          ),

          email: subscriber.email,
          subscribedAt: subscriber.subscribedAt,
          status: subscriber.status,
        })
      );

      setSubscribers(formattedSubscribers);
    } catch (error: any) {
      console.error("Failed to fetch newsletter subscribers:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to load subscribers. Please try again.";

      setSubscriberError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  useEffect(() => {
    void fetchSubscribers();
  }, []);

  const activeCount = subscribers.filter(
    (subscriber) => subscriber.status === "active"
  ).length;

  const unsubscribedCount = subscribers.filter(
    (subscriber) => subscriber.status === "unsubscribed"
  ).length;

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        subscriber.email.toLowerCase().includes(searchTerm) ||
        subscriber.subscriptionId.toLowerCase().includes(searchTerm);

      const matchesFilter =
        filter === "all" || subscriber.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [subscribers, search, filter]);

  const resetComposer = () => {
    setComposerOpen(false);
    setPreviewOpen(false);
    setSubject("");
    setHeading("");
    setMessage("");
    setCtaText("Explore Cedar Court");
    setCtaUrl("");
  };

  // Persist status changes using MongoDB _id.
  const toggleStatus = async (id: string) => {
    const subscriber = subscribers.find((item) => item.id === id);

    if (!subscriber || updatingId) return;

    const newStatus: SubscriberStatus =
      subscriber.status === "active" ? "unsubscribed" : "active";

    try {
      setUpdatingId(id);

      await api.patch(`/newsletter/${id}/status`, {
        status: newStatus,
      });

      setSubscribers((current) =>
        current.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );

      toast.success(
        newStatus === "unsubscribed"
          ? "Subscriber marked as unsubscribed"
          : "Subscriber reactivated"
      );
    } catch (error: any) {
      console.error("Failed to update subscriber status:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to update subscriber status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const exportCSV = () => {
    if (filteredSubscribers.length === 0) {
      toast.error("There are no subscribers to export");
      return;
    }

    const escapeCSV = (value: string) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const rows = [
      ["Subscription ID", "Email", "Subscribed Date", "Status"],
      ...filteredSubscribers.map((subscriber) => [
        subscriber.subscriptionId,
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
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    toast.success("Subscriber list exported");
  };

  const handleSendNewsletter = async () => {
    if (!subject.trim() || !heading.trim() || !message.trim()) {
      toast.error("Please complete the subject, heading, and message.");
      return;
    }

    if (ctaUrl.trim()) {
      try {
        const url = new URL(ctaUrl.trim());

        if (!["http:", "https:"].includes(url.protocol)) {
          toast.error(
            "The button URL must start with http:// or https://."
          );
          return;
        }
      } catch {
        toast.error("Please enter a valid button URL.");
        return;
      }
    }

    if (activeCount === 0) {
      toast.error(
        "There are no active subscribers to receive this newsletter."
      );
      return;
    }

    const confirmed = window.confirm(
      `Send this newsletter to all currently active Cedar Circle subscribers? Active subscribers: ${activeCount}. Unsubscribed users must be excluded.`
    );

    if (!confirmed) return;

    try {
      setSending(true);

      const response = await api.post("/newsletter/send", {
        subject: subject.trim(),
        heading: heading.trim(),
        message: message.trim(),
        ctaText: ctaText.trim(),
        ctaUrl: ctaUrl.trim(),
      });

      const sent = response.data?.sent;
      const failed = response.data?.failed;

      if (typeof sent === "number") {
        if (typeof failed === "number" && failed > 0) {
          toast.error(
            `Newsletter sent to ${sent} subscriber(s). ${failed} delivery(s) failed.`
          );
        } else {
          toast.success(
            `Newsletter successfully sent to ${sent} subscriber(s).`
          );
        }
      } else {
        toast.success(
          response.data?.message ||
            "Newsletter sending request completed."
        );
      }

      resetComposer();
    } catch (error: any) {
      console.error("Failed to send newsletter:", error);

      toast.error(
        error?.response?.data?.message ||
          "Unable to send newsletter. Check your backend connection."
      );
    } finally {
      setSending(false);
    }
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

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setComposerOpen(true);
                setPreviewOpen(false);
              }}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 border border-[rgba(196,149,74,0.4)] text-[#c4954a] font-['Jost'] font-semibold text-xs tracking-widest uppercase hover:bg-[rgba(196,149,74,0.08)] transition-colors"
            >
              <PenLine size={16} />
              Compose Newsletter
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-3 bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-xs tracking-widest uppercase hover:bg-[#d4a55a] transition-colors"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* COMPOSE NEWSLETTER MODAL */}
        {composerOpen && (
          <div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto p-3 sm:p-6"
            onClick={(event) => {
              if (event.target === event.currentTarget && !sending) {
                resetComposer();
              }
            }}
          >
            <div className="min-h-full flex items-start sm:items-center justify-center py-4">
              <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="newsletter-composer-title"
                className="w-full max-w-3xl bg-[#161310] border border-[rgba(196,149,74,0.25)] shadow-2xl"
              >
                {/* MODAL HEADER */}
                <div className="flex items-start justify-between gap-4 p-5 sm:p-7 border-b border-[rgba(196,149,74,0.15)]">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-px w-6 bg-[#c4954a]" />
                      <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase text-[#c4954a]">
                        Cedar Circle
                      </span>
                    </div>

                    <h2
                      id="newsletter-composer-title"
                      className="font-['Fraunces'] text-2xl sm:text-3xl"
                    >
                      Compose Newsletter
                    </h2>

                    <p className="text-xs sm:text-sm text-[#8a7d6a] mt-2">
                      Create an email for your subscribed guests.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={resetComposer}
                    disabled={sending}
                    aria-label="Close newsletter composer"
                    className="p-2 text-[#8a7d6a] hover:text-[#c4954a] disabled:opacity-50"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* AUDIENCE NOTICE */}
                <div className="mx-5 mt-5 sm:mx-7 flex items-start gap-3 border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
                  <Users
                    size={18}
                    className="text-emerald-400 shrink-0 mt-0.5"
                  />

                  <div>
                    <p className="text-sm text-[#ede4d4]">
                      Audience: Active subscribers only
                    </p>

                    <p className="text-xs leading-relaxed text-[#8a7d6a] mt-1">
                      Recipients must be selected from the database at send
                      time. Unsubscribed users must always be excluded by the
                      backend.
                    </p>

                    <p className="text-xs text-[#8a7d6a] mt-2">
                      {loadingSubscribers
                        ? "Loading audience count..."
                        : `${activeCount} active subscriber(s) currently listed.`}
                    </p>
                  </div>
                </div>

                {/* COMPOSER FORM */}
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    void handleSendNewsletter();
                  }}
                  className="p-5 sm:p-7 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="newsletter-subject"
                      className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
                    >
                      Email Subject *
                    </label>

                    <input
                      id="newsletter-subject"
                      type="text"
                      required
                      maxLength={180}
                      value={subject}
                      onChange={(event) => setSubject(event.target.value)}
                      placeholder="A little luxury, just for you..."
                      className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newsletter-heading"
                      className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
                    >
                      Main Heading *
                    </label>

                    <input
                      id="newsletter-heading"
                      type="text"
                      required
                      maxLength={180}
                      value={heading}
                      onChange={(event) => setHeading(event.target.value)}
                      placeholder="An exceptional stay awaits"
                      className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newsletter-message"
                      className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
                    >
                      Newsletter Message *
                    </label>

                    <textarea
                      id="newsletter-message"
                      required
                      rows={7}
                      maxLength={10000}
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Write your announcement, special offer, seasonal update, or message to your guests..."
                      className="w-full resize-y bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm leading-7 text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
                    />

                    <p className="text-right text-[10px] text-[#8a7d6a] mt-1">
                      {message.length}/10,000 characters
                    </p>
                  </div>

                  {/* OPTIONAL CALL TO ACTION */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="newsletter-cta-text"
                        className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
                      >
                        Button Text
                      </label>

                      <input
                        id="newsletter-cta-text"
                        type="text"
                        maxLength={60}
                        value={ctaText}
                        onChange={(event) => setCtaText(event.target.value)}
                        placeholder="Explore Cedar Court"
                        className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="newsletter-cta-url"
                        className="block text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#c4954a] mb-2"
                      >
                        Button URL (optional)
                      </label>

                      <input
                        id="newsletter-cta-url"
                        type="url"
                        value={ctaUrl}
                        onChange={(event) => setCtaUrl(event.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm text-[#ede4d4] placeholder:text-[#8a7d6a]/60 focus:outline-none focus:border-[#c4954a]"
                      />
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 border-t border-[rgba(196,149,74,0.12)]">
                    <button
                      type="button"
                      disabled={sending}
                      onClick={() => setPreviewOpen((current) => !current)}
                      className="inline-flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.25)] px-5 py-3 text-xs uppercase tracking-widest text-[#ede4d4] hover:border-[#c4954a] disabled:opacity-50"
                    >
                      <Eye size={16} />
                      {previewOpen ? "Hide Preview" : "Preview Email"}
                    </button>

                    <button
                      type="submit"
                      disabled={
                        sending ||
                        loadingSubscribers ||
                        activeCount === 0 ||
                        !subject.trim() ||
                        !heading.trim() ||
                        !message.trim()
                      }
                      className="inline-flex items-center justify-center gap-2 bg-[#c4954a] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0a08] hover:bg-[#d4a55a] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {sending ? (
                        <>
                          <LoaderCircle size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send to Active Subscribers
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* EMAIL PREVIEW */}
                {previewOpen && (
                  <div className="px-5 pb-6 sm:px-7 sm:pb-7">
                    <div className="border border-[rgba(196,149,74,0.2)] bg-[#0c0a08]">
                      <div className="border-b border-[rgba(196,149,74,0.15)] p-4">
                        <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
                          Email Preview
                        </p>

                        <p className="text-sm text-[#ede4d4] mt-2 break-words">
                          <span className="text-[#8a7d6a]">Subject: </span>
                          {subject || "Your newsletter subject"}
                        </p>
                      </div>

                      <div className="p-6 sm:p-10 text-center">
                        <p className="font-['DM_Mono'] text-[10px] tracking-[0.3em] uppercase text-[#c4954a]">
                          CEDAR COURT
                        </p>

                        <div className="h-px w-12 bg-[#c4954a] mx-auto my-6" />

                        <h3 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
                          {heading || "Your newsletter heading"}
                        </h3>

                        <p className="text-sm leading-7 text-[#b6a995] mt-6 whitespace-pre-wrap break-words text-left">
                          {message ||
                            "Your newsletter message will appear here."}
                        </p>

                        {ctaUrl.trim() && (
                          <div className="mt-8">
                            <span className="inline-flex items-center justify-center bg-[#c4954a] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0a08]">
                              {ctaText.trim() || "Explore Cedar Court"}
                            </span>
                          </div>
                        )}

                        <div className="h-px bg-[rgba(196,149,74,0.15)] mt-10 mb-5" />

                        <p className="text-[10px] leading-5 text-[#8a7d6a]">
                          You are receiving this email because you subscribed
                          to Cedar Circle.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            </div>
          </div>
        )}

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

        {/* SUBSCRIBER DIRECTORY */}
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
                    placeholder="Search by email or subscription ID..."
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

          {/* LOADING AND ERROR STATES */}
          {loadingSubscribers ? (
            <div className="py-16 text-center">
              <LoaderCircle
                size={28}
                className="mx-auto text-[#c4954a] mb-3 animate-spin"
              />
              <p className="text-sm text-[#8a7d6a]">
                Loading subscribers...
              </p>
            </div>
          ) : subscriberError ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-red-400 mb-4">{subscriberError}</p>
              <button
                type="button"
                onClick={() => void fetchSubscribers()}
                className="border border-[rgba(196,149,74,0.3)] px-5 py-2.5 text-xs uppercase tracking-widest text-[#c4954a] hover:bg-[rgba(196,149,74,0.06)]"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* DESKTOP TABLE */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[rgba(196,149,74,0.1)] bg-[#0c0a08]/50">
                      {[
                        "Subscriber",
                        "Subscription Date",
                        "Status",
                        "Action",
                      ].map((columnHeading) => (
                        <th
                          key={columnHeading}
                          className="px-6 py-4 text-[10px] font-['DM_Mono'] uppercase tracking-widest text-[#8a7d6a] font-normal"
                        >
                          {columnHeading}
                        </th>
                      ))}
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
                                {subscriber.subscriptionId}
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
                            disabled={updatingId === subscriber.id}
                            onClick={() => void toggleStatus(subscriber.id)}
                            className="inline-flex items-center gap-2 text-xs font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {updatingId === subscriber.id ? (
                              <>
                                <LoaderCircle
                                  size={15}
                                  className="animate-spin"
                                />
                                Updating...
                              </>
                            ) : subscriber.status === "active" ? (
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
                  <div
                    key={subscriber.id}
                    className="p-4 sm:p-5 space-y-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08]">
                        <Mail size={17} className="text-[#c4954a]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm break-all font-['Jost']">
                          {subscriber.email}
                        </p>
                        <p className="text-[10px] text-[#8a7d6a] mt-1">
                          {subscriber.subscriptionId}
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
                      disabled={updatingId === subscriber.id}
                      onClick={() => void toggleStatus(subscriber.id)}
                      className="w-full min-h-10 flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.2)] text-xs text-[#c4954a] hover:bg-[rgba(196,149,74,0.06)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updatingId === subscriber.id ? (
                        <>
                          <LoaderCircle size={15} className="animate-spin" />
                          Updating...
                        </>
                      ) : subscriber.status === "active" ? (
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
            </>
          )}

          {/* TABLE FOOTER */}
          <div className="px-5 sm:px-6 py-4 border-t border-[rgba(196,149,74,0.1)] flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p className="text-xs text-[#8a7d6a] font-['Jost']">
              Showing {filteredSubscribers.length} of {subscribers.length}{" "}
              subscribers
            </p>

            <p className="text-[10px] text-[#8a7d6a] font-['DM_Mono'] uppercase tracking-wider">
              Cedar Circle
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NewsletterPage;
