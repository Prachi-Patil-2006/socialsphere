import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useMyProfile } from "@/hooks/useUsers";
import { cn } from "@/lib/utils";
import { Link, useRouter } from "@tanstack/react-router";
import { Feather, Home, LogOut, Search, User } from "lucide-react";
import { UserAvatar } from "./UserAvatar";

const navItems = [
  { to: "/", icon: Home, label: "Home", ocid: "nav.home_link" },
  { to: "/explore", icon: Search, label: "Explore", ocid: "nav.explore_link" },
] as const;

function NavLink({
  to,
  icon: Icon,
  label,
  ocid,
  mobile,
}: {
  to: string;
  icon: React.ElementType;
  label: string;
  ocid: string;
  mobile?: boolean;
}) {
  const router = useRouter();
  const isActive = router.state.location.pathname === to;

  if (mobile) {
    return (
      <Link
        to={to}
        className={cn(
          "flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-smooth",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground",
        )}
        data-ocid={ocid}
        aria-label={label}
      >
        <Icon className="h-5 w-5" />
        <span className="text-[10px] font-medium">{label}</span>
        {isActive && (
          <div className="h-1 w-1 rounded-full bg-primary absolute bottom-1" />
        )}
      </Link>
    );
  }

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-smooth w-full",
        isActive
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
      data-ocid={ocid}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Link>
  );
}

export function Sidebar() {
  const { logout, principalId } = useAuth();
  const { data: profile } = useMyProfile();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-card border-r border-border/60 p-4 gap-2 shrink-0">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-3 mb-2">
        <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
          <Feather className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-xl text-foreground tracking-tight">
          SocialSphere
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink key={item.to} {...item} />
        ))}
        {principalId && (
          <Link
            to="/profile/$id"
            params={{ id: principalId }}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-smooth w-full",
              "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
            data-ocid="nav.profile_link"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
        )}
      </nav>

      {/* User info + logout */}
      {(profile || principalId) && (
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-secondary/50 mt-2">
          <UserAvatar
            username={profile?.username}
            profilePicture={profile?.profilePicture}
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-foreground">
              {profile?.username ?? "Anonymous"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              @{profile?.username?.toLowerCase() ?? principalId?.slice(0, 8)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            data-ocid="nav.logout_button"
            className="shrink-0 h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      )}
    </aside>
  );
}

export function BottomBar() {
  const { principalId } = useAuth();
  const { data: profile } = useMyProfile();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border/60 flex items-center justify-around px-2 py-2 z-50 safe-area-bottom"
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => (
        <NavLink key={item.to} {...item} mobile />
      ))}
      {principalId && (
        <Link
          to="/profile/$id"
          params={{ id: principalId }}
          className="flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl text-muted-foreground hover:text-foreground transition-smooth"
          data-ocid="nav.profile_link_mobile"
          aria-label="Profile"
        >
          {profile ? (
            <UserAvatar
              username={profile.username}
              profilePicture={profile.profilePicture}
              size="xs"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      )}
    </nav>
  );
}
