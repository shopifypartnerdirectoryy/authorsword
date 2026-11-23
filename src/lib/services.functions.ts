import { createServerFn } from "@tanstack/react-start";

export type ServiceOverride = { price_label: string | null; summary: string | null };

/** Public: admin-edited price labels and summaries, keyed by service slug. */
export const getServiceOverrides = createServerFn({ method: "GET" }).handler(
  async (): Promise<Record<string, ServiceOverride>> => {
    try {
      // Table is admin-only under RLS; expose just the public display columns here.
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
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
