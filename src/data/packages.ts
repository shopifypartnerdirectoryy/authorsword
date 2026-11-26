// Packages are always priced as a personalised proposal. Timelines and revisions are set in each proposal.
export interface Package {
  name: string;
  forWhom: string;
  objective: string;
  items: string[];
  deliverables: string;
  duration: string;
  timeline: string;
  revisions: string;
  price: string;
  highlight?: boolean;
}

const IN_PROPOSAL = "Set out in your proposal";

export const PACKAGES: Package[] = [
  {
    name: "The Debut Visibility Suite",
    forWhom: "Authors introducing a new or debut book to new audiences.",
    objective: "Give the book a polished visual presence and an initial wave of reader discovery.",
    items: ["Editorial 3D Book Mock-up Suite", "15-second cinematic book trailer", "TikTok Book Feature", "Instagram Book Feature", "Two Goodreads Listopia placements"],
    deliverables: "5 deliverables",
    duration: IN_PROPOSAL,
    timeline: IN_PROPOSAL,
    revisions: IN_PROPOSAL,
    price: "Custom Proposal",
  },
  {
    name: "The Reader Growth Campaign",
    forWhom: "Authors ready for a broader, coordinated visibility campaign.",
    objective: "Build sustained reader awareness across video, social media, email and Goodreads.",
    items: ["30-second cinematic trailer", "30-day social media management", "30 social media content pieces", "1,000-contact email campaign", "Five Goodreads Listopia placements", "Standard Interactive Reader Book Challenge"],
    deliverables: "6 deliverables, including 30 content pieces",
    duration: "30 days of social media management",
    timeline: IN_PROPOSAL,
    revisions: IN_PROPOSAL,
    price: "Custom Proposal",
    highlight: true,
  },
  {
    name: "The Complete Author Brand & Launch",
    forWhom: "Authors building a long-term author brand around a launch.",
    objective: "Create a professional author home and launch it with a full promotional campaign.",
    items: ["Bespoke author website", "60-second cinematic trailer", "30-day social media management", "2,500-contact email campaign", "Premium Interactive Reader Book Challenge"],
    deliverables: "5 deliverables",
    duration: "30 days of social media management",
    timeline: IN_PROPOSAL,
    revisions: IN_PROPOSAL,
    price: "Custom Proposal",
  },
];
