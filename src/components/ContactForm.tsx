"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, CircleCheck, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { type FormEvent, useRef, useState } from "react";
import { enquiryTypes } from "@/data/practice-areas";
import {
  type ContactErrors,
  type ContactField,
  type ContactPayload,
  emptyContact,
  MESSAGE_MAX,
  validateContact,
} from "@/lib/contact";

type Status = "idle" | "submitting" | "success" | "error";

const FIELD_ORDER: ContactField[] = ["name", "email", "phone", "enquiryType", "message", "consent"];

export default function ContactForm() {
  const [values, setValues] = useState<ContactPayload>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // Re-validate live only after the first submit attempt, so errors don't nag while typing.
    if (submitted) setErrors(validateContact(next));
  };

  const focusFirstError = (found: ContactErrors) => {
    const first = FIELD_ORDER.find((field) => found[field]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors };
      if (response.ok && result.ok) {
        setStatus("success");
        setValues(emptyContact);
        setSubmitted(false);
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (result.errors) {
        setErrors(result.errors);
        focusFirstError(result.errors);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const describedBy = (field: ContactField, hint?: string) =>
    [errors[field] ? `${field}-error` : "", hint ?? ""].filter(Boolean).join(" ") || undefined;

  const errorText = (field: ContactField) =>
    errors[field] ? (
      <p id={`${field}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#C2412F]">
        <TriangleAlert className="size-3.5 shrink-0" aria-hidden />
        {errors[field]}
      </p>
    ) : null;

  return (
    <div className="relative rounded-[1.75rem] bg-white p-6 shadow-[0_30px_70px_-36px_rgba(15,27,77,0.45)] ring-1 ring-navy/[0.07] sm:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            ref={successRef}
            tabIndex={-1}
            role="status"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center outline-none"
          >
            <span className="grid size-20 place-items-center rounded-full bg-linear-to-br from-teal to-[#12C9A0] text-white shadow-[0_18px_40px_-14px_rgba(15,181,166,0.7)]">
              <CircleCheck className="size-10" aria-hidden />
            </span>
            <h3 className="mt-7 text-3xl font-bold">Thank you</h3>
            <p className="mt-3 max-w-sm leading-relaxed">
              Your enquiry has been received. You will receive a response at the earliest.
            </p>
            <button type="button" onClick={() => setStatus("idle")} className="btn-outline mt-8">
              Send another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            noValidate
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-labelledby="enquiry-form-title"
          >
            <h3 id="enquiry-form-title" className="text-2xl font-bold sm:text-3xl">
              Send an enquiry
            </h3>
            <p className="mt-2 text-[15px]">
              Fields marked <span className="text-[#C2412F]">*</span> are required.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-navy">
                  Full name <span className="text-[#C2412F]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={describedBy("name")}
                  required
                  className="field"
                  placeholder="Your name"
                />
                {errorText("name")}
              </div>

              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-navy">
                  Email <span className="text-[#C2412F]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={values.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={describedBy("email")}
                  required
                  className="field"
                  placeholder="you@company.com"
                />
                {errorText("email")}
              </div>

              <div>
                <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-navy">
                  Phone <span className="font-normal text-body">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={values.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={describedBy("phone")}
                  className="field"
                  placeholder="Include country code"
                />
                {errorText("phone")}
              </div>

              <div>
                <label htmlFor="enquiryType" className="mb-1.5 block text-sm font-semibold text-navy">
                  Enquiry type <span className="text-[#C2412F]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    value={values.enquiryType}
                    onChange={(event) => update("enquiryType", event.target.value)}
                    aria-invalid={Boolean(errors.enquiryType)}
                    aria-describedby={describedBy("enquiryType")}
                    required
                    data-empty={!values.enquiryType}
                    className="field appearance-none pr-11 data-[empty=true]:text-body/70"
                  >
                    <option value="" disabled>
                      Select an area
                    </option>
                    {enquiryTypes.map((type) => (
                      <option key={type} value={type} className="text-navy">
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-body" aria-hidden />
                </div>
                {errorText("enquiryType")}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-navy">
                  Your message <span className="text-[#C2412F]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  value={values.message}
                  onChange={(event) => update("message", event.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={describedBy("message", "message-hint")}
                  required
                  className="field resize-y"
                  placeholder="A brief outline of your matter. Please do not include confidential documents."
                />
                <div className="flex items-start justify-between gap-4">
                  {errorText("message") ?? <span />}
                  <p id="message-hint" className="mt-1.5 shrink-0 text-xs text-body">
                    {values.message.length}/{MESSAGE_MAX}
                  </p>
                </div>
              </div>

              {/* Honeypot: hidden from people and assistive technology */}
              <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={(event) => update("company", event.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={values.consent}
                    onChange={(event) => update("consent", event.target.checked)}
                    aria-invalid={Boolean(errors.consent)}
                    aria-describedby={describedBy("consent")}
                    className="mt-0.5 size-5 shrink-0 cursor-pointer rounded accent-cobalt"
                  />
                  <span>
                    I understand that submitting this form does not create an advocate-client relationship, and I agree
                    to be contacted about my enquiry. <span className="text-[#C2412F]">*</span>
                  </span>
                </label>
                {errorText("consent")}
              </div>
            </div>

            {status === "error" && (
              <p role="alert" className="mt-6 rounded-xl bg-[#FFEFEC] px-4 py-3 text-sm font-medium text-[#A33524]">
                Something went wrong while sending your enquiry. Please try again in a moment.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary mt-8 w-full disabled:cursor-wait disabled:opacity-80 sm:w-auto"
            >
              {status === "submitting" ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  Submit enquiry
                  <Send className="size-4" aria-hidden />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
