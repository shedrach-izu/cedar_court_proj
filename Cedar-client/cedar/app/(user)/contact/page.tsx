'use client';

import { useState } from "react";
import FormField from "@/component/user/FormField";
import SectionLabel from "@/component/user/SectionLabel";

import { CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

const ContactPage = () => {
  const [form, setForm] = useState({ name:"",email:"",phone:"",subject:"General Enquiry",message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(f => ({...f,[k]:e.target.value}));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSubmitted(true); setLoading(false) }, 1000);
  };

  const INPUT = "w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] focus:outline-none focus:border-[#c4954a] placeholder-[#8a7d6a]/40 transition-colors"
  const LABEL = "text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase block mb-1.5";
  const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
  const BTN_OUTLINE = "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";
  return (
    // <div className="pt-20 bg-[#0c0a08]">
    //   <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16"><div className="max-w-7xl mx-auto px-6"><SectionLabel text="Get in Touch" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Contact <em className="italic">Us</em></h1></div></div>
    //   <div className="max-w-7xl mx-auto px-6 py-16">
    //     <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
    //       <div className="lg:col-span-3">
    //         {submitted ? (
    //           <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-12 text-center">
    //             <CheckCircle size={48} className="text-[#c4954a] mx-auto mb-4" strokeWidth={1.5} />
    //             <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-2">Thank You</h2>
    //             <p className="font-['Jost'] text-[#8a7d6a] font-light">{"We'll be in touch within 24 hours."}</p>
    //             <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-['Jost'] text-[#c4954a] hover:underline">Send another message</button>
    //           </div>
    //         ) : (
    //           <form onSubmit={handleSubmit} className="space-y-5">
    //             <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Send a Message</h2>
    //             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    //               <FormField label="Full Name"><input type="text" required value={form.name} onChange={set("name")} className={INPUT} placeholder="Victoria Ashworth" /></FormField>
    //               <FormField label="Email"><input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="victoria@example.com" /></FormField>
    //             </div>
    //             <FormField label="Phone (optional)"><input type="tel" value={form.phone} onChange={set("phone")} className={INPUT} placeholder="+44 20 0000 0000" /></FormField>
    //             <FormField label="Subject">
    //               <select value={form.subject} onChange={set("subject")} className={INPUT}>
    //                 {["General Enquiry","Room Booking","Restaurant Reservation","Event Planning","Spa & Wellness","Corporate Travel"].map(s => <option key={s} value={s} className="bg-[#161310]">{s}</option>)}
    //               </select>
    //             </FormField>
    //             <FormField label="Message"><textarea required rows={5} value={form.message} onChange={set("message")} className={INPUT.replace("w-full","w-full resize-none")} placeholder="How can we assist you?" /></FormField>
    //             <button type="submit" disabled={loading} className={`w-full py-4 ${BTN_PRIMARY} disabled:opacity-60`}>{loading?"Sending...":"Send Message"}</button>
    //           </form>
    //         )}
    //       </div>
    //       <div className="lg:col-span-2 space-y-4">
    //         <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Get in Touch</h2>
    //         {[{Icon:MapPin,label:"Address",value:"12 Cedar Court Lane\nMayfair, London W1K 4HF"},{Icon:Phone,label:"Telephone",value:"+44 20 7946 0312"},{Icon:Mail,label:"Email",value:"hello@cedarcourt.co.uk"},{Icon:Clock,label:"Concierge",value:"24 hours, 7 days a week"}].map(({Icon,label,value}) => (
    //           <div key={label} className="flex gap-4 p-5 bg-[#161310] border border-[rgba(196,149,74,0.1)]">
    //             <div className="w-10 h-10 border border-[rgba(196,149,74,0.2)] flex items-center justify-center shrink-0"><Icon size={15} className="text-[#c4954a]" strokeWidth={1.5} /></div>
    //             <div><div className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-1">{label}</div><div className="text-sm font-['Jost'] text-[#ede4d4] whitespace-pre-line font-light">{value}</div></div>
    //           </div>
    //         ))}
    //         <div className="h-44 bg-[#161310] border border-[rgba(196,149,74,0.1)] flex items-center justify-center">
    //           <div className="text-center"><MapPin size={28} className="text-[#c4954a] mx-auto mb-2" strokeWidth={1.5} /><p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest">MAYFAIR, LONDON</p></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-0">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-12">
          <SectionLabel text="Get in Touch" />
          <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Contact Us</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, label: "Address", value: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria" },
                { icon: Phone, label: "Phone", value: "+234 1 700 2000" },
                { icon: Mail, label: "Email", value: "hello@cedarcourt.ng" },
                { icon: Clock, label: "Reception Hours", value: "24 hours, 7 days a week" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 border border-[rgba(196,149,74,0.2)] flex items-center justify-center shrink-0"><Icon size={16} className="text-[#c4954a]" /></div>
                  <div>
                    <p className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-0.5">{label}</p>
                    <p className="text-sm font-['Jost'] text-[#ede4d4]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Name"><input required value={form.name} onChange={set("name")} className={INPUT} placeholder="Your name" /></FormField>
                <FormField label="Email"><input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="your@email.com" /></FormField>
              </div>
              <FormField label="Subject"><input required value={form.subject} onChange={set("subject")} className={INPUT} placeholder="How can we help?" /></FormField>
              <FormField label="Message"><textarea required value={form.message} onChange={set("message")} rows={5} className={INPUT + " resize-none"} placeholder="Your message..." /></FormField>
              <button type="submit" className={`w-full py-3.5 ${BTN_PRIMARY}`}>Send Message</button>
            </form>
          </div>
          <div className="h-80 lg:h-auto min-h-[320px]">
            <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] overflow-hidden h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.3590707956655!2d7.387637574996722!3d6.847488019313579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044e934bbdc2cdb%3A0x2e9950e6d73b175c!2sCedar%20Court%20Nsukka!5e0!3m2!1sen!2sng!4v1786069641270!5m2!1sen!2sng"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>

      //Map section before footer
      <div className="border-t border-[rgba(196,149,74,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase text-center">14 Bourdillon Road, Ikoyi, Lagos · Find Us on Google Maps: Cedar Court Serviced Apartments</p>
        </div>
      </div>
    </div>
  );
}

export default ContactPage