import { z } from "zod";
import { CONSULTATION_INTERESTS, FORM_SERVICES } from "@/data/services";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Please keep this under ${max} characters`)
    .optional()
    .transform((v) => (v ? v : undefined));

const optionalUrl = z
  .string()
  .trim()
  .max(500)
  .optional()
  .refine((v) => !v || /^https?:\/\/\S+\.\S+/i.test(v), "Please enter a full link starting with https://")
  .transform((v) => (v ? v : undefined));

const name = z.string().trim().min(2, "Please enter your name").max(150);
const email = z.string().trim().email("Please enter a valid email address").max(255);
const consent = z.literal(true, { errorMap: () => ({ message: "Please agree to the Privacy Policy to continue" }) });

export const bookSubmissionSchema = z.object({
  author_name: name,
  email,
  book_title: z.string().trim().min(1, "Please enter your book title").max(250),
  genre: z.string().trim().min(2, "Please enter the genre").max(120),
  synopsis: z.string().trim().min(20, "Please share a short description (at least 20 characters)").max(5000),
  cover_path: z
    .string()
    .max(500)
    .regex(/^submissions\/[A-Za-z0-9._-]+$/, "Invalid cover file")
    .optional(),
  book_link: optionalUrl,
  author_website: optionalUrl,
  social_links: optionalText(1000),
  services: z.array(z.enum(FORM_SERVICES)).min(1, "Please choose at least one service"),
  budget: optionalText(100),
  additional_info: optionalText(5000),
  privacy_consent: consent,
});
export type BookSubmissionInput = z.input<typeof bookSubmissionSchema>;

export const filmEnquirySchema = z.object({
  author_name: name,
  email,
  book_title: z.string().trim().min(1, "Please enter your book title").max(250),
  genre: z.string().trim().min(2, "Please enter the genre").max(120),
  synopsis: z.string().trim().min(20, "Please share a description or synopsis (at least 20 characters)").max(5000),
  book_link: optionalUrl,
  rights_info: z.string().trim().min(2, "Please tell us about rights ownership or availability").max(2000),
  adaptation_materials: optionalText(2000),
  additional_details: optionalText(5000),
  privacy_consent: consent,
});
export type FilmEnquiryInput = z.input<typeof filmEnquirySchema>;

export const consultationSchema = z.object({
  name,
  email,
  project_title: z.string().trim().min(1, "Please enter your book or project title").max(250),
  interest: z.enum(CONSULTATION_INTERESTS, { errorMap: () => ({ message: "Please choose an area of interest" }) }),
  preferred_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date"),
  preferred_time: z.string().regex(/^\d{2}:\d{2}$/, "Please choose a preferred time"),
  timezone: z.string().trim().min(1, "Please choose your time zone").max(80),
  details: optionalText(5000),
  privacy_consent: consent,
});
export type ConsultationInput = z.input<typeof consultationSchema>;

export const contactSchema = z.object({
  name,
  email,
  subject: z.string().trim().min(2, "Please enter a subject").max(200),
  message: z.string().trim().min(10, "Please write a message (at least 10 characters)").max(5000),
  privacy_consent: consent,
});
export type ContactInput = z.input<typeof contactSchema>;
