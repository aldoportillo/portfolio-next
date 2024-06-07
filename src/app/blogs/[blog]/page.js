import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import COMPONENT_MAP from '@/helpers/mdxComponents';
import styles from './Blog.module.css'

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
    <article class={styles.blog}>
      <h2 class={styles.title}>{frontmatter.title}</h2>

      <MDXRemote
          source={content}
          components={COMPONENT_MAP}
        />

    </article>
  )
}

export default Blog