import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useExplorePosts } from "@/hooks/usePosts";
import type { Post } from "@/types";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Search,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

const PAGE_SIZE = 10;

function PostSkeleton() {
  return (
    <div className="bg-card rounded-2xl p-4 border border-border/50 space-y-3">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-7 w-16 rounded-xl" />
        <Skeleton className="h-7 w-16 rounded-xl" />
      </div>
    </div>
  );
}

interface StatPillProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
}

function StatPill({ label, value, icon }: StatPillProps) {
  return (
    <div className="flex items-center gap-1.5 bg-muted/60 border border-border/50 rounded-full px-3 py-1.5 text-xs">
      <span className="text-muted-foreground">{icon}</span>
      <span className="font-semibold text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data: allPosts = [], isLoading } = useExplorePosts(1);

  // Client-side filter by username prefix match (case-insensitive)
  const filtered: Post[] = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allPosts;
    return allPosts.filter(
      (p) =>
        p.user.toLowerCase().includes(term) ||
        // username might not be loaded here, so also check principal prefix
        p.user
          .slice(0, 8)
          .toLowerCase()
          .includes(term),
    );
  }, [allPosts, search]);

  // Unique author count
  const uniqueAuthors = useMemo(
    () => new Set(allPosts.map((p) => p.user)).size,
    [allPosts],
  );

  // Reset to page 1 when search changes
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  // Paginate filtered results
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  const hasPrev = safePage > 1;
  const hasNext = safePage < totalPages;

  const headerStats = !isLoading ? (
    <div className="flex items-center gap-2 flex-wrap">
      <StatPill
        icon={<Compass className="h-3 w-3" />}
        value={allPosts.length}
        label="posts"
      />
      <StatPill
        icon={<Users className="h-3 w-3" />}
        value={uniqueAuthors}
        label="creators"
      />
    </div>
  ) : undefined;

  return (
    <div data-ocid="explore.page">
      <PageHeader
        title="Explore"
        subtitle="Discover what's happening on SocialSphere"
        action={headerStats}
      />

      <div className="max-w-2xl mx-auto px-4 py-5 flex flex-col gap-4">
        {/* Search bar */}
        <div className="relative" data-ocid="explore.search_input">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Filter by username…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 bg-card border-border/60 rounded-xl h-10 placeholder:text-muted-foreground/60 focus-visible:border-primary/60"
            aria-label="Filter posts by username"
          />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div
            data-ocid="explore.loading_state"
            className="flex flex-col gap-4"
          >
            <div className="flex items-center justify-center gap-2 py-2">
              <LoadingSpinner size="sm" />
              <span className="text-sm text-muted-foreground">
                Loading posts…
              </span>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton order is stable
              <PostSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div data-ocid="explore.empty_state">
            <EmptyState
              icon={<Compass className="h-8 w-8" />}
              title={
                search
                  ? "No posts match that username"
                  : "Nothing to explore yet"
              }
              description={
                search
                  ? "Try a different username or clear the search"
                  : "Posts from all users will appear here once people start sharing"
              }
              action={
                search
                  ? {
                      label: "Clear search",
                      onClick: () => handleSearch(""),
                      "data-ocid": "explore.clear_search_button",
                    }
                  : undefined
              }
              className="py-20"
            />
          </div>
        )}

        {/* Post list */}
        {!isLoading && paginated.length > 0 && (
          <>
            <div className="flex flex-col gap-4" data-ocid="explore.list">
              {paginated.map((post, i) => (
                <PostCard
                  key={post.id.toString()}
                  post={post}
                  index={pageStart + i + 1}
                />
              ))}
            </div>

            {/* Pagination */}
            <div
              className="flex items-center justify-between gap-3 pt-2 pb-4 border-t border-border/40"
              data-ocid="explore.pagination"
            >
              <span className="text-xs text-muted-foreground tabular-nums">
                Page{" "}
                <span className="font-semibold text-foreground">
                  {safePage}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {totalPages}
                </span>
                {filtered.length !== allPosts.length && (
                  <span className="ml-1">({filtered.length} filtered)</span>
                )}
              </span>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={!hasPrev}
                  data-ocid="explore.pagination_prev"
                  aria-label="Previous page"
                  className="h-8 px-3 rounded-xl gap-1 text-xs"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={!hasNext}
                  data-ocid="explore.pagination_next"
                  aria-label="Next page"
                  className="h-8 px-3 rounded-xl gap-1 text-xs"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
