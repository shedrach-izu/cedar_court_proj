"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { useSearchParams } from "next/navigation";

import {
  ArrowRight,
  ChevronLeft,
  Minus,
  Plus,
  Shield,
  Trash2,
  Check,
  ShieldCheck,
  Lock,
  Info,
  Landmark,
  CalendarDays,
  Clock,
  Users,
  
} from "lucide-react";

import { toast } from "react-hot-toast";

import { useCart } from "@/context/CartContext";

import { useAuth } from "@/context/AuthContext";

import paystack from "@/public/paystack-wc.png";

import api from "@/lib/api";

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  img: string;
}

interface Apartment {
  _id: string;
  title: string;
  description: string;
  price: number;
  guests: number;
  area: number;
  view: string;
  status: string;
  rating: number;
  slug: string;

  gallery: {
    _id?: string;
    url: string;
    type: string;
    alt?: string;
  }[];

  amenities?: {
    _id: string;
    name: string;
    isActive?: boolean;
  }[];
}

// interface AuthUser {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
// }

interface ReservationDetails {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  requests: string;
}

// interface RestaurantCheckoutProps {
//   items: CartItem[];
//   updateQty: (id: string, qty: number) => void;
//   removeItem: (id: string) => void;
//   onComplete: (reference: string) => void;
//   onBack: () => void;
//   authUser?: AuthUser | null;
// }

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}

interface PaymentFormProps {
  payment: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    nameOnCard: string;
  };
  setPayment: React.Dispatch<
    React.SetStateAction<{
      cardNumber: string;
      expiry: string;
      cvv: string;
      nameOnCard: string;
    }>
  >;
}

const INPUT =
  "w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.18)] px-4 py-3 text-sm text-[#ede4d4] font-['Jost'] outline-none transition-colors placeholder:text-[#5f574c] focus:border-[#c4954a]";

const BTN_PRIMARY =
  "inline-flex items-center justify-center bg-[#c4954a] text-[#0c0a08] font-['Jost'] text-sm font-medium hover:bg-[#d5aa65] transition-colors disabled:cursor-not-allowed";

const BTN_OUTLINE =
  "inline-flex items-center justify-center border border-[rgba(196,149,74,0.25)] text-[#c4954a] font-['Jost'] text-sm hover:bg-[rgba(196,149,74,0.06)] transition-colors";

function genRef(prefix: string) {
  return `${prefix}${Date.now().toString(36).toUpperCase()}`;
}

function FormField({
  label,
  children,
  required = false,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-['DM_Mono'] uppercase tracking-wider text-[#8a7d6a]">
        {label}
        {required && <span className="text-[#c4954a] ml-1">*</span>}
      </label>

      {children}
    </div>
  );
}

function PaymentForm({
  payment,
  setPayment,
}: PaymentFormProps) {
  const updatePayment = (
    key: keyof PaymentFormProps["payment"],
    value: string
  ) => {
    setPayment((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-4">
      <FormField label="Name on Card" required>
        <input
          type="text"
          required
          value={payment.nameOnCard}
          onChange={(e) =>
            updatePayment("nameOnCard", e.target.value)
          }
          className={INPUT}
          placeholder="Victoria Ashworth"
        />
      </FormField>

      <FormField label="Card Number" required>
        <input
          type="text"
          required
          inputMode="numeric"
          autoComplete="cc-number"
          value={payment.cardNumber}
          onChange={(e) =>
            updatePayment("cardNumber", e.target.value)
          }
          className={INPUT}
          placeholder="•••• •••• •••• ••••"
          maxLength={19}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-4">
        <FormField label="Expiry Date" required>
          <input
            type="text"
            required
            inputMode="numeric"
            autoComplete="cc-exp"
            value={payment.expiry}
            onChange={(e) =>
              updatePayment("expiry", e.target.value)
            }
            className={INPUT}
            placeholder="MM/YY"
            maxLength={5}
          />
        </FormField>

        <FormField label="CVV" required>
          <input
            type="password"
            required
            inputMode="numeric"
            autoComplete="cc-csc"
            value={payment.cvv}
            onChange={(e) =>
              updatePayment("cvv", e.target.value)
            }
            className={INPUT}
            placeholder="•••"
            maxLength={4}
          />
        </FormField>
      </div>

      <div className="flex items-center gap-2 pt-2 text-xs font-['Jost'] text-[#8a7d6a]">
        <Shield size={14} className="text-[#c4954a]" />
        Your payment information is securely encrypted.
      </div>
    </div>
  );
}

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 flex items-center justify-center text-xs font-['DM_Mono'] border transition-all ${
              i + 1 < current ? "bg-[#c4954a] border-[#c4954a] text-[#0c0a08]" :
              i + 1 === current ? "border-[#c4954a] text-[#c4954a]" :
              "border-[rgba(196,149,74,0.2)] text-[#8a7d6a]"
            }`}>
              {i + 1 < current ? <Check size={12} /> : i + 1}
            </div>
            <span className={`text-xs font-['Jost'] hidden sm:block ${i + 1 === current ? "text-[#c4954a]" : "text-[#8a7d6a]"}`}>{step}</span>
          </div>
          {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-px mx-2 ${i + 1 < current ? "bg-[#c4954a]" : "bg-[rgba(196,149,74,0.2)]"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function Checkout() {
  const [step, setStep] = useState(1);

  const {
  cartItems,
  updateQty,
  removeItem,
  fetchCart,
  } = useCart();

  const { authUser } = useAuth();

  const router = useRouter()

  const searchParams = useSearchParams();

  const checkoutType = searchParams.get("type");

  const bookingSlug = searchParams.get("slug");
  const bookingCheckIn = searchParams.get("checkIn");
  const bookingCheckOut = searchParams.get("checkOut");
  const bookingGuests = searchParams.get("guests");

  const isBooking = checkoutType === "booking";

  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loadingApartment, setLoadingApartment] = useState(false);

  const bookingNights = useMemo(() => {
    if (!bookingCheckIn || !bookingCheckOut) {
      return 0;
    }

    const checkIn = new Date(`${bookingCheckIn}T00:00:00`);
    const checkOut = new Date(`${bookingCheckOut}T00:00:00`);

    const difference =
      checkOut.getTime() - checkIn.getTime();

    return Math.max(
      0,
      Math.ceil(
        difference / (1000 * 60 * 60 * 24)
      )
    );
  }, [bookingCheckIn, bookingCheckOut]);

  const bookingSubtotal = useMemo(() => {
    if (!apartment || bookingNights <= 0) {
      return 0;
    }

    return apartment.price * bookingNights;
  }, [apartment, bookingNights]);

  const bookingService = useMemo(
    () => bookingSubtotal * 0.1,
    [bookingSubtotal]
  );

  const bookingTax = useMemo(
    () => bookingSubtotal * 0.12,
    [bookingSubtotal]
  );

  const bookingTotal = useMemo(
    () =>
      bookingSubtotal +
      bookingService +
      bookingTax,
    [bookingSubtotal, bookingService, bookingTax]
  );

  useEffect(() => {
    if (!isBooking || !bookingSlug) {
      return;
    }

    const fetchApartment = async () => {
      try {
        setLoadingApartment(true);

        const response = await api.get(
          `/apartment/${bookingSlug}`
        );

        setApartment(
          response.data.apartment || response.data
        );
      } catch (error: any) {
        console.error(
          "Error fetching apartment:",
          error.response?.data || error.message
        );

        toast.error("Unable to load apartment details.");
      } finally {
        setLoadingApartment(false);
      }
    };

    fetchApartment();
  }, [isBooking, bookingSlug]);

  const [details, setDetails] = useState<ReservationDetails>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "19:00",
    guests: "2",
    requests: "",
  });

  useEffect(() => {
    if (!authUser) {
        return;
    }

    setDetails((current) => ({
        ...current,
        name: authUser.name,
        email: authUser.email,
    }));
  }, [authUser]);

  useEffect(() => {
    if (!isBooking || !bookingSlug) {
      return;
    }

    const getApartment = async () => {
      try {
        setLoadingApartment(true);

        const response = await api.get(
          `/apartment/${bookingSlug}`
        );

        const apartmentData =
          response.data.apartment || response.data;

        setApartment(apartmentData);

      } catch (error: any) {
        console.error(
          "Error getting apartment:",
          error.response?.data || error.message
        );

        toast.error(
          "Unable to load apartment details."
        );
      } finally {
        setLoadingApartment(false);
      }
    };

    getApartment();
  }, [isBooking, bookingSlug]);

  const [payment, setPayment] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    nameOnCard: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }, [cartItems]);

  const service = useMemo(() => {
    return subtotal * 0.1;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + service;
  }, [subtotal, service]);

  const setDetailsValue = (
    key: keyof ReservationDetails,
    value: string
  ) => {
    setDetails((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleQuantityChange = ( item: CartItem, qty: number) => {
    if (qty < 1) {
      return;
    }

    updateQty(item.id, qty);
    console.log("ID:",item.id)
  };

  // const handleContinueToDetails = () => {
  //   if (cartItems.length === 0) {
  //     toast.error("Your cart is empty.");
  //     return;
  //   }

  //   setStep(2);
  // };

  const handleContinueToDetails = () => {
    if (isBooking) {
      if (!apartment) {
        toast.error("Apartment details are not available.");
        return;
      }

      if (!bookingCheckIn || !bookingCheckOut || !bookingGuests) {
        toast.error("Booking details are incomplete.");
        return;
      }

      if (bookingNights <= 0) {
        toast.error("Please select valid check-in and check-out dates.");
        return;
      }

      setStep(2);
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setStep(2);
  };

  const handleReservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!details.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!details.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!details.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!details.date) {
      toast.error("Please select a reservation date.");
      return;
    }

    if (!details.time) {
      toast.error("Please select a reservation time.");
      return;
    }

    if (!details.guests) {
      toast.error("Please select the number of guests.");
      return;
    }

    setStep(3);
  };

  const handlePay = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!agreed) {
      toast.error(
        "Please agree to the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    setProcessing(true);

    try {
      /*
      ==========================================
      APARTMENT BOOKING
      ==========================================
      */

      if (isBooking) {
        if (!apartment) {
          toast.error("Apartment details are not available.");
          setProcessing(false);
          return;
        }

        if (
          !bookingCheckIn ||
          !bookingCheckOut ||
          !bookingGuests
        ) {
          toast.error("Booking details are incomplete.");
          setProcessing(false);
          return;
        }

        if (bookingNights <= 0) {
          toast.error(
            "Please select valid check-in and check-out dates."
          );
          setProcessing(false);
          return;
        }

        /*
        CREATE BOOKING
        */

        const bookingResponse = await api.post(
          "/booking/create",
          {
            apartment: apartment._id,
            checkIn: bookingCheckIn,
            checkOut: bookingCheckOut,
            guests: Number(bookingGuests),
          }
        );

        const booking = bookingResponse.data.booking;

        if (!booking?._id) {
          throw new Error(
            "Booking was created but no booking ID was returned."
          );
        }

        /*
        INITIALIZE PAYMENT
        */

        const paymentResponse = await api.post(
          "/payment/initialize",
          {
            bookingId: booking._id,
          }
        );

        const authorizationUrl =
          paymentResponse.data.authorizationUrl;

        if (!authorizationUrl) {
          throw new Error(
            "Payment authorization URL was not returned."
          );
        }

        /*
        REDIRECT TO PAYSTACK
        */

        window.location.href = authorizationUrl;

        return;
      }

      /*
      ==========================================
      RESTAURANT ORDER
      ==========================================
      */

      if (cartItems.length === 0) {
        toast.error("Your cart is empty.");
        setProcessing(false);
        return;
      }

      /*
      CREATE ORDER
      */

      const orderResponse = await api.post(
        "/order/create",
        {
          items: cartItems.map((item) => ({
            menu: item.id,
            quantity: item.qty,
          })),

          reservationDetails: {
            fullName: details.name,
            email: details.email,
            phone: details.phone,
            date: details.date,
            time: details.time,
            guests: Number(details.guests),
            specialRequest: details.requests,
          },

          subtotal,
          serviceFee: service,
          totalPrice: total,
        }
      );

      const order = orderResponse.data.order;

      if (!order?._id) {
        throw new Error(
          "Order was created but no order ID was returned."
        );
      }

      /*
      INITIALIZE PAYMENT
      */

      const paymentResponse = await api.post(
        "/payment/initialize",
        {
          orderId: order._id,
        }
      );

      const authorizationUrl =
        paymentResponse.data.authorizationUrl;

      if (!authorizationUrl) {
        throw new Error(
          "Payment authorization URL was not returned."
        );
      }

      /*
      REDIRECT TO PAYSTACK
      */

      window.location.href = authorizationUrl;

    } catch (error: any) {
      console.error(
        "Payment error:",
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while processing your payment."
      );

      setProcessing(false);
    }
  };

  // const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!agreed) {
  //       toast.error(
  //       "Please agree to the Terms & Conditions and Privacy Policy."
  //       );
  //       return;
  //   }

  //   if (cartItems.length === 0) {
  //       toast.error("Your cart is empty.");
  //       return;
  //   }

  //   setProcessing(true);

  //   try {
  //       // CREATE ORDER
  //       const orderResponse = await api.post("/order/create", {
  //       items: cartItems.map((item) => ({
  //           menu: item.id,
  //           quantity: item.qty,
  //       })),

  //       reservationDetails: {
  //           fullName: details.name,
  //           email: details.email,
  //           phone: details.phone,
  //           date: details.date,
  //           time: details.time,
  //           guests: Number(details.guests),
  //           specialRequest: details.requests,
  //       },

  //       subtotal,
  //       serviceFee: service,
  //       totalPrice: total,
  //       });

  //       const order = orderResponse.data.order;

  //       // INITIALIZE PAYMENT
  //       const paymentResponse = await api.post(
  //       "/payment/initialize",
  //       {
  //           orderId: order._id,
  //       }
  //       );

  //       // REDIRECT TO PAYSTACK
  //       window.location.href =
  //       paymentResponse.data.authorizationUrl;

  //   } catch (error: any) {
  //       console.error(
  //       "Error placing order:",
  //       error.response?.data || error.message
  //       );

  //       toast.error(
  //       error.response?.data?.message ||
  //       "Something went wrong while processing your payment."
  //       );

  //       setProcessing(false);
  //   }
  // };

  const steps = [
    "Review",
    "Your Details",
    "Payment",
  ];

 return (
  <div className="min-h-screen bg-[#0c0a08]">

    {/* ===================================================== */}
    {/* HEADER */}
    {/* ===================================================== */}

    <header className="sticky top-0 z-40 bg-[#0c0a08] border-b border-[#25211c]">

      <div className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-4">

        <div className="flex items-center justify-between">

          <button
            type="button"
            className="flex items-center gap-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>

          <div className="font-['Fraunces'] text-lg text-[#ede4d4]">
            Cedar Court
          </div>

          <div className="flex items-center gap-2 text-xs font-['DM_Mono'] text-[#8a7d6a]">
            <Shield
              size={13}
              className="text-[#c4954a]"
            />

            <span className="hidden sm:block">
              Secure Checkout
            </span>
          </div>

        </div>

      </div>

    </header>


    {/* ===================================================== */}
    {/* MAIN CONTENT */}
    {/* ===================================================== */}

    <main className="w-full max-w-6xl mx-auto px-6 lg:px-8 py-8 sm:py-10">

      {/* =================================================== */}
      {/* STEP INDICATOR */}
      {/* =================================================== */}

      <div className="mb-8">

        <StepIndicator
          steps={steps}
          current={step}
        />

      </div>


      {/* ===================================================== */}
      {/* STEP 1 */}
      {/* ===================================================== */}

      {step === 1 && (
  <section>

    {/* ===================================================== */}
    {/* STEP HEADING */}
    {/* ===================================================== */}

    <div className="mb-6">

      <p className="text-[10px] font-['DM_Mono'] uppercase tracking-[0.2em] text-[#c4954a] mb-2">
        Step 01
      </p>

      <h1 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
        {isBooking ? "Review Your Stay" : "Review Your Order"}
      </h1>

    </div>


    {/* ===================================================== */}
    {/* BOOKING CHECKOUT */}
    {/* ===================================================== */}

    {isBooking ? (

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-7 items-start">

        {/* ================================================= */}
        {/* LEFT — BOOKING DETAILS */}
        {/* ================================================= */}

        <div>

          {loadingApartment ? (

            <div className="border border-[#3b3226] bg-[#11110f] p-10 text-center">

              <p className="text-sm font-['Jost'] text-[#8a7d6a]">
                Loading apartment details...
              </p>

            </div>

          ) : !apartment ? (

            <div className="border border-[#3b3226] bg-[#11110f] p-10 text-center">

              <p className="font-['Fraunces'] text-xl text-[#ede4d4]">
                Apartment not found
              </p>

              <button
                type="button"
                onClick={() => router.back()}
                className={`${BTN_PRIMARY} mt-6 px-6 py-3`}
              >
                Go Back
              </button>

            </div>

          ) : (

            <div className="border border-[#3b3226] bg-[#11110f] overflow-hidden">

              {/* ================================================= */}
              {/* APARTMENT IMAGE */}
              {/* ================================================= */}

              <div className="h-[320px] overflow-hidden">

                <img
                  src={
                    apartment.gallery?.find(
                      (image) => image.type === "living-room"
                    )?.url ||
                    apartment.gallery?.[0]?.url ||
                    "/images/placeholder-room.jpg"
                  }
                  alt={apartment.title}
                  className="w-full h-full object-cover"
                />

              </div>


              {/* ================================================= */}
              {/* APARTMENT CONTENT */}
              {/* ================================================= */}

              <div className="p-6">

                <p className="text-[10px] font-['DM_Mono'] uppercase tracking-[0.16em] text-[#c4954a] mb-2">
                  Apartment
                </p>

                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">
                  {apartment.title}
                </h2>

                <p className="mt-2 text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed">
                  {apartment.description}
                </p>


                {/* ================================================= */}
                {/* STAY DETAILS */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

                  {/* CHECK-IN */}

                  <div className="border border-[#2d2923] bg-[#0c0a08] p-4">

                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={14}
                        className="text-[#c4954a]"
                      />

                      <p className="text-[9px] font-['DM_Mono'] uppercase tracking-wider text-[#8a7d6a]">
                        Check-in
                      </p>

                    </div>

                    <p className="mt-2 text-sm font-['Jost'] text-[#ede4d4]">
                      {bookingCheckIn
                        ? new Date(
                            `${bookingCheckIn}T00:00:00`
                          ).toLocaleDateString()
                        : "-"}
                    </p>

                  </div>


                  {/* CHECK-OUT */}

                  <div className="border border-[#2d2923] bg-[#0c0a08] p-4">

                    <div className="flex items-center gap-2">

                      <CalendarDays
                        size={14}
                        className="text-[#c4954a]"
                      />

                      <p className="text-[9px] font-['DM_Mono'] uppercase tracking-wider text-[#8a7d6a]">
                        Check-out
                      </p>

                    </div>

                    <p className="mt-2 text-sm font-['Jost'] text-[#ede4d4]">
                      {bookingCheckOut
                        ? new Date(
                            `${bookingCheckOut}T00:00:00`
                          ).toLocaleDateString()
                        : "-"}
                    </p>

                  </div>


                  {/* GUESTS */}

                  <div className="border border-[#2d2923] bg-[#0c0a08] p-4">

                    <div className="flex items-center gap-2">

                      <Users
                        size={14}
                        className="text-[#c4954a]"
                      />

                      <p className="text-[9px] font-['DM_Mono'] uppercase tracking-wider text-[#8a7d6a]">
                        Guests
                      </p>

                    </div>

                    <p className="mt-2 text-sm font-['Jost'] text-[#ede4d4]">
                      {bookingGuests || "-"}
                    </p>

                  </div>

                </div>


                {/* ================================================= */}
                {/* NIGHTS */}
                {/* ================================================= */}

                <div className="mt-6 border border-[#2d2923] bg-[#0c0a08] p-4">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <Clock
                        size={14}
                        className="text-[#c4954a]"
                      />

                      <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                        Length of stay
                      </span>

                    </div>

                    <span className="text-sm font-['DM_Mono'] text-[#ede4d4]">
                      {bookingNights}{" "}
                      {bookingNights === 1
                        ? "night"
                        : "nights"}
                    </span>

                  </div>

                </div>


                {/* ================================================= */}
                {/* AMENITIES */}
                {/* ================================================= */}

                {apartment.amenities &&
                  apartment.amenities.length > 0 && (

                    <div className="mt-7">

                      <p className="text-[9px] font-['DM_Mono'] uppercase tracking-wider text-[#8a7d6a] mb-3">
                        Included Amenities
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {apartment.amenities.map(
                          (amenity) => (

                            <span
                              key={amenity._id}
                              className="
                                border
                                border-[#3b3226]
                                bg-[#0c0a08]
                                px-3
                                py-2
                                text-[10px]
                                font-['Jost']
                                text-[#c8c0b4]
                              "
                            >
                              {amenity.name}
                            </span>

                          )
                        )}

                      </div>

                    </div>

                  )}


                {/* ================================================= */}
                {/* CONTINUE */}
                {/* ================================================= */}

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={
                    !apartment ||
                    loadingApartment ||
                    bookingNights <= 0
                  }
                  className={`${BTN_PRIMARY} w-full py-4 mt-7`}
                >

                  CONTINUE TO DETAILS

                  <ArrowRight
                    size={14}
                    className="ml-2"
                  />

                </button>

              </div>

            </div>

          )}

        </div>


        {/* ================================================= */}
        {/* RIGHT — BOOKING SUMMARY */}
        {/* ================================================= */}

        <div className="lg:sticky lg:top-28">

          <div className="border border-[#3b3226] bg-[#11110f]">

            {/* HEADER */}

            <div className="px-5 py-4 border-b border-[#2d2923]">

              <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                Booking Summary
              </h2>

            </div>


            <div className="px-5 py-5">

              {/* APARTMENT */}

              <div className="flex justify-between items-start gap-4">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Apartment
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4] text-right">
                  {apartment?.title || "-"}
                </span>

              </div>


              {/* CHECK-IN */}

              <div className="flex justify-between items-center mt-4">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Check-in
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  {bookingCheckIn || "-"}
                </span>

              </div>


              {/* CHECK-OUT */}

              <div className="flex justify-between items-center mt-4">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Check-out
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  {bookingCheckOut || "-"}
                </span>

              </div>


              {/* NIGHTS */}

              <div className="flex justify-between items-center mt-4">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Nights
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  {bookingNights}
                </span>

              </div>


              {/* GUESTS */}

              <div className="flex justify-between items-center mt-4">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Guests
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  {bookingGuests || "-"}
                </span>

              </div>


              <div className="border-t border-[#2d2923] my-5" />


              {/* PRICE PER NIGHT */}

              <div className="flex justify-between items-center mb-3">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Price / night
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  ₦{apartment?.price?.toLocaleString() || "0"}
                </span>

              </div>


              {/* SUBTOTAL */}

              <div className="flex justify-between items-center mb-3">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Subtotal
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  ₦{bookingSubtotal.toLocaleString()}
                </span>

              </div>


              {/* SERVICE */}

              <div className="flex justify-between items-center mb-3">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Service (10%)
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  ₦{bookingService.toLocaleString()}
                </span>

              </div>


              {/* TAX */}

              <div className="flex justify-between items-center">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Tax (12%)
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  ₦{bookingTax.toLocaleString()}
                </span>

              </div>


              {/* TOTAL */}

              <div className="border-t border-[#3b3226] mt-5 pt-5">

                <div className="flex justify-between items-center">

                  <span className="font-['Fraunces'] text-base text-[#ede4d4]">
                    Total
                  </span>

                  <span className="font-['DM_Mono'] text-lg text-[#c4954a]">
                    ₦{bookingTotal.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    ) : (

      /* ===================================================== */
      /* RESTAURANT CHECKOUT */
      /* ===================================================== */

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-7 items-start">

        {/* ================================================= */}
        {/* LEFT — CART */}
        {/* ================================================= */}

        <div>

          {cartItems.length === 0 ? (

            <div className="border border-[#3b3226] bg-[#11110f] p-8 text-center">

              <p className="font-['Fraunces'] text-xl text-[#ede4d4]">
                Your cart is empty
              </p>

              <button
                type="button"
                onClick={() => router.push("/menu")}
                className={`${BTN_PRIMARY} mt-6 px-6 py-3`}
              >
                Back to Menu
              </button>

            </div>

          ) : (

            <>

              {/* CART ITEMS */}

              <div className="space-y-3">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="bg-[#11110f] border border-[#302b25] px-4 py-3.5"
                  >

                    <div className="flex items-center gap-4">

                      {/* IMAGE */}

                      <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 overflow-hidden bg-[#0c0a08]">

                        {item.img ? (

                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-[9px] text-[#71675b]">
                            No image
                          </div>

                        )}

                      </div>


                      {/* ITEM NAME */}

                      <div className="flex-1 min-w-0">

                        <p className="font-['Jost'] text-sm text-[#ede4d4] truncate">
                          {item.name}
                        </p>

                        <p className="text-[11px] font-['DM_Mono'] text-[#8a7d6a] mt-1">
                          ₦{item.price.toLocaleString()} each
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            removeItem(item.id)
                          }
                          className="text-[10px] font-['DM_Mono'] text-[#71675b] hover:text-red-400 transition-colors mt-2"
                        >
                          Remove
                        </button>

                      </div>


                      {/* QUANTITY */}

                      <div className="flex items-center gap-2 shrink-0">

                        <button
                          type="button"
                          disabled={item.qty <= 1}
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              item.qty - 1
                            )
                          }
                          className="w-8 h-8 border border-[#4a3c28] text-[#c4954a] flex items-center justify-center hover:bg-[#1b1813] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-5 text-center text-sm font-['DM_Mono'] text-[#ede4d4]">
                          {item.qty}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            handleQuantityChange(
                              item,
                              item.qty + 1
                            )
                          }
                          className="w-8 h-8 border border-[#4a3c28] text-[#c4954a] flex items-center justify-center hover:bg-[#1b1813] transition-colors"
                        >
                          <Plus size={12} />
                        </button>

                      </div>


                      {/* ITEM TOTAL */}

                      <div className="text-right shrink-0 min-w-[70px]">

                        <p className="font-['DM_Mono'] text-sm text-[#c4954a]">
                          ₦{(
                            item.price * item.qty
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>


              {/* CONTINUE */}

              <button
                type="button"
                onClick={handleContinueToDetails}
                className={`${BTN_PRIMARY} w-full py-4 mt-7`}
              >

                CONTINUE TO DETAILS

                <ArrowRight
                  size={14}
                  className="ml-2"
                />

              </button>

            </>

          )}

        </div>


        {/* ================================================= */}
        {/* RIGHT — ORDER SUMMARY */}
        {/* ================================================= */}

        <div className="lg:sticky lg:top-28">

          <div className="border border-[#3b3226] bg-[#11110f]">

            {/* HEADER */}

            <div className="px-5 py-4 border-b border-[#2d2923]">

              <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                Order Summary
              </h2>

            </div>


            <div className="px-5 py-4">

              {/* ITEMS */}

              <div className="space-y-3">

                {cartItems.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4"
                  >

                    <div className="min-w-0">

                      <p className="text-xs font-['Jost'] text-[#c8c0b4] truncate">
                        {item.name} ×{item.qty}
                      </p>

                    </div>

                    <p className="text-xs font-['DM_Mono'] text-[#ede4d4] whitespace-nowrap">
                      ₦{(
                        item.price * item.qty
                      ).toLocaleString()}
                    </p>

                  </div>

                ))}

              </div>


              <div className="border-t border-[#2d2923] my-4" />


              {/* SUBTOTAL */}

              <div className="flex justify-between items-center mb-3">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Subtotal
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  ₦{subtotal.toLocaleString()}
                </span>

              </div>


              {/* SERVICE */}

              <div className="flex justify-between items-center">

                <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Service (10%)
                </span>

                <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                  ₦{service.toLocaleString()}
                </span>

              </div>


              {/* TOTAL */}

              <div className="border-t border-[#2d2923] mt-4 pt-4">

                <div className="flex justify-between items-center">

                  <span className="font-['Fraunces'] text-base text-[#ede4d4]">
                    Total
                  </span>

                  <span className="font-['DM_Mono'] text-base text-[#c4954a]">
                    ₦{total.toLocaleString()}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    )}

  </section>
)}


      {/* ===================================================== */}
      {/* STEP 2 */}
      {/* ===================================================== */}

      {step === 2 && (

        <section>

          <div className="mb-6">

            <p className="text-[10px] font-['DM_Mono'] uppercase tracking-[0.2em] text-[#c4954a] mb-2">
              Step 02
            </p>

            <h1 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
              Reservation Details
            </h1>

            <p className="text-sm font-['Jost'] text-[#8a7d6a] mt-2">
              Tell us when you&apos;ll be joining us.
            </p>

          </div>


          <form
            onSubmit={handleReservationSubmit}
            className="max-w-3xl"
          >

            <div className="space-y-5">


              {/* NAME + EMAIL */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <FormField
                  label="Full Name"
                  required
                >

                  <input
                    type="text"
                    required
                    value={details.name}
                    onChange={(e) =>
                      setDetailsValue(
                        "name",
                        e.target.value
                      )
                    }
                    className={INPUT}
                    placeholder="Victoria Ashworth"
                  />

                </FormField>


                <FormField
                  label="Email"
                  required
                >

                  <input
                    type="email"
                    required
                    value={details.email}
                    onChange={(e) =>
                      setDetailsValue(
                        "email",
                        e.target.value
                      )
                    }
                    className={INPUT}
                    placeholder="you@example.com"
                  />

                </FormField>

              </div>


              {/* PHONE */}

              <FormField
                label="Phone"
                required
              >

                <input
                  type="tel"
                  required
                  value={details.phone}
                  onChange={(e) =>
                    setDetailsValue(
                      "phone",
                      e.target.value
                    )
                  }
                  className={INPUT}
                  placeholder="+234 801 234 5678"
                />

              </FormField>


              {/* DATE + TIME */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <FormField
                  label="Date"
                  required
                >

                  <input
                    type="date"
                    required
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    value={details.date}
                    onChange={(e) =>
                      setDetailsValue(
                        "date",
                        e.target.value
                      )
                    }
                    className={`${INPUT} [color-scheme:dark]`}
                  />

                </FormField>


                <FormField
                  label="Time"
                  required
                >

                  <select
                    required
                    value={details.time}
                    onChange={(e) =>
                      setDetailsValue(
                        "time",
                        e.target.value
                      )
                    }
                    className={INPUT}
                  >

                    {[
                      "12:00",
                      "12:30",
                      "13:00",
                      "13:30",
                      "18:00",
                      "18:30",
                      "19:00",
                      "19:30",
                      "20:00",
                      "20:30",
                      "21:00",
                      "21:30",
                    ].map((time) => (

                      <option
                        key={time}
                        value={time}
                        className="bg-[#161310]"
                      >
                        {time}
                      </option>

                    ))}

                  </select>

                </FormField>

              </div>


              {/* GUESTS */}

              <FormField
                label="Number of Guests"
                required
              >

                <select
                  required
                  value={details.guests}
                  onChange={(e) =>
                    setDetailsValue(
                      "guests",
                      e.target.value
                    )
                  }
                  className={INPUT}
                >

                  {Array.from(
                    { length: 8 },
                    (_, index) =>
                      String(index + 1)
                  ).map((number) => (

                    <option
                      key={number}
                      value={number}
                      className="bg-[#161310]"
                    >
                      {number}{" "}
                      {number === "1"
                        ? "guest"
                        : "guests"}
                    </option>

                  ))}

                </select>

              </FormField>


              {/* REQUESTS */}

              <FormField label="Special Requests (optional)">

                <textarea
                  value={details.requests}
                  onChange={(e) =>
                    setDetailsValue(
                      "requests",
                      e.target.value
                    )
                  }
                  rows={4}
                  className={`${INPUT} resize-none`}
                  placeholder="Dietary requirements, celebrations, seating preferences..."
                />

              </FormField>


              {/* BUTTONS */}

              <div className="flex flex-col sm:flex-row gap-3 pt-3">

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`${BTN_OUTLINE} flex-1 py-4`}
                >

                  <ChevronLeft
                    size={14}
                    className="mr-2"
                  />

                  Back

                </button>


                <button
                  type="submit"
                  className={`${BTN_PRIMARY} flex-1 py-4`}
                >

                  Continue to Payment

                  <ArrowRight
                    size={14}
                    className="ml-2"
                  />

                </button>

              </div>

            </div>

          </form>

        </section>

      )}


      {/* ===================================================== */}
      {/* STEP 3 */}
      {/* ===================================================== */}

      {step === 3 && (
  <section>

    {/* PAGE HEADING */}

    <div className="mb-6">

      <p className="text-[10px] font-['DM_Mono'] uppercase tracking-[0.2em] text-[#c4954a] mb-2">
        Step 03
      </p>

      <h1 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
        Payment
      </h1>

      <p className="text-sm font-['Jost'] text-[#8a7d6a] mt-2">
        {isBooking
          ? "Complete your payment securely to confirm your reservation."
          : "Complete your payment securely to confirm your order."}
      </p>

    </div>


    <form onSubmit={handlePay}>

      {/* ================================================= */}
      {/* PAYSTACK + SUMMARY */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-7 items-start">


        {/* ================================================= */}
        {/* PAYSTACK — 2/3 */}
        {/* ================================================= */}

        <div>

          {/* SECURE PAYMENT */}

          <div className="border border-[#3b3226] bg-[#11110f]">

            {/* HEADER */}

            <div className="px-5 py-4 border-b border-[#2d2923]">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 rounded-full border border-[#c4954a] flex items-center justify-center">

                  <ShieldCheck
                    size={17}
                    className="text-[#c4954a]"
                  />

                </div>

                <div>

                  <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                    Secure Payment
                  </h2>

                  <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] mt-0.5">
                    256-BIT SSL SECURED PAYMENT
                  </p>

                </div>

              </div>

            </div>


            {/* PAYMENT CONTENT */}

            <div className="p-6">

              {/* PAYSTACK */}

              <div className="border border-[#2d2923] bg-[#0c0a08] px-6 py-8">

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

                  <div>

                    <p className="text-[10px] font-['DM_Mono'] uppercase tracking-[0.16em] text-[#c4954a] mb-3">
                      Payment Provider
                    </p>

                    <div className="flex items-center gap-2">

                      <div className="flex flex-col gap-[3px]">

                        <span className="block w-6 h-[5px] rounded-sm bg-[#00c3f7]" />
                        <span className="block w-6 h-[5px] rounded-sm bg-[#00c3f7]" />
                        <span className="block w-6 h-[5px] rounded-sm bg-[#00c3f7]" />

                      </div>

                      <span className="text-3xl font-bold tracking-tight text-white">
                        paystack
                      </span>

                    </div>

                  </div>


                  <div className="max-w-sm">

                    <p className="text-sm font-['Jost'] text-[#c8c0b4] leading-relaxed">
                      You will be securely redirected to Paystack to complete your payment.
                    </p>

                  </div>

                </div>

              </div>


              {/* SECURITY FEATURES */}

              <div className="grid grid-cols-3 mt-6 border-t border-[#2d2923] pt-6">

                <div className="text-center px-3 border-r border-[#2d2923]">

                  <ShieldCheck
                    size={19}
                    className="mx-auto text-[#c4954a] mb-2"
                  />

                  <p className="text-[10px] font-['Jost'] text-[#c8c0b4]">
                    256-bit
                  </p>

                  <p className="text-[9px] font-['Jost'] text-[#8a7d6a]">
                    SSL Encrypted
                  </p>

                </div>


                <div className="text-center px-3 border-r border-[#2d2923]">

                  <Lock
                    size={19}
                    className="mx-auto text-[#c4954a] mb-2"
                  />

                  <p className="text-[10px] font-['Jost'] text-[#c8c0b4]">
                    Secure
                  </p>

                  <p className="text-[9px] font-['Jost'] text-[#8a7d6a]">
                    Transactions
                  </p>

                </div>


                <div className="text-center px-3">

                  <ShieldCheck
                    size={19}
                    className="mx-auto text-[#c4954a] mb-2"
                  />

                  <p className="text-[10px] font-['Jost'] text-[#c8c0b4]">
                    Trusted by
                  </p>

                  <p className="text-[9px] font-['Jost'] text-[#8a7d6a]">
                    Millions
                  </p>

                </div>

              </div>


              {/* PAYMENT METHODS */}

              <div className="mt-6 pt-6 border-t border-[#2d2923]">

                <p className="text-center text-[9px] font-['Jost'] text-[#8a7d6a] mb-3">
                  Accepted Payment Methods
                </p>


                <div className="grid grid-cols-5 gap-2">

                  {/* VISA */}

                  <div className="h-11 border border-[#302b24] rounded-md flex items-center justify-center bg-[#151513]">

                    <span className="text-base font-bold italic text-white">
                      VISA
                    </span>

                  </div>


                  {/* MASTERCARD */}

                  <div className="h-11 border border-[#302b24] rounded-md flex items-center justify-center bg-[#151513]">

                    <div className="relative flex items-center">

                      <span className="w-5 h-5 rounded-full bg-red-500" />

                      <span className="w-5 h-5 rounded-full bg-yellow-500 -ml-2 opacity-90" />

                    </div>

                  </div>


                  {/* VERVE */}

                  <div className="h-11 border border-[#302b24] rounded-md flex items-center justify-center bg-[#151513]">

                    <span className="text-xs font-bold text-white">
                      Verve
                    </span>

                  </div>


                  {/* BANK */}

                  <div className="h-11 border border-[#302b24] rounded-md flex items-center justify-center bg-[#151513]">

                    <Landmark
                      size={17}
                      className="text-[#c8c0b4]"
                    />

                  </div>


                  {/* TRANSFER */}

                  <div className="h-11 border border-[#302b24] rounded-md flex items-center justify-center bg-[#151513]">

                    <span className="text-[7px] font-['DM_Mono'] text-[#c8c0b4] text-center leading-tight">
                      TRANSFER
                      <br />
                      USSD
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* SECURITY NOTICE */}

          <div className="border border-[#3b3226] mt-5 px-5 py-4 flex gap-3 bg-[#11110f]">

            <Info
              size={17}
              className="text-[#c4954a] shrink-0 mt-0.5"
            />

            <p className="text-[11px] font-['Jost'] text-[#8a7d6a] leading-relaxed">

              Cedar Court does not store your card details.
              <br />

              All payments are processed securely by Paystack.

            </p>

          </div>

        </div>


        {/* ================================================= */}
        {/* SUMMARY — 1/3 */}
        {/* ================================================= */}

        <div className="lg:sticky lg:top-28">

          <div className="border border-[#3b3226] bg-[#11110f]">

            {/* HEADER */}

            <div className="px-5 py-4 border-b border-[#2d2923]">

              <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                {isBooking
                  ? "Booking Summary"
                  : "Order Summary"}
              </h2>

            </div>


            <div className="px-5">


              {/* ================================================= */}
              {/* RESTAURANT ITEMS */}
              {/* ================================================= */}

              {!isBooking && (

                <div>

                  {cartItems.map((item) => (

                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-4 border-b border-[#2d2923]"
                    >

                      <div className="w-12 h-12 rounded-md overflow-hidden bg-[#1a1815] shrink-0">

                        {item.img ? (

                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />

                        ) : (

                          <div className="w-full h-full flex items-center justify-center text-[9px] text-[#71675b]">
                            No image
                          </div>

                        )}

                      </div>


                      <div className="flex-1 min-w-0">

                        <p className="text-sm font-['Jost'] text-[#ede4d4] truncate">
                          {item.name}
                        </p>

                        <p className="text-[11px] font-['DM_Mono'] text-[#8a7d6a] mt-1">
                          ×{item.qty}
                        </p>

                      </div>


                      <p className="text-sm font-['DM_Mono'] text-[#ede4d4] whitespace-nowrap">

                        ₦{(
                          item.price * item.qty
                        ).toLocaleString()}

                      </p>

                    </div>

                  ))}

                </div>

              )}


              {/* ================================================= */}
              {/* BOOKING DETAILS */}
              {/* ================================================= */}

              {isBooking && (

                <div className="py-5 border-b border-[#2d2923]">

                  <div className="flex items-start gap-4">

                    <div className="w-14 h-14 rounded-md overflow-hidden bg-[#1a1815] shrink-0">

                      {apartment?.gallery?.[0]?.url ? (

                        <img
                          src={apartment.gallery[0].url}
                          alt={apartment.title}
                          className="w-full h-full object-cover"
                        />

                      ) : (

                        <div className="w-full h-full flex items-center justify-center text-[9px] text-[#71675b]">
                          No image
                        </div>

                      )}

                    </div>


                    <div className="min-w-0">

                      <p className="text-[9px] font-['DM_Mono'] uppercase tracking-wider text-[#c4954a]">
                        Apartment
                      </p>

                      <p className="text-sm font-['Fraunces'] text-[#ede4d4] mt-1">
                        {apartment?.title || "Apartment"}
                      </p>

                      <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
                        ₦{apartment?.price?.toLocaleString() || "0"} / night
                      </p>

                    </div>

                  </div>

                </div>

              )}


              {/* ================================================= */}
              {/* PRICING */}
              {/* ================================================= */}

              <div className="py-5 space-y-3">

                {/* SUBTOTAL */}

                <div className="flex justify-between items-center">

                  <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                    Subtotal
                  </span>

                  <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">

                    ₦
                    {(
                      isBooking
                        ? bookingSubtotal
                        : subtotal
                    ).toLocaleString()}

                  </span>

                </div>


                {/* SERVICE */}

                <div className="flex justify-between items-center">

                  <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                    Service (10%)
                  </span>

                  <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">

                    ₦
                    {(
                      isBooking
                        ? bookingService
                        : service
                    ).toLocaleString()}

                  </span>

                </div>


                {/* TAX — BOOKING ONLY */}

                {isBooking && (

                  <div className="flex justify-between items-center">

                    <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                      Tax (12%)
                    </span>

                    <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                      ₦{bookingTax.toLocaleString()}
                    </span>

                  </div>

                )}

              </div>


              {/* TOTAL */}

              <div className="border-t border-[#3b3226] py-5">

                <div className="flex justify-between items-center">

                  <span className="font-['Fraunces'] text-base text-[#ede4d4]">
                    Total
                  </span>

                  <span className="text-xl font-['DM_Mono'] font-semibold text-[#c4954a]">

                    ₦
                    {(
                      isBooking
                        ? bookingTotal
                        : total
                    ).toLocaleString()}

                  </span>

                </div>

              </div>


              {/* ================================================= */}
              {/* RESERVATION / STAY DETAILS */}
              {/* ================================================= */}

              <div className="border-t border-[#3b3226] py-5">

                <div className="flex items-center gap-3 mb-5">

                  <div className="w-8 h-8 rounded-full border border-[#c4954a] flex items-center justify-center">

                    <CalendarDays
                      size={15}
                      className="text-[#c4954a]"
                    />

                  </div>

                  <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">

                    {isBooking
                      ? "Stay Details"
                      : "Reservation"}

                  </h3>

                </div>


                <div className="space-y-4">


                  {/* ================================================= */}
                  {/* BOOKING DETAILS */}
                  {/* ================================================= */}

                  {isBooking ? (

                    <>

                      {/* CHECK-IN */}

                      <div className="flex justify-between items-center">

                        <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                          Check-in
                        </span>

                        <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                          {bookingCheckIn || "-"}
                        </span>

                      </div>


                      {/* CHECK-OUT */}

                      <div className="flex justify-between items-center">

                        <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                          Check-out
                        </span>

                        <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                          {bookingCheckOut || "-"}
                        </span>

                      </div>


                      {/* NIGHTS */}

                      <div className="flex justify-between items-center">

                        <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                          Nights
                        </span>

                        <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                          {bookingNights}
                        </span>

                      </div>


                      {/* GUESTS */}

                      <div className="flex justify-between items-center">

                        <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                          Guests
                        </span>

                        <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                          {bookingGuests || "-"}
                        </span>

                      </div>

                    </>

                  ) : (

                    /* ================================================= */
                    /* RESTAURANT DETAILS */
                    /* ================================================= */

                    <>

                      {/* DATE */}

                      <div className="flex justify-between items-center">

                        <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                          Date
                        </span>

                        <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                          {details.date}
                        </span>

                      </div>


                      {/* TIME */}

                      <div className="flex justify-between items-center">

                        <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                          Time
                        </span>

                        <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                          {details.time}
                        </span>

                      </div>


                      {/* GUESTS */}

                      <div className="flex justify-between items-center">

                        <span className="text-xs font-['Jost'] text-[#8a7d6a]">
                          Guests
                        </span>

                        <span className="text-xs font-['DM_Mono'] text-[#c8c0b4]">
                          {details.guests}
                        </span>

                      </div>

                    </>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TERMS */}
      {/* ================================================= */}

      <label className="flex items-start gap-3 cursor-pointer pt-6">

        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) =>
            setAgreed(e.target.checked)
          }
          className="mt-1 accent-[#c4954a]"
        />


        <span className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed">

          I agree to the Cedar Court{" "}

          <button
            type="button"
            className="text-[#c4954a] hover:underline"
          >
            Terms & Conditions
          </button>{" "}

          and{" "}

          <button
            type="button"
            className="text-[#c4954a] hover:underline"
          >
            Privacy Policy
          </button>

          .

        </span>

      </label>


      {/* ================================================= */}
      {/* BUTTONS */}
      {/* ================================================= */}

      <div className="flex flex-col sm:flex-row gap-3 pt-5">

        <button
          type="button"
          onClick={() => setStep(2)}
          disabled={processing}
          className={`${BTN_OUTLINE} flex-1 py-4`}
        >

          <ChevronLeft
            size={14}
            className="mr-2"
          />

          Back

        </button>


        <button
          type="submit"
          disabled={processing || !agreed}
          className={`${BTN_PRIMARY} flex-1 py-4`}
        >

          {processing
            ? "Processing..."
            : `PAY ₦${(
                isBooking
                  ? bookingTotal
                  : total
              ).toLocaleString()}`}

          <ArrowRight
            size={15}
            className="ml-2"
          />

        </button>

      </div>


      {/* ================================================= */}
      {/* BOTTOM SECURITY */}
      {/* ================================================= */}

      <div className="mt-5 py-4 flex items-center justify-center gap-2 border-t border-[#25221e]">

        <Lock
          size={13}
          className="text-[#c4954a]"
        />

        <p className="text-[10px] font-['Jost'] text-[#71675b]">
          Your payment is 100% secure. We never store your card information.
        </p>

      </div>

    </form>

  </section>
)}

    </main>

  </div>
);
}
