import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import COMPONENT_MAP from '@/helpers/mdx-components';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(
    params.blog
  );

  return {
    title: `${frontmatter.title} | Aldo Portillo`,
  };
}

async function Blog({ params }) {

  const { frontmatter, content } = await loadBlogPost(params.blog);

  return (
    <article>
      <div>
      {frontmatter.title}
      {frontmatter.publishedOn}
      </div>
      <div >
      <MDXRemote
          source={content}
          components={COMPONENT_MAP}
        />
      </div>
    </article>
  )
}

export default Blog