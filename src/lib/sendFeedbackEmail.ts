import emailjs from "@emailjs/browser";
import { format } from "date-fns";
import type { FeedbackFormValues } from "@/components/organisms/FeedbackForm";

/**
 * EmailJS credentials.
 *
 * HOW TO SET UP:
 * 1. Create a free account at https://www.emailjs.com
 * 2. Add an Email Service (Gmail, Outlook, or SMTP) → copy the Service ID
 * 3. Create an Email Template with these exact template variables:
 *      {{patient_name}}   — patient's full name
 *      {{visit_date}}     — formatted appointment date
 *      {{rating}}         — e.g. "4 / 5 — Very good"
 *      {{experience}}     — patient's written feedback
 *      {{sent_at}}        — timestamp the form was submitted
 * 4. Copy the Template ID and your Public Key (Account → API Keys)
 * 5. Replace the placeholder strings below (or move to .env and prefix EMAILJS_)
 *
 * NOTE: These keys are intentionally public — EmailJS is a browser-side service.
 * The Service ID + Template ID + Public Key combination only permits sending
 * to the addresses configured in your EmailJS template, so exposure is low-risk.
 * Do NOT store a Private Key here.
 */
const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY;

const STAR_LABELS: Record<number, string> = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very good",
  5: "Excellent",
};

/**
 * Sends a feedback email via EmailJS.
 * All values have already been validated + sanitised by Zod before this runs.
 * No raw user input is interpolated into HTML — EmailJS escapes template vars.
 */
export async function sendFeedbackEmail(values: FeedbackFormValues): Promise<void> {
  const templateParams = {
    patient_name: values.name,
    visit_date: format(values.date, "d MMMM yyyy"),
    rating: `${values.rating} / 5 — ${STAR_LABELS[values.rating]}`,
    experience: values.experience,
    sent_at: format(new Date(), "d MMMM yyyy 'at' HH:mm"),
  };

  const response = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    templateParams,
    { publicKey: PUBLIC_KEY }
  );

  if (response.status !== 200) {
    throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
  }
}
