import { PageHeader } from "@/components/Layout";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useMyProfile, useUpdateProfile } from "@/hooks/useUsers";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { logout } = useAuth();
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateProfile();

  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  // Reinitialize form state when profile data arrives
  useEffect(() => {
    if (profile) {
      setBio(profile.bio ?? "");
      setProfilePicture(profile.profilePicture ?? "");
    }
  }, [profile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await updateProfile.mutateAsync({
        username: profile.username,
        bio,
        profilePicture,
      });
      toast.success("Profile updated");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div data-ocid="settings.page">
      <PageHeader title="Settings" subtitle="Manage your account" />
      <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <>
            {/* Profile section */}
            <section className="bg-card border border-border/50 rounded-2xl p-5 shadow-subtle">
              <h2 className="font-display font-semibold text-base text-foreground mb-4">
                Profile
              </h2>

              {/* Avatar preview */}
              <div className="flex items-center gap-4 mb-5">
                <UserAvatar
                  username={profile?.username}
                  profilePicture={profilePicture || profile?.profilePicture}
                  size="xl"
                />
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {profile?.username}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    @{profile?.username?.toLowerCase()}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSave} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="bio" className="text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell the world about yourself…"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={160}
                    rows={3}
                    className="bg-background border-border resize-none"
                    data-ocid="settings.bio_textarea"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {bio.length}/160
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label
                    htmlFor="profilePicture"
                    className="text-sm font-medium"
                  >
                    Profile picture URL
                  </Label>
                  <Input
                    id="profilePicture"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                    className="bg-background border-border"
                    data-ocid="settings.profile_picture_input"
                  />
                </div>

                <Button
                  type="submit"
                  className="rounded-xl"
                  disabled={updateProfile.isPending || !profile}
                  data-ocid="settings.save_button"
                >
                  {updateProfile.isPending ? (
                    <LoadingSpinner size="sm" />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </form>
            </section>

            <Separator className="bg-border/40" />

            {/* Danger zone */}
            <section className="bg-card border border-border/50 rounded-2xl p-5 shadow-subtle">
              <h2 className="font-display font-semibold text-base text-foreground mb-1">
                Account
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sign out of your account on this device.
              </p>
              <Button
                variant="outline"
                className="gap-2 rounded-xl border-destructive/40 text-destructive hover:bg-destructive/10"
                onClick={logout}
                data-ocid="settings.logout_button"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </Button>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
