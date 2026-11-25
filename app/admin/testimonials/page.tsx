import TestimonialsWorkspace from "@/components/admin/TestimonialsWorkspace";
import { allTestimonials } from "@/data/testimonials";

export const metadata = {
  title: "Testimonials | Aesthera Mère Admin",
};

export default function AdminTestimonialsPage() {
  return <TestimonialsWorkspace initialTestimonials={allTestimonials} />;
}
