import { useState } from "react";
import { SectionHeading } from "@/components/SectionHeading";
import {
  familyMembers,
  getChildren,
  getParents,
  getSpouse,
  getSiblings,
  type FamilyMember,
} from "@/data/familyData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { User, Users } from "lucide-react";

type TabKey = "groom" | "bride";

// Avatar component - shows profile image if available, otherwise default icon
function PersonAvatar({ member, generation }: { member: FamilyMember; generation: "parent" | "current" | "child" }) {
  // Color coding for generations
  const generationColors = {
    parent: "bg-blue-500",
    current: "bg-primary",
    child: "bg-green-500"
  };
  
  if (member.profileUrl) {
    return (
      <div className="relative">
        <img 
          src={member.profileUrl} 
          alt={member.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        {/* Generation indicator ring */}
        <div className={cn(
          "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background",
          generationColors[generation]
        )} />
      </div>
    );
  }
  
  return (
    <div className={cn(
      "w-12 h-12 rounded-full flex items-center justify-center text-white",
      generationColors[generation]
    )}>
      <User className="w-6 h-6" />
    </div>
  );
}

// Person card component
function PersonCard({ 
  member, 
  onSelect, 
  isFocused = false,
  generation = "current"
}: { 
  member: FamilyMember; 
  onSelect: (id: string) => void;
  isFocused?: boolean;
  generation?: "parent" | "current" | "child";
}) {
  return (
    <button
      onClick={() => onSelect(member.id)}
      className={cn(
        "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all hover:shadow-lg min-w-[100px] flex-shrink-0",
        isFocused 
          ? "bg-primary/10 border-primary shadow-md scale-105" 
          : "bg-card border-border hover:border-primary/50"
      )}
    >
      <PersonAvatar member={member} generation={generation} />
      <div className="text-center">
        <div className="font-semibold text-sm text-foreground">
          {member.name}
        </div>
        {member.nickname && (
          <div className="text-xs text-muted-foreground">({member.nickname})</div>
        )}
      </div>
    </button>
  );
}

// Couple card (for parents or person with spouse)
function CoupleCard({ 
  person1, 
  person2, 
  onSelect,
  focusedId,
  showAsCouple = false,
  generation = "current"
}: { 
  person1: FamilyMember; 
  person2?: FamilyMember;
  onSelect: (id: string) => void;
  focusedId?: string;
  showAsCouple?: boolean;
  generation?: "parent" | "current" | "child";
}) {
  // Always show as couple if person2 exists or showAsCouple is true
  if (!person2 && !showAsCouple) {
    return <PersonCard member={person1} onSelect={onSelect} isFocused={person1.id === focusedId} generation={generation} />;
  }

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-border bg-card flex-shrink-0">
      <PersonCard member={person1} onSelect={onSelect} isFocused={person1.id === focusedId} generation={generation} />
      <Users className="w-6 h-6 text-muted-foreground" />
      {person2 && <PersonCard member={person2} onSelect={onSelect} isFocused={person2.id === focusedId} generation={generation} />}
    </div>
  );
}

// Main tree visualization component
function FamilyTree({ 
  focusedMember, 
  onSelectMember
}: { 
  focusedMember: FamilyMember;
  onSelectMember: (id: string) => void;
}) {
  const parents = getParents(focusedMember.id);
  const siblings = getSiblings(focusedMember.id);
  const allSiblings = [focusedMember, ...siblings].sort((a, b) => {
    if (a.order !== null && b.order !== null) return a.order - b.order;
    return 0;
  });

  return (
    <div className="flex flex-col items-center gap-8 py-8 w-full">
      {/* Layer 1: Parents */}
      {(parents.father || parents.mother) && (
        <div className="flex flex-col items-center gap-4">
          <CoupleCard 
            person1={parents.father || parents.mother!} 
            person2={parents.father && parents.mother ? parents.mother : undefined}
            onSelect={onSelectMember}
            generation="parent"
          />
          {/* Connector line */}
          <div className="w-0.5 h-8 bg-border" />
        </div>
      )}

      {/* Layer 2: Focused person and siblings - Horizontal scrollable */}
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col items-center gap-4 min-w-max px-4">
          <div className="flex items-start gap-6">
            {allSiblings.map((sibling) => {
              const spouse = sibling.spouse ? getSpouse(sibling.id) : undefined;
              const children = getChildren(sibling.id);
              
              return (
                <div key={sibling.id} className="flex flex-col items-center gap-4">
                  {/* Sibling with spouse - always show as couple if spouse exists */}
                  {spouse ? (
                    <CoupleCard 
                      person1={sibling} 
                      person2={spouse}
                      onSelect={onSelectMember}
                      focusedId={focusedMember.id}
                      showAsCouple={true}
                      generation="current"
                    />
                  ) : (
                    <PersonCard 
                      member={sibling} 
                      onSelect={onSelectMember}
                      isFocused={sibling.id === focusedMember.id}
                      generation="current"
                    />
                  )}
                  
                  {/* Layer 3: Children */}
                  {children.length > 0 && (
                    <>
                      {/* Connector line */}
                      <div className="w-0.5 h-8 bg-border" />
                      <div className="flex flex-col items-center gap-3">
                        <div className="text-xs font-medium text-muted-foreground">
                          Children
                        </div>
                        <div className="flex flex-col gap-2">
                          {children.map((child) => {
                            const childSpouse = child.spouse ? getSpouse(child.id) : undefined;
                            
                            // Show as couple if child has spouse
                            if (childSpouse) {
                              return (
                                <div key={child.id} className="flex items-center gap-2 p-2 rounded-lg border border-border/50 bg-card/50">
                                  <PersonCard 
                                    member={child} 
                                    onSelect={onSelectMember}
                                    generation="child"
                                  />
                                  <Users className="w-4 h-4 text-muted-foreground" />
                                  <PersonCard 
                                    member={childSpouse} 
                                    onSelect={onSelectMember}
                                    generation="child"
                                  />
                                </div>
                              );
                            }
                            
                            // Show as single person if no spouse
                            return (
                              <PersonCard 
                                key={child.id} 
                                member={child} 
                                onSelect={onSelectMember}
                                generation="child"
                              />
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Generation Legend */}
      <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span>Parents</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Current Generation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span>Children</span>
        </div>
      </div>
    </div>
  );
}

export function FamilySection() {
  const [tab, setTab] = useState<TabKey>("groom");
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);

  // Get initial member - Akhil Nadh PC (groom) and Sethulakshmi R (bride)
  const getInitialMember = (side: TabKey) => {
    if (side === "groom") {
      // Find Akhil Nadh PC (ID: KU)
      return familyMembers.find(m => m.id === "KU") || familyMembers.find(m => m.familySide === side);
    } else {
      // Find Sethulakshmi R (ID: KV)
      return familyMembers.find(m => m.id === "KV") || familyMembers.find(m => m.familySide === side);
    }
  };

  const focusedMember = selectedMemberId 
    ? familyMembers.find(m => m.id === selectedMemberId) || getInitialMember(tab)!
    : getInitialMember(tab)!;

  const handleTabChange = (newTab: TabKey) => {
    setTab(newTab);
    setSelectedMemberId(null); // Reset selection when changing tabs
  };

  const handleSelectMember = (id: string) => {
    // If clicking on Akhil (KU), switch to groom's family
    if (id === "KU") {
      setTab("groom");
      setSelectedMemberId("KU");
      return;
    }
    
    // If clicking on Sethulakshmi (KV), switch to bride's family
    if (id === "KV") {
      setTab("bride");
      setSelectedMemberId("KV");
      return;
    }
    
    // Otherwise, just select the member
    setSelectedMemberId(id);
  };

  return (
    <section
      id="family"
      className="relative bg-background py-20 md:py-24 lg:py-28"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Family Tree"
          subtitle="Our Families"
        />

        <p className="mt-4 max-w-3xl mx-auto text-center text-sm sm:text-base text-muted-foreground leading-relaxed">
          Explore our families in detail. Click on any name to navigate through parents,
          siblings, and children. The color-coded generations help you understand the family structure.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-border/80 bg-muted/50 p-1 text-xs sm:text-sm">
            <Button
              variant={tab === "groom" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabChange("groom")}
              className={cn(
                "rounded-full px-6",
                tab === "groom" && "shadow-sm"
              )}
            >
              Akhil&apos;s Family
            </Button>
            <Button
              variant={tab === "bride" ? "default" : "ghost"}
              size="sm"
              onClick={() => handleTabChange("bride")}
              className={cn(
                "rounded-full px-6",
                tab === "bride" && "shadow-sm"
              )}
            >
              Sethu&apos;s Family
            </Button>
          </div>
        </div>

        {/* Family tree visualization */}
        <div className="mt-12 flex justify-center">
          <FamilyTree 
            focusedMember={focusedMember} 
            onSelectMember={handleSelectMember}
          />
        </div>
      </div>
    </section>
  );
}

