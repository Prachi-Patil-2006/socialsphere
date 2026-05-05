export interface User {
  id: string;
  username: string;
  bio: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  createdAt: bigint;
}

export interface Comment {
  id: bigint;
  user: string;
  text: string;
  createdAt: bigint;
}

export interface Post {
  id: bigint;
  user: string;
  content: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  createdAt: bigint;
}

export function formatRelativeTime(timestamp: bigint): string {
  const now = Date.now();
  // Assume timestamp is in nanoseconds (Internet Computer standard)
  const ms = Number(timestamp / BigInt(1_000_000));
  const diff = now - ms;

  const seconds = Math.floor(diff / 1000);
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
