import { Badge } from "@/components/atoms/badge";
import { Button, buttonVariants } from "@/components/atoms/Button";
import { type VariantProps } from "class-variance-authority";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export type ProfileCardProps = {
  imageSrc: string;
  imgDescription: string;
  badgeText?: string;
  cardTitle: string;
  cardDescription: string;
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  linkHref?: string;
  buttonText?: string;
};

export default function ProfileCard({
  imageSrc,
  imgDescription,
  badgeText,
  cardTitle,
  cardDescription,
  buttonVariant = "default",
  linkHref,
  buttonText = "Learn More",
}: ProfileCardProps) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <img
        src={imageSrc}
        alt={imgDescription}
        className="relative z-20 aspect-video w-full object-cover rounded-tl-lg rounded-tr-lg"
      />
      <CardHeader>
        <CardAction>
          {badgeText && <Badge variant="secondary">{badgeText}</Badge>}
        </CardAction>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant={buttonVariant}
          {...(buttonVariant === "link" && linkHref ? { href: linkHref } : {})}
          className="w-full"
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
