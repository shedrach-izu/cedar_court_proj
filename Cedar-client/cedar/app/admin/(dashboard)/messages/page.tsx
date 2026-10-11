"use client";

import { useMemo, useState } from "react";
import {
  Mail,
  Search,
  Trash2,
  Reply,
  User,
  X,
  ArrowLeft,
} from "lucide-react";

type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
};

const initialMessages: Message[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    subject: "General Enquiry",
    message:
      "Hello Cedar Court, I would like to know more about your apartments and whether you have availability during the Christmas period. I am planning a short stay with my family and would appreciate some information about your available rooms.",
    date: "Oct 11, 2026",
    read: false,
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@email.com",
    subject: "Apartment Enquiry",
    message:
      "Hi, I am interested in booking one of your apartments for three nights. Could you please let me know what is included with the apartment and whether breakfast is available?",
    date: "Oct 10, 2026",
    read: false,
  },
  {
    id: "3",
    name: "David Okafor",
    email: "david.okafor@email.com",
    subject: "Restaurant Enquiry",
    message:
      "Good afternoon. I would like to ask if I can make a restaurant reservation for six people this weekend. Please let me know what times are available.",
    date: "Oct 09, 2026",
    read: true,
  },
  {
    id: "4",
    name: "Amaka Eze",
    email: "amaka.eze@email.com",
    subject: "Booking Question",
    message:
      "I have a question about checking in. What time does check-in begin and is it possible to arrive earlier if my flight gets in early?",
    date: "Oct 08, 2026",
    read: true,
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    subject: "General Enquiry",
    message:
      "Hello, I came across Cedar Court and would like to know if you offer long-stay accommodation. I am looking for somewhere comfortable for approximately two weeks.",
    date: "Oct 07, 2026",
    read: true,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  const [selectedMessageId, setSelectedMessageId] =
    useState<string | null>(null);

  const [filter, setFilter] =
    useState<"all" | "unread" | "read">("all");

  const [search, setSearch] = useState("");

  const [showReply, setShowReply] =
    useState(false);

  const [replyText, setReplyText] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | FILTER MESSAGES
  |--------------------------------------------------------------------------
  */

  const filteredMessages = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return messages.filter((message) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "unread" && !message.read) ||
        (filter === "read" && message.read);

      const matchesSearch =
        message.name.toLowerCase().includes(searchTerm) ||
        message.email.toLowerCase().includes(searchTerm) ||
        message.subject.toLowerCase().includes(searchTerm) ||
        message.message.toLowerCase().includes(searchTerm);

      return matchesFilter && matchesSearch;
    });
  }, [messages, filter, search]);

  /*
  |--------------------------------------------------------------------------
  | SELECTED MESSAGE
  |--------------------------------------------------------------------------
  */

  const selectedMessage =
    messages.find(
      (message) => message.id === selectedMessageId
    ) ?? null;

  /*
  |--------------------------------------------------------------------------
  | UNREAD COUNT
  |--------------------------------------------------------------------------
  */

  const unreadCount = messages.filter(
    (message) => !message.read
  ).length;

  /*
  |--------------------------------------------------------------------------
  | GET INITIALS
  |--------------------------------------------------------------------------
  */

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN MESSAGE
  |--------------------------------------------------------------------------
  */

  const openMessage = (id: string) => {
    setSelectedMessageId(id);
    setShowReply(false);
    setReplyText("");

    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === id
          ? {
              ...message,
              read: true,
            }
          : message
      )
    );
  };

  /*
  |--------------------------------------------------------------------------
  | MARK AS UNREAD
  |--------------------------------------------------------------------------
  */

  const markAsUnread = (id: string) => {
    setMessages((currentMessages) =>
      currentMessages.map((message) =>
        message.id === id
          ? {
              ...message,
              read: false,
            }
          : message
      )
    );
  };

  /*
  |--------------------------------------------------------------------------
  | DELETE MESSAGE
  |--------------------------------------------------------------------------
  */

  const deleteMessage = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) {
      return;
    }

    setMessages((currentMessages) =>
      currentMessages.filter(
        (message) => message.id !== id
      )
    );

    if (selectedMessageId === id) {
      setSelectedMessageId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | REPLY
  |--------------------------------------------------------------------------
  */

  const handleReply = () => {
    if (!replyText.trim()) {
      return;
    }

    /*
      Backend email functionality will be connected here later.
    */

    alert(
      "Reply functionality will be connected to the backend later."
    );

    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="space-y-7">

      {/* =========================================================
          PAGE HEADER
      ========================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2">

            <Mail
              size={15}
              className="text-[#c4954a]"
            />

            <span className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#8a7d6a]">
              Communication
            </span>

          </div>

          <h1 className="font-['Fraunces'] text-2xl text-[#ede4d4]">
            Messages
          </h1>

          <p className="mt-1 font-['Jost'] text-sm text-[#8a7d6a]">
            Manage enquiries and messages from Cedar Court guests.
          </p>
        </div>

        <div className="flex items-center gap-2 font-['DM_Mono'] text-xs text-[#8a7d6a]">

          <span className="h-2 w-2 rounded-full bg-[#c4954a]" />

          {unreadCount} unread

        </div>

      </div>


      {/* =========================================================
          MAIN MESSAGE CONTAINER
      ========================================================= */}

      <div className="min-h-[650px] border border-[#2d2923] bg-[#11100e]">

        {/* =======================================================
            TOOLBAR
        ======================================================= */}

        <div className="flex flex-col gap-4 border-b border-[#2d2923] p-4 lg:flex-row lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-sm">

            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search messages..."
              className="
                h-10
                w-full
                border
                border-[#3b3226]
                bg-[#0c0a08]
                pl-9
                pr-3
                font-['Jost']
                text-sm
                text-[#ede4d4]
                outline-none
                placeholder:text-[#8a7d6a]/50
                focus:border-[#c4954a]
              "
            />

          </div>


          {/* FILTERS */}

          <div className="flex items-center gap-1 overflow-x-auto">

            {[
              {
                value: "all",
                label: "All",
              },
              {
                value: "unread",
                label: "Unread",
              },
              {
                value: "read",
                label: "Read",
              },
            ].map((item) => {

              const active = filter === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() =>
                    setFilter(
                      item.value as
                        | "all"
                        | "unread"
                        | "read"
                    )
                  }
                  className={`
                    shrink-0
                    border
                    px-4
                    py-2
                    font-['DM_Mono']
                    text-[10px]
                    uppercase
                    tracking-[0.12em]
                    transition-colors
                    ${
                      active
                        ? "border-[#c4954a] bg-[#c4954a] text-[#0c0a08]"
                        : "border-[#3b3226] text-[#8a7d6a] hover:text-[#ede4d4]"
                    }
                  `}
                >
                  {item.label}
                </button>
              );
            })}

          </div>

        </div>


        {/* =======================================================
            MESSAGE CONTENT
        ======================================================= */}

        <div className="grid min-h-[590px] grid-cols-1 lg:grid-cols-[360px_1fr]">

          {/* =====================================================
              MESSAGE LIST
          ===================================================== */}

          <div className="border-r border-[#2d2923]">

            {filteredMessages.length === 0 ? (

              <div className="flex min-h-[400px] flex-col items-center justify-center px-5 text-center">

                <Mail
                  size={28}
                  className="mb-3 text-[#8a7d6a]"
                />

                <p className="font-['Fraunces'] text-lg text-[#ede4d4]">
                  No messages found
                </p>

                <p className="mt-1 text-xs text-[#8a7d6a]">
                  Try changing your search or filter.
                </p>

              </div>

            ) : (

              <div>

                {filteredMessages.map((message) => {

                  const isSelected =
                    selectedMessageId === message.id;

                  return (
                    <button
                      key={message.id}
                      type="button"
                      onClick={() =>
                        openMessage(message.id)
                      }
                      className={`
                        group
                        w-full
                        border-b
                        border-[#2d2923]
                        border-l-2
                        px-4
                        py-4
                        text-left
                        transition-colors
                        ${
                          isSelected
                            ? "border-l-[#c4954a] bg-[rgba(196,149,74,0.07)]"
                            : "border-l-transparent hover:bg-white/[0.02]"
                        }
                      `}
                    >

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex min-w-0 items-start gap-3">

                          {/* AVATAR */}

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[rgba(196,149,74,0.1)] font-['DM_Mono'] text-[10px] text-[#c4954a]">
                            {getInitials(message.name)}
                          </div>


                          {/* MESSAGE PREVIEW */}

                          <div className="min-w-0">

                            <div className="flex items-center gap-2">

                              {!message.read && (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#c4954a]" />
                              )}

                              <p
                                className={`
                                  truncate
                                  font-['Jost']
                                  text-sm
                                  ${
                                    message.read
                                      ? "text-[#ede4d4]"
                                      : "font-medium text-[#fff8eb]"
                                  }
                                `}
                              >
                                {message.name}
                              </p>

                            </div>

                            <p className="mt-0.5 truncate font-['Jost'] text-[11px] text-[#c4954a]">
                              {message.subject}
                            </p>

                            <p className="mt-1 line-clamp-1 font-['Jost'] text-xs text-[#8a7d6a]">
                              {message.message}
                            </p>

                          </div>

                        </div>


                        {/* DATE */}

                        <span className="shrink-0 font-['DM_Mono'] text-[9px] text-[#8a7d6a]">
                          {message.date}
                        </span>

                      </div>

                    </button>
                  );
                })}

              </div>

            )}

          </div>


          {/* =====================================================
              MESSAGE DETAILS
          ===================================================== */}

          <div className="min-w-0">

            {selectedMessage ? (

              <div className="flex h-full min-h-[590px] flex-col">

                {/* =================================================
                    DETAIL HEADER
                ================================================= */}

                <div className="flex items-center justify-between gap-4 border-b border-[#2d2923] px-5 py-4">

                  <div className="flex min-w-0 items-center gap-3">

                    {/* MOBILE BACK */}

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedMessageId(null)
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] lg:hidden"
                    >
                      <ArrowLeft size={16} />
                    </button>


                    <div className="min-w-0">

                      <h2 className="truncate font-['Fraunces'] text-lg text-[#ede4d4]">
                        {selectedMessage.subject}
                      </h2>

                      <p className="mt-0.5 text-xs text-[#8a7d6a]">
                        Received {selectedMessage.date}
                      </p>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="flex shrink-0 items-center gap-1">

                    <button
                      type="button"
                      onClick={() =>
                        markAsUnread(
                          selectedMessage.id
                        )
                      }
                      title="Mark as unread"
                      className="flex h-8 w-8 items-center justify-center text-[#8a7d6a] transition-colors hover:bg-white/5 hover:text-[#c4954a]"
                    >
                      <Mail size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteMessage(
                          selectedMessage.id
                        )
                      }
                      title="Delete message"
                      className="flex h-8 w-8 items-center justify-center text-[#8a7d6a] transition-colors hover:bg-red-400/5 hover:text-red-400"
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                </div>


                {/* =================================================
                    MESSAGE BODY
                ================================================= */}

                <div className="flex-1 overflow-y-auto p-5">

                  {/* SENDER */}

                  <div className="mb-7 flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-[rgba(196,149,74,0.25)] bg-[rgba(196,149,74,0.12)] font-['DM_Mono'] text-xs text-[#c4954a]">
                      {getInitials(
                        selectedMessage.name
                      )}
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <User
                          size={13}
                          className="text-[#8a7d6a]"
                        />

                        <p className="font-['Jost'] text-sm text-[#ede4d4]">
                          {selectedMessage.name}
                        </p>

                      </div>

                      <p className="mt-0.5 font-['Jost'] text-xs text-[#8a7d6a]">
                        {selectedMessage.email}
                      </p>

                    </div>

                  </div>


                  {/* SUBJECT */}

                  <div className="mb-6">

                    <p className="mb-2 font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
                      Subject
                    </p>

                    <p className="font-['Jost'] text-sm text-[#ede4d4]">
                      {selectedMessage.subject}
                    </p>

                  </div>


                  {/* MESSAGE */}

                  <div>

                    <p className="mb-3 font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
                      Message
                    </p>

                    <p className="max-w-3xl whitespace-pre-line font-['Jost'] text-sm leading-7 text-[#c9c0b1]">
                      {selectedMessage.message}
                    </p>

                  </div>

                </div>


                {/* =================================================
                    REPLY AREA
                ================================================= */}

                <div className="border-t border-[#2d2923] p-4">

                  {!showReply ? (

                    <button
                      type="button"
                      onClick={() =>
                        setShowReply(true)
                      }
                      className="flex h-11 w-full items-center justify-center gap-2 bg-[#c4954a] font-['Jost'] text-xs font-medium text-[#0c0a08] transition-colors hover:bg-[#d4a65a]"
                    >
                      <Reply size={15} />

                      Reply to {selectedMessage.name}
                    </button>

                  ) : (

                    <div className="space-y-3">

                      {/* REPLY HEADER */}

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="font-['Jost'] text-xs text-[#ede4d4]">
                            Reply to {selectedMessage.name}
                          </p>

                          <p className="mt-0.5 text-[10px] text-[#8a7d6a]">
                            {selectedMessage.email}
                          </p>

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setShowReply(false)
                          }
                          className="flex h-7 w-7 items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4]"
                        >
                          <X size={15} />
                        </button>

                      </div>


                      {/* TEXTAREA */}

                      <textarea
                        value={replyText}
                        onChange={(event) =>
                          setReplyText(
                            event.target.value
                          )
                        }
                        placeholder="Write your reply..."
                        rows={4}
                        className="
                          w-full
                          resize-none
                          border
                          border-[#3b3226]
                          bg-[#0c0a08]
                          px-3
                          py-3
                          font-['Jost']
                          text-sm
                          text-[#ede4d4]
                          outline-none
                          placeholder:text-[#8a7d6a]/50
                          focus:border-[#c4954a]
                        "
                      />


                      {/* BUTTONS */}

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() => {
                            setShowReply(false);
                            setReplyText("");
                          }}
                          className="
                            border
                            border-[#3b3226]
                            px-4
                            py-2
                            font-['Jost']
                            text-xs
                            text-[#8a7d6a]
                            hover:text-[#ede4d4]
                          "
                        >
                          Cancel
                        </button>

                        <button
                          type="button"
                          onClick={handleReply}
                          disabled={!replyText.trim()}
                          className="
                            flex
                            items-center
                            gap-2
                            bg-[#c4954a]
                            px-4
                            py-2
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

                          Send Reply
                        </button>

                      </div>

                    </div>

                  )}

                </div>

              </div>

            ) : (

              /* =================================================
                 NO MESSAGE SELECTED
              ================================================= */

              <div className="flex min-h-[590px] flex-col items-center justify-center px-5 text-center">

                <div className="mb-4 flex h-14 w-14 items-center justify-center border border-[#3b3226] bg-[rgba(196,149,74,0.04)]">

                  <Mail
                    size={23}
                    className="text-[#c4954a]"
                  />

                </div>

                <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                  Select a message
                </h2>

                <p className="mt-1 max-w-sm font-['Jost'] text-xs leading-5 text-[#8a7d6a]">
                  Select a message from the list to view the enquiry and respond to the guest.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}