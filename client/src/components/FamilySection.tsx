import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  groomFamilyMembers,
  getFamilyMemberById,
  getChildren,
  getParents,
  getSpouse,
  type FamilyMember,
} from "@/data/groomFamily";
import {
  brideFamilyMembers,
  getBrideFamilyMemberById,
  getBrideChildren,
  getBrideParents,
  getBrideSpouse,
} from "@/data/brideFamily";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabKey = "groom" | "bride";

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
  tab,
}: {
  centerId: string;
  onSelectPerson: (id: string) => void;
  tab: TabKey;
}) {
  const isGroomSide = tab === "groom";

  const getById = isGroomSide ? getFamilyMemberById : getBrideFamilyMemberById;
  const getParentsFn = isGroomSide ? getParents : getBrideParents;
  const getChildrenFn = isGroomSide ? getChildren : getBrideChildren;
  const getSpouseFn = isGroomSide ? getSpouse : getBrideSpouse;

  const person = getById(centerId);
  if (!person) return null;

  const parents = getParentsFn(centerId);
  const children = getChildrenFn(centerId);
  const spouse = getSpouseFn(centerId);

  return (
    <div className="space-y-6">
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

        {/* Children branch */}
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

export function FamilySection() {
  const [tab, setTab] = useState<TabKey>("groom");
  const [focusId, setFocusId] = useState<string>("KU");

  const centerPerson =
    tab === "groom"
      ? getFamilyMemberById(focusId) ?? groomFamilyMembers[0]
      : getBrideFamilyMemberById(focusId) ?? brideFamilyMembers[0];

  return (
    <section
      id="family"
      className="relative bg-muted/30 py-20 md:py-24 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeading
          title="Family Tree"
          subtitle="Our Families"
        />

        <p className="mt-4 max-w-3xl mx-auto text-center text-sm sm:text-base text-muted-foreground leading-relaxed">
          Explore our families in detail. Tap on any name to move through parents,
          children and their partners in a simple, elegant tree.
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
              setFocusId("B_BRIDE");
            }}
            className={cn(
              "rounded-full px-4",
              tab === "bride" && "shadow-sm"
            )}
          >
            Sethu&apos;s Family
          </Button>
        </div>

        <div className="mt-8">
          <div className="rounded-3xl border border-primary/15 bg-background/95 shadow-sm px-4 py-5 sm:px-6 sm:py-7">
            <PersonMiniTree
              centerId={centerPerson.id}
              tab={tab}
              onSelectPerson={(id) => {
                // When clicking on Akhil or Sethu, switch to the corresponding tab.
                if (id === "KU" || id === "B_GROOM") {
                  setTab("groom");
                  setFocusId("KU");
                  return;
                } else if (id === "KV" || id === "B_BRIDE") {
                  setTab("bride");
                  setFocusId("B_BRIDE");
                  return;
                }
                setFocusId(id);
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

