import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  username?: string;
  profilePicture?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function getInitials(username?: string): string {
  if (!username) return "?";
  return username.slice(0, 2).toUpperCase();
}

export function UserAvatar({
  username,
  profilePicture,
  size = "md",
  className,
}: UserAvatarProps) {
  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      {profilePicture && <AvatarImage src={profilePicture} alt={username} />}
      <AvatarFallback className="bg-primary/20 text-primary font-semibold font-display">
        {getInitials(username)}
      </AvatarFallback>
    </Avatar>
  );
}
