import type { Meta, StoryObj } from "@storybook/react-vite";
import Faq, { type FaqProps } from "@/components/organisms/faq";

const defaultFaqs: FaqProps[] = [
  {
    question: "What is your return policy?",
    answer:
      "Our return policy allows returns within 30 days of purchase with a valid receipt.",
    showLink: true,
    href: "https://example.com/return-policy",
    linkCta: "Read our return policy",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order using the tracking number provided in your confirmation email.",
    showLink: false,
    href: "",
    linkCta: "",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, we offer 24/7 customer support through chat, email, and phone.",
    showLink: true,
    href: "https://example.com/support",
    linkCta: "Contact Support",
  },
];

const meta = {
  title: "Components/Faq",
  component: Faq,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Frequently Asked Questions (FAQ) component using Accordion. contains questions and answers with optional links.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Faq>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    faqs: defaultFaqs,
  },
};

export const EmptyState: Story = {
  args: {
    faqs: [],
  },
};
