import { useState } from "react";

interface LabeledSwitchPropsBase {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

interface TwoOptionProps extends LabeledSwitchPropsBase {
  leftLabel: string;
  rightLabel: string;
  labels?: never;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  defaultSelected?: never;
  onSelectedChange?: never;
}

interface MultiOptionProps extends LabeledSwitchPropsBase {
  labels: string[];
  leftLabel?: never;
  rightLabel?: never;
  defaultChecked?: never;
  onCheckedChange?: never;
  defaultSelected?: number;
  onSelectedChange?: (index: number) => void;
}

type LabeledSwitchProps = TwoOptionProps | MultiOptionProps;

function LabeledSwitch(props: LabeledSwitchProps) {
  const { className = "", orientation = "horizontal" } = props;

  // Handle multi-option mode
  if ("labels" in props && props.labels) {
    const { labels, defaultSelected = 0, onSelectedChange } = props;
    const [selectedIndex, setSelectedIndex] = useState(defaultSelected);

    const handleSelect = (index: number) => {
      setSelectedIndex(index);
      onSelectedChange?.(index);
    };

    const isVertical = orientation === "vertical";
    const count = labels.length;
    const size = 100 / count;

    return (
      <div
        className={`relative border inline-grid gap-0 p-1 bg-muted ${
          isVertical ? `rounded-3xl` : "rounded-full"
        } ${className}`}
        style={{
          [isVertical ? "gridTemplateRows" : "gridTemplateColumns"]:
            `repeat(${count}, 1fr)`,
        }}
      >
        {/* Sliding bubble background */}
        <div
          className="absolute rounded-full bg-background shadow-sm transition-all duration-300 ease-in-out"
          style={
            isVertical
              ? {
                  left: "0.25rem",
                  right: "0.25rem",
                  height: `calc(${size}% - 0.5rem)`,
                  top: `calc(${selectedIndex * size}% + 0.25rem)`,
                }
              : {
                  top: "0.25rem",
                  bottom: "0.25rem",
                  width: `calc(${size}% - 0.5rem)`,
                  left: `calc(${selectedIndex * size}% + 0.25rem)`,
                }
          }
        />

        {/* Buttons */}
        {labels.map((label, index) => (
          <button
            key={label}
            onClick={() => handleSelect(index)}
            className={`text-2xl relative z-10 px-6 py-4 rounded-full font-medium transition-all duration-300 font-[Vogun] text-center ${
              selectedIndex === index
                ? "text-foreground"
                : "text-muted-foreground opacity-60 blur-[0.5px]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    );
  }

  // Handle two-option mode (backward compatibility)
  const {
    leftLabel,
    rightLabel,
    defaultChecked = false,
    onCheckedChange,
  } = props as TwoOptionProps;

  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked);
    onCheckedChange?.(checked);
  };

  const isVertical = orientation === "vertical";

  return (
    <div
      className={`relative border inline-grid gap-0 p-1 bg-muted ${
        isVertical ? "rounded-3xl" : "rounded-full"
      } ${className}`}
      style={{
        [isVertical ? "gridTemplateRows" : "gridTemplateColumns"]: "1fr 1fr",
      }}
    >
      {/* Sliding bubble background */}
      <div
        className="absolute rounded-full bg-background shadow-sm transition-all duration-300 ease-in-out"
        style={
          isVertical
            ? {
                left: "0.25rem",
                right: "0.25rem",
                height: "calc(50% - 0.5rem)",
                top: isChecked ? "calc(50% + 0.25rem)" : "0.25rem",
              }
            : {
                top: "0.25rem",
                bottom: "0.25rem",
                width: "calc(50% - 0.5rem)",
                left: isChecked ? "calc(50% + 0.25rem)" : "0.25rem",
              }
        }
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
