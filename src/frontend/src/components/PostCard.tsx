import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useDeletePost, useLikePost, useUnlikePost } from "@/hooks/usePosts";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/types";
import type { Post, User } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, MessageCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { UserAvatar } from "./UserAvatar";

interface PostCardProps {
  post: Post;
  author?: User;
  onCommentClick?: () => void;
  index?: number;
}

export function PostCard({
  post,
  author,
  onCommentClick,
  index = 1,
}: PostCardProps) {
  const { principalId } = useAuth();
  const navigate = useNavigate();
  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const deletePost = useDeletePost();

  const isLiked = principalId ? post.likes.includes(principalId) : false;
  const isOwn = principalId === post.user;
  const [optimisticLiked, setOptimisticLiked] = useState<boolean | null>(null);

  const liked = optimisticLiked !== null ? optimisticLiked : isLiked;
  const likeCount =
    post.likes.length +
    (optimisticLiked === true && !isLiked
      ? 1
      : optimisticLiked === false && isLiked
        ? -1
        : 0);

  const handleLike = async () => {
    setOptimisticLiked(!liked);
    try {
      if (liked) {
        await unlikePost.mutateAsync(post.id);
      } else {
        await likePost.mutateAsync(post.id);
      }
    } catch {
      setOptimisticLiked(null);
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost.mutateAsync(post.id);
      toast.success("Post deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const idx = index.toString();

  return (
    <article
      data-ocid={`post.item.${idx}`}
      className="bg-card rounded-2xl p-4 shadow-subtle border border-border/50 hover:border-border transition-smooth group"
    >
      {/* Author row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link
          to="/profile/$id"
          params={{ id: post.user }}
          className="flex items-center gap-3 min-w-0"
          data-ocid={`post.profile_link.${idx}`}
        >
          <UserAvatar
            username={author?.username}
            profilePicture={author?.profilePicture}
            size="md"
          />
          <div className="min-w-0">
            <p className="font-display font-semibold text-sm text-foreground truncate leading-tight">
              {author?.username ?? `${post.user.slice(0, 8)}…`}
            </p>
            <p className="text-xs text-muted-foreground">
              @{author?.username?.toLowerCase() ?? post.user.slice(0, 8)}
            </p>
          </div>
        </Link>
        <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
          {formatRelativeTime(post.createdAt)}
        </span>
      </div>

      {/* Content */}
      <Link
        to="/post/$id"
        params={{ id: post.id.toString() }}
        data-ocid={`post.link.${idx}`}
      >
        <p className="text-sm text-foreground leading-relaxed mb-3 whitespace-pre-wrap break-words hover:text-foreground/90 transition-colors">
          {post.content}
        </p>

        {/* Image */}
        {post.image && (
          <div className="rounded-xl overflow-hidden mb-3 border border-border/40">
            <img
              src={post.image}
              alt="Shared media"
              className="w-full object-cover max-h-80"
              loading="lazy"
            />
          </div>
        )}
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-1 pt-1 -ml-1.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          data-ocid={`post.like_button.${idx}`}
          className={cn(
            "gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium transition-smooth",
            liked
              ? "text-accent hover:text-accent/80 hover:bg-accent/10"
              : "text-muted-foreground hover:text-accent hover:bg-accent/10",
          )}
          aria-label={liked ? "Unlike post" : "Like post"}
        >
          <Heart
            className={cn("h-4 w-4 transition-smooth", liked && "fill-current")}
          />
          <span>{likeCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={
            onCommentClick ??
            (() =>
              navigate({ to: "/post/$id", params: { id: post.id.toString() } }))
          }
          data-ocid={`post.comment_button.${idx}`}
          className="gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth"
          aria-label="View comments"
        >
          <MessageCircle className="h-4 w-4" />
          <span>{post.comments.length}</span>
        </Button>

        {isOwn && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            data-ocid={`post.delete_button.${idx}`}
            className="ml-auto gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-smooth"
            aria-label="Delete post"
            disabled={deletePost.isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </article>
  );
}
