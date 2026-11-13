import { Button } from "@/components/atoms/button";

export type RegistrationCardProps = {
  option: {
    icon: {
      filename: string;
      alt?: string;
    };
    title: string;
    description: string;
    buttonText: string;
    buttonVariant?: "default" | "outline";
    link?: {
      url: string;
    };
    download?: boolean;
  };
};

export default function RegistrationCard({ option }: RegistrationCardProps) {
  const buttonElement = (
    <Button size="lg" variant={option.buttonVariant} className="mt-4">
      {option.buttonText}
    </Button>
  );

  return (
    <div className="flex flex-col items-center text-center p-8 rounded-lg border bg-card hover:bg-muted transition-colors space-y-4">
      {option.icon?.filename && (
        <div className="w-16 h-16 rounded-full bg-icon-background flex items-center justify-center">
          <span
            role="img"
            aria-label={option.icon.alt || option.title}
            className="block w-8 h-8 bg-icon"
            style={{
              maskImage: `url("${option.icon.filename}")`,
              maskRepeat: "no-repeat",
              maskPosition: "center",
              maskSize: "contain",
              WebkitMaskImage: `url("${option.icon.filename}")`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              WebkitMaskSize: "contain",
            }}
          />
        </div>
      )}
      <h3 className="text-xl font-semibold">{option.title}</h3>
      <p className="text-muted-foreground">{option.description}</p>
      {option.link?.url && (
        <a
          href={option.link.url}
          target="_blank"
          download={option.download ? "registration_form.pdf" : undefined}
        >
          {buttonElement}
        </a>
      )}
      {!option.link?.url && buttonElement}
    </div>
  );
}
