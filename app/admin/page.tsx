import Link from "next/link";
import { connection } from "next/server";
import { Suspense, type SVGProps } from "react";
import { treatmentCategories } from "@/data/treatments";
import { treatmentResults } from "@/data/results";
import { getPromos } from "@/lib/promos";

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      {children}
    </svg>
  );
}

const appointments = [
  { time: "9:00", period: "AM", client: "Sofia Reyes", treatment: "Oxy Radiance Facial", doctor: "Dr. Raine", status: "Confirmed", initials: "SR", color: "bg-[#dde8dc] text-[#426047]" },
  { time: "10:30", period: "AM", client: "Bianca Lim", treatment: "Skin consultation", doctor: "Dr. Dan", status: "Confirmed", initials: "BL", color: "bg-[#e8ded1] text-[#755c47]" },
  { time: "1:00", period: "PM", client: "Mika Santos", treatment: "Thera JuveLook", doctor: "Dr. Raine", status: "Pending", initials: "MS", color: "bg-[#e7e1ef] text-[#66527a]" },
  { time: "2:30", period: "PM", client: "Claire Yu", treatment: "Ultraformer MPT", doctor: "Dr. Dan", status: "Confirmed", initials: "CY", color: "bg-[#dce6e7] text-[#49666a]" },
  { time: "4:00", period: "PM", client: "Andrea Cruz", treatment: "Aqua Reset Facial", doctor: "Dr. Raine", status: "Pending", initials: "AC", color: "bg-[#f0dfdc] text-[#85564f]" },
];

const chartValues = [42, 58, 48, 72, 64, 86, 76];
const chartDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const moduleGroups = [
  {
    title: "Clinic operations",
    modules: [
      ["Appointments", "Bookings, status changes and walk-ins"],
      ["Calendar", "Doctor availability, leave and blocked time"],
      ["Patients", "History, notes, photos and consent records"],
    ],
  },
  {
    title: "Website management",
    modules: [
      ["Doctors & treatments", "Profiles, catalog, prices and care guides"],
      ["Promotions", "Offers, packages and publishing dates"],
      ["Results & testimonials", "Approved proof and consent tracking"],
      ["Content pages", "FAQs, policies and clinic information"],
    ],
  },
  {
    title: "Administration",
    modules: [
      ["Messages", "Confirmations, reminders and delivery history"],
      ["Reports", "Demand, sources, cancellations and no-shows"],
      ["Users & roles", "Staff access and permissions"],
      ["Settings & audit log", "Clinic rules and accountability"],
    ],
  },
];

function formatAdminDate() {
  return new Intl.DateTimeFormat("en-PH", {
    timeZone: "Asia/Manila",
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function AdminPage() {
  return (
    <Suspense fallback={<AdminDashboardFallback />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

async function AdminDashboardContent() {
  await connection();

  const promos = await getPromos();
  const treatmentCount = treatmentCategories.reduce(
    (total, category) => total + category.groups.reduce((groupTotal, group) => groupTotal + group.treatments.length, 0),
    0,
  );
  const today = formatAdminDate();

  const metrics = [
    { label: "Today's appointments", value: appointments.length.toString().padStart(2, "0"), trend: "+2", icon: <Icon><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></Icon> },
    { label: "Patients this month", value: "128", trend: "+12%", icon: <Icon><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /></Icon> },
    { label: "Treatment catalog", value: treatmentCount.toString(), trend: "Live", icon: <Icon><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="9" /></Icon> },
    { label: "Active promotions", value: promos.length.toString().padStart(2, "0"), trend: "Live", icon: <Icon><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7M2 7h20v5H2zM12 7v14" /></Icon> },
  ];

  return (
    <main className="px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-10">
      <div className="mx-auto max-w-[1460px]">
        <section className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="font-montserrat text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a8079]">{today}</p>
            <h1 className="font-seasons mt-2 text-[clamp(2.25rem,4vw,3.5rem)] leading-none tracking-[-0.025em] text-[#2e4433]">Good morning, Aesthera.</h1>
          </div>
          <Link href="/admin/appointments" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#344c38] px-5 py-3 font-montserrat text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_-14px_rgba(42,66,47,0.75)] transition-colors hover:bg-[#283e2c]">
            <Icon className="h-4 w-4"><path d="M12 5v14M5 12h14" /></Icon>
            New appointment
          </Link>
        </section>

        <section aria-label="Clinic overview" className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article key={metric.label} className="rounded-[22px] border border-[#334b39]/10 bg-white/75 p-5 shadow-[0_12px_35px_-28px_rgba(35,54,40,0.45)] backdrop-blur sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5ebe2] text-[#4c6751] [&>svg]:h-[18px] [&>svg]:w-[18px]">{metric.icon}</span>
                <span className="rounded-full bg-[#edf2ea] px-2.5 py-1 font-montserrat text-[9px] font-bold uppercase tracking-[0.08em] text-[#56715b]">{metric.trend}</span>
              </div>
              <p className="font-seasons mt-5 text-[38px] leading-none text-[#2e4433]">{metric.value}</p>
              <p className="mt-2 font-montserrat text-[11px] font-semibold text-[#3f4c42]">{metric.label}</p>
            </article>
          ))}
        </section>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.85fr)]">
          <section id="appointments" className="overflow-hidden rounded-[24px] border border-[#334b39]/10 bg-white/80 shadow-[0_12px_35px_-28px_rgba(35,54,40,0.45)]">
            <div className="flex items-center justify-between border-b border-[#334b39]/8 px-5 py-5 sm:px-6">
              <div>
                <h2 className="font-seasons text-[25px] leading-none text-[#2e4433]">Today’s appointments</h2>
                <p className="mt-2 font-montserrat text-[9px] uppercase tracking-[0.13em] text-[#8a9089]">Monday schedule · 5 bookings</p>
              </div>
              <Link href="/admin/calendar" className="hidden items-center gap-2 font-montserrat text-[9px] font-bold uppercase tracking-[0.12em] text-[#526b56] sm:inline-flex">Open calendar <Icon className="h-3.5 w-3.5"><path d="M5 12h14m-6-6 6 6-6 6" /></Icon></Link>
            </div>
            <div className="divide-y divide-[#334b39]/7">
              {appointments.map((appointment) => (
                <article key={`${appointment.time}-${appointment.client}`} className="grid grid-cols-[50px_1fr_auto] items-center gap-3 px-5 py-4 transition-colors hover:bg-[#f8f7f2] sm:grid-cols-[62px_1.1fr_1.4fr_0.7fr_auto] sm:gap-4 sm:px-6">
                  <div>
                    <p className="font-montserrat text-[11px] font-bold text-[#344b38]">{appointment.time}</p>
                    <p className="mt-0.5 font-montserrat text-[8px] font-semibold uppercase tracking-[0.12em] text-[#92978f]">{appointment.period}</p>
                  </div>
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-montserrat text-[9px] font-bold ${appointment.color}`}>{appointment.initials}</span>
                    <div className="min-w-0">
                      <p className="truncate font-montserrat text-[11px] font-semibold text-[#39473d]">{appointment.client}</p>
                      <p className="mt-1 truncate font-montserrat text-[9px] text-[#92978f] sm:hidden">{appointment.treatment}</p>
                    </div>
                  </div>
                  <div className="hidden min-w-0 sm:block">
                    <p className="truncate font-montserrat text-[10px] font-medium text-[#59625b]">{appointment.treatment}</p>
                  </div>
                  <p className="hidden font-montserrat text-[9px] text-[#838982] sm:block">{appointment.doctor}</p>
                  <span className={`rounded-full px-2.5 py-1.5 font-montserrat text-[8px] font-bold uppercase tracking-[0.08em] ${appointment.status === "Confirmed" ? "bg-[#e8efe6] text-[#507057]" : "bg-[#f2eadc] text-[#8a6c3f]"}`}>{appointment.status}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[24px] border border-[#334b39]/10 bg-[#344b38] p-6 text-white shadow-[0_18px_45px_-28px_rgba(30,55,35,0.75)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45">Weekly activity</p>
                <p className="font-seasons mt-3 text-[38px] leading-none">47</p>
                <p className="mt-2 font-montserrat text-[10px] text-white/55">appointments this week</p>
              </div>
              <span className="rounded-full bg-white/10 px-2.5 py-1 font-montserrat text-[9px] font-semibold text-[#d8c7a7]">+8.4%</span>
            </div>
            <div className="mt-8 flex h-40 items-end justify-between gap-2 border-b border-white/10 pb-3">
              {chartValues.map((value, index) => (
                <div key={chartDays[index]} className="flex h-full flex-1 flex-col justify-end gap-2">
                  <div className="group relative flex h-full items-end justify-center">
                    <span className="absolute bottom-[calc(var(--height)+8px)] hidden rounded bg-white px-1.5 py-1 font-montserrat text-[8px] font-bold text-[#344b38] group-hover:block" style={{ "--height": `${value}%` } as React.CSSProperties}>{Math.round(value / 10)}</span>
                    <div className={`w-full max-w-7 rounded-t-md ${index === 5 ? "bg-[#d7c19c]" : "bg-white/20"}`} style={{ height: `${value}%` }} />
                  </div>
                  <span className="text-center font-montserrat text-[8px] text-white/45">{chartDays[index]}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.06] p-3">
                <p className="font-montserrat text-[8px] uppercase tracking-[0.12em] text-white/40">Completed</p>
                <p className="font-seasons mt-1.5 text-xl">38</p>
              </div>
              <div className="rounded-xl bg-white/[0.06] p-3">
                <p className="font-montserrat text-[8px] uppercase tracking-[0.12em] text-white/40">No-shows</p>
                <p className="font-seasons mt-1.5 text-xl">02</p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <section id="catalog" className="rounded-[24px] border border-[#334b39]/10 bg-white/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-seasons text-[24px] text-[#2e4433]">Catalog health</h2>
              <span className="h-2 w-2 rounded-full bg-[#6c8a70]" />
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between font-montserrat text-[10px]"><span className="text-[#6f786f]">Treatments</span><span className="font-bold text-[#3d5141]">{treatmentCount}</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#e8e9e3]"><div className="h-full w-[92%] rounded-full bg-[#607963]" /></div>
              <div className="flex items-center justify-between font-montserrat text-[10px]"><span className="text-[#6f786f]">Before & after sets</span><span className="font-bold text-[#3d5141]">{treatmentResults.length}</span></div>
              <div className="h-1.5 overflow-hidden rounded-full bg-[#e8e9e3]"><div className="h-full w-[64%] rounded-full bg-[#b49b72]" /></div>
            </div>
          </section>

          <section id="promotions" className="rounded-[24px] border border-[#334b39]/10 bg-white/80 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-seasons text-[24px] text-[#2e4433]">Promotions</h2>
              <Link href="/promos" className="font-montserrat text-[9px] font-bold uppercase tracking-[0.1em] text-[#58705b]">View live</Link>
            </div>
            <div className="mt-5 space-y-3">
              {promos.slice(0, 2).map((promo) => (
                <div key={promo.id} className="flex items-center gap-3 rounded-xl bg-[#f5f3ed] p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e5ebe2] text-[#58705b]"><Icon className="h-4 w-4"><path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7M2 7h20v5H2zM12 7v14" /></Icon></span>
                  <div className="min-w-0"><p className="truncate font-montserrat text-[10px] font-semibold text-[#435046]">{promo.title}</p><p className="mt-1 font-montserrat text-[8px] uppercase tracking-[0.1em] text-[#92978f]">{promo.badge}</p></div>
                </div>
              ))}
            </div>
          </section>

          <section id="content" className="rounded-[24px] border border-[#334b39]/10 bg-[#e8e1d4] p-6">
            <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#82735f]">Design review</p>
            <h2 className="font-seasons mt-3 text-[27px] leading-[1.08] text-[#3f4f42]">Make the daily view feel effortless.</h2>
            <div className="mt-6 flex items-center gap-2 font-montserrat text-[9px] font-bold uppercase tracking-[0.1em] text-[#526557]">
              Design review in progress
              <Icon className="h-4 w-4"><path d="M5 12h14m-6-6 6 6-6 6" /></Icon>
            </div>
          </section>
        </div>

        <section id="module-map" className="mt-5 rounded-[24px] border border-[#334b39]/10 bg-white/70 p-6 sm:p-8">
          <div className="max-w-2xl">
            <p className="font-montserrat text-[9px] font-semibold uppercase tracking-[0.16em] text-[#7d857e]">Dashboard structure</p>
            <h2 className="font-seasons mt-2 text-[28px] text-[#2e4433]">What the admin workspace will contain</h2>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {moduleGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-[#334b39]/8 bg-[#f7f5ef] p-5">
                <h3 className="font-montserrat text-[10px] font-bold uppercase tracking-[0.13em] text-[#506554]">{group.title}</h3>
                <div className="mt-4 divide-y divide-[#334b39]/8">
                  {group.modules.map(([name, detail]) => (
                    <div key={name} className="py-3 first:pt-0 last:pb-0">
                      <p className="font-montserrat text-[10px] font-semibold text-[#3e4c42]">{name}</p>
                      <p className="mt-1 font-montserrat text-[9px] leading-4 text-[#8a9089]">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminDashboardFallback() {
  return (
    <main className="px-5 pb-16 pt-7 sm:px-8 lg:px-10 lg:pt-10" aria-label="Loading admin overview" aria-busy="true">
      <div className="mx-auto max-w-[1460px] animate-pulse">
        <div className="h-3 w-40 rounded bg-[#334b39]/10" />
        <div className="mt-4 h-12 max-w-xl rounded bg-[#334b39]/10" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => <div key={index} className="h-44 rounded-[22px] bg-white/65" />)}
        </div>
        <div className="mt-5 h-[440px] rounded-[24px] bg-white/65" />
      </div>
    </main>
  );
}
