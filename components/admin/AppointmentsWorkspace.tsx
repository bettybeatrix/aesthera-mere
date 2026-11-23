"use client";

import { useMemo, useState, type SVGProps } from "react";

type AppointmentStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

type Appointment = {
  id: string;
  time: string;
  endTime: string;
  patient: string;
  initials: string;
  treatment: string;
  type: "Consultation" | "Treatment";
  doctor: string;
  status: AppointmentStatus;
  source: string;
  phone: string;
  email: string;
  note: string;
  color: string;
};

const appointments: Appointment[] = [
  { id: "APT-1024", time: "9:00 AM", endTime: "10:00 AM", patient: "Sofia Reyes", initials: "SR", treatment: "Oxy Radiance Facial", type: "Treatment", doctor: "Dr. Raine", status: "Confirmed", source: "Website", phone: "+63 917 000 1024", email: "sofia@example.com", note: "Returning patient. Prefers a gentle extraction step.", color: "bg-[#dde8dc] text-[#426047]" },
  { id: "APT-1025", time: "10:30 AM", endTime: "11:00 AM", patient: "Bianca Lim", initials: "BL", treatment: "Skin consultation", type: "Consultation", doctor: "Dr. Dan", status: "Confirmed", source: "Instagram", phone: "+63 917 000 1025", email: "bianca@example.com", note: "First visit. Interested in options for uneven skin tone.", color: "bg-[#e8ded1] text-[#755c47]" },
  { id: "APT-1026", time: "1:00 PM", endTime: "2:00 PM", patient: "Mika Santos", initials: "MS", treatment: "Thera JuveLook", type: "Treatment", doctor: "Dr. Raine", status: "Pending", source: "Website", phone: "+63 917 000 1026", email: "mika@example.com", note: "Awaiting confirmation of preferred treatment time.", color: "bg-[#e7e1ef] text-[#66527a]" },
  { id: "APT-1027", time: "2:30 PM", endTime: "3:30 PM", patient: "Claire Yu", initials: "CY", treatment: "Ultraformer MPT", type: "Treatment", doctor: "Dr. Dan", status: "Confirmed", source: "Phone", phone: "+63 917 000 1027", email: "claire@example.com", note: "Consultation completed previously. Treatment plan on file.", color: "bg-[#dce6e7] text-[#49666a]" },
  { id: "APT-1028", time: "4:00 PM", endTime: "5:00 PM", patient: "Andrea Cruz", initials: "AC", treatment: "Aqua Reset Facial", type: "Treatment", doctor: "Dr. Raine", status: "Pending", source: "Walk-in", phone: "+63 917 000 1028", email: "andrea@example.com", note: "Requested a late-afternoon slot.", color: "bg-[#f0dfdc] text-[#85564f]" },
  { id: "APT-1029", time: "5:15 PM", endTime: "5:45 PM", patient: "Lara Tan", initials: "LT", treatment: "Treatment consultation", type: "Consultation", doctor: "Dr. Dan", status: "Cancelled", source: "Facebook", phone: "+63 917 000 1029", email: "lara@example.com", note: "Patient requested a new date next week.", color: "bg-[#e5e2dc] text-[#6c6860]" },
];

const statusStyles: Record<AppointmentStatus, string> = {
  Pending: "bg-[#f3eadb] text-[#85683d]",
  Confirmed: "bg-[#e7efe5] text-[#4d6e54]",
  Completed: "bg-[#e3e9ed] text-[#4d6471]",
  Cancelled: "bg-[#eee9e6] text-[#776b65]",
};

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

function StatusBadge({ status }: { status: AppointmentStatus }) {
  return <span className={`inline-flex rounded-full px-2.5 py-1.5 font-montserrat text-[8px] font-bold uppercase tracking-[0.08em] ${statusStyles[status]}`}>{status}</span>;
}

export default function AppointmentsWorkspace() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"All" | AppointmentStatus>("All");
  const [selectedId, setSelectedId] = useState(appointments[0].id);

  const filteredAppointments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return appointments.filter((appointment) => {
      const matchesQuery = !normalizedQuery || [appointment.patient, appointment.treatment, appointment.doctor, appointment.id].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesStatus = status === "All" || appointment.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [query, status]);

  const selectedAppointment = filteredAppointments.find((appointment) => appointment.id === selectedId) ?? filteredAppointments[0] ?? null;

  return (
    <main className="px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-[1460px]">
        <header className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a8079]">Clinic operations</p>
              <span className="rounded-full bg-[#e8eee6] px-2.5 py-1 font-montserrat text-[8px] font-bold uppercase tracking-[0.1em] text-[#56715b]">Preview data</span>
            </div>
            <h1 className="font-seasons mt-3 text-[clamp(2.4rem,4vw,3.7rem)] leading-none tracking-[-0.025em] text-[#2e4433]">Appointments</h1>
            <p className="mt-3 max-w-xl font-montserrat text-[11px] leading-6 text-[#778078]">Review the day, find bookings quickly, and keep confirmation status clear for the front desk.</p>
          </div>
          <button type="button" disabled title="Available when appointment creation is implemented" className="inline-flex w-fit cursor-not-allowed items-center gap-2 rounded-full bg-[#344c38] px-5 py-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-white opacity-85 shadow-[0_10px_30px_-14px_rgba(42,66,47,0.75)]">
            <Icon className="h-4 w-4"><path d="M12 5v14M5 12h14" /></Icon>
            New appointment
          </button>
        </header>

        <section aria-label="Appointment summary" className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["06", "Bookings today", "All scheduled visits"],
            ["02", "Awaiting confirmation", "Front-desk follow-up"],
            ["03", "Confirmed", "Ready for arrival"],
            ["07", "Open slots", "Across both doctors"],
          ].map(([value, label, detail], index) => (
            <article key={label} className={`rounded-2xl border p-4 sm:p-5 ${index === 1 ? "border-[#b89a6d]/20 bg-[#eee4d3]" : "border-[#334b39]/10 bg-white/70"}`}>
              <p className="font-seasons text-2xl leading-none text-[#334b38] sm:text-3xl">{value}</p>
              <p className="mt-2 font-montserrat text-[9px] font-semibold text-[#465349] sm:text-[10px]">{label}</p>
              <p className="mt-1 hidden font-montserrat text-[8px] text-[#8b918b] sm:block">{detail}</p>
            </article>
          ))}
        </section>

        <section className="mt-5 rounded-[24px] border border-[#334b39]/10 bg-white/75 shadow-[0_14px_38px_-30px_rgba(35,54,40,0.45)]">
          <div className="flex flex-col gap-4 border-b border-[#334b39]/8 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="inline-flex w-fit rounded-full bg-[#eef0ea] p-1" role="group" aria-label="Appointment view">
              <button type="button" onClick={() => setView("list")} aria-pressed={view === "list"} className={`inline-flex min-h-9 items-center gap-2 rounded-full px-4 font-montserrat text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${view === "list" ? "bg-white text-[#3f5844] shadow-sm" : "text-[#7e857e]"}`}>
                <Icon className="h-3.5 w-3.5"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></Icon>
                List
              </button>
              <button type="button" onClick={() => setView("calendar")} aria-pressed={view === "calendar"} className={`inline-flex min-h-9 items-center gap-2 rounded-full px-4 font-montserrat text-[9px] font-bold uppercase tracking-[0.1em] transition-colors ${view === "calendar" ? "bg-white text-[#3f5844] shadow-sm" : "text-[#7e857e]"}`}>
                <Icon className="h-3.5 w-3.5"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></Icon>
                Calendar
              </button>
            </div>

            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <button type="button" disabled aria-label="Previous day preview" className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-[#334b39]/10 text-[#69736b]"><Icon className="h-4 w-4"><path d="m15 18-6-6 6-6" /></Icon></button>
              <div className="min-w-[170px] text-center">
                <p className="font-montserrat text-[10px] font-semibold text-[#3e4c42]">Monday, November 23</p>
                <p className="mt-0.5 font-montserrat text-[8px] uppercase tracking-[0.1em] text-[#92978f]">Today · 6 bookings</p>
              </div>
              <button type="button" disabled aria-label="Next day preview" className="flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-full border border-[#334b39]/10 text-[#69736b]"><Icon className="h-4 w-4"><path d="m9 18 6-6-6-6" /></Icon></button>
            </div>
          </div>

          <div className="grid min-h-[650px] xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0 border-[#334b39]/8 xl:border-r">
              <div className="grid gap-3 border-b border-[#334b39]/8 p-4 sm:grid-cols-[minmax(0,1fr)_190px] sm:p-5">
                <label className="flex min-h-10 items-center gap-3 rounded-xl border border-[#334b39]/10 bg-[#f7f6f1] px-3 text-[#778078]">
                  <Icon className="h-4 w-4 shrink-0"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Icon>
                  <span className="sr-only">Search appointments</span>
                  <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search patient, treatment, doctor…" className="w-full bg-transparent font-montserrat text-[10px] text-[#354239] outline-none placeholder:text-[#92978f]" />
                </label>
                <label className="flex min-h-10 items-center gap-2 rounded-xl border border-[#334b39]/10 bg-[#f7f6f1] px-3">
                  <Icon className="h-4 w-4 shrink-0 text-[#778078]"><path d="M4 5h16M7 12h10M10 19h4" /></Icon>
                  <span className="sr-only">Filter by status</span>
                  <select value={status} onChange={(event) => setStatus(event.target.value as "All" | AppointmentStatus)} className="w-full bg-transparent font-montserrat text-[10px] font-medium text-[#536057] outline-none">
                    <option value="All">All statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </label>
              </div>

              {view === "list" ? (
                <AppointmentList appointments={filteredAppointments} selectedId={selectedAppointment?.id ?? ""} onSelect={setSelectedId} />
              ) : (
                <CalendarPreview appointments={filteredAppointments} onSelect={setSelectedId} />
              )}
            </div>

            <AppointmentDetails appointment={selectedAppointment} />
          </div>
        </section>
      </div>
    </main>
  );
}

function AppointmentList({ appointments: visibleAppointments, selectedId, onSelect }: { appointments: Appointment[]; selectedId: string; onSelect: (id: string) => void }) {
  if (visibleAppointments.length === 0) {
    return (
      <div className="grid min-h-[380px] place-items-center p-8 text-center">
        <div><p className="font-seasons text-2xl text-[#3f5143]">No appointments found</p><p className="mt-2 font-montserrat text-[10px] text-[#8a9089]">Try another search or status filter.</p></div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#334b39]/7">
      <div className="hidden grid-cols-[90px_minmax(150px,1fr)_minmax(160px,1.2fr)_110px_90px] gap-4 px-5 py-3 font-montserrat text-[8px] font-semibold uppercase tracking-[0.12em] text-[#939890] lg:grid">
        <span>Time</span><span>Patient</span><span>Appointment</span><span>Doctor</span><span>Status</span>
      </div>
      {visibleAppointments.map((appointment) => (
        <button key={appointment.id} type="button" onClick={() => onSelect(appointment.id)} aria-pressed={selectedId === appointment.id} className={`grid w-full gap-3 px-4 py-4 text-left transition-colors sm:px-5 lg:grid-cols-[90px_minmax(150px,1fr)_minmax(160px,1.2fr)_110px_90px] lg:items-center lg:gap-4 ${selectedId === appointment.id ? "bg-[#eef2eb]" : "hover:bg-[#faf9f5]"}`}>
          <div className="flex items-center justify-between gap-3 lg:block">
            <div><p className="font-montserrat text-[10px] font-bold text-[#35483a]">{appointment.time}</p><p className="mt-1 font-montserrat text-[8px] text-[#92978f]">{appointment.endTime}</p></div>
            <span className="lg:hidden"><StatusBadge status={appointment.status} /></span>
          </div>
          <div className="flex min-w-0 items-center gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-montserrat text-[9px] font-bold ${appointment.color}`}>{appointment.initials}</span>
            <div className="min-w-0"><p className="truncate font-montserrat text-[10px] font-semibold text-[#3d4a40]">{appointment.patient}</p><p className="mt-1 font-montserrat text-[8px] text-[#92978f]">{appointment.id}</p></div>
          </div>
          <div className="min-w-0 pl-12 lg:pl-0"><p className="truncate font-montserrat text-[10px] font-medium text-[#4d5850]">{appointment.treatment}</p><p className="mt-1 font-montserrat text-[8px] text-[#92978f]">{appointment.type}</p></div>
          <p className="hidden font-montserrat text-[9px] text-[#737b74] lg:block">{appointment.doctor}</p>
          <span className="hidden lg:block"><StatusBadge status={appointment.status} /></span>
        </button>
      ))}
    </div>
  );
}

function CalendarPreview({ appointments: visibleAppointments, onSelect }: { appointments: Appointment[]; onSelect: (id: string) => void }) {
  const slots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];
  const byStartTime = new Map(visibleAppointments.map((appointment) => [appointment.time.replace(":30", ":00").replace(":15", ":00"), appointment]));

  return (
    <div className="p-4 sm:p-5">
      <div className="grid grid-cols-[68px_1fr] overflow-hidden rounded-2xl border border-[#334b39]/8 bg-[#faf9f5]">
        {slots.map((slot) => {
          const appointment = byStartTime.get(slot);
          return (
            <div key={slot} className="contents">
              <div className="border-b border-r border-[#334b39]/7 px-3 py-4 font-montserrat text-[8px] font-semibold text-[#8d938d]">{slot}</div>
              <div className="min-h-16 border-b border-[#334b39]/7 p-2">
                {appointment && (
                  <button type="button" onClick={() => onSelect(appointment.id)} className="flex w-full items-center justify-between gap-3 rounded-xl border border-[#68806a]/15 bg-[#e7eee4] px-3 py-2 text-left">
                    <span className="min-w-0"><span className="block truncate font-montserrat text-[9px] font-semibold text-[#3f5543]">{appointment.patient}</span><span className="mt-1 block truncate font-montserrat text-[8px] text-[#718074]">{appointment.treatment}</span></span>
                    <StatusBadge status={appointment.status} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AppointmentDetails({ appointment }: { appointment: Appointment | null }) {
  if (!appointment) {
    return (
      <aside aria-label="Selected appointment details" className="grid min-h-[360px] place-items-center bg-[#f8f6f0] p-6 text-center xl:sticky xl:top-[86px] xl:h-[calc(100vh-86px)]">
        <div>
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#e5ebe2] text-[#4c6751]"><Icon className="h-5 w-5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></Icon></span>
          <p className="font-seasons mt-4 text-xl text-[#3f5143]">No appointment selected</p>
          <p className="mt-2 font-montserrat text-[9px] leading-5 text-[#8a9089]">Adjust the search or filter to view appointment details.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside aria-label="Selected appointment details" className="bg-[#f8f6f0] p-5 sm:p-6 xl:sticky xl:top-[86px] xl:h-[calc(100vh-86px)] xl:overflow-y-auto">
      <div className="flex items-start justify-between gap-4">
        <div><p className="font-montserrat text-[8px] font-semibold uppercase tracking-[0.14em] text-[#8a918a]">Appointment details</p><p className="font-seasons mt-2 text-2xl text-[#304534]">{appointment.patient}</p><p className="mt-1 font-montserrat text-[9px] text-[#90968f]">{appointment.id}</p></div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="mt-5 rounded-2xl bg-[#344b38] p-4 text-white">
        <p className="font-montserrat text-[8px] font-semibold uppercase tracking-[0.13em] text-white/45">Monday, November 23</p>
        <p className="font-seasons mt-2 text-2xl">{appointment.time}–{appointment.endTime}</p>
        <p className="mt-2 font-montserrat text-[9px] text-white/60">{appointment.treatment}</p>
      </div>

      <dl className="mt-5 divide-y divide-[#334b39]/8 rounded-2xl border border-[#334b39]/8 bg-white/70 px-4">
        {[["Doctor", appointment.doctor], ["Visit type", appointment.type], ["Booking source", appointment.source], ["Phone", appointment.phone], ["Email", appointment.email]].map(([label, value]) => (
          <div key={label} className="flex items-start justify-between gap-4 py-3"><dt className="font-montserrat text-[8px] uppercase tracking-[0.1em] text-[#92978f]">{label}</dt><dd className="max-w-[190px] text-right font-montserrat text-[9px] font-medium text-[#4e5a51]">{value}</dd></div>
        ))}
      </dl>

      <div className="mt-5 rounded-2xl border border-[#334b39]/8 bg-white/70 p-4">
        <p className="font-montserrat text-[8px] font-semibold uppercase tracking-[0.12em] text-[#92978f]">Booking note</p>
        <p className="mt-2 font-montserrat text-[9px] leading-5 text-[#667068]">{appointment.note}</p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button type="button" disabled title="Preview action" className="min-h-10 cursor-not-allowed rounded-full bg-[#3c5841] px-3 font-montserrat text-[8px] font-bold uppercase tracking-[0.1em] text-white opacity-85">Confirm</button>
        <button type="button" disabled title="Preview action" className="min-h-10 cursor-not-allowed rounded-full border border-[#3c5841]/20 px-3 font-montserrat text-[8px] font-bold uppercase tracking-[0.1em] text-[#3f5844]">Reschedule</button>
        <button type="button" disabled title="Preview action" className="col-span-2 min-h-10 cursor-not-allowed rounded-full border border-[#8b665d]/15 px-3 font-montserrat text-[8px] font-bold uppercase tracking-[0.1em] text-[#86645c]">Cancel appointment</button>
      </div>
      <p className="mt-3 text-center font-montserrat text-[8px] leading-4 text-[#979b96]">Actions are disabled in this design preview.</p>
    </aside>
  );
}
