import { enquiryTypes } from "@/data/practice-areas";

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  /** Honeypot field. Real visitors never see or fill it. */
  company: string;
};

export type ContactField = Exclude<keyof ContactPayload, "company">;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 3000;

export const emptyContact: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  enquiryType: "",
  message: "",
  consent: false,
  company: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+()\-.\s\d]+$/;

const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/** Normalises untrusted input into a ContactPayload. */
export function parseContact(input: unknown): ContactPayload {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    name: text(raw.name, 120),
    email: text(raw.email, 200),
    phone: text(raw.phone, 30),
    enquiryType: text(raw.enquiryType, 120),
    message: text(raw.message, MESSAGE_MAX + 1),
    consent: raw.consent === true,
    company: text(raw.company, 200),
  };
}

/** Shared by the form (client) and the API route (server). */
export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  if (data.name.length < 2) errors.name = "Please enter your full name.";

  if (!data.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_PATTERN.test(data.email)) errors.email = "Please enter a valid email address.";

  if (data.phone) {
    const digits = data.phone.replace(/\D/g, "");
    if (!PHONE_PATTERN.test(data.phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = "Please enter a valid phone number, or leave this blank.";
    }
  }

  if (!(enquiryTypes as readonly string[]).includes(data.enquiryType)) {
    errors.enquiryType = "Please choose the type of enquiry.";
  }

  if (data.message.length < MESSAGE_MIN) {
    errors.message = `Please share a few more details (at least ${MESSAGE_MIN} characters).`;
  } else if (data.message.length > MESSAGE_MAX) {
    errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`;
  }

  if (!data.consent) errors.consent = "Please confirm you have read and accept this note.";

  return errors;
}
