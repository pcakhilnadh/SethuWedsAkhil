import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FooterSection } from "@/components/FooterSection";
import {
  familyMembers,
  getFamilyMemberById,
  getChildren,
  getParents,
  getSiblings,
  getSpouse,
  type FamilyMember,
} from "@/data/familyData";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type TabKey = "groom" | "bride";

function PersonDirectoryItem({
  member,
  isActive,
  onSelect,
}: {
  member: FamilyMember;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "w-full text-left px-3 py-2 rounded-xl border text-sm transition-colors mb-1",
        isActive
          ? "border-primary/70 bg-primary/5 text-foreground shadow-sm"
          : "border-border/60 hover:border-primary/40 hover:bg-muted/60 text-muted-foreground"
      )}
    >
      <div className="font-medium text-foreground truncate">
        {member.name}
      </div>
      {member.nickname && (
        <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
          {member.nickname}
        </div>
      )}
    </button>
  );
}

function TreePersonRow({
  member,
  onSelect,
}: {
  member: FamilyMember;
  onSelect?: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(member.id)}
      className="inline-flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 shadow-sm border border-border/60 hover:border-primary/60 hover:bg-primary/5 transition-colors cursor-pointer"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
      <span className="text-sm font-medium text-foreground">{member.name}</span>
      {member.nickname && (
        <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {member.nickname}
        </span>
      )}
    </button>
  );
}

function PersonMiniTree({
  centerId,
  onSelectPerson,
}: {
  centerId: string;
  onSelectPerson: (id: string) => void;
}) {
  const person = getFamilyMemberById(centerId);
  if (!person) return null;

  const parents = getParents(centerId);
  const children = getChildren(centerId);
  const spouse = getSpouse(centerId);

  return (
    <div className="space-y-6">
      {/* Vertical tree */}
      <div className="rounded-3xl border border-border/70 bg-muted/30 px-4 py-5 space-y-4">
        {/* Parents branch */}
        {(parents.father || parents.mother) && (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              Parents
            </p>
            <div className="space-y-1 border-l border-border/60 pl-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="h-px w-3 bg-border/60" />
                {parents.father && (
                  <TreePersonRow
                    member={parents.father}
                    onSelect={onSelectPerson}
                  />
                )}
                {parents.father && parents.mother && (
                  <span className="text-xs text-muted-foreground">+</span>
                )}
                {parents.mother && (
                  <TreePersonRow
                    member={parents.mother}
                    onSelect={onSelectPerson}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Focus node (with optional spouse inline) */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
            {parents.father || parents.mother ? "Child" : "Root"}
          </p>
          <div className="border-l border-border/60 pl-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="h-px w-3 bg-border/60" />
              <TreePersonRow member={person} onSelect={onSelectPerson} />
              {spouse && (
                <>
                  <span className="text-xs text-muted-foreground">+</span>
                  <TreePersonRow member={spouse} onSelect={onSelectPerson} />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Children branch (no siblings here to keep tree compact) */}
        {children.length > 0 && (
          <div className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-muted-foreground">
              Children
            </p>
            <div className="space-y-1 border-l border-border/60 pl-4">
              {children.map((child) => (
                <div key={child.id} className="flex items-center gap-2">
                  <span className="h-px w-3 bg-border/60" />
                  <div className="flex flex-wrap items-center gap-2">
                    <TreePersonRow
                      member={child}
                      onSelect={onSelectPerson}
                    />
                    {getSpouse(child.id) && (
                      <>
                        <span className="text-xs text-muted-foreground">+</span>
                        <TreePersonRow
                          member={getSpouse(child.id)!}
                          onSelect={onSelectPerson}
                        />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function FamilyExplorerPage() {
  const [tab, setTab] = useState<TabKey>("groom");
  const [focusId, setFocusId] = useState<string>("KU");

  const people = tab === "groom" 
    ? familyMembers.filter(m => m.familySide === "groom")
    : familyMembers.filter(m => m.familySide === "bride");
  
  const centerPerson =
    getFamilyMemberById(focusId) ?? people[0] ?? people[0];

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <SectionHeading
            title="Family Tree"
            subtitle={
              tab === "groom" ? "Akhil's Family" : "Sethu's Family"
            }
          />

          <p className="mt-4 max-w-3xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Explore our family in detail. Search for anyone by name, then see
            their parents, themselves, and their children in a simple tree that
            makes relationships easy to understand.
          </p>

          {/* Tabs */}
          <div className="mt-6 inline-flex rounded-full border border-border/80 bg-muted/50 p-1 text-xs sm:text-sm">
            <Button
              variant={tab === "groom" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setTab("groom");
                setFocusId("KU");
              }}
              className={cn(
                "rounded-full px-4",
                tab === "groom" && "shadow-sm"
              )}
            >
              Akhil&apos;s Family
            </Button>
            <Button
              variant={tab === "bride" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                setTab("bride");
                setFocusId("KV");
              }}
              className={cn(
                "rounded-full px-4",
                tab === "bride" && "shadow-sm"
              )}
            >
              Sethu&apos;s Family
            </Button>
          </div>

          {/* Detail tree only (directory hidden for now) */}
          <div className="mt-8">
            <div className="rounded-3xl border border-primary/15 bg-background/95 shadow-sm px-4 py-5 sm:px-6 sm:py-7">
              <PersonMiniTree
                centerId={centerPerson.id}
                onSelectPerson={(id) => setFocusId(id)}
              />
            </div>
          </div>
        </section>
      </main>

      <FooterSection />
    </div>
  );
}

