import type { Meta, StoryObj } from "@storybook/react-vite";
import { EyebrowLabel } from "@/components/atoms/EyebrowLabel";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";

/**
 * Composite story showing EyebrowLabel + Heading + Paragraph working together
 * as a section introduction block — the most common real-world usage pattern.
 *
 * EyebrowLabel:  small uppercase label that categorises the section
 * Heading:       the primary title that draws the eye
 * Paragraph:     supporting body copy below the heading
 */

interface TypographyBlockProps {
  eyebrow: string;
  eyebrowWithDot: boolean;
  heading: string;
  headingLevel: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  body: string;
  align: "start" | "center" | "end";
}

function TypographyBlock({
  eyebrow,
  eyebrowWithDot,
  heading,
  headingLevel,
  body,
  align,
}: TypographyBlockProps) {
  return (
    <div className="flex flex-col gap-3 max-w-xl">
      <EyebrowLabel
        text={eyebrow}
        withDot={eyebrowWithDot}
        align={align}
        block
      />
      <Heading level={headingLevel} text={heading} align={align} />
      <Paragraph text={body} align={align} color="muted" />
    </div>
  );
}

const meta = {
  title: "Atoms/Typography (Combined)",
  component: TypographyBlock,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reference story showing `EyebrowLabel` + `Heading` + `Paragraph` composed together. The eyebrow label sits above the heading to give the section context — a common pattern in marketing/editorial layouts known as a *kicker* or *overline*.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    eyebrow: { control: "text" },
    eyebrowWithDot: { control: "boolean" },
    heading: { control: "text" },
    headingLevel: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
    },
    body: { control: "text" },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
} satisfies Meta<typeof TypographyBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Stories ──────────────────────────────────────────────────────────────────

export const SectionIntro: Story = {
  name: "Section intro (left-aligned)",
  args: {
    eyebrow: "Our Services",
    eyebrowWithDot: true,
    heading: "Everything you need from your GP",
    headingLevel: "h2",
    body: "From same-day urgent appointments to long-term condition management, our team is here to support your health at every stage of life.",
    align: "start",
  },
};

export const CenteredHero: Story = {
  name: "Centered hero",
  args: {
    eyebrow: "Willesden Green Surgery",
    eyebrowWithDot: false,
    heading: "Caring for your community since 1987",
    headingLevel: "h1",
    body: "A friendly and dedicated NHS practice serving patients across NW10 and the surrounding area.",
    align: "center",
  },
};

export const NewPatients: Story = {
  name: "New patients CTA",
  args: {
    eyebrow: "Join our practice",
    eyebrowWithDot: true,
    heading: "Register as a new patient",
    headingLevel: "h2",
    body: "We are currently accepting new patients. Registration takes less than five minutes online.",
    align: "start",
  },
};

export const PatientCorner: Story = {
  name: "Patient corner subpage",
  args: {
    eyebrow: "Patient Corner",
    eyebrowWithDot: false,
    heading: "Health information & resources",
    headingLevel: "h3",
    body: "Browse our library of leaflets, self-referral forms and useful links curated by our clinical team.",
    align: "start",
  },
};
