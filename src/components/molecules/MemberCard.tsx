import { useId } from "react";
import { Cross, Pencil, PencilOff } from "lucide-react";

export interface Member {
  photo?: string;
  name: string;
  role: string;
  speciality?: string;
  bio?: string;
}

interface MemberCardProps {
  member: Member;
  memberId: string;
  isExpanded: boolean;
  onToggle: (memberId: string) => void;
  variant?: "clinical" | "support";
}

export default function MemberCard({
  member,
  memberId,
  isExpanded,
  onToggle,
  variant = "clinical",
}: MemberCardProps) {
  const detailsId = useId();
  const hasDetails = Boolean(member.speciality || member.bio);
  const isClinical = variant === "clinical";
  const ToggleIcon = isClinical ? Cross : isExpanded ? PencilOff : Pencil;
  return (
    <div
      className={`w-full min-w-0 rounded-lg border bg-card p-4 shadow-sm ${
        hasDetails ? "cursor-pointer transition-colors hover:border-icon/50" : ""
      }`}
      onClick={hasDetails ? () => onToggle(memberId) : undefined}
    >
      <div
        className={`flex flex-row items-center gap-3 ${isExpanded ? "mb-3" : ""}`}
      >
        <div
          className={`portrait relative shrink-0 transition-[width,height] duration-200 ease-in-out motion-reduce:transition-none ${
            isExpanded ? "size-[6.2rem]" : "size-18"
          }`}
        >
          <img
            className="size-full rounded-full object-cover"
            src={
              member.photo ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name.replace(/^Dr\.?\s+/i, ""))}&size=96&background=f2f7fa&color=203d64&bold=true&font-size=0.4`
            }
            alt={member.photo ? member.name : ""}
            loading="lazy"
            width={100}
            height={100}
          />
          {hasDetails && (
            <button
              type="button"
              className="absolute -bottom-2 -right-2 flex size-8 cursor-pointer items-center justify-center rounded-full bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              aria-label={`${isExpanded ? "Hide" : "Show"} details for ${member.name}`}
              aria-expanded={isExpanded}
              aria-controls={detailsId}
              onClick={(event) => {
                event.stopPropagation();
                onToggle(memberId);
              }}
            >
              <ToggleIcon
                aria-hidden="true"
                fill={isExpanded ? "currentColor" : "none"}
                className={`text-icon hover:scale-110 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
                  isClinical && isExpanded ? "rotate-135" : "rotate-0"
                }`}
              />
            </button>
          )}
        </div>
        <div className="min-w-0 break-words">
          <p className="text-xl font-semibold leading-snug">{member.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
        </div>
      </div>
      <div
        id={detailsId}
        aria-hidden={!isExpanded}
        inert={!isExpanded}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
          isExpanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          {member.speciality && (
            <p className="mb-2 text-sm text-muted-foreground">
              <strong>Speciality:</strong> {member.speciality}
            </p>
          )}
          {member.bio && (
            <p className="text-sm text-muted-foreground">{member.bio}</p>
          )}
        </div>
      </div>
    </div>
  );
}
