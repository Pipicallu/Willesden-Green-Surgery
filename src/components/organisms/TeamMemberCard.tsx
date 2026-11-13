interface TeamMemberCardProps {
  name: string;
  role: string;
  speciality?: string;
  bio?: string;
  photo?: string;
}

export function TeamMemberCard({
  name,
  role,
  speciality,
  bio,
  photo,
}: TeamMemberCardProps) {
  const avatarSrc = photo
    ? photo
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=96&background=7667DF&color=fff&bold=true&font-size=0.4`;

  return (
    <div className="p-6 rounded-lg border bg-card text-center space-y-3 h-full">
      <img
        src={avatarSrc}
        alt={name}
        className="w-24 h-24 mx-auto rounded-full object-cover"
      />
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm font-medium text-primary">{role}</p>
        {speciality && (
          <p className="text-sm text-muted-foreground italic">{speciality}</p>
        )}
        {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
      </div>
    </div>
  );
}

export default TeamMemberCard;
