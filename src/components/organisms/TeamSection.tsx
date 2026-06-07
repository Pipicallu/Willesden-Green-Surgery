import { useState } from "react";
import LabeledSwitch from "@/components/molecules/LabeledSwitch";
import AppearOnScrollWrapper from "@/components/atoms/AppearOnScrollWrapper";
import { TeamMemberCard } from "@/components/organisms/TeamMemberCard";

interface Member {
  name: string;
  role: string;
  speciality?: string;
  bio?: string;
  photo?: string;
}

interface Category {
  label: string;
  members: Member[];
}

interface TeamSectionProps {
  categories: Category[];
}

export default function TeamSection({ categories }: TeamSectionProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!categories.length) return null;

  const labels = categories.map((c) => c.label);
  const currentMembers = categories[selectedIndex]?.members ?? [];

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <LabeledSwitch
          labels={labels}
          defaultSelected={0}
          onSelectedChange={setSelectedIndex}
          orientation="horizontal"
          className="w-full"
        />
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentMembers.map((member, index) => (
          <AppearOnScrollWrapper
            key={`${member.name}-${index}`}
            transitionDuration={500 + index * 150}
          >
            <TeamMemberCard {...member} />
          </AppearOnScrollWrapper>
        ))}
      </div>
    </div>
  );
}
