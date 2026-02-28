import { Card, CardAction, CardContent } from "../ui/card";
import { TypographyH4, TypographyP } from "../ui/typography";

export default function InfoCard({
  title,
  description,
  className,
}: {
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card className={className}>
      <CardContent>
        <TypographyH4>{title}</TypographyH4>
        <TypographyP className="mt-2">{description}</TypographyP>
      </CardContent>
    </Card>
  );
}
