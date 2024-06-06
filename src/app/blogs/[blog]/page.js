import React from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadBlogPost } from '@/helpers/file-helpers';
import CodeBlock from '@/components/CodeBlock';

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
          components={{
            pre: CodeBlock,
          }}
        />
      </div>
    </article>
  )
}

export default Blog