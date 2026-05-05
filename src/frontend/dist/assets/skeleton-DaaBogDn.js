import { c as createLucideIcon, m as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, v as Link, U as UserAvatar, B as Button, k as cn, d as ue } from "./index-CZHbt-YQ.js";
import { c as useLikePost, d as useUnlikePost, e as useDeletePost, f as formatRelativeTime, H as Heart, M as MessageCircle, T as Trash2 } from "./index-B28Jqmtq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function PostCard({
  post,
  author,
  onCommentClick,
  index = 1
}) {
  var _a;
  const { principalId } = useAuth();
  const navigate = useNavigate();
  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const deletePost = useDeletePost();
  const isLiked = principalId ? post.likes.includes(principalId) : false;
  const isOwn = principalId === post.user;
  const [optimisticLiked, setOptimisticLiked] = reactExports.useState(null);
  const liked = optimisticLiked !== null ? optimisticLiked : isLiked;
  const likeCount = post.likes.length + (optimisticLiked === true && !isLiked ? 1 : optimisticLiked === false && isLiked ? -1 : 0);
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
      ue.success("Post deleted");
    } catch {
      ue.error("Failed to delete post");
    }
  };
  const idx = index.toString();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      "data-ocid": `post.item.${idx}`,
      className: "bg-card rounded-2xl p-4 shadow-subtle border border-border/50 hover:border-border transition-smooth group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/profile/$id",
              params: { id: post.user },
              className: "flex items-center gap-3 min-w-0",
              "data-ocid": `post.profile_link.${idx}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  UserAvatar,
                  {
                    username: author == null ? void 0 : author.username,
                    profilePicture: author == null ? void 0 : author.profilePicture,
                    size: "md"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate leading-tight", children: (author == null ? void 0 : author.username) ?? `${post.user.slice(0, 8)}…` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    "@",
                    ((_a = author == null ? void 0 : author.username) == null ? void 0 : _a.toLowerCase()) ?? post.user.slice(0, 8)
                  ] })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0 mt-0.5", children: formatRelativeTime(post.createdAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/post/$id",
            params: { id: post.id.toString() },
            "data-ocid": `post.link.${idx}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground leading-relaxed mb-3 whitespace-pre-wrap break-words hover:text-foreground/90 transition-colors", children: post.content }),
              post.image && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden mb-3 border border-border/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: post.image,
                  alt: "Shared media",
                  className: "w-full object-cover max-h-80",
                  loading: "lazy"
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 pt-1 -ml-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleLike,
              "data-ocid": `post.like_button.${idx}`,
              className: cn(
                "gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium transition-smooth",
                liked ? "text-accent hover:text-accent/80 hover:bg-accent/10" : "text-muted-foreground hover:text-accent hover:bg-accent/10"
              ),
              "aria-label": liked ? "Unlike post" : "Like post",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Heart,
                  {
                    className: cn("h-4 w-4 transition-smooth", liked && "fill-current")
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: likeCount })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onCommentClick ?? (() => navigate({ to: "/post/$id", params: { id: post.id.toString() } })),
              "data-ocid": `post.comment_button.${idx}`,
              className: "gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
              "aria-label": "View comments",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.comments.length })
              ]
            }
          ),
          isOwn && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: handleDelete,
              "data-ocid": `post.delete_button.${idx}`,
              className: "ml-auto gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-smooth",
              "aria-label": "Delete post",
              disabled: deletePost.isPending,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
            }
          )
        ] })
      ]
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
export {
  PostCard as P,
  Skeleton as S,
  Users as U
};
