/* Case studies. Everything here is taken from what is visible on the live
   sites (names, navigation, headlines, buttons). Results, timelines and client
   feedback are deliberately left out until real ones are available. */

export const caseStudies = [
  {
    slug: 'ivp-asbl',
    title: 'IVP ASBL × MF Médical',
    short: 'IVP ASBL',
    category: 'Web development',
    tagline: 'Two commitments, one calling: to care.',
    taglineNote: 'From the site’s own French headline, “Deux engagements, une même vocation : prendre soin.”',
    image: '/ivp.webp',
    liveUrl: 'https://ivp-asbl.netlify.app/',
    summary:
      'A French-language website that brings a non-profit caring for people in need and a beauty and wellbeing practice together under one roof.',
    facts: [
      { label: 'Client', value: 'IVP ASBL (non-profit) and MF Médical' },
      { label: 'Language', value: 'French' },
      { label: 'Audiences', value: 'Supporters, people in need and beauty clients' },
      { label: 'Main actions', value: 'Book an appointment · Make a donation' },
    ],
    brief: [
      'IVP cares for the most vulnerable, free of charge: orphans, street children, widows, older people and people with disabilities. MF Médical offers aesthetic care and wellbeing. They are two different missions with two different audiences, and they share one nurse’s heart.',
      'The website had to let both stand on their own without one overshadowing the other, and still make the two actions that matter obvious: book an appointment, or give.',
    ],
    approach: [
      {
        title: 'A hero that holds both worlds',
        text: 'The opening screen is split by a thin gold diagonal. The charity’s work in the field sits on one side and a calm beauty portrait on the other, so visitors see both missions in one glance.',
      },
      {
        title: 'Type that carries the story',
        text: 'A large serif headline with an italic second line gives the page warmth and dignity, and the short paragraph beneath explains each mission in plain French.',
      },
      {
        title: 'Colour taken from the logo',
        text: 'The plum and red buttons come from the heart-and-cross logo, so the site feels like the organisation rather than a template.',
      },
      {
        title: 'Two actions, always in reach',
        text: '“Prendre rendez-vous” and “Faire un don” stay in the header, so the two things a visitor might want to do are never more than a click away.',
      },
    ],
    included: [
      'Home',
      'IVP · About',
      'Aesthetic care (Soins esthétiques)',
      'Gallery',
      'Contact',
      'Appointment and donation buttons',
    ],
  },
  {
    slug: 'vanta-detail-studio',
    title: 'Vanta Detail Studio',
    short: 'Vanta',
    category: 'Web Design',
    tagline: 'Every detail. Perfected.',
    taglineNote: 'The headline that opens the site.',
    image: '/vanta.webp',
    liveUrl: 'https://ourcardetailing.netlify.app/',
    summary:
      'A dark, cinematic website for a car detailing studio, built to make the quality of the work visible from the first second.',
    facts: [
      { label: 'Client', value: 'Vanta Detail Studio' },
      { label: 'Type', value: 'Car detailing studio' },
      { label: 'Language', value: 'English' },
      { label: 'Main actions', value: 'Book now · Call' },
    ],
    brief: [
      'Detailing is a premium service, and a premium service has to look premium before anyone has read a word. Customers need to see the craft, understand the process and compare the packages with confidence.',
      'The site needed to turn “we clean cars” into “we restore the feeling of driving something extraordinary”, the line the page opens with.',
    ],
    approach: [
      {
        title: 'Footage first',
        text: 'The page opens full-bleed on a close-up of an interior being cleaned, with the headline “Every detail. Perfected.” set over it in a heavy, wide sans-serif.',
      },
      {
        title: 'A black-and-white palette',
        text: 'Restrained monochrome lets the photography and footage do the talking and gives the studio a high-end, showroom feel.',
      },
      {
        title: 'Scroll to restore',
        text: 'A small “scroll to restore” counter invites visitors to scroll through the transformation instead of just reading about it.',
      },
      {
        title: 'A clear path to booking',
        text: 'The header gives six sections (Craft, Services, Results, Process, Packages, Gallery) plus a bold “Book now” button and a phone shortcut.',
      },
    ],
    included: [
      'Craft',
      'Services',
      'Results',
      'Process',
      'Packages',
      'Gallery',
      'Book now button and phone shortcut',
    ],
  },
]

export const findCaseStudy = (slug) =>
  caseStudies.find((study) => study.slug === slug)
