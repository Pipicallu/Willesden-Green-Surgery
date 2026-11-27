import { useCallback, useState } from "react";
import MemberCard, { type Member } from "@/components/molecules/MemberCard";

interface Category {
  id: string;
  label: string;
  members: (Member & { id: string })[];
}

export default function TeamDirectory({ categories }: { categories: Category[] }) {
  const [expandedMemberId, setExpandedMemberId] = useState<string | null>(null);

  const toggleMember = useCallback((memberId: string) => {
    setExpandedMemberId((currentId) =>
      currentId === memberId ? null : memberId,
    );
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16">
      {categories.map((category) => (
        <section
          key={category.id}
          aria-labelledby={`team-category-${category.id}`}
        >
          <div className="mb-6 flex items-center gap-4">
            <h3
              id={`team-category-${category.id}`}
              className="text-2xl text-icon sm:text-3xl"
            >
              {category.label}
            </h3>
            <div className="h-px flex-1 bg-border" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
            {category.members.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                memberId={member.id}
                isExpanded={expandedMemberId === member.id}
                onToggle={toggleMember}
                variant={
                  ["admin", "back of house"].includes(category.label.trim().toLowerCase())
                    ? "support"
                    : "clinical"
                }
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
