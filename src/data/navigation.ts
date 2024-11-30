const LINKS = {
  // about: {
  //   label: 'About',
  //   url: '/about',
  // },
  blog: {
    label: 'Blogs',
    url: '/blogs',
  },
  contact: {
    label: 'Contact',
    url: '/contact',
  },
  home: {
    label: 'Home',
    url: '/',
  },
  projects: {
    label: 'Projects',
    url: '/projects',
  },
  rss: {
    label: 'RSS',
    url: `${import.meta.env.SITE}/rss.xml`
  }
}

export default {
  header: [
    LINKS.home,
    LINKS.blog,
    LINKS.projects,
    LINKS.contact,
    LINKS.rss,
  ]
}
