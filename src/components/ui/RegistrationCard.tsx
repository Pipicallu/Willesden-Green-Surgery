import { Button } from "@/components/ui/button";

type RegistrationCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: "default" | "outline";
  link?: string;
  download?: boolean;
};

export default function RegistrationCard({ option }: RegistrationCardProps) {
  const buttonElement = (
    <Button size="lg" variant={option.buttonVariant} className="mt-4">
      {option.buttonText}
    </Button>
  );

  return (
    <div className="flex flex-col items-center text-center p-8 rounded-lg border bg-card hover:bg-accent transition-colors space-y-4">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
        <img
          src={option.icon.filename}
          alt={option.icon.alt || option.title}
          className="w-8 h-8"
        />
      </div>
      <h3 className="text-xl font-semibold">{option.title}</h3>
      <p className="text-muted-foreground">{option.description}</p>
      {option.link && (
        <a
          href={option.link.url}
          target="_blank"
          download={option.download ? "registration_form.pdf" : undefined}
        >
          {buttonElement}
        </a>
      )}
    </div>
  );
}
