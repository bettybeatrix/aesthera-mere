"use client";

import type { ReactNode } from "react";
import { useBooking } from "@/components/BookingProvider";
import { CalendarIcon } from "@/components/Icons";

export default function BookingTrigger({
  children,
  initialTreatment,
  initialDoctor,
  className,
  onClick,
}: {
  children?: ReactNode;
  initialTreatment?: string;
  initialDoctor?: string;
  className?: string;
  onClick?: () => void;
}) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        onClick?.();
        openBooking(initialTreatment, initialDoctor);
      }}
    >
      {children ?? (
        <>
          <CalendarIcon className="h-[17px] w-[17px] shrink-0" />
          <span>Book Appointment</span>
        </>
      )}
    </button>
  );
}
