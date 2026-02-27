import { TypographyH4, TypographyP } from "../ui/typography";
import { Divider } from "../atoms/Divider";

export default function Detail({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 divider rounded-md">
      <TypographyH4 className="">{title}</TypographyH4>
      <TypographyP className="mt-2">{description}</TypographyP>
      <Divider className="my-4" />
    </div>
  );
}
