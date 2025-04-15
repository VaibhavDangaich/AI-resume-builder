module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: ['https://ai-resume-builder-8a6b.vercel.app'], // 👈 put your frontend deployed URL here
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      headers: '*',
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
