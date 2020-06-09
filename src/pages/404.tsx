import * as React from "react"
import Heading from "../components/Heading"
import { Layout } from "../components/Layout"

const NotFoundPage = () => (
  <Layout>
    <Heading level="h1">NOT FOUND</Heading>
    <p>You just hit a route that doesn’t exist…the sadness.</p>
  </Layout>
)

export default NotFoundPage
