export type ServiceClinician = {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  sourceUrl?: string;
};

export type Service = {
  id: string;
  label: string;
  name: string;
  title: string;
  href: string;
  description?: string;
  sourceUrl?: string;
  clinicians: ServiceClinician[];
};

export const DEFAULT_SERVICE_ID = "joint-injections";

const serviceDefinitions: Omit<Service, "href">[] = [
  {
    id: "dermatology",
    label: "Dermatology",
    name: "Dermatology and dermatoscopy",
    title: "dermatology advice?",
    description:
      "Meet the doctor providing dermatology and dermatoscopy consultations at the practice.",
    sourceUrl: "https://www.willesdengreensurgery.nhs.uk/dermatology",
    clinicians: [
      {
        name: "Dr Rana Najim",
        role: "GP with a special interest in dermatology",
        bio: "Dr Rana Najim sees patients with skin and hair concerns at Willesden Green Surgery. Her dermatology experience includes work at Central Middlesex Hospital, and she uses dermatoscopy to support the assessment of skin conditions.",
        photo:
          "https://static.wixstatic.com/media/a03920_cbd3ef8b02a844369f787503ff0ba73e~mv2_d_3024_4032_s_4_2.jpg",
        sourceUrl: "https://www.willesdengreensurgery.nhs.uk/dermatology",
      },
    ],
  },
  {
    id: "joint-injections",
    label: "Joint injections",
    name: "Ultrasound-guided joint injections",
    title: "joint injections?",
    description:
      "Meet the doctor providing ultrasound-guided joint injections at the practice.",
    sourceUrl: "https://www.willesdengreensurgery.nhs.uk/usg-injections",
    clinicians: [
      {
        name: "Dr Muhammad Najim",
        role: "GP with a special interest in musculoskeletal medicine",
        bio: "Dr Muhammad Najim is trained in musculoskeletal ultrasound and injection procedures. He provides ultrasound-guided joint injections at Willesden Green Surgery alongside his work in the complex musculoskeletal clinic at University College London Hospital.",
        photo:
          "https://static.wixstatic.com/media/a03920_6019355aca794a29a0b7d748e66f2d24~mv2.png",
        sourceUrl: "https://www.willesdengreensurgery.nhs.uk/usg-injections",
      },
    ],
  },
  {
    id: "ent-microsuction",
    label: "ENT & microsuction",
    name: "ENT and ear microsuction",
    title: "ENT care?",
    description:
      "Meet the doctors providing ear, nose and throat consultations at the practice.",
    sourceUrl: "https://www.willesdengreensurgery.nhs.uk/ent",
    clinicians: [
      {
        name: "Dr Riham Rabee",
        role: "GP with a special interest in ENT",
        bio: "Dr Riham Rabee has a special interest in ear, nose and throat medicine. Her experience includes ENT fellowship work at St Mary’s Hospital, and she has completed a Diploma in Head and Neck Surgery. She also teaches medical students at Imperial College London.",
        photo:
          "https://static.wixstatic.com/media/a03920_b85d1440160447e4a3d53318313a0fe3~mv2.jpeg",
        sourceUrl: "https://www.willesdengreensurgery.nhs.uk/the-team",
      },
      {
        name: "Dr Ali Abbas",
        role: "GP with a special interest in ENT",
        bio: "Dr Ali Abbas has a special interest in ear, nose and throat medicine. His hospital experience includes ENT fellowship work at Northwick Park Hospital and work across several other specialties. He sees patients with ENT concerns at Willesden Green Surgery.",
        photo:
          "https://static.wixstatic.com/media/a03920_58496da80cf6478086585e5bd885d914~mv2.jpg",
        sourceUrl: "https://www.willesdengreensurgery.nhs.uk/the-team",
      },
    ],
  },
  {
    id: "dietitian",
    label: "Dietitian",
    name: "Personal dietitian",
    title: "a dietitian?",
    description: "Meet the practice’s dietitian.",
    sourceUrl: "https://www.willesdengreensurgery.nhs.uk/dietitian",
    clinicians: [
      {
        name: "Amelia Lye",
        role: "Dietitian",
        bio: "Amelia Lye supports patients with weight management, diabetes, eating disorders and general nutrition. As the practice’s dietitian, she helps people explore dietary approaches and make informed choices about their food and nutritional needs.",
        sourceUrl: "https://www.willesdengreensurgery.nhs.uk/dietitian",
      },
    ],
  },
  {
    id: "minor-skin-surgery",
    label: "Minor skin surgery",
    name: "Minor skin surgery",
    title: "minor skin surgery?",
    description: "Clinician details and service information to be confirmed.",
    clinicians: [],
  },
  {
    id: "diabetes",
    label: "Diabetes",
    name: "Diabetes consultation",
    title: "diabetes advice?",
    description: "Clinician details and service information to be confirmed.",
    clinicians: [],
  },
];

export const services: Service[] = serviceDefinitions.map((service) => ({
  ...service,
  href: `/#services-${service.id}`,
}));
