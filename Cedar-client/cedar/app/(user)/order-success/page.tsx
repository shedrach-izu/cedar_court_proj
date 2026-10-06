"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import api from "@/lib/api";
import { useCart } from "@/context/CartContext";
import DetailsPage from "@/component/user/DetailsPage";

export default function OrderSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const { clearCart } = useCart();

    const reference = searchParams.get("reference");

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            if (!reference) {
                setError("Order reference is missing.");
                setLoading(false);
                return;
            }

            try {
                const response = await api.get(
                    `/order/reference/${reference}`
                );

                console.log("REAL ORDER:", response.data.order);

                setOrder(response.data.order);

            } catch (error: any) {
                console.error(
                    "Error fetching order:",
                    error.response?.data || error.message
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load your order."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [reference]);

    // =========================
    // LOADING
    // =========================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center">
                <p className="text-sm font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">
                    Loading your order...
                </p>
            </div>
        );
    }

    // =========================
    // ERROR
    // =========================

    if (error || !order) {
        return (
            <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6">

                <div className="text-center">

                    <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-3">
                        Unable to load order
                    </h1>

                    <p className="font-['Jost'] text-[#8a7d6a] mb-6">
                        {error || "The order could not be found."}
                    </p>

                    <button
                        onClick={() => router.push("/")}
                        className="bg-[#c4954a] text-[#0c0a08] px-6 py-3 font-['Jost'] font-semibold text-sm tracking-widest uppercase"
                    >
                        Return Home
                    </button>

                </div>

            </div>
        );
    }

    // =========================
    // REAL ORDER DETAILS
    // =========================

    const details = {
        name: order.reservationDetails?.fullName,

        email: order.reservationDetails?.email,

        phone: order.reservationDetails?.phone,

        date: order.reservationDetails?.date
            ? new Date(
                order.reservationDetails.date
            ).toLocaleDateString()
            : undefined,

        time: order.reservationDetails?.time,

        guests: order.reservationDetails?.guests,

        specialRequest:
            order.reservationDetails?.specialRequest,

        paymentStatus:
            order.paymentInfo?.paymentStatus,

        paymentMethod:
            order.paymentInfo?.paymentMethod,

        subtotal:
            order.subtotal,

        serviceFee:
            order.serviceFee,

        total:
            order.totalPrice,

        orderStatus:
            order.orderStatus,
    };

    // =========================
    // YOUR EXISTING DETAILS PAGE
    // =========================

    return (
        <DetailsPage
            type="restaurant"
            reference={order.orderId}
            reviewId={order._id}
            details={details}
            clearCart={clearCart}
            setPage={(page) => {

                if (page === "home") {
                    clearCart();
                    router.push("/");
                }

                if (page === "my-bookings") {
                    router.push("/my-bookings");
                }

            }}
        />
    );
}


// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import api from "@/lib/api";
// import DetailsPage from "@/component/user/DetailsPage";

// export default function OrderSuccessPage() {

//   return (
//     <DetailsPage
//       type="restaurant"
//       reference="ORD-TEST1234"
//       setPage={() => {}}
//       details={{
//         fullName: "John Doe",
//         email: "john@example.com",
//         phone: "08012345678",
//         date: "August 25, 2026",
//         time: "7:00 PM",
//         guests: 4,
//         subtotal: 45000,
//         serviceFee: 2000,
//         reservationFee: 5000,
//         tax: 3500,
//         totalAmount: 55500,
//       }}
//     />
//   );
// }