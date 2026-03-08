import { useState } from "react";
import {
  familyMembers,
  getChildren,
  type FamilyMember,
} from "@/data/familyData";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TreePersonRow } from "@/components/TreePersonRow";



type TabKey = "groom" | "bride";

// recursive node display for full tree
function TreeNode({ member }: { member: FamilyMember }) {
  const children = getChildren(member.id);
  return (
    <div className="tree-node flex flex-col items-center relative">
      <TreePersonRow member={member} />
      {children.length > 0 && (
        <>
          {/* vertical connector */}
          <div className="w-px h-6 bg-border"></div>
          <div className="tree-children flex justify-center gap-8 mt-2">
            {children.map((c) => (
              <div key={c.id} className="flex flex-col items-center">
                <TreeNode member={c} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function FamilyExplorerPage() {
  const [tab, setTab] = useState<TabKey>("groom");

  const roots = familyMembers.filter(
    (m) => m.familySide === tab && !m.father && !m.mother
  );

  return (
    <div className="bg-background min-h-screen overflow-auto py-12">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-none">
        <div className="flex justify-center space-x-2 mb-6">
          <Button
            variant={tab === "groom" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("groom")}
            className={cn("rounded-full px-4", tab === "groom" && "shadow-sm")}
          >
            Akhil&apos;s Family
          </Button>
          <Button
            variant={tab === "bride" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTab("bride")}
            className={cn("rounded-full px-4", tab === "bride" && "shadow-sm")}
          >
            Sethu&apos;s Family
          </Button>
        </div>

        <div className="tree-container flex flex-col items-center min-w-max">
          {roots.map((r) => (
            <TreeNode key={r.id} member={r} />
          ))}
        </div>
      </section>
    </div>
  );
}

