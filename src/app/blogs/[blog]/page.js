import React from 'react'

export function generateMetadata({params}){
    //Await Blog Name
    return {
        title: `${params.blog} | Aldo Portillo`,
        description: "A collection of blogs",
        image: "../../public/save-icon.png",
        favicon: "../../public/save-icon.png",
        };
}
function Blog({ params }) {
    console.log(params)
  return (
    <div>Blog {params.blog}</div>
  )
}

export default Blog