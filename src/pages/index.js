import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello, world!</h1>
    <p>
      This is a serverless JAMstack demo project connecting to backend provided
      by demo-backend.
    </p>
  </Layout>
)

export default IndexPage
