import { useState } from "react";
import LabeledSwitch from "@/components/molecules/LabeledSwitch";
import AppearOnScrollWrapper from "@/components/atoms/AppearOnScrollWrapper";
import type { TeamData, TeamMember } from "@/data/teamData";

interface TeamFilterProps {
  teamData: TeamData;
}

const categories = ["Doctors", "Healthcare", "Admin", "Back of House"];

function TeamFilter({ teamData }: TeamFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const getCategoryData = (index: number): TeamMember[] => {
    switch (index) {
      case 0:
        return teamData.doctors;
      case 1:
        return teamData.healthcare;
      case 2:
        return teamData.administrative;
      case 3:
        return teamData.backhouse;
      default:
        return teamData.doctors;
    }
  };

  const currentTeam = getCategoryData(selectedCategory);

  return (
    <div className="w-full">
      {/* Horizontal Filter on Top */}
      <div className="flex justify-center mb-8">
        <LabeledSwitch
          labels={categories}
          defaultSelected={selectedCategory}
          onSelectedChange={setSelectedCategory}
          orientation="horizontal"
          className="w-full"
        />
      </div>

      {/* Team Cards Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTeam.map((member, index) => (
          <AppearOnScrollWrapper
            key={`${member.name}-${index}`}
            transitionDuration={1000}
            className="p-6 rounded-lg border bg-card text-center space-y-3"
          >
            {/* Circular Image Placeholder */}
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=96&background=3b82f6&color=fff&bold=true&font-size=0.4`}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full object-cover font-[Vogun]"
            />

            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-sm font-medium text-primary">{member.role}</p>
              {member.speciality && (
                <p className="text-sm text-muted-foreground italic">
                  {member.speciality}
                </p>
              )}
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          </AppearOnScrollWrapper>
        ))}
      </div>
    </div>
  );
}

export default TeamFilter;
