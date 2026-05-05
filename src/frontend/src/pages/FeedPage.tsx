import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PostCard } from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost, useFeed } from "@/hooks/usePosts";
import { useMyProfile } from "@/hooks/useUsers";
import { useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  ImageIcon,
  PenLine,
  Send,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-7 w-16 rounded-xl" />
        <Skeleton className="h-7 w-16 rounded-xl" />
      </div>
    </div>
  );
}

function CreatePostPanel({ onClose }: { onClose: () => void }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageInput, setShowImageInput] = useState(false);
  const createPost = useCreatePost();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;

    try {
      await createPost.mutateAsync({
        content: trimmed,
        image: imageUrl.trim() || undefined,
      });
      toast.success("Post published!");
      setContent("");
      setImageUrl("");
      setShowImageInput(false);
      onClose();
    } catch {
      toast.error("Failed to publish post. Please try again.");
    }
  };

  const canSubmit = content.trim().length > 0 && !createPost.isPending;

  return (
    <div
      data-ocid="feed.composer_panel"
      className="bg-card rounded-2xl border border-border/60 shadow-subtle overflow-hidden"
    >
      <form onSubmit={handleSubmit}>
        <div className="p-4 space-y-3">
          <Label htmlFor="post-content" className="sr-only">
            What&apos;s on your mind?
          </Label>
          <Textarea
            id="post-content"
            data-ocid="feed.post_content_textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="resize-none bg-input border-border/50 focus-visible:ring-primary/40 rounded-xl text-sm placeholder:text-muted-foreground/60 transition-smooth"
            maxLength={500}
            disabled={createPost.isPending}
            autoFocus
          />

          {showImageInput && (
            <div className="space-y-1.5">
              <Label
                htmlFor="post-image"
                className="text-xs text-muted-foreground font-medium"
              >
                Image URL{" "}
                <span className="text-muted-foreground/60">(optional)</span>
              </Label>
              <Input
                id="post-image"
                data-ocid="feed.post_image_input"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-input border-border/50 focus-visible:ring-primary/40 rounded-xl text-sm h-9 transition-smooth"
                disabled={createPost.isPending}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 px-4 pb-4">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowImageInput((v) => !v)}
              data-ocid="feed.toggle_image_button"
              className={`gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium transition-smooth ${
                showImageInput
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              }`}
              aria-label="Add image URL"
              aria-pressed={showImageInput}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Image</span>
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-xs tabular-nums ${
                content.length > 450
                  ? content.length > 490
                    ? "text-destructive"
                    : "text-accent"
                  : "text-muted-foreground/50"
              }`}
            >
              {content.length}/500
            </span>
            <Button
              type="submit"
              size="sm"
              data-ocid="feed.submit_post_button"
              disabled={!canSubmit}
              className="gap-2 h-8 px-4 rounded-xl text-xs font-semibold transition-smooth disabled:opacity-40"
            >
              {createPost.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                <Send className="h-3.5 w-3.5" />
              )}
              Publish
            </Button>
          </div>
        </div>

        {createPost.isError && (
          <p
            data-ocid="feed.post_error_state"
            className="text-xs text-destructive px-4 pb-3"
            role="alert"
          >
            Failed to publish. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default function FeedPage() {
  const [page, setPage] = useState(1);
  const [composerOpen, setComposerOpen] = useState(false);
  const { data: posts = [], isLoading } = useFeed(page);
  const { data: profile } = useMyProfile();
  const navigate = useNavigate();

  const hasNextPage = posts.length === PAGE_SIZE;
  const hasPrevPage = page > 1;

  return (
    <div data-ocid="feed.page" className="flex flex-col flex-1 min-w-0">
      <PageHeader
        title="Home"
        subtitle={
          profile
            ? `Welcome back, ${profile.username}`
            : "Your personalized feed"
        }
        action={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setComposerOpen((v) => !v)}
            data-ocid="feed.toggle_composer_button"
            className="gap-2 h-8 px-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
            aria-expanded={composerOpen}
            aria-controls="feed-composer"
          >
            <PenLine className="h-4 w-4" />
            <span className="hidden sm:inline">New Post</span>
            {composerOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </Button>
        }
      />

      <div className="max-w-2xl mx-auto w-full px-4 md:px-6 py-4 space-y-4">
        {/* Inline composer */}
        {composerOpen && (
          <div id="feed-composer">
            <CreatePostPanel onClose={() => setComposerOpen(false)} />
          </div>
        )}

        {/* Loading state */}
        {isLoading && (
          <div data-ocid="feed.loading_state" className="space-y-3">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && posts.length === 0 && (
          <EmptyState
            icon={<Users />}
            title="Your feed is empty"
            description="Follow some people to see their posts here. Head to Explore to find interesting accounts."
            action={{
              label: "Explore people",
              onClick: () => navigate({ to: "/explore" }),
              "data-ocid": "feed.explore_link",
            }}
          />
        )}

        {/* Posts list */}
        {!isLoading && posts.length > 0 && (
          <div data-ocid="feed.posts_list" className="space-y-3">
            {posts.map((post, i) => (
              <PostCard
                key={post.id.toString()}
                post={post}
                index={(page - 1) * PAGE_SIZE + i + 1}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && posts.length > 0 && (hasPrevPage || hasNextPage) && (
          <div
            data-ocid="feed.pagination"
            className="flex items-center justify-between gap-3 pt-2 pb-4"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!hasPrevPage}
              data-ocid="feed.pagination_prev"
              className="gap-2 rounded-xl h-9 px-4 text-sm font-medium border-border/60 hover:bg-secondary transition-smooth disabled:opacity-30"
            >
              ← Previous
            </Button>

            <span className="text-xs text-muted-foreground tabular-nums">
              Page {page}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNextPage}
              data-ocid="feed.pagination_next"
              className="gap-2 rounded-xl h-9 px-4 text-sm font-medium border-border/60 hover:bg-secondary transition-smooth disabled:opacity-30"
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
