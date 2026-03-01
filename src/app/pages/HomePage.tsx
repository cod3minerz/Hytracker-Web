"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "../components/HeroSection";
import { FilterBar } from "../components/FilterBar";
import { ServerCard } from "../components/ServerCard";
import { servers } from "../data/servers";

const heroStats = {
  totalServers: servers.length,
  totalPlayers: servers
    .filter((s) => s.monitoringPlugin !== false)
    .reduce((a, s) => a + s.playersOnline, 0),
  serversOnlineCount: servers.filter(
    (s) => s.monitoringPlugin !== false && s.playersOnline > 0
  ).length,
};

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"rating" | "players">("rating");

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredServers = useMemo(() => {
    let result = [...servers];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.ip.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter((s) =>
        selectedTags.some((tag) => s.tags.includes(tag))
      );
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.votes - a.votes);
    } else {
      result.sort((a, b) => b.playersOnline - a.playersOnline);
    }

    return result;
  }, [searchQuery, selectedTags, sortBy]);

  return (
    <div>
      <HeroSection stats={heroStats} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalFound={filteredServers.length}
        />

        {/* Server List */}
        <div className="flex flex-col gap-4 sm:gap-5">
          {filteredServers.map((server, index) => (
            <ServerCard key={server.id} server={server} rank={index + 1} />
          ))}
        </div>

        {/* Empty state */}
        {filteredServers.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12" style={{ borderRadius: "var(--radius-xl)" }}>
            <p className="text-muted-foreground text-[0.9375rem]">
              Ничего не найдено. Попробуйте другие фильтры или поисковый запрос.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
              }}
              className="mt-4 rounded-lg px-4 py-2 text-[0.8125rem] font-medium text-primary transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
