import { c as createLucideIcon, l as useParams, a as useNavigate, m as useAuth, u as useMyProfile, r as reactExports, j as jsxRuntimeExports, P as PageHeader, b as LoadingSpinner, B as Button, U as UserAvatar, T as Textarea, d as ue, n as useUserProfile, v as Link } from "./index-CZHbt-YQ.js";
import { g as usePost, c as useLikePost, d as useUnlikePost, e as useDeletePost, h as useAddComment, E as EmptyState, M as MessageCircle, T as Trash2, H as Heart, f as formatRelativeTime } from "./index-B28Jqmtq.js";
import { m as motion } from "./proxy-B01Yv0Fx.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
  ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
  ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
  ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
  [
    "path",
    {
      d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
      key: "mmje98"
    }
  ],
  ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }]
];
const ImageOff = createLucideIcon("image-off", __iconNode);
function CommentAuthorName({ userId }) {
  const { data: author } = useUserProfile(userId);
  if (!author) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-mono", children: [
      "@",
      userId.slice(0, 8),
      "…"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/profile/$id",
      params: { id: userId },
      className: "font-semibold text-sm text-foreground hover:text-primary transition-colors duration-200 font-display truncate",
      children: author.username
    }
  );
}
function CommentItem({ comment, index }) {
  const { data: author } = useUserProfile(comment.user);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `comment.item.${index + 1}`,
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.04, duration: 0.22 },
      className: "flex gap-3 py-4 border-b border-border/40 last:border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/profile/$id",
            params: { id: comment.user },
            className: "shrink-0 mt-0.5",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              UserAvatar,
              {
                username: author == null ? void 0 : author.username,
                profilePicture: author == null ? void 0 : author.profilePicture,
                size: "sm",
                className: "hover:ring-2 hover:ring-primary/40 transition-smooth"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 flex-wrap mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CommentAuthorName, { userId: comment.user }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground shrink-0", children: formatRelativeTime(comment.createdAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/90 leading-relaxed break-words whitespace-pre-wrap", children: comment.text })
        ] })
      ]
    }
  );
}
function PostAuthorRow({
  userId,
  createdAt
}) {
  const { data: author } = useUserProfile(userId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile/$id", params: { id: userId }, className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      UserAvatar,
      {
        username: author == null ? void 0 : author.username,
        profilePicture: author == null ? void 0 : author.profilePicture,
        size: "md",
        className: "hover:ring-2 hover:ring-primary/40 transition-smooth"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/profile/$id",
          params: { id: userId },
          "data-ocid": "post.author_link",
          className: "font-semibold text-sm text-foreground hover:text-primary transition-colors duration-200 font-display block truncate",
          children: (author == null ? void 0 : author.username) ?? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs font-mono", children: [
            "@",
            userId.slice(0, 8),
            "…"
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatRelativeTime(createdAt) })
    ] })
  ] });
}
function PostPage() {
  const { id } = useParams({ from: "/post/$id" });
  const navigate = useNavigate();
  const { data: post, isLoading } = usePost(id);
  const { principalId, isAuthenticated } = useAuth();
  const { data: myProfile } = useMyProfile();
  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const deletePost = useDeletePost();
  const addComment = useAddComment();
  const [commentText, setCommentText] = reactExports.useState("");
  const textareaRef = reactExports.useRef(null);
  const [imgError, setImgError] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const ta = textareaRef.current;
    if (ta && commentText === "") {
      ta.style.height = "auto";
    }
  }, [commentText]);
  function handleCommentChange(e) {
    setCommentText(e.target.value);
    const ta = e.target;
    ta.style.height = "auto";
    ta.style.height = `${ta.scrollHeight}px`;
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Post" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "post.loading_state",
          className: "flex-1 flex items-center justify-center py-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading post…" })
        }
      )
    ] });
  }
  if (!post) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Post" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          "data-ocid": "post.error_state",
          className: "flex-1 flex items-center justify-center py-24",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-10 w-10" }),
              title: "Post not found",
              description: "This post may have been deleted or doesn't exist.",
              action: {
                label: "Back to Feed",
                onClick: () => navigate({ to: "/" }),
                "data-ocid": "post.back_button"
              }
            }
          )
        }
      )
    ] });
  }
  const isLiked = principalId ? post.likes.includes(principalId) : false;
  const isAuthor = principalId === post.user;
  const postIdBigInt = post.id;
  function handleLikeToggle() {
    if (!isAuthenticated) {
      ue.error("Sign in to like posts");
      return;
    }
    if (isLiked) {
      unlikePost.mutate(postIdBigInt, {
        onError: () => ue.error("Failed to unlike post")
      });
    } else {
      likePost.mutate(postIdBigInt, {
        onError: () => ue.error("Failed to like post")
      });
    }
  }
  function handleDelete() {
    deletePost.mutate(postIdBigInt, {
      onSuccess: () => {
        ue.success("Post deleted");
        navigate({ to: "/" });
      },
      onError: () => ue.error("Failed to delete post")
    });
  }
  function handleCommentSubmit(e) {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    addComment.mutate(
      { postId: postIdBigInt, text },
      {
        onSuccess: () => {
          setCommentText("");
          ue.success("Comment added");
        },
        onError: () => ue.error("Failed to add comment")
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Post",
        subtitle: `${post.comments.length} comment${post.comments.length !== 1 ? "s" : ""}`,
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => navigate({ to: "/" }),
            "data-ocid": "post.back_button",
            className: "gap-1.5 text-muted-foreground hover:text-foreground -mr-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
              "Back"
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto w-full px-4 md:px-6 py-6 flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.article,
        {
          "data-ocid": "post.card",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3 },
          className: "bg-card rounded-xl border border-border/60 shadow-subtle p-5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PostAuthorRow, { userId: post.user, createdAt: post.createdAt }),
              isAuthor && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: handleDelete,
                  disabled: deletePost.isPending,
                  "data-ocid": "post.delete_button",
                  className: "shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                  "aria-label": "Delete post",
                  children: deletePost.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-foreground leading-relaxed whitespace-pre-wrap break-words mb-4", children: post.content }),
            post.image && !imgError && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg overflow-hidden border border-border/40 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: post.image,
                alt: "Attached media",
                className: "w-full object-cover max-h-[480px]",
                onError: () => setImgError(true)
              }
            ) }),
            post.image && imgError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border/40 mb-4 h-32 flex items-center justify-center gap-2 text-sm text-muted-foreground bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "h-5 w-5" }),
              "Image unavailable"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pt-3 border-t border-border/40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleLikeToggle,
                  disabled: likePost.isPending || unlikePost.isPending,
                  "data-ocid": "post.like_button",
                  "aria-label": isLiked ? "Unlike post" : "Like post",
                  "aria-pressed": isLiked,
                  className: `flex items-center gap-2 text-sm font-medium rounded-md px-2 py-1 -ml-2 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 ${isLiked ? "text-accent hover:text-accent/80" : "text-muted-foreground hover:text-foreground"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Heart,
                      {
                        className: `h-5 w-5 transition-smooth ${isLiked ? "fill-current" : ""}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.likes.length })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground px-2 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-5 w-5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.comments.length })
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { "aria-label": "Comments", "data-ocid": "post.comments_section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 font-display px-0.5", children: "Comments" }),
        post.comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "post.comments.empty_state",
            className: "bg-card rounded-xl border border-border/60 py-12 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "h-8 w-8 mx-auto mb-2 text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No comments yet. Be the first to reply!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-xl border border-border/60 px-4", children: post.comments.map((comment, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          CommentItem,
          {
            comment,
            index: i
          },
          comment.id.toString()
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.section,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.18, duration: 0.28 },
          "aria-label": "Add comment",
          children: isAuthenticated ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleCommentSubmit,
              "data-ocid": "comment.form",
              className: "bg-card rounded-xl border border-border/60 p-4 shadow-subtle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UserAvatar,
                    {
                      username: myProfile == null ? void 0 : myProfile.username,
                      profilePicture: myProfile == null ? void 0 : myProfile.profilePicture,
                      size: "sm",
                      className: "shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Textarea,
                      {
                        ref: textareaRef,
                        value: commentText,
                        onChange: handleCommentChange,
                        placeholder: "Write a comment…",
                        rows: 2,
                        maxLength: 500,
                        disabled: addComment.isPending,
                        "data-ocid": "comment.textarea",
                        className: "resize-none min-h-[72px] overflow-hidden bg-input/50 border-border/60 focus:border-primary/60 transition-smooth text-sm placeholder:text-muted-foreground/60",
                        onKeyDown: (e) => {
                          if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                            handleCommentSubmit(e);
                          }
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: commentText.length > 450 ? "text-accent" : "",
                            children: commentText.length
                          }
                        ),
                        "/500",
                        commentText.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 opacity-50", children: "⌘↵ to send" })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "submit",
                          size: "sm",
                          disabled: !commentText.trim() || addComment.isPending,
                          "data-ocid": "comment.submit_button",
                          className: "gap-1.5 transition-smooth",
                          children: addComment.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
                            "Posting…"
                          ] }) : "Comment"
                        }
                      )
                    ] })
                  ] })
                ] }),
                addComment.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    "data-ocid": "comment.error_state",
                    className: "text-destructive text-xs mt-2 ml-11",
                    children: "Failed to post comment. Please try again."
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              "data-ocid": "comment.login_prompt",
              className: "bg-card rounded-xl border border-border/60 p-6 text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-3", children: "Sign in to join the conversation" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => navigate({ to: "/" }),
                    "data-ocid": "comment.sign_in_button",
                    children: "Sign In"
                  }
                )
              ]
            }
          )
        }
      )
    ] })
  ] });
}
export {
  PostPage as default
};
