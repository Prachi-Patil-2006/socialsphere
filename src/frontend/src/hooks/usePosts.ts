import type { Post } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

// Helper: map backend Post (Principal IDs) to frontend Post (string IDs)
function mapPost(p: {
  id: bigint;
  content: string;
  createdAt: bigint;
  user: { toString(): string };
  likes: Array<{ toString(): string }>;
  image?: string;
  comments: Array<{
    id: bigint;
    createdAt: bigint;
    text: string;
    user: { toString(): string };
  }>;
}): Post {
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
      user: c.user.toString(),
    })),
  };
}

export function useFeed(page = 1) {
  const { backend, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<Post[]>({
    queryKey: ["feed", page],
    queryFn: async () => {
      if (!backend) return [];
      const posts = await backend.getFeed(BigInt(page), BigInt(10));
      return posts.map(mapPost);
    },
    enabled: !!backend && !isFetching && isAuthenticated,
    placeholderData: [],
  });
}

export function useExplorePosts(page = 1) {
  const { backend, isFetching } = useBackend();
  return useQuery<Post[]>({
    queryKey: ["explore", page],
    queryFn: async () => {
      if (!backend) return [];
      const posts = await backend.getExplorePosts(BigInt(page), BigInt(10));
      return posts.map(mapPost);
    },
    enabled: !!backend && !isFetching,
    placeholderData: [],
  });
}

export function usePost(id: string) {
  const { backend, isFetching } = useBackend();
  return useQuery<Post | null>({
    queryKey: ["post", id],
    queryFn: async () => {
      if (!backend) return null;
      const post = await backend.getPost(BigInt(id));
      return post ? mapPost(post) : null;
    },
    enabled: !!backend && !isFetching && !!id,
  });
}

export function useCreatePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      content,
      image,
    }: { content: string; image?: string }) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.createPost(content, image ?? null);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return result.ok;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      qc.invalidateQueries({ queryKey: ["explore"] });
    },
  });
}

export function useUpdatePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, content }: { id: bigint; content: string }) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.updatePost(id, content, null);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ["post", id.toString()] });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}

export function useDeletePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.deletePost(id);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feed"] });
      qc.invalidateQueries({ queryKey: ["explore"] });
    },
  });
}

export function useLikePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.likePost(id);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["post", id.toString()] });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}

export function useUnlikePost() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.unlikePost(id);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: ["post", id.toString()] });
      qc.invalidateQueries({ queryKey: ["feed"] });
    },
  });
}

export function useAddComment() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ postId, text }: { postId: bigint; text: string }) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.addComment(postId, text);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, { postId }) => {
      qc.invalidateQueries({ queryKey: ["post", postId.toString()] });
    },
  });
}
