export interface Server {
  id: string;
  /** Unique URL slug, e.g. "dogecraft" for /server/dogecraft */
  slug: string;
  name: string;
  ip: string;
  description: string;
  tags: string[];
  image: string;
  /** Optional banner URL (image or GIF). If missing, card shows a placeholder with server name. */
  banner?: string;
  /** Optional game version range, e.g. "1.8 - 1.21" — not shown on card. */
  version?: string;
  playersOnline: number;
  playersMax: number;
  /** If false, card shows online as "-/max" (we don't track this server). Default true. */
  monitoringPlugin?: boolean;
  /** Stars: currency earned for activity on monitor + donate. Not a 5-star rating. */
  rating: number;
  votes: number;
  country: string;
}

export const servers: Server[] = [
  {
    id: "1",
    slug: "dogecraft",
    name: "Dogecraft",
    ip: "play.dogecraft.net:5528",
    description: "We actively enforce a no-toxicity environment. If you want a chill place to build and progress long-term, you will fit in.",
    tags: ["Survival", "PvP", "PvE"],
    image: "https://images.unsplash.com/photo-1760114333175-0143a2a446da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5lY3JhZnQlMjBzdXJ2aXZhbCUyMGdhbWUlMjB3b3JsZHxlbnwxfHx8fDE3NzE2MDQ5MzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    banner: "https://images.unsplash.com/photo-1760114333175-0143a2a446da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800",
    version: "1.8 - 1.21",
    playersOnline: 22,
    playersMax: 100,
    rating: 4.8,
    votes: 1742,
    country: "US",
  },
  {
    id: "2",
    slug: "forgotten-eu",
    name: "Forgotten | Modded PvE EU",
    ip: "forgotten.top:5528",
    description: "A cozy PvE server with deeper progression and quality-of-life features, designed to let you play your own way.",
    tags: ["Survival", "PvE", "RPG"],
    image: "https://images.unsplash.com/photo-1581089109039-beda8e907caa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW50YXN5JTIwbWVkaWV2YWwlMjBjYXN0bGUlMjBnYW1lfGVufDF8fHx8MTc3MTYwNDkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    playersOnline: 2,
    playersMax: 50,
    rating: 4.5,
    votes: 408,
    country: "EU",
    monitoringPlugin: false,
  },
  {
    id: "3",
    slug: "we-are-games",
    name: "[WAG] We.Are.Games [PL]",
    ip: "hytale.are.games:5528",
    description: "We.Are.Games | Play \u2022 Create \u2022 Have Fun \u2022 Party system. Join a thriving community of players and builders.",
    tags: ["Anarchy", "PvP", "PvE"],
    image: "https://images.unsplash.com/photo-1633524411211-b682455441f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXhlbCUyMGFydCUyMGdhbWUlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzcxNjA0OTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    playersOnline: 0,
    playersMax: 100,
    rating: 4.2,
    votes: 206,
    country: "PL",
  },
  {
    id: "4",
    slug: "hytalebox",
    name: "Hytale Box",
    ip: "play.hytalebox.com:5528",
    description: "Hytale Box Server Hispano. Join our Discord community for events, tournaments, and exclusive content drops.",
    tags: ["SkyWars", "Creative"],
    image: "https://images.unsplash.com/photo-1762983701995-9e75c4d5a812?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBmdXR1cmlzdGljJTIwZ2FtZSUyMHdvcmxkfGVufDF8fHx8MTc3MTYwNDkzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    playersOnline: 1,
    playersMax: 110,
    rating: 4.0,
    votes: 188,
    country: "ES",
  },
  {
    id: "5",
    slug: "guardianes",
    name: "Guardianes de Hytale",
    ip: "193.24.289.27:25528",
    description: "Guardianes de Hytale es un servidor Espa\u00f1ol estilo Survival. Experience unique quests and adventures.",
    tags: ["Survival", "PvE", "Adventure"],
    image: "https://images.unsplash.com/photo-1638464525233-6b5758cd4013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZm9yZXN0JTIwYWR2ZW50dXJlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MTYwNDkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    playersOnline: 0,
    playersMax: 100,
    rating: 3.9,
    votes: 178,
    country: "ES",
    monitoringPlugin: false,
  },
  {
    id: "6",
    slug: "hypecraft",
    name: "HypeCraft.pl",
    ip: "hypecraft.pl:5528",
    description: "PIERWSZY POLSKI SERWER HYTALE SURVIVAL. Competitive events every weekend with huge rewards.",
    tags: ["Survival", "PvP"],
    image: "https://images.unsplash.com/photo-1758410473598-ef957adbf57b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWx0aXBsYXllciUyMG9ubGluZSUyMGdhbWluZyUyMHNldHVwfGVufDF8fHx8MTc3MTYwNDkzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    playersOnline: 7,
    playersMax: 100,
    rating: 4.1,
    votes: 137,
    country: "PL",
  },
  {
    id: "7",
    slug: "hytale-bulgaria",
    name: "Hytale Bulgaria",
    ip: "hytale.undisturbed.top:15617",
    description: "\u041f\u044a\u0440\u0432\u0438\u044f\u0442 \u0438 \u043d\u0430\u0439-\u0433\u043e\u043b\u044f\u043c\u0430 \u0411\u044a\u043b\u0433\u0430\u0440\u0441\u043a\u0438 \u0441\u044a\u0440\u0432\u044a\u0440. The biggest Bulgarian community server with factions and economy.",
    tags: ["Survival", "Economy", "Factions"],
    image: "https://images.unsplash.com/photo-1711798111672-bfbaf16160ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xjYW5pYyUyMGxhdmElMjBsYW5kc2NhcGUlMjBkcmFtYXRpY3xlbnwxfHx8fDE3NzE2MDQ5Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    playersOnline: 1,
    playersMax: 100,
    rating: 3.7,
    votes: 132,
    country: "BG",
  },
  {
    id: "8",
    slug: "playtale",
    name: "Playtale Survival",
    ip: "play.playtale.net:5528",
    description: "A survival-focused server with custom enchantments, land claiming, and a player-driven marketplace.",
    tags: ["Survival", "PvP", "PvE"],
    image: "https://images.unsplash.com/photo-1667673077638-3dbc8f39d357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHVuZGVyd2F0ZXIlMjBjb3JhbCUyMHJlZWZ8ZW58MXx8fHwxNzcxNTc0MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    playersOnline: 2,
    playersMax: 100,
    rating: 3.8,
    votes: 129,
    country: "US",
  },
];

export function getServerById(id: string): Server | undefined {
  return servers.find((s) => s.id === id);
}

export function getServerBySlug(slug: string): Server | undefined {
  return servers.find((s) => s.slug === slug);
}

/** Returns up to 6 servers similar by shared tags, excluding current id. */
export function getSimilarServers(server: Server, limit = 6): Server[] {
  const set = new Set(server.tags);
  return servers
    .filter((s) => s.id !== server.id)
    .sort((a, b) => {
      const aScore = a.tags.filter((t) => set.has(t)).length;
      const bScore = b.tags.filter((t) => set.has(t)).length;
      if (bScore !== aScore) return bScore - aScore;
      return b.votes - a.votes;
    })
    .slice(0, limit);
}

export const gameModes = [
  "Survival",
  "Creative",
  "PvP",
  "PvE",
  "RPG",
  "Minigames",
  "Economy",
  "Factions",
  "SkyBlock",
  "Prison",
  "Bed Wars",
  "SkyWars",
  "Anarchy",
  "Hardcore",
  "Modded",
  "Towns",
  "KitPvP",
  "Hunger Games",
  "Adventure",
  "Parkour",
  "Building",
];
