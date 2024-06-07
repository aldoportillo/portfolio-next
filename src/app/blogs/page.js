import React from "react";
import { getBlogPostList } from "@/helpers/file-helpers";
import Link from "next/link";
import styles from "./Blogs.module.css";

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
    <div className={styles.blogPageWrapper}>
      <h1 className={styles.title}>Blogs</h1>
      {Object.keys(groupedByYear)
        .sort((a, b) => b - a)
        .map((year) => (
          <React.Fragment key={year}>
            <h2 className={styles.titleYear}>{year}</h2>
            {groupedByYear[year].map((blog) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                state={{ from: "blog", data: blog }}
                className={styles.link}
              >
                <h3 className={styles.blogName}>{blog.title}</h3>
                <h3 className={styles.publishedDate}>
                  {formatDate(blog.published_at)}
                </h3>
              </Link>
            ))}
            <hr className={styles.divider} />
          </React.Fragment>
        ))}
    </div>
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