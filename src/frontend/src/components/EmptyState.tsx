import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    "data-ocid"?: string;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className,
      )}
    >
      {icon && (
        <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center text-3xl text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-foreground text-lg">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xs">
            {description}
          </p>
        )}
      </div>
      {action && (
        <Button
          variant="outline"
          onClick={action.onClick}
          data-ocid={action["data-ocid"]}
          className="mt-2"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}
