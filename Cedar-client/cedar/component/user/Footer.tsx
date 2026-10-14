
"use client";

import { useEffect, useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
} from "react-icons/fa";
import CedarLogo from "./CedarLogo";
import api from "@/lib/api";
import { DM_Mono } from "next/font/google";

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

type FooterSettings = {
  hotelName: string;
  email: string;
  phone: string;
  address: string;
};

const DEFAULT_SETTINGS: FooterSettings = {
  hotelName: "Cedar Court Serviced Apartments",
  email: "hello@cedarcourt.ng",
  phone: "+234 1 700 2000",
  address: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria",
};

function Footer({
  setPage,
  setView,
}: {
  setPage: (p: string) => void;
  setView: (v: string) => void;
}) {
  const [settings, setSettings] =
    useState<FooterSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await api.get("/settings");
        const data = response.data.settings ?? response.data;

        setSettings({
          hotelName: data.hotelName ?? DEFAULT_SETTINGS.hotelName,
          email: data.email ?? DEFAULT_SETTINGS.email,
          phone: data.phone ?? DEFAULT_SETTINGS.phone,
          address: data.address ?? DEFAULT_SETTINGS.address,
        });
      } catch (error) {
        // Keep the default contact information if the API fails.
        console.error("Unable to load footer settings:", error);
      }
    };

    fetchSettings();
  }, []);

  const contactItems = [
    {
      Icon: MapPin,
      text: settings.address,
    },
    {
      Icon: Phone,
      text: settings.phone,
    },
    {
      Icon: Mail,
      text: settings.email,
    },
  ];

  return (
    <footer className="bg-[#0a0806] border-t border-[rgba(196,149,74,0.12)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* BRAND */}
          <div>
            <div className="mb-5">
              <CedarLogo />
            </div>

            <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed mb-6 font-light">
              Where luxury finds its language. Cedar Court has been
              welcoming distinguished guests since 2019.
            </p>

            <div className="flex gap-3">
              {[FaInstagram, FaTwitter, FaFacebookF].map(
                (Icon, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Social media ${i + 1}`}
                    className="w-9 h-9 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a] transition-all"
                  >
                    <Icon size={15} />
                  </button>
                )
              )}
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">
              Explore
            </h4>

            <div className="flex flex-col gap-2.5">
              {[
                "home",
                "rooms",
                "menu",
                "gallery",
                "about",
                "contact",
              ].map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setPage(page)}
                  className="text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#ede4d4] transition-colors text-left capitalize"
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">
              Services
            </h4>

            <div className="flex flex-col gap-2.5">
              {[
                "Room Service",
                "Spa & Wellness",
                "Fine Dining",
                "Event Spaces",
                "Airport Transfer",
                "Concierge",
              ].map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => setView(service)}
                  className="text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#ede4d4] transition-colors text-left"
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC CONTACT DETAILS */}
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">
              Contact
            </h4>

            <div className="flex flex-col gap-3">
              {contactItems.map(({ Icon, text }, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 text-sm font-['Jost'] text-[#8a7d6a]"
                >
                  <Icon
                    size={14}
                    className="text-[#c4954a] mt-0.5 shrink-0"
                  />

                  {index === 1 ? (
                    <a
                      href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}
                      className="hover:text-[#ede4d4] transition-colors"
                    >
                      {text}
                    </a>
                  ) : index === 2 ? (
                    <a
                      href={`mailto:${settings.email}`}
                      className="hover:text-[#ede4d4] transition-colors break-all"
                    >
                      {text}
                    </a>
                  ) : (
                    <span className="whitespace-pre-line">
                      {text}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[rgba(196,149,74,0.08)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">
            &copy; {new Date().getFullYear()} Cedar Court Hotel
            &amp; Restaurant. All rights reserved.
          </p>

          <div className="flex gap-6">
            <button
              type="button"
              className="text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"
            >
              Privacy Policy
            </button>

            <button
              type="button"
              className="text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"
            >
              Terms of Use
            </button>

            <button
              type="button"
              className="text-xs font-['DM_Mono'] text-[#8a7d6a]/30 hover:text-[#8a7d6a] transition-colors"
            >
              Admin Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
