/** Static profile resource from the portfolio design. */
const profile = {
  name: 'LY GIA HUY',
  role: 'GAME MARKETING',
  portfolioLabel: 'LY GIA HUY // PORTFOLIO',
  specialistLabel: 'GAME MARKETING SPECIALIST',
  introduction:
    'I’m a Brand Marketer passionate about the gaming industry and player culture. I enjoy turning player insights into creative ideas, campaigns, and experiences that connect brands with their communities. From the first shot to the final execution, I work across social, KOL/KOC, OOH, and offline activations to make brands more relevant, engaging, and memorable to players.',
  portrait: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC01aEgqpi0zt3_O1AC2bFK23KaEOFvugNPyHWqUitaylBoqpMunMlcp-6JgxMbRasytnNs_owtYSBjyt-kmmqUxrLZrDU9wb0n3PoIb1soiT2yP91sFjbBwDgdddD9coZvHaik95j-WDEeC1xZGo9axAkOEbvI79Hxpj6KYd_X67uqadOGf-iUPlq1nKxkEDwoD9aQUrXgcgwBDDw0KmiABavmXNYrAg-iHZYKqx3qIsbcqU-jgbFuBuYZ8Gm3KqEmChs',
    alt: 'Portrait of Ly Gia Huy',
  },
  highlights: [
    { id: 'viral-views', value: '111M+', label: 'VIRAL CAMPAIGN VIEWS' },
    { id: 'livestream-views', value: '3.76M', label: 'LIVESTREAM VIEWS (9.72M ENG)' },
    { id: 'ooh-impressions', value: '125M', label: 'TOTAL OOH IMPRESSIONS' },
  ],
  experience: [
    {
      id: 'vnggames',
      organization: 'VNGGames',
      role: 'Brand Collaborator',
      period: 'Sep 2025 – Present',
      badge: 'CURRENT',
    },
    {
      id: 'vtv-hyundai',
      organization: 'VTV-Hyundai',
      role: 'E-commerce Marketing Intern',
      period: 'Mar 2025 – July 2025',
      badge: 'INTERNSHIP',
    },
    {
      id: 'ueh-youth-union',
      organization: 'UEH Youth Union',
      role: 'Vice Head of Movement Department',
      period: 'Mar 2024 – Dec 2025',
      badge: 'LEADERSHIP',
    },
  ],
  education: {
    institution: 'University of Ho Chi Minh City (UEH)',
    period: 'Sep 2022 – Apr 2026 (Graduated: 2026)',
    major: 'E-commerce Marketing',
    gpa: '3.75 / 4.0',
    description:
      'Consistent top academic standing with focus on digital commerce, consumer psychology & online marketing.',
    coursework: [
      { subject: 'E-commerce Business Strategy', score: '9.1 / 10' },
      { subject: 'Consumer Behavior', score: '9.8 / 10' },
      { subject: 'Digital Marketing', score: '8.8 / 10' },
    ],
  },
  achievements: [
    {
      id: 'youtube-works-2026',
      title: 'YouTube Works Awards 2026',
      badge: 'WINNER',
      subtitle: 'TVC Crossfire: Legends – Winner "The Big Bang"',
      description:
        'Honored among giants across industries at YouTube Works Awards Vietnam for breakthrough campaign performance and exceptional creative impact.',
    },
    {
      id: 'scholarship-2024',
      title: 'Full Academic Scholarship 2024',
      badge: 'SCHOLARSHIP',
      subtitle: 'UEH Final Semester of 2024 · Value: 19 Million VND',
      description: 'Awarded for top academic rigor with GPA 3.76/4.0 and Conduct Score of 96/100.',
    },
    {
      id: 'new-generation-students-2024',
      title: 'National Top 4 – New Generation Students 2024',
      badge: 'NATIONAL',
      subtitle: 'National Student Competition (Sinh Viên Thế Hệ Mới)',
      description:
        'Represented UEH, conducted comprehensive user research and designed UX/UI web proposal for the competition project.',
    },
    {
      id: 'uii-sandbox-2023',
      title: 'Top 10 – UII Sandbox Program 2023',
      badge: 'INNOVATION',
      subtitle: 'UEH Institute of Innovation (UII)',
      description:
        'Developed the M-BOX smart medicine cabinet prototype integrating AI & machine learning for automated prescription support.',
    },
  ],
  skills: [
    {
      id: 'creative-design',
      title: 'Creative Design',
      icon: 'palette',
      badge: 'TOOLS',
      items: [
        { label: 'Photoshop', logo: 'Ps', logoVariant: 'photoshop' },
        { label: 'Illustrator', logo: 'Ai', logoVariant: 'illustrator' },
        { label: 'Canva', logo: 'C', logoVariant: 'canva' },
      ],
      description: 'Key Visual creation, POSM, Livestream overlays, promotional assets.',
    },
    {
      id: 'technical-ux',
      title: 'Technical & UX',
      icon: 'web',
      badge: 'DIGITAL',
      items: [
        { label: 'WordPress', logo: 'W', logoVariant: 'wordpress' },
        { label: 'Figma', logo: 'F', logoVariant: 'figma' },
        { label: 'Stitch AI', logo: 'auto_awesome', logoVariant: 'stitch' },
      ],
      description:
        'WordPress landing page setup, Figma UI/UX prototyping & wireframing, Stitch AI-assisted workflows.',
    },
    {
      id: 'languages',
      title: 'Languages',
      icon: 'translate',
      badge: 'COMMUNICATION',
      layout: 'split-items',
      items: [
        { label: 'Vietnamese', detail: 'Native' },
        { label: 'English', detail: 'Intermediate — IELTS 5.5' },
      ],
    },
    {
      id: 'ai-social',
      title: 'Certified AI & Social',
      icon: 'verified',
      badge: 'VERIFIED',
      certification: 'Mastering Social Media with AI',
      issuer: 'UEH College of Technology and Design (CTD)',
      description:
        'AI-assisted communication planning, viral clip prompt engineering, and audience retention analysis.',
    },
  ],
  expertise: [
    'Mega Livestream Ops',
    'Creative TVC',
    'E-Commerce Marketing',
    'Roadshow & OOH',
    'Booth Activations',
  ],
  contactCta: {
    eyebrow: 'GET IN TOUCH',
    title: 'READY TO DRIVE GAME MARKETING EXCELLENCE?',
    description:
      'Open for Game Marketing opportunities, campaign collaboration, and brand marketing roles. Let’s create impactful player experiences together.',
  },
};

/**
 * Returns the complete profile content for the homepage.
 * @returns {Promise<Object>} Profile sections and display content.
 */
export async function getProfile() {
  return profile;
}
