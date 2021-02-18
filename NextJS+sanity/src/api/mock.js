export const navigation = {
  primaryItems: [
    {
      icon: 'Boat',
      link: {
        href: '/products',
        label: 'Explore',
      },
    },
    {
      icon: 'Customize',
      link: {
        href: '/product',
        label: 'Customize',
      },
    },
  ],
  secondaryLinks: [
    {
      href: '/news',
      label: 'News',
    },
    {
      href: '/invest',
      label: 'Invest',
    },
  ],
  tertiaryLinks: [
    {
      href: '/about',
      label: 'About X Shore',
    },
    {
      href: '/faq',
      label: 'Frequently Asked Questions',
    },
  ],
}

export const legal = '© 2019 All rights reserved'

export const product = {
  description:
    'The Eelex 6500 holds up to 8 persons and can reach 100NM. The Eelex 6500 holds up to 8 persons and can reach 100NM.',
  keyFeatures: [
    {
      key: 'b77419260531',
      name: 'Reach',
      unit: 'Nautical miles',
      value: '100',
    },
    {
      key: 'c73088ad0832',
      name: 'Charge',
      unit: 'hours',
      value: '8',
    },
    {
      key: '7bb15129714a',
      name: 'Top Speed',
      unit: 'knots',
      value: '40',
    },
  ],
  features: ['Shipping 2020 Q1', 'Another feature'],
  variants: [
    {
      name: 'Moss',
      images: [
        {
          key: 'bb35693b38cda',
          breakpoints: {
            xs:
              'https://cdn.sanity.io/images/qih6a9z9/stage/ec58cb0ff699a36ac3accf190b873731e04d1b99-2000x1125.png',
          },
        },
        {
          key: 'bb35693b38cdb',
          breakpoints: {
            xs:
              'https://cdn.sanity.io/images/qih6a9z9/stage/ec58cb0ff699a36ac3accf190b873731e04d1b99-2000x1125.png',
          },
        },
        {
          key: 'bb35693b38cdc',
          breakpoints: {
            xs:
              'https://cdn.sanity.io/images/qih6a9z9/stage/ec58cb0ff699a36ac3accf190b873731e04d1b99-2000x1125.png',
          },
        },
      ],
      color: '#424642',
    },
  ],
  title: 'Eelex 6500',
  slug: 'eelex-6500',
  price: 240000,
  specs: [
    {
      key: 'd86e984e7e9d',
      name: 'Length',
      value: '12 m / 40’ 7”',
    },
    {
      key: '0a5786ce07e6',
      name: 'Width',
      value: '3 m / 11’ 4”',
    },
    {
      key: 'ffbc88257d3b',
      name: 'Weight',
      value: '5600 kg',
    },
    {
      key: '69165abc3f23',
      name: 'Draught',
      value: '0,9 m / 3’',
    },
    {
      key: '3258ec76f8a0',
      name: 'Height',
      value: '3,75 m / 12’ 3”',
    },
    {
      key: '314bfb2ff28b',
      name: 'Number of seats',
      value: '2–8',
    },
  ],
  included: [
    '2 set of seats, total seating for 4 persons',
    'Pulpit with wheel and control functions, monitored by a 24-inch, waterproof and anti-glare touchscreen',
    'X Shore propulsion system with a Rolls-Royce propeller',
    'Side power prop in the bow and stern',
    'Sunroof and rails for Thule roof racks',
    'Fenders',
    'Anchor',
    'Ladder',
    'Lanterns',
  ],
}

export const translations = {
  EN: {
    navigation: {
      contact: 'Contact',
      newsletter: 'Newsletter',
    },
    contactForm: {
      title: 'Feel free to contact us about anything.',
    },
    newsletterForm: {
      title: 'Get updates about X shore events, articles and product news to your inbox.',
      signUpTitle: 'Why are you signing up?',
      contactType: {
        newsletter: 'Just curious about XShore',
        buyer: 'Potential buyer',
        press: 'Press',
      },
      termsAndConditions: 'I have read and accepted the',
      termsAndConditionsLink: 'terms & conditions',
      termsAndConditionsHref: '/terms-and-conditions',
    },
    product: {
      buy: 'Buy your craft | ',
      preorder: 'Pre-order | ',
      help: 'Need any help? Call us',
      techSpecs: 'Technical specifications',
      included: "See what's included",
    },
    productList: {
      cta: 'Discover and buy',
      ctaUnavailable: 'Discover',
    },
    common: {
      form: {
        email: 'Email',
        name: 'Name',
        firstName: 'First name',
        lastName: 'Last name',
        message: 'Message',
        phone: 'Phone number',
        country: 'Country',
        charactersLeft: 'Characters left',
      },
    },
    meta: {
      title: 'X Shore',
      description:
        'Rooted firmly at the intersection of new technology and traditional craftsmanship, X Shore strives to bring sustainability and innovation to the marine industry by manufacturing 100% electric boats.',
      twitterAccount: '@XshoreSweden',
    },
  },
}
