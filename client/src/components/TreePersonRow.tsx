import { cn } from "@/lib/utils";
import { type FamilyMember } from "@/data/familyData";

interface TreePersonRowProps {
  member: FamilyMember;
  onSelect?: (id: string) => void;
  isFocused?: boolean;
}

export function TreePersonRow({
  member,
  onSelect,
  isFocused = false,
}: TreePersonRowProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(member.id)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 shadow-sm border transition-colors cursor-pointer",
        isFocused
          ? "bg-primary/20 border-primary/60 text-primary-foreground"
          : "bg-background/90 border-border/60 hover:border-primary/60 hover:bg-primary/5 text-foreground"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
      <span className="text-sm font-medium">{member.name}</span>
      {member.nickname && (
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {member.nickname}
        </span>
      )}
    </button>
  );
}
