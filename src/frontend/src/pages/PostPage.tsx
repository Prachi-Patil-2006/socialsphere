import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddComment,
  useDeletePost,
  useLikePost,
  usePost,
  useUnlikePost,
} from "@/hooks/usePosts";
import { useMyProfile, useUserProfile } from "@/hooks/useUsers";
import type { Comment } from "@/types";
import { formatRelativeTime } from "@/types";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Heart,
  ImageOff,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// ── Comment Author ────────────────────────────────────────────────────────
interface CommentItemProps {
  comment: Comment;
  index: number;
}

function CommentAuthorName({ userId }: { userId: string }) {
  const { data: author } = useUserProfile(userId);
  if (!author) {
    return (
      <span className="text-muted-foreground text-xs font-mono">
        @{userId.slice(0, 8)}…
      </span>
    );
  }
  return (
    <Link
      to="/profile/$id"
      params={{ id: userId }}
      className="font-semibold text-sm text-foreground hover:text-primary transition-colors duration-200 font-display truncate"
    >
      {author.username}
    </Link>
  );
}

// ── Comment Item ──────────────────────────────────────────────────────────
function CommentItem({ comment, index }: CommentItemProps) {
  const { data: author } = useUserProfile(comment.user);

  return (
    <motion.div
      data-ocid={`comment.item.${index + 1}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.22 }}
      className="flex gap-3 py-4 border-b border-border/40 last:border-0"
    >
      <Link
        to="/profile/$id"
        params={{ id: comment.user }}
        className="shrink-0 mt-0.5"
      >
        <UserAvatar
          username={author?.username}
          profilePicture={author?.profilePicture}
          size="sm"
          className="hover:ring-2 hover:ring-primary/40 transition-smooth"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap mb-0.5">
          <CommentAuthorName userId={comment.user} />
          <span className="text-xs text-muted-foreground shrink-0">
            {formatRelativeTime(comment.createdAt)}
          </span>
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed break-words whitespace-pre-wrap">
          {comment.text}
        </p>
      </div>
    </motion.div>
  );
}

// ── Post Author Row ───────────────────────────────────────────────────────
function PostAuthorRow({
  userId,
  createdAt,
}: { userId: string; createdAt: bigint }) {
  const { data: author } = useUserProfile(userId);
  return (
    <div className="flex items-center gap-3 mb-4">
      <Link to="/profile/$id" params={{ id: userId }} className="shrink-0">
        <UserAvatar
          username={author?.username}
          profilePicture={author?.profilePicture}
          size="md"
          className="hover:ring-2 hover:ring-primary/40 transition-smooth"
        />
      </Link>
      <div className="min-w-0">
        <Link
          to="/profile/$id"
          params={{ id: userId }}
          data-ocid="post.author_link"
          className="font-semibold text-sm text-foreground hover:text-primary transition-colors duration-200 font-display block truncate"
        >
          {author?.username ?? (
            <span className="text-muted-foreground text-xs font-mono">
              @{userId.slice(0, 8)}…
            </span>
          )}
        </Link>
        <span className="text-xs text-muted-foreground">
          {formatRelativeTime(createdAt)}
        </span>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────
export default function PostPage() {
  const { id } = useParams({ from: "/post/$id" });
  const navigate = useNavigate();

  const { data: post, isLoading } = usePost(id);
  const { principalId, isAuthenticated } = useAuth();
  const { data: myProfile } = useMyProfile();

  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const deletePost = useDeletePost();
  const addComment = useAddComment();

  const [commentText, setCommentText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [imgError, setImgError] = useState(false);

  // Reset textarea height when comment is cleared after submit
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta && commentText === "") {
      ta.style.height = "auto";
    }
  }, [commentText]);

  function handleCommentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setCommentText(e.target.value);
    // Auto-resize
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }

  // ── Loading state ────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <>
        <PageHeader title="Post" />
        <div
          data-ocid="post.loading_state"
          className="flex-1 flex items-center justify-center py-24"
        >
          <LoadingSpinner size="lg" label="Loading post…" />
        </div>
      </>
    );
  }

  // ── 404 state ────────────────────────────────────────────────────────
  if (!post) {
    return (
      <>
        <PageHeader title="Post" />
        <div
          data-ocid="post.error_state"
          className="flex-1 flex items-center justify-center py-24"
        >
          <EmptyState
            icon={<MessageCircle className="h-10 w-10" />}
            title="Post not found"
            description="This post may have been deleted or doesn't exist."
            action={{
              label: "Back to Feed",
              onClick: () => navigate({ to: "/" }),
              "data-ocid": "post.back_button",
            }}
          />
        </div>
      </>
    );
  }

  const isLiked = principalId ? post.likes.includes(principalId) : false;
  const isAuthor = principalId === post.user;
  const postIdBigInt = post.id;

  function handleLikeToggle() {
    if (!isAuthenticated) {
      toast.error("Sign in to like posts");
      return;
    }
    if (isLiked) {
      unlikePost.mutate(postIdBigInt, {
        onError: () => toast.error("Failed to unlike post"),
      });
    } else {
      likePost.mutate(postIdBigInt, {
        onError: () => toast.error("Failed to like post"),
      });
    }
  }

  function handleDelete() {
    deletePost.mutate(postIdBigInt, {
      onSuccess: () => {
        toast.success("Post deleted");
        navigate({ to: "/" });
      },
      onError: () => toast.error("Failed to delete post"),
    });
  }

  function handleCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    addComment.mutate(
      { postId: postIdBigInt, text },
      {
        onSuccess: () => {
          setCommentText("");
          toast.success("Comment added");
        },
        onError: () => toast.error("Failed to add comment"),
      },
    );
  }

  return (
    <>
      {/* Page header */}
      <PageHeader
        title="Post"
        subtitle={`${post.comments.length} comment${post.comments.length !== 1 ? "s" : ""}`}
        action={
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/" })}
            data-ocid="post.back_button"
            className="gap-1.5 text-muted-foreground hover:text-foreground -mr-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        }
      />

      <div className="max-w-2xl mx-auto w-full px-4 md:px-6 py-6 flex flex-col gap-6">
        {/* ── Full Post Card ───────────────────────────────────────── */}
        <motion.article
          data-ocid="post.card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-xl border border-border/60 shadow-subtle p-5"
        >
          {/* Author + delete */}
          <div className="flex items-start justify-between gap-2">
            <PostAuthorRow userId={post.user} createdAt={post.createdAt} />
            {isAuthor && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={deletePost.isPending}
                data-ocid="post.delete_button"
                className="shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                aria-label="Delete post"
              >
                {deletePost.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Content */}
          <p className="text-base text-foreground leading-relaxed whitespace-pre-wrap break-words mb-4">
            {post.content}
          </p>

          {/* Image */}
          {post.image && !imgError && (
            <div className="rounded-lg overflow-hidden border border-border/40 mb-4">
              <img
                src={post.image}
                alt="Attached media"
                className="w-full object-cover max-h-[480px]"
                onError={() => setImgError(true)}
              />
            </div>
          )}
          {post.image && imgError && (
            <div className="rounded-lg border border-border/40 mb-4 h-32 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30">
              <ImageOff className="h-5 w-5" />
              Image unavailable
            </div>
          )}

          {/* Like / comment counts */}
          <div className="flex items-center gap-4 pt-3 border-t border-border/40">
            <button
              type="button"
              onClick={handleLikeToggle}
              disabled={likePost.isPending || unlikePost.isPending}
              data-ocid="post.like_button"
              aria-label={isLiked ? "Unlike post" : "Like post"}
              aria-pressed={isLiked}
              className={`flex items-center gap-2 text-sm font-medium rounded-md px-2 py-1 -ml-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 ${
                isLiked
                  ? "text-accent hover:text-accent/80"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart
                className={`h-5 w-5 transition-smooth ${isLiked ? "fill-current" : ""}`}
              />
              <span>{post.likes.length}</span>
            </button>

            <div className="flex items-center gap-2 text-sm text-muted-foreground px-2 py-1">
              <MessageCircle className="h-5 w-5" />
              <span>{post.comments.length}</span>
            </div>
          </div>
        </motion.article>

        {/* ── Comments Section ─────────────────────────────────────── */}
        <section aria-label="Comments" data-ocid="post.comments_section">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 font-display px-0.5">
            Comments
          </h2>

          {post.comments.length === 0 ? (
            <div
              data-ocid="post.comments.empty_state"
              className="bg-card rounded-xl border border-border/60 py-12 text-center"
            >
              <MessageCircle className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No comments yet. Be the first to reply!
              </p>
            </div>
          ) : (
            <div className="bg-card rounded-xl border border-border/60 px-4">
              {post.comments.map((comment, i) => (
                <CommentItem
                  key={comment.id.toString()}
                  comment={comment}
                  index={i}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Add Comment Form ─────────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.28 }}
          aria-label="Add comment"
        >
          {isAuthenticated ? (
            <form
              onSubmit={handleCommentSubmit}
              data-ocid="comment.form"
              className="bg-card rounded-xl border border-border/60 p-4 shadow-subtle"
            >
              <div className="flex gap-3 items-start">
                <UserAvatar
                  username={myProfile?.username}
                  profilePicture={myProfile?.profilePicture}
                  size="sm"
                  className="shrink-0 mt-0.5"
                />
                <div className="flex-1 min-w-0 flex flex-col gap-3">
                  <Textarea
                    ref={textareaRef}
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Write a comment…"
                    rows={2}
                    maxLength={500}
                    disabled={addComment.isPending}
                    data-ocid="comment.textarea"
                    className="resize-none min-h-[72px] overflow-hidden bg-input/50 border-border/60 focus:border-primary/60 transition-smooth text-sm placeholder:text-muted-foreground/60"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                        handleCommentSubmit(e as unknown as React.FormEvent);
                      }
                    }}
                  />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">
                      <span
                        className={
                          commentText.length > 450 ? "text-accent" : ""
                        }
                      >
                        {commentText.length}
                      </span>
                      /500
                      {commentText.length > 0 && (
                        <span className="ml-2 opacity-50">⌘↵ to send</span>
                      )}
                    </span>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!commentText.trim() || addComment.isPending}
                      data-ocid="comment.submit_button"
                      className="gap-1.5 transition-smooth"
                    >
                      {addComment.isPending ? (
                        <>
                          <LoadingSpinner size="sm" />
                          Posting…
                        </>
                      ) : (
                        "Comment"
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {addComment.isError && (
                <p
                  data-ocid="comment.error_state"
                  className="text-destructive text-xs mt-2 ml-11"
                >
                  Failed to post comment. Please try again.
                </p>
              )}
            </form>
          ) : (
            <div
              data-ocid="comment.login_prompt"
              className="bg-card rounded-xl border border-border/60 p-6 text-center"
            >
              <p className="text-sm text-muted-foreground mb-3">
                Sign in to join the conversation
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: "/" })}
                data-ocid="comment.sign_in_button"
              >
                Sign In
              </Button>
            </div>
          )}
        </motion.section>
      </div>
    </>
  );
}
