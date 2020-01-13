import React from "react"
import { Link } from "gatsby"
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const client = new ApolloClient({
  uri: 'https://v4w9w8subd.execute-api.us-east-1.amazonaws.com/dev/query',
})

client.query({
  query: gql`
    {
      listRecipes {
        id
        title
        ingredients
        instructions
      }
    }
  `
})
  .then(result => console.log(result));

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage
