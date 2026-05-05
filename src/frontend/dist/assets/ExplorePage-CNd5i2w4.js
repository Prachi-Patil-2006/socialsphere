import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, P as PageHeader, S as Search, I as Input, b as LoadingSpinner, B as Button } from "./index-CZHbt-YQ.js";
import { b as useExplorePosts, E as EmptyState } from "./index-B28Jqmtq.js";
import { U as Users, P as PostCard, S as Skeleton } from "./skeleton-DaaBogDn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$1);
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
      d: "m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z",
      key: "9ktpf1"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Compass = createLucideIcon("compass", __iconNode);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16 rounded-xl" })
    ] })
  ] });
}
function StatPill({ label, value, icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-muted/60 border border-border/50 rounded-full px-3 py-1.5 text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground tabular-nums", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label })
  ] });
}
function ExplorePage() {
  const [search, setSearch] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const { data: allPosts = [], isLoading } = useExplorePosts(1);
  const filtered = reactExports.useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return allPosts;
    return allPosts.filter(
      (p) => p.user.toLowerCase().includes(term) || // username might not be loaded here, so also check principal prefix
      p.user.slice(0, 8).toLowerCase().includes(term)
    );
  }, [allPosts, search]);
  const uniqueAuthors = reactExports.useMemo(
    () => new Set(allPosts.map((p) => p.user)).size,
    [allPosts]
  );
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(pageStart, pageStart + PAGE_SIZE);
  const hasPrev = safePage > 1;
  const hasNext = safePage < totalPages;
  const headerStats = !isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatPill,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3 w-3" }),
        value: allPosts.length,
        label: "posts"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatPill,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3 w-3" }),
        value: uniqueAuthors,
        label: "creators"
      }
    )
  ] }) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "explore.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Explore",
        subtitle: "Discover what's happening on SocialSphere",
        action: headerStats
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-5 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", "data-ocid": "explore.search_input", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Filter by username…",
            value: search,
            onChange: (e) => handleSearch(e.target.value),
            className: "pl-9 bg-card border-border/60 rounded-xl h-10 placeholder:text-muted-foreground/60 focus-visible:border-primary/60",
            "aria-label": "Filter posts by username"
          }
        )
      ] }),
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "explore.loading_state",
          className: "flex flex-col gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Loading posts…" })
            ] }),
            Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton order is stable
              /* @__PURE__ */ jsxRuntimeExports.jsx(PostSkeleton, {}, i)
            ))
          ]
        }
      ),
      !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "explore.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        EmptyState,
        {
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-8 w-8" }),
          title: search ? "No posts match that username" : "Nothing to explore yet",
          description: search ? "Try a different username or clear the search" : "Posts from all users will appear here once people start sharing",
          action: search ? {
            label: "Clear search",
            onClick: () => handleSearch(""),
            "data-ocid": "explore.clear_search_button"
          } : void 0,
          className: "py-20"
        }
      ) }),
      !isLoading && paginated.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "explore.list", children: paginated.map((post, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          PostCard,
          {
            post,
            index: pageStart + i + 1
          },
          post.id.toString()
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between gap-3 pt-2 pb-4 border-t border-border/40",
            "data-ocid": "explore.pagination",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground tabular-nums", children: [
                "Page",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: safePage }),
                " ",
                "of",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: totalPages }),
                filtered.length !== allPosts.length && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1", children: [
                  "(",
                  filtered.length,
                  " filtered)"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => Math.max(1, p - 1)),
                    disabled: !hasPrev,
                    "data-ocid": "explore.pagination_prev",
                    "aria-label": "Previous page",
                    className: "h-8 px-3 rounded-xl gap-1 text-xs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
                      "Prev"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                    disabled: !hasNext,
                    "data-ocid": "explore.pagination_next",
                    "aria-label": "Next page",
                    className: "h-8 px-3 rounded-xl gap-1 text-xs",
                    children: [
                      "Next",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
                    ]
                  }
                )
              ] })
            ]
          }
        )
      ] })
    ] })
  ] });
}
export {
  ExplorePage as default
};
