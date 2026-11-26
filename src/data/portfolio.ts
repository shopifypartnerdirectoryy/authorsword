// Portfolio: the seven uploaded cinematic book trailers and three uploaded 3D book mockups.
// Titles stay neutral; descriptions only describe what is visible in each piece.
import t1 from "@/assets/portfolio/cinematic-book-trailer-01.mp4.asset.json";
import t2 from "@/assets/portfolio/cinematic-book-trailer-02.mp4.asset.json";
import t3 from "@/assets/portfolio/cinematic-book-trailer-03.mp4.asset.json";
import t4 from "@/assets/portfolio/cinematic-book-trailer-04.mp4.asset.json";
import t5 from "@/assets/portfolio/cinematic-book-trailer-05.mp4.asset.json";
import t6 from "@/assets/portfolio/cinematic-book-trailer-06.mp4.asset.json";
import t7 from "@/assets/portfolio/cinematic-book-trailer-07.mp4.asset.json";
import p1 from "@/assets/portfolio/cinematic-book-trailer-01-poster.jpg.asset.json";
import p2 from "@/assets/portfolio/cinematic-book-trailer-02-poster.jpg.asset.json";
import p3 from "@/assets/portfolio/cinematic-book-trailer-03-poster.jpg.asset.json";
import p4 from "@/assets/portfolio/cinematic-book-trailer-04-poster.jpg.asset.json";
import p5 from "@/assets/portfolio/cinematic-book-trailer-05-poster.jpg.asset.json";
import p6 from "@/assets/portfolio/cinematic-book-trailer-06-poster.jpg.asset.json";
import p7 from "@/assets/portfolio/cinematic-book-trailer-07-poster.jpg.asset.json";
import m1 from "@/assets/portfolio/nobel-pursuits-3d-book-mockup.webp.asset.json";
import m2 from "@/assets/portfolio/a-thousand-little-cuts-3d-book-mockup.webp.asset.json";
import m3 from "@/assets/portfolio/superpower-3d-book-mockup.webp.asset.json";

export interface Trailer {
  id: string;
  title: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  seconds: number;
  description: string;
}

export const TRAILERS: Trailer[] = [
  { id: "01", src: t1.url, poster: p1.url, width: 1024, height: 576, seconds: 121, description: "A science-fiction world of snow-covered mountains, a futuristic chamber and characters crossing a sunset savanna." },
  { id: "02", src: t2.url, poster: p2.url, width: 1024, height: 576, seconds: 113, description: "Opens on the book itself, then moves through small-town streets and classroom scenes." },
  { id: "03", src: t3.url, poster: p3.url, width: 1024, height: 576, seconds: 124, description: "An action thriller told through on-screen captions: an explosion, a survivor and his return." },
  { id: "04", src: t4.url, poster: p4.url, width: 1024, height: 576, seconds: 123, description: "A reflective, emotional piece moving from an intimate close-up to city, mountain and garden scenes." },
  { id: "05", src: t5.url, poster: p5.url, width: 1024, height: 576, seconds: 126, description: "A quiet story of memory and service: a folded flag, a family photograph and a memorial wall." },
  { id: "06", src: t6.url, poster: p6.url, width: 1088, height: 576, seconds: 40, description: "A military drama that opens in Afghanistan, 2009, and closes on the finished book in print and ebook." },
  { id: "07", src: t7.url, poster: p7.url, width: 1024, height: 576, seconds: 45, description: "A fiery dark-fantasy teaser with bold title cards and dramatic particle effects." },
].map((t) => ({ ...t, title: `Cinematic Book Trailer ${t.id}` }));

export interface Mockup {
  id: string;
  title: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export const MOCKUPS: Mockup[] = [
  { id: "01", title: "3D Book Mockup 01", src: m1.url, width: 1920, height: 1151, caption: "Hardcover presentation with an \u201cAvailable now on Amazon\u201d launch message.", alt: "3D hardcover mockup of Nobel Pursuits by Rosemarie Aquilina and Robert Leader on a marble desk with lavender and a coffee cup, beside an Available now on Amazon message" },
  { id: "02", title: "3D Book Mockup 02", src: m2.url, width: 1920, height: 1151, caption: "Dark, library-lit presentation for a mystery novel launch.", alt: "3D hardcover mockup of A Thousand Little Cuts, a mystery novel by Max E. Carlson, on a dark wooden desk with antique books and an Available Now on Amazon message" },
  { id: "03", title: "3D Book Mockup 03", src: m3.url, width: 1336, height: 1424, caption: "Spine-and-cover hardcover view styled on a writer\u2019s desk.", alt: "3D hardcover mockup showing the cover and spine of Superpower: The Ability to Fly or to Become Invisible, The Deal of the Art Book 1, by Roger E. Pedersen on a wooden desk" },
];

export function isoDuration(seconds: number) {
  return `PT${Math.floor(seconds / 60)}M${seconds % 60}S`;
}
export function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}
