import React from "react"
import { Link } from "gatsby"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://y0lvedxa94.execute-api.us-east-1.amazonaws.com/dev/graphql',
})

const recipesQuery = gql`
    {
        recipes {
            title
            ingredients
            instructions
        }
    }
`;

function Recipes() {
  const { loading, error, data } = useQuery(recipesQuery);

  if(loading) return <p>Loading...</p>;
  if(error) return <p>Error :(</p>;

  return data.recipes.map(({ title, ingredients, instructions }) => (
      <div>
          <h1>{title}</h1>
          <p>{ingredients}</p>
          <p>{instructions}</p>
      </div>
  ))
}

const IndexPage = () => (
  <ApolloProvider client={client}>
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Recipes />
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  </ApolloProvider>
)

export default IndexPage
