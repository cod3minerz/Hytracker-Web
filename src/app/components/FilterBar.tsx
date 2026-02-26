import { Search, SlidersHorizontal, Star, Users, Globe, ChevronDown } from "lucide-react";
import { gameModes } from "../data/servers";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: "rating" | "players";
  onSortChange: (sort: "rating" | "players") => void;
  totalFound: number;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedTags,
  onTagToggle,
  sortBy,
  onSortChange,
  totalFound,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-border shadow-sm mb-6">
      {/* Search & sort row */}
      <div className="px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-border">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск серверов..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-[0.875rem] bg-secondary rounded-lg border-none outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Sort buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSortChange("rating")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[0.8125rem] transition-all ${
              sortBy === "rating"
                ? "bg-primary text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
            style={{ fontWeight: 500 }}
          >
            <Star className="w-3.5 h-3.5" />
            Рейтинг
          </button>
          <button
            onClick={() => onSortChange("players")}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[0.8125rem] transition-all ${
              sortBy === "players"
                ? "bg-primary text-white shadow-sm"
                : "bg-secondary text-muted-foreground hover:bg-muted"
            }`}
            style={{ fontWeight: 500 }}
          >
            <Users className="w-3.5 h-3.5" />
            Онлайн
          </button>

          {/* Global badge */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary text-[0.8125rem] text-muted-foreground">
            <Globe className="w-3.5 h-3.5" />
            Все
            <ChevronDown className="w-3 h-3" />
          </div>

          {/* Found count */}
          <div className="text-[0.8125rem] text-muted-foreground px-2" style={{ fontWeight: 500 }}>
            <span className="text-foreground" style={{ fontWeight: 600 }}>{totalFound}</span> найдено
          </div>
        </div>
      </div>

      {/* Tags row */}
      <div className="px-4 sm:px-5 py-3 overflow-x-auto">
        <div className="flex items-center gap-2 flex-nowrap min-w-max">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground shrink-0 mr-1" />
          {gameModes.slice(0, 15).map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1.5 rounded-full text-[0.75rem] whitespace-nowrap transition-all border ${
                  isSelected
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
                }`}
                style={{ fontWeight: 500 }}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
