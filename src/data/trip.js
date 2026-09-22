const WHATSAPP_NUMBER = "918851831103";

/** Prefix a public/ asset with Vite's base, so the subpath deploy resolves. */
export const asset = (file) => `${import.meta.env.BASE_URL}assets/${file}`;

export const whatsappLink = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const brand = {
  eyebrow: "TotemToU x Palga Rinpoche",
  edition: "Founding Expedition",
};

export const overview = {
  title: ["A Journey Beyond", "the Familiar"],
  lead: "The noise falls away. Only the road, the mountains, and the silence remain.",
  body: "Deep in the Himalayas lies Upper Mustang, an ancient kingdom of wind-carved valleys, forgotten trails and remote monasteries. For 14 days, we ride through its stark, otherworldly beauty — 4,000 metres above sea level, far from the familiar.",
};

export const rinpoche = {
  title: "The Monk Who sold his Maserati",
  body: "He had a successful life, a Maserati, and everything most people dream of. But it still wasn't enough. So he took a different road.",
  snaps: [
    {
      src: asset("snap-1.webp"),
      alt: "Palga Rinpoche with riders on the trail",
    },
    {
      src: asset("snap-2.webp"),
      alt: "Palga Rinpoche at a monastery gathering",
    },
    { src: asset("snap-3.webp"), alt: "Palga Rinpoche in the Mustang valley" },
  ],
};

export const journey = {
  title: "The Journey",
  stats: [
    "11 days on the road",
    "4,000 m at the highest point",
    "Upper Mustang · Nepal",
    "Remote trails & ancient monasteries",
    "Limited permits & small group",
  ],
  // x / y are percentages of the map image box
  destinations: [
    { n: 1, name: "Kagbeni", note: "The gateway to Mustang", x: 25, y: 75 },
    {
      n: 2,
      name: "Ghami Village",
      note: "Sandstone & white chortens",
      x: 36.4,
      y: 69.4,
    },
    {
      n: 3,
      name: "Dhakmar",
      note: "Dramatic red cliffs & monastery",
      x: 48.9,
      y: 54.3,
    },
    {
      n: 4,
      name: "Lo Manthang",
      note: "Ancient fortified kingdom, host of the Tiji Festival",
      x: 58.3,
      y: 36.8,
    },
    {
      n: 5,
      name: "Chhoser Caves",
      note: "Ancient caves & sacred dwellings",
      x: 80.8,
      y: 44.5,
    },
  ],
};

export const team = [
  {
    name: "Eksha Kerung",
    handle: "@ekshakerungo",
    instagram: "https://www.instagram.com/ekshakerungo/",
    bio: "Ride alongside a true powerhouse! A Sikkim police officer, national athlete, and MTV Supermodel finalist, Eksha brings an electrifying, fearless energy to the trail. Her unstoppable grit as an experienced rider and state-level boxer makes her the ultimate companion to have by your side while conquering the untamed magic of Upper Mustang.",
    photos: [
      {
        src: asset("eksha-1.webp"),
        alt: "Eksha on her motorcycle in the mountains",
      },
      { src: asset("eksha-2.webp"), alt: "Placeholder — swap for a second photo of Eksha" },
      { src: asset("eksha-3.webp"), alt: "Placeholder — swap for a third photo of Eksha" },
    ],
  },
  {
    name: "Deepak",
    handle: "@adventurer.dee",
    instagram: "https://www.instagram.com/adventurer.dee/",
    bio: "Hit the dirt with a relentless outdoor expert! Dee thrives where most turn back, bringing contagious enthusiasm and deep experience in extreme environments. From mountain biking to braving the elements, their hands-on resilience ensures you're riding with a true pro who is ready to tackle the raw adventure of the Kali Gandaki gorge right alongside you.",
    photos: [
      { src: asset("deepak-1.webp"), alt: "Deepak in riding gear" },
      { src: asset("deepak-2.webp"), alt: "Placeholder — swap for a second photo of Deepak" },
      { src: asset("deepak-3.webp"), alt: "Placeholder — swap for a third photo of Deepak" },
    ],
  },
];

export const editions = [
  {
    id: "maiden",
    name: "Maiden Voyage",
    flag: "Founding price",
    featured: true,
    rows: [
      ["Date", "14th Nov"],
      ["Duration", "14 Days"],
      ["Starting point", "Pokhara"],
    ],
    cost: "3499 USD",
    was: "12499 USD",
    note: "Because this is our founding trip, the price is a fraction of what it will be.",
    cta: "Reserve your spot",
    message:
      "Hi! I'd like to reserve a spot on the Maiden Voyage (14th Nov) to Upper Mustang at 3499 USD.",
  },
  {
    id: "spring",
    name: "Spring Expedition",
    featured: false,
    rows: [
      ["Date", "14th March"],
      ["Duration", "14 Days"],
      ["Starting point", "Pokhara"],
    ],
    cost: "12499 USD",
    note: "Same 14 days, same route — at standard pricing.",
    cta: "Reserve your spot",
    message:
      "Hi! I'd like to know more about the Spring Expedition (14th March) to Upper Mustang.",
  },
];
