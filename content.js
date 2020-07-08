module.exports = {
  menu: [
    {
      'id': 'home',
      'label': 'Home',
      'route': '/'
    },
    {
      'id': 'collectionsoverview',
      'label': 'Collections Overview',
      'route': '/collectionsoverview'
    },
    {
      'id': 'series',
      'label': 'Series',
      'route': '/series'
    },
    {
      'id': 'about',
      'label': 'About',
      'route': '/about'
    },
    {
      'id': 'partners',
      'label': 'Partners',
      'route': '/partners'
    },
    {
      'id': 'browse',
      'label': 'Browse',
      'route': '/browse'
    }
  ],
  content: {
    header: {
      url: 'http://isaw.nyu.edu/',
      label: 'NYU | ISAW',
      class: ['isawlogo'],
    },
    partners: [
      {
        id: 'partners-awdl',
        url: 'http://isaw.nyu.edu/',
        label: 'INSTITUTE FOR THE STUDY OF THE ANCIENT WORLD',
      },
      {
        id: 'partners-dlts',
        url: 'http://dlib.nyu.edu/',
        label: 'NYU DIGITAL LIBRARY TECHNOLOGY SERVICES',
      },
    ]
  }
};
