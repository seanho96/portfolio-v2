module.exports = {
  email: 'seannnho@gmail.com',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/seanho96',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/seannho',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/seannho',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/seanho96',
    },
    // {
    //   name: 'Codepen',
    //   url: 'https://codepen.io/seanho96',
    // },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Work',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#DAE6E4',
    navy: '#242632',
    darkNavy: '#0d0718',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
