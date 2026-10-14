"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Mail,
  Trash2,
  Reply,
  User,
  X,
} from "lucide-react";

import { toast } from "react-hot-toast";
import api from "@/lib/api";

type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  replied?: boolean;
  reply?: {
    message: string | null;
    repliedAt: string | null;
  };
  createdAt: string;
  updatedAt: string;
};

export default function MessageDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const id = params.id as string;

  const [message, setMessage] =
    useState<Message | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [showReply, setShowReply] =
    useState(false);

  const [replyText, setReplyText] =
    useState("");

  const [sendingReply, setSendingReply] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    );
  };

  /* =========================================================
     FORMAT TIME
  ========================================================= */

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString(
      "en-US",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  /* =========================================================
     GET INITIALS
  ========================================================= */

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  /* =========================================================
     FETCH MESSAGE
  ========================================================= */

  const fetchMessage = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        `/message/${id}`
      );

      const backendMessage =
        response.data.message;

      setMessage(backendMessage);

      /*
       * Automatically mark the message as read
       * when the admin opens it.
       */

      if (
        backendMessage &&
        !backendMessage.read
      ) {
        try {
          const readResponse =
            await api.patch(
              `/message/${id}/read`
            );

          if (readResponse.data.data) {
            setMessage(
              readResponse.data.data
            );
          }
        } catch (readError) {
          console.error(
            "Error marking message as read:",
            readError
          );
        }
      }
    } catch (error: any) {
      console.error(
        "Error fetching message:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to load message"
      );

      router.push("/admin/messages");
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOAD MESSAGE
  ========================================================= */

  useEffect(() => {
    if (!id) return;

    fetchMessage();
  }, [id]);

  /* =========================================================
     DELETE MESSAGE
  ========================================================= */

  const handleDelete = async () => {
    if (!message) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(
        `/message/${message._id}`
      );

      toast.success(
        "Message deleted successfully"
      );

      router.push("/admin/messages");
    } catch (error: any) {
      console.error(
        "Error deleting message:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to delete message"
      );
    } finally {
      setDeleting(false);
    }
  };

  /* =========================================================
     MARK AS UNREAD
  ========================================================= */

  const handleMarkUnread = async () => {
    if (!message) return;

    try {
      const response = await api.patch(
        `/message/${message._id}/unread`
      );

      if (response.data.data) {
        setMessage(response.data.data);
      } else {
        setMessage((current) =>
          current
            ? {
                ...current,
                read: false,
              }
            : current
        );
      }

      toast.success(
        "Message marked as unread"
      );
    } catch (error: any) {
      console.error(
        "Error marking message as unread:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to mark message as unread"
      );
    }
  };

  /* =========================================================
     REPLY
  ========================================================= */

  const handleReply = async () => {
    if (!message) {
      return;
    }

    if (!replyText.trim()) {
      toast.error(
        "Please enter a reply"
      );

      return;
    }

    try {
      setSendingReply(true);

      const response = await api.post(
        `/message/${message._id}/reply`,
        {
          reply: replyText.trim(),
        }
      );

      if (response.data.data) {
        setMessage(
          response.data.data
        );
      }

      setReplyText("");
      setShowReply(false);

      toast.success(
        "Reply sent successfully"
      );
    } catch (error: any) {
      console.error(
        "Error sending reply:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to send reply"
      );
    } finally {
      setSendingReply(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="lg:hidden min-h-[calc(100vh-100px)] bg-[#0c0a08] flex items-center justify-center px-6">

        <div className="text-center">

          <div className="flex h-14 w-14 mx-auto items-center justify-center border border-[#3b3226] bg-[rgba(196,149,74,0.05)]">

            <Mail
              size={22}
              className="text-[#c4954a]"
            />

          </div>

          <h2 className="mt-4 font-['Fraunces'] text-lg text-[#ede4d4]">
            Loading message
          </h2>

          <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
            Please wait...
          </p>

        </div>

      </div>
    );
  }

  /* =========================================================
     MESSAGE NOT FOUND
  ========================================================= */

  if (!message) {
    return (
      <div className="lg:hidden min-h-[calc(100vh-100px)] bg-[#0c0a08] flex items-center justify-center px-6">

        <div className="text-center">

          <div className="flex h-14 w-14 mx-auto items-center justify-center border border-[#3b3226]">

            <Mail
              size={22}
              className="text-[#8a7d6a]"
            />

          </div>

          <h2 className="mt-4 font-['Fraunces'] text-lg text-[#ede4d4]">
            Message not found
          </h2>

          <button
            type="button"
            onClick={() =>
              router.push("/admin/messages")
            }
            className="mt-5 font-['Jost'] text-xs text-[#c4954a] hover:underline"
          >
            Back to messages
          </button>

        </div>

      </div>
    );
  }

  /* =========================================================
     MOBILE MESSAGE PAGE
  ========================================================= */

  return (
    <div className="lg:hidden min-h-[calc(100vh-100px)] bg-[#0c0a08]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="sticky top-0 z-20 border-b border-[#2d2923] bg-[#0c0a08]">

        <div className="flex h-16 items-center justify-between px-4">

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.push("/admin/messages")
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center text-[#8a7d6a] transition-colors hover:text-[#ede4d4]"
            aria-label="Back to messages"
          >
            <ArrowLeft size={19} />
          </button>


          {/* SUBJECT */}

          <div className="min-w-0 flex-1 px-3">

            <p className="truncate font-['Fraunces'] text-sm text-[#ede4d4]">
              {message.subject}
            </p>

            <p className="mt-0.5 truncate font-['Jost'] text-[10px] text-[#8a7d6a]">
              Received {formatDate(message.createdAt)}
            </p>

          </div>


          {/* ACTIONS */}

          <div className="flex items-center gap-1">

            {/* MARK UNREAD */}

            <button
              type="button"
              onClick={handleMarkUnread}
              className="flex h-9 w-9 items-center justify-center text-[#8a7d6a] transition-colors hover:text-[#c4954a]"
              aria-label="Mark as unread"
            >
              <Mail size={17} />
            </button>


            {/* DELETE */}

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="flex h-9 w-9 items-center justify-center text-[#8a7d6a] transition-colors hover:text-red-400 disabled:opacity-40"
              aria-label="Delete message"
            >
              <Trash2 size={17} />
            </button>

          </div>

        </div>

      </div>


      {/* =====================================================
          MESSAGE CONTENT
      ===================================================== */}

      <div className="px-4 py-5">

        {/* ===================================================
            SENDER
        =================================================== */}

        <div className="flex items-center gap-3">

          {/* AVATAR */}

          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[rgba(196,149,74,0.25)] bg-[rgba(196,149,74,0.10)] font-['DM_Mono'] text-xs text-[#c4954a]">

            {getInitials(message.name)}

          </div>


          {/* USER INFORMATION */}

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <User
                size={12}
                className="shrink-0 text-[#8a7d6a]"
              />

              <p className="truncate font-['Jost'] text-sm text-[#ede4d4]">
                {message.name}
              </p>

            </div>

            <p className="mt-0.5 truncate font-['Jost'] text-[11px] text-[#8a7d6a]">
              {message.email}
            </p>

          </div>

        </div>


        {/* ===================================================
            DATE
        =================================================== */}

        <div className="mt-4 flex items-center justify-between border-b border-[#2d2923] pb-4">

          <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.14em] text-[#8a7d6a]">
            Received
          </p>

          <p className="font-['Jost'] text-[11px] text-[#8a7d6a]">
            {formatDate(message.createdAt)} ·{" "}
            {formatTime(message.createdAt)}
          </p>

        </div>


        {/* ===================================================
            SUBJECT
        =================================================== */}

        <div className="mt-6">

          <p className="mb-2 font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
            Subject
          </p>

          <p className="font-['Jost'] text-sm leading-6 text-[#ede4d4]">
            {message.subject}
          </p>

        </div>


        {/* ===================================================
            MESSAGE
        =================================================== */}

        <div className="mt-7">

          <p className="mb-3 font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
            Message
          </p>

          <div className="min-h-[260px] border border-[#2d2923] bg-[#11100e] p-4">

            <p className="whitespace-pre-line font-['Jost'] text-sm leading-7 text-[#c9c0b1]">
              {message.message}
            </p>

          </div>

        </div>


        {/* ===================================================
            PREVIOUS REPLY
        =================================================== */}

        {message.replied &&
          message.reply?.message && (

            <div className="mt-6">

              <div className="mb-3 flex items-center justify-between">

                <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
                  Your Reply
                </p>

                {message.reply.repliedAt && (
                  <p className="font-['Jost'] text-[10px] text-[#8a7d6a]">
                    {formatDate(
                      message.reply.repliedAt
                    )}
                  </p>
                )}

              </div>

              <div className="border border-[rgba(196,149,74,0.18)] bg-[rgba(196,149,74,0.05)] p-4">

                <p className="whitespace-pre-line font-['Jost'] text-sm leading-7 text-[#c9c0b1]">
                  {message.reply.message}
                </p>

              </div>

            </div>

          )}

      </div>


      {/* =====================================================
          REPLY SECTION
      ===================================================== */}

      <div className="sticky bottom-0 border-t border-[#2d2923] bg-[#0c0a08] p-4">

        {!showReply ? (

          <button
            type="button"
            onClick={() =>
              setShowReply(true)
            }
            className="flex h-12 w-full items-center justify-center gap-2 bg-[#c4954a] font-['Jost'] text-xs font-medium text-[#0c0a08] transition-colors hover:bg-[#d4a65a]"
          >

            <Reply size={15} />

            Reply to {message.name}

          </button>

        ) : (

          <div className="space-y-3">

            {/* REPLY HEADER */}

            <div className="flex items-center justify-between">

              <div className="min-w-0">

                <p className="font-['Jost'] text-xs text-[#ede4d4]">
                  Reply to {message.name}
                </p>

                <p className="mt-0.5 truncate font-['Jost'] text-[10px] text-[#8a7d6a]">
                  {message.email}
                </p>

              </div>


              {/* CLOSE */}

              <button
                type="button"
                onClick={() => {
                  setShowReply(false);
                  setReplyText("");
                }}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4]"
                aria-label="Close reply"
              >
                <X size={16} />
              </button>

            </div>


            {/* TEXTAREA */}

            <textarea
              autoFocus
              value={replyText}
              onChange={(event) =>
                setReplyText(
                  event.target.value
                )
              }
              placeholder="Write your reply..."
              rows={5}
              className="
                w-full
                resize-none
                border
                border-[#3b3226]
                bg-[#11100e]
                px-3
                py-3
                font-['Jost']
                text-sm
                leading-6
                text-[#ede4d4]
                outline-none
                placeholder:text-[#8a7d6a]/50
                focus:border-[#c4954a]
              "
            />


            {/* BUTTONS */}

            <div className="flex gap-2">

              <button
                type="button"
                onClick={() => {
                  setShowReply(false);
                  setReplyText("");
                }}
                className="
                  flex-1
                  border
                  border-[#3b3226]
                  py-3
                  font-['Jost']
                  text-xs
                  text-[#8a7d6a]
                  transition-colors
                  hover:text-[#ede4d4]
                "
              >
                Cancel
              </button>


              <button
                type="button"
                onClick={handleReply}
                disabled={
                  !replyText.trim() ||
                  sendingReply
                }
                className="
                  flex
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  bg-[#c4954a]
                  py-3
                  font-['Jost']
                  text-xs
                  font-medium
                  text-[#0c0a08]
                  transition-colors
                  hover:bg-[#d4a65a]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >

                <Reply size={14} />

                {sendingReply
                  ? "Sending..."
                  : "Send Reply"}

              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}