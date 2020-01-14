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
      <div className="recipe-card" style={{
        padding: `1.5rem`,
        marginBottom: `1rem`,
        backgroundColor: `#d3d3d347`,
        borderRadius: `5px`,
      }}>
          <h1>{title}</h1>
          <p><strong>Ingredients: </strong>{ingredients}</p>
          <p><strong>Instructions: </strong>{instructions}</p>
      </div>
  ))
}

const IndexPage = () => (
  <ApolloProvider client={client}>
    <Layout>
      <SEO title="Home" />
      <Recipes />
    </Layout>
  </ApolloProvider>
)

export default IndexPage
