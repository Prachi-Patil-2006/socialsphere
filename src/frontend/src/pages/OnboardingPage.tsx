import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UserAvatar } from "@/components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterUser } from "@/hooks/useUsers";
import { Camera, Feather } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function OnboardingPage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const registerUser = useRegisterUser();

  const validateUsername = (val: string) => {
    if (!val) return "Username is required";
    if (val.length < 3) return "Username must be at least 3 characters";
    if (val.length > 20) return "Username must be 20 characters or less";
    if (!/^[a-zA-Z0-9_]+$/.test(val))
      return "Only letters, numbers, and underscores";
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateUsername(username);
    if (err) {
      setUsernameError(err);
      return;
    }
    try {
      await registerUser.mutateAsync({ username, bio, profilePicture });
      toast.success("Welcome to SocialSphere!");
    } catch {
      toast.error("Failed to create profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="h-12 w-12 rounded-xl bg-primary/15 flex items-center justify-center">
            <Feather className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center">
            <h1 className="font-display font-bold text-2xl text-foreground">
              Create your profile
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              You're almost there. Tell us a little about yourself.
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-elevated">
          {/* Avatar preview */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <UserAvatar
                username={username || "?"}
                profilePicture={profilePicture}
                size="xl"
              />
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center border-2 border-card">
                <Camera className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username" className="text-sm font-medium">
                Username <span className="text-destructive">*</span>
              </Label>
              <Input
                id="username"
                placeholder="your_username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError("");
                }}
                onBlur={() => setUsernameError(validateUsername(username))}
                maxLength={20}
                data-ocid="onboarding.username_input"
                className="bg-background border-border"
              />
              {usernameError && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="onboarding.username_field_error"
                >
                  {usernameError}
                </p>
              )}
            </div>

            {/* Bio */}
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
                data-ocid="onboarding.bio_input"
                className="bg-background border-border resize-none"
              />
              <p className="text-xs text-muted-foreground text-right">
                {bio.length}/160
              </p>
            </div>

            {/* Profile picture URL */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="profilePicture" className="text-sm font-medium">
                Profile picture URL
              </Label>
              <Input
                id="profilePicture"
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={profilePicture}
                onChange={(e) => setProfilePicture(e.target.value)}
                data-ocid="onboarding.profile_picture_input"
                className="bg-background border-border"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-11 font-display font-semibold rounded-xl mt-2 transition-smooth"
              disabled={registerUser.isPending}
              data-ocid="onboarding.submit_button"
            >
              {registerUser.isPending ? (
                <LoadingSpinner size="sm" />
              ) : (
                "Create Profile"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
