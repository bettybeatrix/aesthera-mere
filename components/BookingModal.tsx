
"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";
import { treatmentCategories } from "@/data/treatments";
import { CLASSPASS_URL } from "@/lib/classpass";

type BookingModalProps = {
  onClose: () => void;
  initialTreatment?: string;
  initialDoctor?: string;
};

type AppointmentType = "consultation" | "treatment";
type ConsultationType = "in-clinic" | "online";

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM",
  "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM",
];

const doctors = ["Dr. Dan", "Dr. Raine", "Dr. Ian"];

const doctorLedGroups = new Set([
  "botox-treatments",
  "dermal-fillers",
  "signature-skin-boosters",
  "renewal-therapy",
  "collagen-treatments",
  "weight-management",
]);

const treatmentOptions = treatmentCategories.flatMap((category) =>
  category.groups.flatMap((group) =>
    group.treatments.map((treatment) => ({
      name: treatment.name,
      doctorLed: doctorLedGroups.has(group.slug),
    }))
  )
);

const doctorLedTreatments = new Set(
  treatmentOptions
    .filter((treatment) => treatment.doctorLed)
    .map((treatment) => treatment.name)
);

const fieldClass =
  "w-full min-h-11 rounded-[10px] border border-[#DDD6C8] " +
  "bg-[#FFFEFB] px-3 py-2 font-montserrat text-[13px] lg:min-h-10 " +
  "text-[#4C5534] outline-none transition-colors " +
  "placeholder:text-[#898779] " +
  "focus:border-[#4C5534] focus:ring-1 focus:ring-[#4C5534]/15";

const labelClass =
  "mb-1 block font-montserrat text-[11px] font-semibold text-[#4C5534]";

const cardClass =
  "rounded-[18px] border border-[#E3DDD1] bg-white p-4";

function getToday() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const part = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "";

  return `${part("year")}-${part("month")}-${part("day")}`;
}

function makeDate(year: number, month: number, day: number) {
  return (
    `${year}-${String(month + 1).padStart(2, "0")}-` +
    String(day).padStart(2, "0")
  );
}

function readableDate(value: string) {
  if (!value) return "No date selected";

  const [year, month, day] = value.split("-").map(Number);

  return new Date(year, month - 1, day).toLocaleDateString(
    "en-PH",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
}

export default function BookingModal({
  onClose,
  initialTreatment = "",
  initialDoctor = "",
}: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [today] = useState(getToday);
  const [month, setMonth] = useState<{
    year: number;
    index: number;
  }>(() => {
    const [year, monthNumber] = getToday().split("-").map(Number);
    return { year, index: monthNumber - 1 };
  });

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [appointmentType, setAppointmentType] =
    useState<AppointmentType>(initialTreatment ? "treatment" : "consultation");
  const [consultationType, setConsultationType] =
    useState<ConsultationType>("in-clinic");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [treatment, setTreatment] = useState(initialTreatment);
  const [doctor, setDoctor] = useState(initialDoctor);
  const [notes, setNotes] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [preview, setPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const items = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), ' +
          'select:not([disabled]), textarea:not([disabled]), a[href]'
        )
      ).filter((item) => item.getClientRects().length > 0);

      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey &&
        document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [onClose]);

  useEffect(() => {
    if (preview || submitted) {
      modalRef.current?.querySelector<HTMLElement>("#booking-title")?.focus();
    }
  }, [preview, submitted]);

  const year = month?.year ?? 2026;
  const monthIndex = month?.index ?? 0;

  const firstDay = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();

  const days = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ] as (number | null)[];

  const canGoBack =
    month !== null &&
    makeDate(year, monthIndex, 1).slice(0, 7) >
      today.slice(0, 7);

  const isDoctorTreatment =
    appointmentType === "treatment" && doctorLedTreatments.has(treatment);
  const showDoctorField =
    isDoctorTreatment ||
    (appointmentType === "consultation" && Boolean(initialDoctor));
  const service = appointmentType === "consultation"
    ? consultationType === "online"
      ? "Online Consultation"
      : "In-Clinic Consultation"
    : treatment || "Treatment not selected";

  function changeMonth(direction: number) {
    const next = new Date(year, monthIndex + direction, 1);
    setMonth({
      year: next.getFullYear(),
      index: next.getMonth(),
    });
    setDate("");
    setTime("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!date || !time || !privacy) return;
    setPreview(true);
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/55 p-0 backdrop-blur-sm md:p-3 lg:items-center lg:p-0 xl:p-2"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        className={`relative flex min-h-[100dvh] w-full flex-col bg-[#F6F3ED] shadow-[0_25px_80px_rgba(0,0,0,0.18)] md:min-h-0 md:rounded-[22px] ${preview || submitted ? "md:h-[540px] md:max-w-[820px]" : "md:max-w-[960px]"}`}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close appointment form"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full text-lg text-[#4C5534] transition hover:bg-[#4C5534]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]"
        >
          ×
        </button>

        {/* HEADER */}
        {!preview && !submitted && <header className="shrink-0 px-12 pb-3 pt-3 text-center">
          <div>
            <p className="font-montserrat text-[10px] font-medium uppercase tracking-[0.25em] text-[#80755F]">AESTHERA MÈRE</p>
            <h2 id="booking-title" className="mt-1 font-seasons text-[33px] leading-none text-[#4C5534]">Book Your Appointment</h2>
            <p className="mt-2 font-montserrat text-[12px] text-[#777568]">Your journey to feeling your best begins here.</p>
          </div>
          <p className="mt-2 font-montserrat text-[11px] leading-5 text-[#5C675D]">
              Already a ClassPass member?{" "}
              <a
                href={CLASSPASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm font-semibold text-[#4C5534] underline underline-offset-4 hover:text-[#35452F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]"
              >
                View eligible treatments{" "}
                <ChevronRightIcon className="inline-block h-3 w-3 align-middle" />
              </a>
          </p>
        </header>}

        {submitted ? (
          <section className="px-5 pb-5 pt-7 text-center sm:px-8 md:flex md:flex-1 md:flex-col md:justify-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#C9AD76] bg-[#F8F5EC]" aria-hidden="true">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#4C5534] shadow-sm">
                <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4L19 6" /></svg>
              </span>
            </div>
            <p className="mt-3 font-montserrat text-[10px] font-medium uppercase tracking-[0.28em] text-[#80755F]">AESTHERA MÈRE</p>
            <h2 id="booking-title" tabIndex={-1} className="mx-auto mt-1 font-seasons text-[33px] leading-[1.08] text-[#4C5534] outline-none">Your appointment has been successfully booked.</h2>
            <p className="mx-auto mt-2 font-montserrat text-[12px] leading-5 text-[#777568]">We look forward to welcoming you to Aesthera Mère.</p>

            <div className="mt-4 rounded-[12px] border border-[#DAD2C2] bg-white p-4 text-left">
              <div className="flex items-center justify-between gap-3 border-b border-[#E3DDD1] pb-3">
                <p className="font-montserrat text-[10px] uppercase tracking-[0.12em] text-[#80755F]">Appointment Details</p>
              </div>
              <dl className="mt-3 grid gap-x-5 gap-y-3 font-montserrat text-[12px] text-[#4C5534] sm:grid-cols-2">
                <div><dt className="text-[10px] uppercase text-[#80755F]">Date</dt><dd className="mt-1">{readableDate(date)}</dd></div>
                <div><dt className="text-[10px] uppercase text-[#80755F]">Time</dt><dd className="mt-1">{time}</dd></div>
                <div><dt className="text-[10px] uppercase text-[#80755F]">Service</dt><dd className="mt-1">{service}</dd></div>
                {showDoctorField && doctor && <div><dt className="text-[10px] uppercase text-[#80755F]">Doctor</dt><dd className="mt-1">{doctor}</dd></div>}
                <div><dt className="text-[10px] uppercase text-[#80755F]">Email</dt><dd className="mt-1 break-words">{email.toLowerCase()}</dd></div>
              </dl>
            </div>
            <div className="mt-4 flex justify-center">
              <button type="button" onClick={onClose} className="min-h-11 min-w-36 rounded-full bg-[#4C5534] px-8 font-montserrat text-[12px] font-medium text-white transition hover:bg-[#39432D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]">Done</button>
            </div>
          </section>
        ) : preview ? (
          <section className="px-5 pb-5 pt-7 sm:px-7 md:flex md:flex-1 md:flex-col md:justify-center">
            <div className="text-center">
              <div className="mx-auto h-px w-10 bg-[#C9AD76]" />
              <p className="mt-2 font-montserrat text-[10px] uppercase tracking-[0.24em] text-[#80755F]">The Final Details</p>
              <h2 id="booking-title" tabIndex={-1} className="mt-1 font-seasons text-[35px] leading-none text-[#4C5534] outline-none">Appointment Preview</h2>
              <p className="mt-2 font-montserrat text-[12px] text-[#777568]">Review your details before continuing.</p>
            </div>

            <div className="mt-4 rounded-[13px] border border-[#E3DDD1] bg-white p-4 font-montserrat text-[#4C5534]">
              <div className="grid gap-4 sm:grid-cols-[0.9fr_1.1fr]">
                <div className="sm:border-r sm:border-[#E3DDD1] sm:pr-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-[#80755F]">Selected Schedule</p>
                    <button type="button" onClick={() => setPreview(false)} className="text-[11px] underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534]">Edit</button>
                  </div>
                  <p className="mt-3 font-seasons text-[25px] leading-tight">{readableDate(date)}</p>
                  <p className="mt-2 text-[12px]">{time} · {service}</p>
                  {showDoctorField && doctor && <p className="mt-1 text-[11px] text-[#777568]">Preferred Doctor: {doctor}</p>}
                  <p className="mt-3 text-[10px] leading-4 text-[#777568]">Preferred times are subject to availability.</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#80755F]">Personal Information</p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3 text-[12px]">
                    <div><dt className="text-[10px] uppercase text-[#80755F]">First Name</dt><dd className="mt-1">{firstName}</dd></div>
                    <div><dt className="text-[10px] uppercase text-[#80755F]">Last Name</dt><dd className="mt-1">{lastName}</dd></div>
                    <div><dt className="text-[10px] uppercase text-[#80755F]">Contact Number</dt><dd className="mt-1">{phone}</dd></div>
                    <div><dt className="text-[10px] uppercase text-[#80755F]">Email Address</dt><dd className="mt-1 break-words">{email.toLowerCase()}</dd></div>
                  </dl>
                </div>
              </div>
              <div className="mt-4 grid gap-3 border-t border-[#E3DDD1] pt-3 text-[11px] sm:grid-cols-[0.9fr_1.1fr]">
                <div><p className="text-[10px] uppercase text-[#80755F]">Appointment Type</p><p className="mt-1 capitalize">{appointmentType}</p></div>
                <div><p className="text-[10px] uppercase text-[#80755F]">Additional Notes</p><p className="mt-1 break-words">{notes || "No additional notes provided."}</p></div>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => setPreview(false)} className="min-h-11 rounded-full border border-[#C9C6B8] px-6 font-montserrat text-[12px] text-[#4C5534] hover:bg-white sm:flex-1">Back to Booking</button>
              <button type="button" onClick={() => setSubmitted(true)} className="min-h-11 rounded-full bg-[#4C5534] px-6 font-montserrat text-[12px] font-medium text-white hover:bg-[#39432D] sm:flex-[1.4]">Confirm Details</button>
            </div>
          </section>
        ) : (
          <form
            id="booking-form"
            onSubmit={handleSubmit}
            className="grid items-start gap-4 px-4 pb-2 lg:grid-cols-[0.92fr_1.08fr] lg:px-6"
          >
            {/* LEFT WHITE CARD */}
            <section className={cardClass}>
              <h3 className="mb-3 font-seasons text-[27px] leading-tight
                text-[#4C5534]">
                Select Your Schedule
              </h3>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_104px]">
                <div className="min-w-0 sm:pr-1">
                  <div className="mb-2 flex items-center justify-between gap-1">
                    <button type="button" disabled={!canGoBack} onClick={() => changeMonth(-1)} aria-label="Previous month" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E3DDD1] text-[#4C5534] transition hover:bg-[#F6F3ED] disabled:opacity-30">
                      <ChevronLeftIcon className="h-4 w-4" />
                    </button>
                    <span className="text-center font-montserrat text-[11px] font-medium text-[#4C5534]">
                      {month ? new Date(year, monthIndex, 1).toLocaleDateString("en-PH", { month: "long", year: "numeric" }) : "Loading"}
                    </span>
                    <button type="button" aria-label="Next month" onClick={() => changeMonth(1)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E3DDD1] text-[#4C5534] transition hover:bg-[#F6F3ED]">
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 text-center">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((item) => (
                      <span key={item} className="py-1 font-montserrat text-[10px] text-[#777568]">{item}</span>
                    ))}
                    {days.map((day, index) => {
                      if (!day || !month) return <div key={`empty-${index}`} />;
                      const value = makeDate(year, monthIndex, day);
                      const selected = date === value;
                      return (
                        <button key={value} type="button" disabled={value < today} aria-pressed={selected} aria-label={readableDate(value)} onClick={() => { setDate(value); setTime(""); }} className={`mx-auto flex h-8 w-8 items-center justify-center rounded-[8px] font-montserrat text-[11px] transition ${selected ? "bg-[#4C5534] text-white" : "text-[#4C5534] hover:bg-[#F6F3ED]"} disabled:cursor-not-allowed disabled:opacity-25`}>
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-[#E3DDD1] pt-2 sm:border-l sm:border-t-0 sm:pl-2 sm:pt-0">
                  <h4 className="mb-1 text-center font-montserrat text-[10px] font-medium text-[#4C5534]">Preferred Time</h4>
                  <div className="grid max-h-48 grid-cols-3 gap-1 overflow-y-auto overscroll-contain pr-1 [scrollbar-width:thin] sm:flex sm:flex-col sm:gap-0.5">
                    {timeSlots.map((slot) => (
                      <button key={slot} type="button" disabled={!date} aria-pressed={time === slot} onClick={() => setTime(slot)} className={`min-h-9 rounded-[6px] px-1 font-montserrat text-[10px] transition sm:min-h-6 ${time === slot ? "bg-[#4C5534] font-semibold text-white" : "text-[#4C5534] hover:bg-[#F6F3ED]"} disabled:opacity-35`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 border-t border-[#E3DDD1] pt-3">
                <div className="rounded-[10px] bg-[#F6F3ED] px-3 py-2 font-montserrat">
                  <p className="text-[10px] uppercase tracking-[0.06em] text-[#80755F]">Selected Schedule</p>
                  <p className="mt-0.5 text-[11px] font-medium text-[#4C5534]">{date ? readableDate(date) : "Select a date"} · {time || "Select a time"}</p>
                </div>
              </div>

            </section>

            {/* RIGHT WHITE CARD */}
            <section className={`${cardClass} space-y-2`}>
              <h3 className="font-seasons text-[27px] leading-tight
                text-[#4C5534]">
                Appointment Details
              </h3>

              {/* APPOINTMENT TYPE */}
              <div className="space-y-2">
              <div>
                <p className={labelClass}>Appointment Type</p>
                <div className="flex rounded-full border
                  border-[#E3DDD1] bg-[#F6F3ED] p-1">
                  {(["consultation", "treatment"] as const).map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={appointmentType === item}
                        onClick={() => {
                          setAppointmentType(item);
                          if (item === "consultation") {
                            setTreatment("");
                            setDoctor(initialDoctor);
                          } else if (!doctorLedTreatments.has(treatment)) {
                            setDoctor("");
                          }
                        }}
                        className={`min-h-9 flex-1 rounded-full px-3 py-1.5
                          font-montserrat text-[12px]
                          capitalize transition
                          ${appointmentType === item
                            ? "bg-[#4C5534] text-white shadow-sm"
                            : "text-[#4C5534] hover:bg-white"}`}
                      >
                        {item}
                      </button>
                    )
                  )}
                </div>
              </div>

              {appointmentType === "consultation" && (
                <div>
                  <p className={labelClass}>Consultation Type</p>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      ["in-clinic", "In-Clinic"],
                      ["online", "Online"],
                    ] as const).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      aria-pressed={consultationType === value}
                      onClick={() => setConsultationType(value)}
                      className={`min-h-10 rounded-full border px-3
                        py-1.5 font-montserrat text-xs transition
                        ${consultationType === value
                          ? "border-[#4C5534] bg-[#4C5534]/10 text-[#4C5534]"
                          : "border-[#E3DDD1] bg-white text-[#777568] hover:bg-[#F6F3ED]"}`}
                    >
                      {label}
                    </button>
                    ))}
                  </div>
                </div>
              )}
              </div>

              {/* NAME */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-first-name" className={labelClass}>
                    First Name *
                  </label>
                  <input
                    id="booking-first-name"
                    required
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    placeholder="First name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="booking-last-name" className={labelClass}>
                    Last Name *
                  </label>
                  <input
                    id="booking-last-name"
                    required
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    placeholder="Last name"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* CONTACT */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="booking-phone" className={labelClass}>
                    Contact Number *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    pattern="[0-9+() -]{7,20}"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="09XXXXXXXXX"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="booking-email" className={labelClass}>
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    placeholder="you@email.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              {/* TREATMENT */}
              <div className={appointmentType === "treatment" && showDoctorField ? "grid gap-3 sm:grid-cols-2" : ""}>
              {appointmentType === "treatment" && (
                <div>
                  <label
                    htmlFor="booking-treatment"
                    className={labelClass}
                  >
                    Select Treatment *
                  </label>
                  <select
                    id="booking-treatment"
                    required
                    value={treatment}
                    onChange={(event) => {
                      const nextTreatment = event.target.value;
                      setTreatment(nextTreatment);
                      if (doctorLedTreatments.has(nextTreatment)) {
                        if (!doctor && initialDoctor) setDoctor(initialDoctor);
                      } else {
                        setDoctor("");
                      }
                    }}
                    className={fieldClass}
                  >
                    <option value="">Select a treatment</option>
                    {treatment && !treatmentOptions.some((item) => item.name === treatment) && (
                      <option value={treatment}>{treatment}</option>
                    )}
                    {treatmentOptions.map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                    <option value="Other Treatment">Other Treatment</option>
                  </select>
                </div>
              )}

              {showDoctorField && (
                <div>
                  <label htmlFor="booking-doctor" className={labelClass}>
                    Preferred Doctor
                  </label>
                  <select
                    id="booking-doctor"
                    value={doctor}
                    onChange={(event) => setDoctor(event.target.value)}
                    className={fieldClass}
                  >
                    <option value="">No preference</option>
                    {doctors.map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}
              </div>

              {/* NOTES */}
              <div>
                <label htmlFor="booking-notes" className={labelClass}>{appointmentType === "consultation" ? "What would you like to discuss? (Optional)" : "Additional Notes (Optional)"}</label>
                <textarea id="booking-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us about your concerns or requests" className={`${fieldClass} resize-y`} />
              </div>

              {/* PRIVACY */}
              <label className="flex items-start gap-2
                font-montserrat text-[10px] leading-4
                text-[#777568]">
                <input
                  type="checkbox"
                  checked={privacy}
                  required
                  onChange={(e) => setPrivacy(e.target.checked)}
                  className="mt-1 accent-[#4C5534]"
                />
                <span>
                  I have read the{" "}
                  <Link href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#4C5534] underline underline-offset-2">
                    Privacy Policy
                  </Link> and agree to continue with this appointment form.
                </span>
              </label>

            </section>
          </form>
        )}

        {!preview && !submitted && (
          <footer className="shrink-0 border-t border-[#E3DDD1] bg-[#F6F3ED] px-4 py-2 md:px-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
              <div className="min-w-0 font-montserrat">
                <p className="text-[11px] font-semibold text-[#4C5534]">Your Appointment</p>
                <p className="text-[12px] leading-5 text-[#777568]">
                  {date ? readableDate(date) : "Select a date"} · {time || "Select a time"} · {service}
                </p>
                {showDoctorField && doctor && (
                  <p className="text-[11px] text-[#777568]">Preferred Doctor: {doctor}</p>
                )}
              </div>
              <button
                type="submit"
                form="booking-form"
                disabled={!date || !time || !privacy}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full bg-[#4C5534] px-6 py-3 font-montserrat text-[12px] font-medium text-white transition hover:bg-[#39432D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5534] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Preview Appointment Request <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}
