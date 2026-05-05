import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, k as cn, w as useBackend, m as useAuth, x as useQuery, y as useQueryClient, z as useMutation } from "./index-CZHbt-YQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
];
const Heart = createLucideIcon("heart", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
];
const MessageCircle = createLucideIcon("message-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function EmptyState({
  icon,
  title,
  description,
  action,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      ),
      children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-3xl text-muted-foreground", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-lg", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: description })
        ] }),
        action && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: action.onClick,
            "data-ocid": action["data-ocid"],
            className: "mt-2",
            children: action.label
          }
        )
      ]
    }
  );
}
function mapPost(p) {
  return {
    id: p.id,
    content: p.content,
    createdAt: p.createdAt,
    user: p.user.toString(),
    likes: p.likes.map((l) => l.toString()),
    image: p.image,
    comments: p.comments.map((c) => ({
      id: c.id,
      createdAt: c.createdAt,
      text: c.text,
      user: c.user.toString()
    }))
  };
}
function useFeed(page = 1) {
  const { backend, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["feed", page],
    queryFn: async () => {
      if (!backend) return [];
      const posts = await backend.getFeed(BigInt(page), BigInt(10));
      return posts.map(mapPost);
    },
    enabled: !!backend && !isFetching && isAuthenticated,
    placeholderData: []
  });
}
function useExplorePosts(page = 1) {
  const { backend, isFetching } = useBackend();
  return useQuery({
    queryKey: ["explore", page],
    queryFn: async () => {
      if (!backend) return [];
      const posts = await backend.getExplorePosts(BigInt(page), BigInt(10));
      return posts.map(mapPost);
    },
    enabled: !!backend && !isFetching,
    placeholderData: []
  });
}
function usePost(id) {
  const { backend, isFetching } = useBackend();
  return useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!backend) return null;
      const post = await backend.getPost(BigInt(id));
      return post ? mapPost(post) : null;
    },
    enabled: !!backend && !isFetching && !!id
  });
}
function useCreatePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      content,
      image
    }) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.createPost(content, image ?? null);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      qc.invalidateQueries({ queryKey: ["explore"] });
    }
  });
}
function useDeletePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.deletePost(id);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      qc.invalidateQueries({ queryKey: ["explore"] });
    }
  });
}
function useLikePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.likePost(id);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["post", id.toString()] });
      qc.invalidateQueries({ queryKey: ["feed"] });
    }
  });
}
function useUnlikePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.unlikePost(id);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["post", id.toString()] });
      qc.invalidateQueries({ queryKey: ["feed"] });
    }
  });
}
function useAddComment() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, text }) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.addComment(postId, text);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, { postId }) => {
      qc.invalidateQueries({ queryKey: ["post", postId.toString()] });
    }
  });
}
function formatRelativeTime(timestamp) {
  const now = Date.now();
  const ms = Number(timestamp / BigInt(1e6));
  const diff = now - ms;
  const seconds = Math.floor(diff / 1e3);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);
  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;
  if (months < 12) return `${months}mo ago`;
  return `${years}y ago`;
}
export {
  EmptyState as E,
  Heart as H,
  MessageCircle as M,
  Trash2 as T,
  useCreatePost as a,
  useExplorePosts as b,
  useLikePost as c,
  useUnlikePost as d,
  useDeletePost as e,
  formatRelativeTime as f,
  usePost as g,
  useAddComment as h,
  useFeed as u
};
