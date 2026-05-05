import { c as createLucideIcon, r as reactExports, u as useMyProfile, a as useNavigate, j as jsxRuntimeExports, P as PageHeader, B as Button, L as Label, T as Textarea, I as Input, b as LoadingSpinner, d as ue } from "./index-CZHbt-YQ.js";
import { u as useFeed, E as EmptyState, a as useCreatePost } from "./index-B28Jqmtq.js";
import { U as Users, P as PostCard, S as Skeleton } from "./skeleton-DaaBogDn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
const ChevronDown = createLucideIcon("chevron-down", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
const ChevronUp = createLucideIcon("chevron-up", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
];
const PenLine = createLucideIcon("pen-line", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode);
const PAGE_SIZE = 10;
function PostSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl p-4 border border-border/50 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-10 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 rounded-xl" })
    ] })
  ] });
}
function CreatePostPanel({ onClose }) {
  const [content, setContent] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [showImageInput, setShowImageInput] = reactExports.useState(false);
  const createPost = useCreatePost();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    try {
      await createPost.mutateAsync({
        content: trimmed,
        image: imageUrl.trim() || void 0
      });
      ue.success("Post published!");
      setContent("");
      setImageUrl("");
      setShowImageInput(false);
      onClose();
    } catch {
      ue.error("Failed to publish post. Please try again.");
    }
  };
  const canSubmit = content.trim().length > 0 && !createPost.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": "feed.composer_panel",
      className: "bg-card rounded-2xl border border-border/60 shadow-subtle overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "post-content", className: "sr-only", children: "What's on your mind?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              id: "post-content",
              "data-ocid": "feed.post_content_textarea",
              placeholder: "What's on your mind?",
              value: content,
              onChange: (e) => setContent(e.target.value),
              rows: 3,
              className: "resize-none bg-input border-border/50 focus-visible:ring-primary/40 rounded-xl text-sm placeholder:text-muted-foreground/60 transition-smooth",
              maxLength: 500,
              disabled: createPost.isPending,
              autoFocus: true
            }
          ),
          showImageInput && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Label,
              {
                htmlFor: "post-image",
                className: "text-xs text-muted-foreground font-medium",
                children: [
                  "Image URL",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/60", children: "(optional)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "post-image",
                "data-ocid": "feed.post_image_input",
                type: "url",
                placeholder: "https://example.com/image.jpg",
                value: imageUrl,
                onChange: (e) => setImageUrl(e.target.value),
                className: "bg-input border-border/50 focus-visible:ring-primary/40 rounded-xl text-sm h-9 transition-smooth",
                disabled: createPost.isPending
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 px-4 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "ghost",
              size: "sm",
              onClick: () => setShowImageInput((v) => !v),
              "data-ocid": "feed.toggle_image_button",
              className: `gap-1.5 h-8 px-2.5 rounded-xl text-xs font-medium transition-smooth ${showImageInput ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary hover:bg-primary/10"}`,
              "aria-label": "Add image URL",
              "aria-pressed": showImageInput,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "h-4 w-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Image" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `text-xs tabular-nums ${content.length > 450 ? content.length > 490 ? "text-destructive" : "text-accent" : "text-muted-foreground/50"}`,
                children: [
                  content.length,
                  "/500"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                size: "sm",
                "data-ocid": "feed.submit_post_button",
                disabled: !canSubmit,
                className: "gap-2 h-8 px-4 rounded-xl text-xs font-semibold transition-smooth disabled:opacity-40",
                children: [
                  createPost.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" }),
                  "Publish"
                ]
              }
            )
          ] })
        ] }),
        createPost.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            "data-ocid": "feed.post_error_state",
            className: "text-xs text-destructive px-4 pb-3",
            role: "alert",
            children: "Failed to publish. Please try again."
          }
        )
      ] })
    }
  );
}
function FeedPage() {
  const [page, setPage] = reactExports.useState(1);
  const [composerOpen, setComposerOpen] = reactExports.useState(false);
  const { data: posts = [], isLoading } = useFeed(page);
  const { data: profile } = useMyProfile();
  const navigate = useNavigate();
  const hasNextPage = posts.length === PAGE_SIZE;
  const hasPrevPage = page > 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "feed.page", className: "flex flex-col flex-1 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Home",
        subtitle: profile ? `Welcome back, ${profile.username}` : "Your personalized feed",
        action: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: () => setComposerOpen((v) => !v),
            "data-ocid": "feed.toggle_composer_button",
            className: "gap-2 h-8 px-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
            "aria-expanded": composerOpen,
            "aria-controls": "feed-composer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "h-4 w-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "New Post" }),
              composerOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3.5 w-3.5" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto w-full px-4 md:px-6 py-4 space-y-4", children: [
      composerOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "feed-composer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreatePostPanel, { onClose: () => setComposerOpen(false) }) }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "feed.loading_state", className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PostSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PostSkeleton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PostSkeleton, {})
      ] }),
      !isLoading && posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, {}),
          title: "Your feed is empty",
          description: "Follow some people to see their posts here. Head to Explore to find interesting accounts.",
          action: {
            label: "Explore people",
            onClick: () => navigate({ to: "/explore" }),
            "data-ocid": "feed.explore_link"
          }
        }
      ),
      !isLoading && posts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "feed.posts_list", className: "space-y-3", children: posts.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PostCard,
        {
          post,
          index: (page - 1) * PAGE_SIZE + i + 1
        },
        post.id.toString()
      )) }),
      !isLoading && posts.length > 0 && (hasPrevPage || hasNextPage) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "feed.pagination",
          className: "flex items-center justify-between gap-3 pt-2 pb-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setPage((p) => Math.max(1, p - 1)),
                disabled: !hasPrevPage,
                "data-ocid": "feed.pagination_prev",
                className: "gap-2 rounded-xl h-9 px-4 text-sm font-medium border-border/60 hover:bg-secondary transition-smooth disabled:opacity-30",
                children: "← Previous"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums", children: [
              "Page ",
              page
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setPage((p) => p + 1),
                disabled: !hasNextPage,
                "data-ocid": "feed.pagination_next",
                className: "gap-2 rounded-xl h-9 px-4 text-sm font-medium border-border/60 hover:bg-secondary transition-smooth disabled:opacity-30",
                children: "Next →"
              }
            )
          ]
        }
      )
    ] })
  ] });
}
export {
  FeedPage as default
};
