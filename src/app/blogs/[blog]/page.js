import React from 'react'

function Blog({ params }) {
    console.log(params)
  return (
    <div>Blog {params.blog}</div>
  )
}

export default Blog