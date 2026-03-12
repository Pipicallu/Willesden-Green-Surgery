export interface TeamMember {
  name: string;
  role: string;
  speciality?: string;
  bio: string;
}

export interface TeamData {
  doctors: TeamMember[];
  healthcare: TeamMember[];
  administrative: TeamMember[];
  backhouse: TeamMember[];
}

export const teamData: TeamData = {
  doctors: [
    {
      name: "Dr Zuhair Najim",
      role: "MBBS MRCP DPD DCD PGDD",
      speciality: "Dermatology, Minor Surgery, Diabetes",
      bio: "Dr Najim has 44 years experience in general practice and endocrinology. In 2016, he received a Papal blessing for his dedication to the community. He has been a devoted Doctor here since opening Willesden Green Surgery in 1997.",
    },
    {
      name: "Dr Sam Chabuk",
      role: "MBBS BSc MRCP MRCGP DFSRH",
      speciality: "Men's Health, Diabetes, Medical Education",
      bio: "Graduated from King's College London in 2010. GP trainer and appraiser with experience in emergency medicine.",
    },
    {
      name: "Dr Rana Najim",
      role: "MBBS BSc MRCGP DFSRH PGDip:Derm",
      speciality: "Dermatology, Women's Health",
      bio: "Works as a Dermatology Fellow at Central Middlesex Hospital. Completed the London Marathon.",
    },
    {
      name: "Dr Muhammad Najim",
      role: "MBBS BSc MRCGP DipMSK PgCMskUS CIPS MBA",
      speciality: "Musculoskeletal Medicine, Ultrasound Guided Procedures",
      bio: "Brent Clinical Director for Health Inequalities. Performs ultrasound guided joint injections in-house.",
    },
    {
      name: "Dr Riham Rabee",
      role: "MBBS BSc DOHNS MRCGP PGCert:HP PGDipMSK",
      speciality: "ENT, Joint Injections, Medical Education",
      bio: "Currently undertaking an ENT fellowship at St Mary's Hospital. University tutor at Imperial College London.",
    },
    {
      name: "Dr Mohammed Ali",
      role: "MBBS BSc MRCGP",
      speciality: "Minor Surgery, Learning Disabilities",
      bio: "Learning Disabilities Lead at the surgery. Experienced in minor surgery procedures.",
    },
    {
      name: "Dr Rula Najim",
      role: "MBBS BSc MRCP MRCA DCCM PgCe:Onc DRCOG DCH MRCGP",
      speciality: "Mental Wellbeing, Homeless Healthcare",
      bio: "Trained Life Coach passionate about helping people heal from trauma. Works with Brent Homeless Population.",
    },
    {
      name: "Dr Ali Abbas",
      role: "MBBS MRCGP DOHNS",
      speciality: "ENT Medicine",
      bio: "Clinical ENT fellow at Northwick Park Hospital. Clinical lead for Significant Events at Willesden Green Surgery.",
    },
    {
      name: "Dr Lana Abu El-reish",
      role: "MBBS MRCGP",
      speciality: "Dermatology",
      bio: "Pursuing a Postgraduate Diploma in Practical Dermatology at Cardiff University.",
    },
    {
      name: "Dr Batool Hariri",
      role: "MBBS MRCGP",
      speciality: "Women's Health",
      bio: "Passionate about supporting and empowering women in all aspects of their well-being.",
    },
    {
      name: "Dr Khaled Abid",
      role: "MBBS - GP Registrar",
      speciality: "General Practice",
      bio: "GP trainee with years of hospital experience, transitioning into General Practice.",
    },
    {
      name: "Dr Mahira Ilyas",
      role: "MBBS - GP Registrar",
      speciality: "General Practice",
      bio: "GP trainee with years of hospital experience, transitioning into General Practice.",
    },
  ],
  healthcare: [
    {
      name: "Seif Al-adnani",
      role: "Clinical Pharmacist",
      bio: "In-house pharmacist who works closely with patients to optimise their treatment plans. Independent prescriber and medication specialist.",
    },
    {
      name: "Ali Jawad",
      role: "Clinical Pharmacist",
      bio: "Part of our clinical pharmacy team supporting patients with medication management.",
    },
    {
      name: "Ethna Neary",
      role: "Nurse",
      bio: "Wonderful nurse with decades of experience. Her experience includes working as a Nurse to the British Royal Family.",
    },
    {
      name: "Maha Fettal",
      role: "Nurse",
      bio: "Always-friendly Nurse with 7 years at Willesden Green Surgery. Currently undertaking a fellowship in Diabetes. Fluent in English, Italian, Arabic and Farsi.",
    },
    {
      name: "Maria Mezrag",
      role: "Nurse",
      bio: "Experienced nurse trained in everything from child immunisations, to dressings to smears.",
    },
    {
      name: "Liban Said",
      role: "GP Assistant",
      bio: "Brilliant GP Assistant with 15 years at Imperial College Trust. Experience includes working in paediatric A&E at St Mary's Hospital.",
    },
    {
      name: "Jasmine Gale",
      role: "Social Prescriber",
      bio: "Provides a vital link between medical care and holistic well-being, connecting patients with resources and support.",
    },
    {
      name: "Syeda Kazmi",
      role: "Social Prescriber",
      bio: "Caring guide connecting patients with resources and support for healthier and wholesome lives.",
    },
    {
      name: "Anish Patel",
      role: "Physiotherapist",
      bio: "Senior first contact physiotherapist and advanced practitioner. Expert in MSK assessments and treatments. Independent prescriber.",
    },
    {
      name: "Emily Artuas",
      role: "Health Coach",
      bio: "Fantastic Health and Wellbeing Coach supporting patients to achieve their health goals with a friendly and motivating approach.",
    },
    {
      name: "Mousa Hadi",
      role: "Clinical Pharmacist",
      bio: "Part-time pharmacist supporting the team with medication reviews.",
    },
    {
      name: "Gulsah Sener",
      role: "Phlebotomist",
      bio: "Experienced phlebotomist known for her calm manner and expert technique.",
    },
    {
      name: "Touria Amrani",
      role: "Healthcare Assistant",
      bio: "Dedicated healthcare assistant who carries out blood tests and ECGs with care and precision.",
    },
  ],
  administrative: [
    {
      name: "Anwar",
      role: "Care Navigators Lead",
      bio: "Leads our front-of-house care navigation team.",
    },
    {
      name: "Tanya",
      role: "Care Navigator & Admin",
      bio: "Multi-skilled team member directing patients to the best suited services.",
    },
    {
      name: "Watha",
      role: "Care Navigator & Admin",
      bio: "Multi-skilled team member directing patients to the best suited services.",
    },
    {
      name: "Maryam",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
    {
      name: "Imane",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
    {
      name: "Donya",
      role: "Digital Inclusion & Care Navigator",
      bio: "Helps patients navigate digital services and healthcare needs.",
    },
    {
      name: "Shahad",
      role: "Triage Coordinator Lead",
      bio: "Leads the triage coordination ensuring efficient patient care.",
    },
    {
      name: "Reem",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
    {
      name: "Zahraa",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
    {
      name: "Ines",
      role: "Care Navigator & Admin",
      bio: "Multi-skilled team member directing patients to the best suited services.",
    },
    {
      name: "Ayah",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
    {
      name: "Nabaa",
      role: "Digital Exclusion Lead",
      bio: "Ensures all patients can access our services regardless of digital capability.",
    },
    {
      name: "Sara",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
    {
      name: "Ayia",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
    {
      name: "Zainab",
      role: "Care Navigator & Admin",
      bio: "Multi-skilled team member directing patients to the best suited services.",
    },
    {
      name: "Mariam",
      role: "Care Navigator",
      bio: "Always there to direct you to the right clinician or service.",
    },
  ],
  backhouse: [
    {
      name: "Fatima Badreddine",
      role: "CQC Manager",
      bio: "Ensures our care meets the highest regulatory standards.",
    },
    {
      name: "Sandy El-Omari",
      role: "Clinical Coder",
      bio: "Ensures all records and files are accurately coded and maintained.",
    },
    {
      name: "Dr Riham Rabee",
      role: "Practice Manager",
      bio: "Oversees the daily operations ensuring optimal patient care.",
    },
    {
      name: "Dema Tiba",
      role: "Operations Manager",
      bio: "Manages operations ensuring smooth running of the practice.",
    },
    {
      name: "Wala Najim",
      role: "Document Manager",
      bio: "Ensures all patient files and records are in perfect order.",
    },
    {
      name: "Anwar Kazim",
      role: "Admin & Reception Manager",
      bio: "Manages the administrative and reception team.",
    },
    {
      name: "Dr Muhammad Najim",
      role: "Business Manager",
      bio: "Oversees business operations and strategic development.",
    },
  ],
};
