import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeedbackForm } from "@/components/organisms/FeedbackForm";

const meta = {
  title: "Organisms/FeedbackForm",
  component: FeedbackForm,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Patient feedback form. Validates with Zod before any data leaves the component. The `onSubmit` prop receives fully-typed, sanitised values — the parent is responsible for sending the email.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeedbackForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: async (values) => {
      // In Storybook: log the validated payload instead of sending
      // console.log("Validated form values:", values);
      await new Promise((r) => setTimeout(r, 1000)); // simulate async
    },
    submitted: false,
  },
};

export const SuccessState: Story = {
  name: "Success (post-submit)",
  args: {
    onSubmit: async () => {},
    submitted: true,
  },
};
