"use client";

import { useState, useMemo } from "react";
import { HeroSection } from "../components/HeroSection";
import { FilterBar } from "../components/FilterBar";
import { ServerCard } from "../components/ServerCard";
import { servers } from "../data/servers";

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
      <HeroSection />

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
          <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
            <p className="text-muted-foreground text-[0.9375rem]">
              По вашему запросу серверов не найдено.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTags([]);
              }}
              className="mt-4 px-4 py-2 text-[0.8125rem] text-primary hover:bg-accent rounded-lg transition-colors"
              style={{ fontWeight: 500 }}
            >
              Сбросить фильтры
            </button>
          </div>
        )}

        {/* Load more */}
        {filteredServers.length > 0 && (
          <div className="flex justify-center mt-8">
            <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-[0.875rem] text-muted-foreground bg-white border border-border hover:border-primary/30 hover:text-foreground transition-all shadow-sm" style={{ fontWeight: 500 }}>
              Показать ещё
              <span className="text-muted-foreground/50">•••</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
