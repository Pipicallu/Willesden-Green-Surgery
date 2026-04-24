"use client";

import * as React from "react";
import { FeedbackForm } from "@/components/organisms/FeedbackForm";
import type { FeedbackFormValues } from "@/components/organisms/FeedbackForm";
import { sendFeedbackEmail } from "@/lib/sendFeedbackEmail";
import { Banner } from "@/components/molecules/Banner";

export function FeedbackFormPage() {
  const [submitted, setSubmitted] = React.useState(false);
  const [sendError, setSendError] = React.useState<string | null>(null);

  async function handleSubmit(values: FeedbackFormValues) {
    setSendError(null);
    try {
      await sendFeedbackEmail(values);
      setSubmitted(true);
      // Scroll to top so the success message is visible
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Failed to send feedback email:", err);
      setSendError(
        "Sorry, we were unable to send your feedback right now. Please try again or call us on 020 8459 3788.",
      );
    }
  }

  return (
    <div className="space-y-6">
      {sendError && (
        <Banner variant="alert" title="Something went wrong">
          {sendError}
        </Banner>
      )}
      <FeedbackForm onSubmit={handleSubmit} submitted={submitted} />
    </div>
  );
}
