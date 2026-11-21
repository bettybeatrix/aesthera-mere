export type FAQCategory =
  | "Appointments"
  | "Treatments"
  | "Pricing & Promotions"
  | "Safety & Aftercare"
  | "Clinic Information";

export interface FAQItem {
  id: string;
  category: FAQCategory;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  "Appointments",
  "Treatments",
  "Pricing & Promotions",
  "Safety & Aftercare",
  "Clinic Information",
];

/**
 * Draft public-facing FAQ copy for the frontend.
 * Clinic-specific policies, prices, schedules, and treatment instructions
 * must be reviewed and approved by Aesthera Mère before publication.
 */
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "book-consultation",
    category: "Appointments",
    question: "How can I book a consultation or appointment?",
    answer:
      "You can use the Book Appointment button on the website to start an appointment request. You may also contact the clinic through its official channels to ask about available schedules. Your appointment is subject to confirmation by the clinic.",
  },
  {
    id: "consultation-before-treatment",
    category: "Appointments",
    question: "Should I have a consultation before choosing a treatment?",
    answer:
      "A consultation is the best starting point. The clinic's medical team can discuss your concerns, review relevant health information, and help determine which options may be appropriate for you. Not every treatment is suitable for every person.",
  },
  {
    id: "what-to-prepare",
    category: "Appointments",
    question: "What should I prepare before my appointment?",
    answer:
      "Prepare a list of your skin or aesthetic concerns, relevant medical history, current medications, allergies, and previous aesthetic procedures. Bring any questions you would like to discuss with the team.",
  },
  {
    id: "reschedule",
    category: "Appointments",
    question: "How do I reschedule or cancel an appointment?",
    answer:
      "Please contact the clinic through its official communication channels as soon as possible so the team can assist you. Ask the clinic to confirm its current notice period and rescheduling or cancellation policy.",
  },
  {
    id: "choose-treatment",
    category: "Treatments",
    question: "How do I know which treatment is right for me?",
    answer:
      "The right option depends on your goals, concerns, medical history, and an assessment by a qualified practitioner. Browse the Treatments page to learn about available services, then arrange a consultation before deciding on a procedure.",
  },
  {
    id: "treatment-duration",
    category: "Treatments",
    question: "How long does a treatment session take?",
    answer:
      "Session length varies by treatment, the areas being addressed, and your individual treatment plan. The clinic can provide an estimated appointment duration when you inquire about a specific service.",
  },
  {
    id: "number-of-sessions",
    category: "Treatments",
    question: "Will I need more than one treatment session?",
    answer:
      "Some treatments may involve a series of sessions, while others may be planned as a single visit. The recommended number and spacing of sessions depend on the treatment and your practitioner's assessment.",
  },
  {
    id: "results",
    category: "Treatments",
    question: "When can I expect to see results?",
    answer:
      "Results and the time needed to notice them vary depending on the procedure and individual response. Your practitioner should explain the expected timeline, realistic outcomes, and any maintenance recommendations during consultation.",
  },
  {
    id: "prices",
    category: "Pricing & Promotions",
    question: "Where can I find treatment prices?",
    answer:
      "Check the Treatments and Promos pages for the prices or sample offers currently displayed on the website. Final pricing may depend on the selected treatment, treatment area, package, and assessment. Confirm the current rate directly with the clinic before booking.",
  },
  {
    id: "promotions",
    category: "Pricing & Promotions",
    question: "How can I avail of a promotion or package?",
    answer:
      "Open the Promos page, select an offer to review its details, and use the booking option to inquire. Ask the clinic to confirm that the promotion is still active, its inclusions, and any applicable conditions before proceeding.",
  },
  {
    id: "combine-promos",
    category: "Pricing & Promotions",
    question: "Can promotions be combined with other discounts?",
    answer:
      "Combination rules can vary by offer. Please check the terms displayed with the promotion and confirm directly with the clinic whether it can be combined with another discount or package.",
  },
  {
    id: "safety",
    category: "Safety & Aftercare",
    question: "Are aesthetic treatments suitable for everyone?",
    answer:
      "No. Suitability depends on individual health factors, medical history, medications, allergies, and the specific procedure. Share relevant information honestly during consultation so a qualified practitioner can assess your options.",
  },
  {
    id: "side-effects",
    category: "Safety & Aftercare",
    question: "Are there possible side effects or downtime?",
    answer:
      "Possible effects and recovery time depend on the treatment and the individual. Before proceeding, ask your practitioner about expected reactions, potential risks, downtime, warning signs, and when to seek medical attention.",
  },
  {
    id: "aftercare",
    category: "Safety & Aftercare",
    question: "Will I receive aftercare instructions?",
    answer:
      "Aftercare guidance should be discussed for the specific procedure you receive. Follow the instructions provided by your practitioner and contact the clinic if you have concerns or experience symptoms that were identified as warning signs.",
  },
  {
    id: "clinic-hours-location",
    category: "Clinic Information",
    question: "Where can I find the clinic's location and operating hours?",
    answer:
      "Please use the Contact page or the clinic's official communication channels for the latest address, directions, and operating hours. Confirm these details before visiting, as schedules may change.",
  },
  {
    id: "contact-clinic",
    category: "Clinic Information",
    question: "How can I contact Aesthera Mère?",
    answer:
      "You can reach out through the official contact details and social media links provided on the website's Contact page. For appointment-related questions, include the treatment you are interested in and your preferred schedule.",
  },
];
