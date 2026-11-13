"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { CalendarIcon, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// ─── Schema ────────────────────────────────────────────────────────────────────
// Zod validates and coerces every value before it can reach the email template.
// No user input ever reaches the template unvalidated.
const schema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(100, "Name is too long")
    .regex(/^[\p{L}\p{M}'\-\s]+$/u, "Name contains invalid characters"),
  date: z.date({
    required_error: "Please select the date of your appointment",
  }),
  experience: z
    .string()
    .min(10, "Please describe your experience (at least 10 characters)")
    .max(1000, "Please keep your description under 1000 characters"),
  rating: z
    .number({ required_error: "Please select a star rating" })
    .int()
    .min(1)
    .max(5),
});

export type FeedbackFormValues = z.infer<typeof schema>;

// ─── Star Rating ───────────────────────────────────────────────────────────────
function StarRating({
  value,
  onChange,
  error,
}: {
  value: number | undefined;
  onChange: (v: number) => void;
  error?: string;
}) {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const labels = ["Poor", "Fair", "Good", "Very good", "Excellent"];
  const active = hovered ?? value ?? 0;

  return (
    <div className="space-y-2">
      <div
        className="flex gap-1"
        role="radiogroup"
        aria-label="Star rating"
        onMouseLeave={() => setHovered(null)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={value === star}
            aria-label={`${star} star${star > 1 ? "s" : ""} — ${labels[star - 1]}`}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            className="p-0.5 rounded focus-visible:outline-2 focus-visible:outline-ring transition-transform hover:scale-110"
          >
            <Star
              className={cn(
                "size-8 text-icon transition-colors",
                star <= active
                  ? "fill-icon"
                  : "fill-transparent",
              )}
            />
          </button>
        ))}
      </div>
      {active > 0 && (
        <p className="text-sm text-muted-foreground">{labels[active - 1]}</p>
      )}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────────────
export interface FeedbackFormProps {
  /** Called with validated values when the user submits. Parent handles sending. */
  onSubmit: (values: FeedbackFormValues) => Promise<void>;
  /** Optionally put the form in a success/sent state externally */
  submitted?: boolean;
}

// ─── Form ──────────────────────────────────────────────────────────────────────
export function FeedbackForm({
  onSubmit,
  submitted = false,
}: FeedbackFormProps) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FeedbackFormValues>({
    resolver: zodResolver(schema),
  });

  const experienceValue = watch("experience") ?? "";

  if (submitted) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center space-y-3">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-icon-background text-icon">
          <Check className="size-7" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Thank you for your feedback
        </h2>
        <p className="text-sm text-muted-foreground">
          Your response has been sent to Willesden Green Surgery. We appreciate
          you taking the time to share your experience.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-6"
      aria-label="Patient feedback form"
    >
      {/* Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="feedback-name"
          className="text-sm font-medium text-foreground"
        >
          Full name{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        </label>
        <input
          id="feedback-name"
          type="text"
          autoComplete="name"
          placeholder="e.g. Jane Smith"
          aria-describedby={errors.name ? "feedback-name-error" : undefined}
          aria-invalid={!!errors.name}
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-colors",
            errors.name
              ? "border-destructive focus:ring-destructive"
              : "border-input",
          )}
          {...register("name")}
        />
        {errors.name && (
          <p
            id="feedback-name-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Date picker */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Date of appointment{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        </label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  aria-expanded={undefined}
                  aria-describedby={
                    errors.date ? "feedback-date-error" : undefined
                  }
                  aria-invalid={!!errors.date}
                  className={cn(
                    "w-full flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    "transition-colors text-left",
                    errors.date ? "border-destructive" : "border-input",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="size-4 shrink-0 text-icon" />
                  {field.value
                    ? format(field.value, "d MMMM yyyy")
                    : "Pick a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <DayPicker
                  mode="single"
                  selected={field.value}
                  onSelect={(day) => field.onChange(day)}
                  disabled={{ after: new Date() }}
                  defaultMonth={new Date()}
                  className="rdp-wgs"
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.date && (
          <p
            id="feedback-date-error"
            className="text-sm text-destructive"
            role="alert"
          >
            {errors.date.message}
          </p>
        )}
      </div>

      {/* Experience */}
      <div className="space-y-1.5">
        <label
          htmlFor="feedback-experience"
          className="text-sm font-medium text-foreground"
        >
          Your experience{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        </label>
        <textarea
          id="feedback-experience"
          rows={5}
          placeholder="Please describe your experience at the surgery…"
          maxLength={1000}
          aria-describedby="feedback-experience-hint feedback-experience-count"
          aria-invalid={!!errors.experience}
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground resize-y",
            "placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "transition-colors",
            errors.experience
              ? "border-destructive focus:ring-destructive"
              : "border-input",
          )}
          {...register("experience")}
        />
        <div className="flex justify-between items-start">
          <div>
            {errors.experience ? (
              <p className="text-sm text-destructive" role="alert">
                {errors.experience.message}
              </p>
            ) : (
              <p
                id="feedback-experience-hint"
                className="text-xs text-muted-foreground"
              >
                Your feedback helps us improve our service.
              </p>
            )}
          </div>
          <p
            id="feedback-experience-count"
            aria-live="polite"
            className={cn(
              "text-xs tabular-nums shrink-0 ml-4",
              experienceValue.length > 900
                ? "text-destructive"
                : "text-muted-foreground",
            )}
          >
            {experienceValue.length}/1000
          </p>
        </div>
      </div>

      {/* Star rating */}
      <div className="space-y-1.5">
        <p className="text-sm font-medium text-foreground">
          Overall rating{" "}
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        </p>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <StarRating
              value={field.value}
              onChange={field.onChange}
              error={errors.rating?.message}
            />
          )}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? "Sending…" : "Submit feedback"}
      </Button>
    </form>
  );
}
