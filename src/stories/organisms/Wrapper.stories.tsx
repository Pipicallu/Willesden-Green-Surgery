import type { Meta, StoryObj } from "@storybook/react-vite";
import { Wrapper, type WrapperProps } from "@/components/organisms/Wrapper";
import { EyebrowLabel } from "@/components/atoms/EyebrowLabel";
import { Heading } from "@/components/atoms/Heading";
import { Paragraph } from "@/components/atoms/Paragraph";

/**
 * The outer section shell used in Storyblok. Controls spacing, width,
 * background, column count, gap and vertical alignment — keeping every page
 * section visually consistent without giving editors free-form CSS access.
 */

const meta = {
  title: "Organisms/Wrapper",
  component: Wrapper,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The outer section shell used in Storyblok. Controls spacing, width, background, column count, gap and vertical alignment.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    background: {
      control: "select",
      options: ["default", "muted", "card"],
      description: "Section background. Alternate between these for rhythm.",
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Vertical padding applied to the section.",
    },
    maxWidth: {
      control: "select",
      options: ["narrow", "medium", "wide", "full"],
    },
    columns: {
      control: "select",
      options: [1, 2],
      description: "2-col stacks to 1 on mobile.",
    },
    gap: {
      control: "select",
      options: ["tight", "normal", "loose"],
    },
    verticalAlign: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Shared sample content ────────────────────────────────────────────────────

function SampleContent({
  eyebrow = "Our Services",
  heading = "Everything you need from your GP",
  body = "From same-day urgent appointments to long-term condition management, our team is here to support your health at every stage of life.",
  align = "start" as "start" | "center" | "end",
  headingLevel = "h2" as "h1" | "h2" | "h3" | "h4" | "h5" | "h6",
} = {}) {
  return (
    <div className="flex flex-col gap-3">
      <EyebrowLabel text={eyebrow} withDot align={align} block />
      <Heading level={headingLevel} text={heading} align={align} />
      <Paragraph text={body} align={align} color="muted" />
    </div>
  );
}

function SecondColumn() {
  return (
    <div className="rounded-lg bg-muted/60 border border-border h-48 flex items-center justify-center text-muted-foreground text-sm">
      Second column content
    </div>
  );
}

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: "Default (1 col, medium width)",
  args: {
    background: "default",
    spacing: "md",
    maxWidth: "medium",
    columns: 1,
    gap: "normal",
    verticalAlign: "start",
  },
  render: (args) => (
    <Wrapper {...args}>
      <SampleContent />
    </Wrapper>
  ),
};

export const MutedBackground: Story = {
  name: "Muted background",
  args: { ...Default.args, background: "muted" },
  render: (args) => (
    <Wrapper {...args}>
      <SampleContent
        eyebrow="New Patients"
        heading="Register with us today"
        body="We are currently accepting new patients. Registration takes less than five minutes online."
      />
    </Wrapper>
  ),
};

export const CardBackground: Story = {
  name: "Card background",
  args: { ...Default.args, background: "card", spacing: "lg" },
  render: (args) => (
    <Wrapper {...args}>
      <SampleContent
        eyebrow="Patient Corner"
        heading="Health information & resources"
        body="Browse our library of leaflets, self-referral forms and useful links curated by our clinical team."
      />
    </Wrapper>
  ),
};

export const TwoColumns: Story = {
  name: "2-column layout",
  args: { ...Default.args, columns: 2, verticalAlign: "center" },
  render: (args) => (
    <Wrapper {...args}>
      <SampleContent
        eyebrow="About us"
        heading="Caring for Willesden Green since 1987"
        body="A friendly and dedicated NHS practice serving patients across NW10 and the surrounding area."
      />
      <SecondColumn />
    </Wrapper>
  ),
};

export const NarrowCentered: Story = {
  name: "Narrow + centered (hero intro)",
  args: {
    background: "default",
    spacing: "xl",
    maxWidth: "narrow",
    columns: 1,
    gap: "normal",
    verticalAlign: "start",
  },
  render: (args) => (
    <Wrapper {...args}>
      <SampleContent
        eyebrow="Welcome"
        heading="Your health, our priority"
        headingLevel="h1"
        body="Willesden Green Surgery offers compassionate, high-quality primary care to every patient registered with us."
        align="center"
      />
    </Wrapper>
  ),
};

export const WideLooseGap: Story = {
  name: "Wide, loose gap, 2-col",
  args: {
    ...Default.args,
    maxWidth: "wide",
    columns: 2,
    gap: "loose",
    spacing: "lg",
    background: "muted",
  },
  render: (args) => (
    <Wrapper {...args}>
      <SampleContent />
      <SecondColumn />
    </Wrapper>
  ),
};
