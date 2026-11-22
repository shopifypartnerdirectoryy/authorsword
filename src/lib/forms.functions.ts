import { createServerFn } from "@tanstack/react-start";
import {
  bookSubmissionSchema,
  consultationSchema,
  contactSchema,
  filmEnquirySchema,
} from "./form-schemas";

type Result = { ok: true } | { ok: false; error: string };

/** Optional form fields arrive as undefined; the database expects null. */
function nulls<T extends Record<string, unknown>>(o: T): { [K in keyof T]-?: undefined extends T[K] ? Exclude<T[K], undefined> | null : T[K] } {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(o)) out[k] = v === undefined ? null : v;
  return out as { [K in keyof T]-?: undefined extends T[K] ? Exclude<T[K], undefined> | null : T[K] };
}
const FAIL = "We couldn't send this just now. Please try again in a moment.";

export const submitBook = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookSubmissionSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    const { getPublicClient } = await import("./public-client.server");
    const { error } = await getPublicClient().from("book_submissions").insert({ ...nulls(data), status: "new" });
    if (error) {
      console.error("submitBook failed", error);
      return { ok: false, error: FAIL };
    }
    return { ok: true };
  });

export const submitFilmEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => filmEnquirySchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    const { getPublicClient } = await import("./public-client.server");
    const { error } = await getPublicClient().from("film_enquiries").insert({ ...nulls(data), status: "new" });
    if (error) {
      console.error("submitFilmEnquiry failed", error);
      return { ok: false, error: FAIL };
    }
    return { ok: true };
  });

export const requestConsultation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => consultationSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    const { getPublicClient } = await import("./public-client.server");
    const { error } = await getPublicClient().from("consultations").insert({ ...nulls(data), status: "requested" });
    if (error) {
      console.error("requestConsultation failed", error);
      return { ok: false, error: FAIL };
    }
    return { ok: true };
  });

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    const { getPublicClient } = await import("./public-client.server");
    const { error } = await getPublicClient().from("contact_messages").insert({ ...nulls(data), status: "new" });
    if (error) {
      console.error("sendContactMessage failed", error);
      return { ok: false, error: FAIL };
    }
    return { ok: true };
  });
