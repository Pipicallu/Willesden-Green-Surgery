import type { Meta, StoryObj } from "@storybook/react-vite";
import { DetailsCard } from "@/components/molecules/DetailsCard";

const meta = {
  title: "Molecules/DetailsCard",
  component: DetailsCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A card for displaying a service or contact with a heading, optional description, and a list of labelled detail rows. Values can be plain text or links (phone, email, website).",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DetailsCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AlcoholAndDrug: Story = {
  args: {
    heading: "Alcohol and Drug Addiction Self-referral",
    description:
      "The self-referral Drug and Alcohol service is designed for individuals seeking support and guidance for addiction to alcohol and drugs, and provides services to help with quitting.",
    details: [
      {
        title: "24/7 Helpline",
        value: "0800 107 1754",
        href: "tel:08001071754",
      },
      {
        title: "Telephone",
        value: "03003034611",
        href: "tel:03003034611",
      },
      {
        title: "Website",
        value: "www.wdp.org.uk/brent",
        href: "https://www.wdp.org.uk/brent",
      },
      {
        title: "Address",
        value: "Willesden Centre for Health, Harlesden Road, NW10 3RY",
      },
    ],
  },
};

export const StopSmoking: Story = {
  args: {
    heading: "Stop Smoking Service",
    details: [
      {
        title: "Email",
        value: "stoptobacco@brent.gov.uk",
        href: "mailto:stoptobacco@brent.gov.uk",
      },
      {
        title: "Telephone",
        value: "0208 937 5490",
        href: "tel:02089375490",
      },
      {
        title: "Website",
        value: "www.stopsmokinglondon.com/support/brent",
        href: "https://www.stopsmokinglondon.com/support/brent",
      },
    ],
  },
};

export const AlertVariant: Story = {
  args: {
    heading: "Urgent: Missing Repeat Prescription",
    description:
      "Your repeat prescription request has not been processed. Please contact the surgery as soon as possible.",
    alertVariant: true,
    details: [
      {
        title: "Telephone",
        value: "020 8459 3788",
        href: "tel:02084593788",
      },
      {
        title: "Email",
        value: "wgspractice@nhs.net",
        href: "mailto:wgspractice@nhs.net",
      },
    ],
  },
};

export const ServiceGroup: Story = {
  render: () => (
    <div className="space-y-6 max-w-xl">
      <h2 className="text-2xl font-bold">Alcohol, Smoking & Drug Services</h2>
      <DetailsCard
        heading="Alcohol and Drug Addiction Self-referral"
        description="The self-referral Drug and Alcohol service is designed for individuals seeking support and guidance for addiction to alcohol and drugs."
        details={[
          {
            title: "24/7 Helpline",
            value: "0800 107 1754",
            href: "tel:08001071754",
          },
          { title: "Telephone", value: "03003034611", href: "tel:03003034611" },
          {
            title: "Website",
            value: "www.wdp.org.uk/brent",
            href: "https://www.wdp.org.uk/brent",
          },
          {
            title: "Address",
            value: "Willesden Centre for Health, Harlesden Road, NW10 3RY",
          },
        ]}
      />
      <DetailsCard
        heading="Stop Smoking Service"
        details={[
          {
            title: "Email",
            value: "stoptobacco@brent.gov.uk",
            href: "mailto:stoptobacco@brent.gov.uk",
          },
          {
            title: "Telephone",
            value: "0208 937 5490",
            href: "tel:02089375490",
          },
          {
            title: "Website",
            value: "www.stopsmokinglondon.com/support/brent",
            href: "https://www.stopsmokinglondon.com/support/brent",
          },
        ]}
      />
    </div>
  ),
  args: { heading: "", details: [] },
};
