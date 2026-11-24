import { connection } from "next/server";
import { Suspense } from "react";
import OverviewWorkspace from "@/components/admin/OverviewWorkspace";
import { treatmentCategories } from "@/data/treatments";
import { treatmentResults } from "@/data/results";
import { getPromos } from "@/lib/promos";

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

  return (
    <OverviewWorkspace
      treatmentCount={treatmentCount}
      categoryCount={treatmentCategories.length}
      resultCount={treatmentResults.length}
      promos={promos.slice(0, 2).map(({ id, title, badge }) => ({ id, title, badge }))}
      promoCount={promos.length}
    />
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
