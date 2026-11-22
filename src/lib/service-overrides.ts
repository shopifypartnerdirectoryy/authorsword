import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getServiceOverrides, type ServiceOverride } from "./services.functions";
import type { Service } from "@/data/services";

export const serviceOverridesQuery = queryOptions({
  queryKey: ["service-overrides"],
  queryFn: () => getServiceOverrides(),
  staleTime: 60_000,
});

export function applyOverride<T extends Pick<Service, "price" | "summary">>(
  item: T,
  override: ServiceOverride | undefined,
): T {
  if (!override) return item;
  return {
    ...item,
    price: override.price_label?.trim() || item.price,
    summary: override.summary?.trim() || item.summary,
  };
}

export function useServiceOverrides() {
  return useSuspenseQuery(serviceOverridesQuery).data;
}
