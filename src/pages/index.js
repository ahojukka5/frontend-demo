import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import axios from "axios"
import { valueToNode } from "@babel/types"

const REMOTE_URL = "https://backend-demo-production.herokuapp.com/api/testing"

const RequestFromBackend = () => {
  const [value, setValue] = useState("")
  const [result, setResult] = useState("Write number above and click submit")

  const handleSubmit = event => {
    event.preventDefault()
    const url = `${REMOTE_URL}/${value}`
    setResult(`Fetching result from url ${url}`)
    axios
      .get(url)
      .then(response => {
        setResult(`A surprising result: ${response.data.id}`)
      })
      .catch(error => {
        setResult(`Unable to fetch: ${error.message}`)
      })
    setValue("")
  }

  const onChange = event => setValue(event.target.value)

  const disabled = !value || isNaN(value)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input value={value} onChange={onChange} />
        <button disabled={disabled} type="submit">
          Submit
        </button>
      </form>
      {result}
    </>
  )
}

const IndexPage = ({ data }) => {
  console.log(data)
  const formattedData = data.allNumbers.nodes
    .map(node => node.number)
    .join(", ")
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hello, world!</h1>
      <p>
        This is a serverless JAMstack demo project connecting to backend
        provided by demo-backend.
      </p>
      <p>
        Next we see something rendered at
        <b> build time </b>
        using API. Here it's coming: [{formattedData}]. This data is fetched
        every time new version of frontend code is deployed.
      </p>
      <p>
        Statically rendered pages doesn't mean that content needs to be static.
        Normal query from third party APIs is working as expected. The only
        difference is that now the data is not coming from lightning fast CDN,
        but rather is requested on demand causing a small latency. For example,
        consider the following component.
      </p>
      <RequestFromBackend />
      <hr />
    </Layout>
  )
}

export const query = graphql`
  query {
    allNumbers {
      nodes {
        number
      }
    }
  }
`

export default IndexPage
