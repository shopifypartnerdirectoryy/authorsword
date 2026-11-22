// Official social profiles. Leave a URL empty to hide its icon in the footer.
// Add the real profile address (https://...) once it is confirmed.
export const SOCIAL_LINKS = {
  tiktok: "",
  instagram: "",
  facebook: "",
  x: "",
  linkedin: "",
  youtube: "",
  pinterest: "",
} as const;

export type SocialKey = keyof typeof SOCIAL_LINKS;
