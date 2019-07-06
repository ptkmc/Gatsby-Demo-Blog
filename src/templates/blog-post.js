import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import kebabCase from "lodash/kebabCase"

export default ({ data }) => {
  const post = data.markdownRemark
  const tags = post.frontmatter.tags
    ? post.frontmatter.tags.map(tag => {
        tag = JSON.stringify(tag)
        return (
          <Link to={`/tags/${kebabCase(tag)}/`}>
            <h4
              style={{
                display: "inline-block",
                marginRight: ".5em",
                color: "#AAA",
              }}
            >
              #{tag}
            </h4>
          </Link>
        )
      })
    : ""

  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        {post.frontmatter.subheader && (
          <h2 style={{ color: "#AAA" }}>{post.frontmatter.subheader}</h2>
        )}
        {tags}
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subheader
        tags
      }
    }
  }
`
