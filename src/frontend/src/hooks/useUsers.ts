import type { User } from "@/types";
import { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { useBackend } from "./useBackend";

// Helper: map backend User (Principal IDs) to frontend User (string IDs)
function mapUser(u: {
  id: { toString(): string };
  bio: string;
  username: string;
  createdAt: bigint;
  followers: Array<{ toString(): string }>;
  following: Array<{ toString(): string }>;
  profilePicture: string;
}): User {
  return {
    id: u.id.toString(),
    bio: u.bio,
    username: u.username,
    createdAt: u.createdAt,
    followers: u.followers.map((f) => f.toString()),
    following: u.following.map((f) => f.toString()),
    profilePicture: u.profilePicture,
  };
}

export function useMyProfile() {
  const { backend, isFetching } = useBackend();
  const { isAuthenticated } = useAuth();
  return useQuery<User | null>({
    queryKey: ["myProfile"],
    queryFn: async () => {
      if (!backend) return null;
      const user = await backend.getMyProfile();
      return user ? mapUser(user) : null;
    },
    enabled: !!backend && !isFetching && isAuthenticated,
  });
}

export function useUserProfile(id: string) {
  const { backend, isFetching } = useBackend();
  return useQuery<User | null>({
    queryKey: ["user", id],
    queryFn: async () => {
      if (!backend || !id) return null;
      const user = await backend.getUserProfile(Principal.fromText(id));
      return user ? mapUser(user) : null;
    },
    enabled: !!backend && !isFetching && !!id,
  });
}

export function useFollowers(userId: string) {
  const { backend, isFetching } = useBackend();
  return useQuery<User[]>({
    queryKey: ["followers", userId],
    queryFn: async () => {
      if (!backend || !userId) return [];
      const users = await backend.getFollowers(Principal.fromText(userId));
      return users.map(mapUser);
    },
    enabled: !!backend && !isFetching && !!userId,
  });
}

export function useFollowing(userId: string) {
  const { backend, isFetching } = useBackend();
  return useQuery<User[]>({
    queryKey: ["following", userId],
    queryFn: async () => {
      if (!backend || !userId) return [];
      const users = await backend.getFollowing(Principal.fromText(userId));
      return users.map(mapUser);
    },
    enabled: !!backend && !isFetching && !!userId,
  });
}

export function useRegisterUser() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      bio,
      profilePicture,
    }: {
      username: string;
      bio: string;
      profilePicture: string;
    }) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.registerUser(username, bio, profilePicture);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useUpdateProfile() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      username,
      bio,
      profilePicture,
    }: {
      username: string;
      bio: string;
      profilePicture: string;
    }) => {
      if (!backend) throw new Error("Not connected");
      // updateProfile(username, bio, profilePicture) — username is required first arg
      const result = await backend.updateProfile(username, bio, profilePicture);
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["myProfile"] });
    },
  });
}

export function useFollowUser() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.followUser(Principal.fromText(userId));
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, userId) => {
      qc.invalidateQueries({ queryKey: ["user", userId] });
      qc.invalidateQueries({ queryKey: ["myProfile"] });
      qc.invalidateQueries({ queryKey: ["followers", userId] });
      qc.invalidateQueries({ queryKey: ["following"] });
    },
  });
}

export function useUnfollowUser() {
  const { backend } = useBackend();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (userId: string) => {
      if (!backend) throw new Error("Not connected");
      const result = await backend.unfollowUser(Principal.fromText(userId));
      if (result.__kind__ === "err") throw new Error(result.err.__kind__);
      return null;
    },
    onSuccess: (_data, userId) => {
      qc.invalidateQueries({ queryKey: ["user", userId] });
      qc.invalidateQueries({ queryKey: ["myProfile"] });
      qc.invalidateQueries({ queryKey: ["followers", userId] });
      qc.invalidateQueries({ queryKey: ["following"] });
    },
  });
}
