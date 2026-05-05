import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PostCard } from "@/components/PostCard";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useExplorePosts } from "@/hooks/usePosts";
import {
  useFollowUser,
  useFollowers,
  useFollowing,
  useMyProfile,
  useUnfollowUser,
  useUpdateProfile,
  useUserProfile,
} from "@/hooks/useUsers";
import type { User } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import { Check, Edit2, Users, X } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── User list item ────────────────────────────────────────────────────────────

function UserListItem({ user, index }: { user: User; index: number }) {
  return (
    <Link
      to="/profile/$id"
      params={{ id: user.id }}
      data-ocid={`profile.user_link.${index}`}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-smooth group"
    >
      <UserAvatar
        username={user.username}
        profilePicture={user.profilePicture}
        size="md"
      />
      <div className="min-w-0 flex-1">
        <p className="font-display font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
          {user.username}
        </p>
        {user.bio && (
          <p className="text-xs text-muted-foreground truncate">{user.bio}</p>
        )}
      </div>
      <span className="text-xs text-muted-foreground shrink-0">
        {user.followers.length}{" "}
        {user.followers.length === 1 ? "follower" : "followers"}
      </span>
    </Link>
  );
}

// ─── Edit profile form ─────────────────────────────────────────────────────────

interface EditProfileFormProps {
  user: User;
  onClose: () => void;
}

function EditProfileForm({ user, onClose }: EditProfileFormProps) {
  const updateProfile = useUpdateProfile();
  const [bio, setBio] = useState(user.bio ?? "");
  const [profilePicture, setProfilePicture] = useState(
    user.profilePicture ?? "",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile.mutateAsync({
        username: user.username,
        bio,
        profilePicture,
      });
      toast.success("Profile updated");
      onClose();
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-secondary/40 border border-border/60 rounded-2xl p-5 space-y-4"
      data-ocid="profile.edit_form"
    >
      <div className="space-y-2">
        <Label
          htmlFor="edit-bio"
          className="text-xs text-muted-foreground uppercase tracking-wide"
        >
          Bio
        </Label>
        <Textarea
          id="edit-bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell the world about yourself…"
          rows={3}
          maxLength={280}
          data-ocid="profile.bio_input"
          className="resize-none bg-input/60 border-border/60 focus:border-primary/60"
        />
        <p className="text-xs text-muted-foreground text-right">
          {bio.length}/280
        </p>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="edit-pic"
          className="text-xs text-muted-foreground uppercase tracking-wide"
        >
          Profile Picture URL
        </Label>
        <Input
          id="edit-pic"
          type="url"
          value={profilePicture}
          onChange={(e) => setProfilePicture(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
          data-ocid="profile.picture_input"
          className="bg-input/60 border-border/60 focus:border-primary/60"
        />
      </div>

      <div className="flex gap-2 justify-end pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClose}
          data-ocid="profile.cancel_button"
          className="text-muted-foreground hover:text-foreground gap-1.5"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
        <Button
          type="submit"
          size="sm"
          disabled={updateProfile.isPending}
          data-ocid="profile.save_button"
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-1.5"
        >
          {updateProfile.isPending ? (
            <LoadingSpinner size="sm" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Save changes
        </Button>
      </div>
    </motion.form>
  );
}

// ─── Profile hero ──────────────────────────────────────────────────────────────

interface ProfileHeroProps {
  user: User;
  isOwnProfile: boolean;
  isFollowing: boolean;
  onFollow: () => void;
  onUnfollow: () => void;
  isFollowPending: boolean;
  onEditToggle: () => void;
  isEditing: boolean;
}

function ProfileHero({
  user,
  isOwnProfile,
  isFollowing,
  onFollow,
  onUnfollow,
  isFollowPending,
  onEditToggle,
  isEditing,
}: ProfileHeroProps) {
  return (
    <div className="px-4 md:px-6 pt-6 pb-4 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <UserAvatar
            username={user.username}
            profilePicture={user.profilePicture}
            size="xl"
            className="ring-2 ring-primary/30 shadow-elevated"
          />
        </motion.div>

        {isOwnProfile ? (
          <Button
            variant="outline"
            size="sm"
            onClick={onEditToggle}
            data-ocid="profile.edit_button"
            className="border-border/60 hover:border-primary/50 hover:text-primary gap-1.5 rounded-xl"
          >
            <Edit2 className="h-3.5 w-3.5" />
            {isEditing ? "Cancel edit" : "Edit profile"}
          </Button>
        ) : (
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            onClick={isFollowing ? onUnfollow : onFollow}
            disabled={isFollowPending}
            data-ocid={
              isFollowing ? "profile.unfollow_button" : "profile.follow_button"
            }
            className={
              isFollowing
                ? "border-border/60 hover:border-destructive/50 hover:text-destructive rounded-xl"
                : "bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
            }
          >
            {isFollowPending ? (
              <LoadingSpinner size="sm" />
            ) : isFollowing ? (
              "Unfollow"
            ) : (
              "Follow"
            )}
          </Button>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-1"
      >
        <h2 className="font-display font-bold text-xl text-foreground">
          {user.username}
        </h2>
        <p className="text-sm text-muted-foreground">
          @{user.username.toLowerCase()}
        </p>
        {user.bio && (
          <p className="text-sm text-foreground/90 leading-relaxed pt-1 max-w-prose">
            {user.bio}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="flex items-center gap-6"
        data-ocid="profile.stats"
      >
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold text-foreground">
            {user.followers.length}
          </span>
          <span className="text-sm text-muted-foreground">Followers</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold text-foreground">
            {user.following.length}
          </span>
          <span className="text-sm text-muted-foreground">Following</span>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Profile skeleton ──────────────────────────────────────────────────────────

function ProfileSkeleton() {
  return (
    <div className="px-4 md:px-6 pt-6 pb-4 space-y-4">
      <div className="flex items-start justify-between">
        <Skeleton className="h-16 w-16 rounded-full" />
        <Skeleton className="h-8 w-28 rounded-xl" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-72 mt-2" />
        <Skeleton className="h-4 w-56" />
      </div>
      <div className="flex gap-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { id } = useParams({ from: "/profile/$id" });
  const { principalId } = useAuth();
  const { data: profileUser, isLoading, isError } = useUserProfile(id);
  const { data: myProfile } = useMyProfile();
  const followUser = useFollowUser();
  const unfollowUser = useUnfollowUser();
  const { data: allPosts = [], isLoading: postsLoading } = useExplorePosts();
  const { data: followerUsers = [] } = useFollowers(id);
  const { data: followingUsers = [] } = useFollowing(id);

  const [isEditing, setIsEditing] = useState(false);
  const [optimisticFollowing, setOptimisticFollowing] = useState<
    boolean | null
  >(null);
  const [trackedId, setTrackedId] = useState(id);

  if (trackedId !== id) {
    setTrackedId(id);
    setIsEditing(false);
    setOptimisticFollowing(null);
  }

  const isOwnProfile = principalId === id;
  const actualFollowing = myProfile?.following.includes(id) ?? false;
  const isFollowing =
    optimisticFollowing !== null ? optimisticFollowing : actualFollowing;
  const isFollowPending = followUser.isPending || unfollowUser.isPending;

  const handleFollow = async () => {
    setOptimisticFollowing(true);
    try {
      await followUser.mutateAsync(id);
    } catch {
      setOptimisticFollowing(null);
      toast.error("Failed to follow user");
    }
  };

  const handleUnfollow = async () => {
    setOptimisticFollowing(false);
    try {
      await unfollowUser.mutateAsync(id);
    } catch {
      setOptimisticFollowing(null);
      toast.error("Failed to unfollow user");
    }
  };

  const userPosts = allPosts.filter((p) => p.user === id);

  if (isError) {
    return (
      <>
        <PageHeader title="Profile" />
        <div
          className="flex-1 flex items-center justify-center"
          data-ocid="profile.error_state"
        >
          <EmptyState
            icon="😕"
            title="User not found"
            description="This profile doesn't exist or may have been removed."
          />
        </div>
      </>
    );
  }

  return (
    <div data-ocid="profile.page" className="flex flex-col flex-1">
      <PageHeader title={profileUser?.username ?? "Profile"} />

      <div className="flex-1 max-w-2xl w-full mx-auto flex flex-col">
        {isLoading ? (
          <ProfileSkeleton />
        ) : profileUser ? (
          <>
            <ProfileHero
              user={profileUser}
              isOwnProfile={isOwnProfile}
              isFollowing={isFollowing}
              onFollow={handleFollow}
              onUnfollow={handleUnfollow}
              isFollowPending={isFollowPending}
              onEditToggle={() => setIsEditing((v) => !v)}
              isEditing={isEditing}
            />

            {isEditing && isOwnProfile && (
              <div className="px-4 md:px-6 pb-4">
                <EditProfileForm
                  user={profileUser}
                  onClose={() => setIsEditing(false)}
                />
              </div>
            )}

            <Separator className="bg-border/40" />

            <Tabs defaultValue="posts" className="flex-1 flex flex-col">
              <TabsList
                className="w-full rounded-none border-b border-border/40 bg-transparent h-auto p-0 shrink-0"
                data-ocid="profile.tabs"
              >
                <TabsTrigger
                  value="posts"
                  data-ocid="profile.posts_tab"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="followers"
                  data-ocid="profile.followers_tab"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Followers{" "}
                  <span className="ml-1 text-xs text-muted-foreground">
                    {profileUser.followers.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  data-ocid="profile.following_tab"
                  className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
                >
                  Following{" "}
                  <span className="ml-1 text-xs text-muted-foreground">
                    {profileUser.following.length}
                  </span>
                </TabsTrigger>
              </TabsList>

              {/* Posts tab */}
              <TabsContent value="posts" className="mt-0 outline-none flex-1">
                {postsLoading ? (
                  <div className="flex justify-center py-12">
                    <LoadingSpinner size="md" label="Loading posts…" />
                  </div>
                ) : userPosts.length === 0 ? (
                  <EmptyState
                    icon="✍️"
                    title="No posts yet"
                    description={
                      isOwnProfile
                        ? "Share your first thought with the world."
                        : `${profileUser.username} hasn't posted yet.`
                    }
                    data-ocid="profile.posts_empty_state"
                  />
                ) : (
                  <motion.div
                    className="divide-y divide-border/30"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.06 } },
                    }}
                  >
                    {userPosts.map((post, i) => (
                      <motion.div
                        key={post.id.toString()}
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          visible: { opacity: 1, y: 0 },
                        }}
                        className="p-4"
                        data-ocid={`profile.post.${i + 1}`}
                      >
                        <PostCard
                          post={post}
                          author={profileUser}
                          index={i + 1}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>

              {/* Followers tab */}
              <TabsContent
                value="followers"
                className="mt-0 outline-none flex-1"
              >
                {followerUsers.length === 0 ? (
                  <EmptyState
                    icon={<Users className="h-8 w-8" />}
                    title="No followers yet"
                    description={
                      isOwnProfile
                        ? "Post great content and people will follow you."
                        : `${profileUser.username} has no followers yet.`
                    }
                    data-ocid="profile.followers_empty_state"
                  />
                ) : (
                  <motion.div
                    className="p-2 space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.05 } },
                    }}
                  >
                    {followerUsers.map((u, i) => (
                      <motion.div
                        key={u.id}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <UserListItem user={u} index={i + 1} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>

              {/* Following tab */}
              <TabsContent
                value="following"
                className="mt-0 outline-none flex-1"
              >
                {followingUsers.length === 0 ? (
                  <EmptyState
                    icon={<Users className="h-8 w-8" />}
                    title="Not following anyone"
                    description={
                      isOwnProfile
                        ? "Explore and follow people whose content you enjoy."
                        : `${profileUser.username} isn't following anyone yet.`
                    }
                    data-ocid="profile.following_empty_state"
                  />
                ) : (
                  <motion.div
                    className="p-2 space-y-1"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: { transition: { staggerChildren: 0.05 } },
                    }}
                  >
                    {followingUsers.map((u, i) => (
                      <motion.div
                        key={u.id}
                        variants={{
                          hidden: { opacity: 0, x: -8 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <UserListItem user={u} index={i + 1} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </TabsContent>
            </Tabs>
          </>
        ) : (
          <div
            data-ocid="profile.error_state"
            className="flex-1 flex items-center justify-center"
          >
            <EmptyState
              icon="😕"
              title="User not found"
              description="This profile doesn't exist or may have been removed."
            />
          </div>
        )}
      </div>
    </div>
  );
}
