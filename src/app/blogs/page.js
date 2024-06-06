import React from "react";
import { BlogPage, PageTitle, YearTitle, StyledLink, BlogTitle, PublishDate, Divider } from "@/styles/BlogStyles";
import { getBlogPostList } from "@/helpers/file-helpers";

export const metadata = {
  title: "My Blogs | Aldo Portillo",
  description: "A collection of blogs",
  image: "../../public/save-icon.png",
  favicon: "../../public/save-icon.png",
};

async function Blogs() {

  const blogData = await getBlogPostList();

  const groupedByYear = blogData?.reduce((acc, blog) => {
    const year = new Date(blog.published_at).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(blog);
    return acc;
  }, {});

  return (
    <BlogPage>
      <PageTitle>Blogs</PageTitle>
      {Object.keys(groupedByYear)
        .sort((a, b) => b - a)
        .map((year) => (
          <React.Fragment key={year}>
            <YearTitle>{year}</YearTitle>
            {groupedByYear[year].map((blog) => (
              <StyledLink
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                state={{ from: "blog", data: blog }}
              >
                <BlogTitle>{blog.title}</BlogTitle>
                <PublishDate>
                  {formatDate(blog.published_at)}
                </PublishDate>
              </StyledLink>
            ))}
            <Divider />
          </React.Fragment>
        ))}
    </BlogPage>
  );
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const options = { month: "long", day: "numeric" };
  if (date.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }
  return date.toLocaleDateString("en-US", options);
}

export default Blogs;