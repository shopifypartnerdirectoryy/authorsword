import { createServerFn } from "@tanstack/react-start";

export type ServiceOverride = { price_label: string | null; summary: string | null };

/** Public: admin-edited price labels and summaries, keyed by service slug. */
export const getServiceOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, ServiceOverride>> => {
    try {
      const { getPublicClient } = await import("./public-client.server");
      const { data, error } = await getPublicClient()
        .from("service_overrides")
        .select("slug, price_label, summary");
      if (error) throw error;
      const map: Record<string, ServiceOverride> = {};
      for (const row of data ?? []) map[row.slug] = { price_label: row.price_label, summary: row.summary };
      return map;
    } catch (e) {
      console.error("getServiceOverrides failed", e);
      return {};
    }
  },
);
