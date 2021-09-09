import React from "react"

import Layout from "../components/layout"
import Home from "../contents"

const IndexPage = (props) => {

  return (
    <Layout location={props.location} locale="ru">
      <Home />
    </Layout>
  )
}



export default IndexPage
