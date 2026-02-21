import { useState } from "react";

interface LabeledSwitchProps {
  leftLabel: string;
  rightLabel: string;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
}

function LabeledSwitch({
  leftLabel,
  rightLabel,
  defaultChecked = false,
  onCheckedChange,
  className = "",
}: LabeledSwitchProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked);
    onCheckedChange?.(checked);
  };

  return (
    <div
      className={`relative border inline-grid grid-cols-2 gap-0 p-1 bg-muted rounded-full ${className}`}
    >
      {/* Sliding bubble background */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-background shadow-sm transition-all duration-300 ease-in-out ${
          isChecked ? "left-[calc(50%+0.125rem)]" : "left-1"
        }`}
      />

      {/* Buttons with relative positioning */}
      <button
        onClick={() => handleCheckedChange(false)}
        className={`text-2xl relative z-10 px-4 py-2 rounded-full font-medium transition-all duration-300 font-[Vogun] ${
          !isChecked
            ? "text-foreground"
            : "text-muted-foreground opacity-60 blur-[0.5px]"
        }`}
      >
        {leftLabel}
      </button>
      <button
        onClick={() => handleCheckedChange(true)}
        className={`text-2xl relative z-10 px-4 py-2 rounded-full font-medium transition-all duration-300 font-[Vogun] ${
          isChecked
            ? "text-foreground"
            : "text-muted-foreground opacity-60 blur-[0.5px]"
        }`}
      >
        {rightLabel}
      </button>
    </div>
  );
}

export default LabeledSwitch;
