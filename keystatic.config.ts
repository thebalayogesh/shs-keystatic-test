import { config, collection, fields } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: 'github',
    repo: 'thebalayoges/shs-admin'
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({ 
          label: 'Content',
          options: {
            image: {
              // 1. Where the physical files go (relative to project root)
              directory: 'public/images/posts',
              // 2. The URL prefix used in the Markdown 'src' attribute
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
  },
});