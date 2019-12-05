const axios = require("axios")

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions
  const { url } = configOptions

  // Create nodes here from a remote API.
  const response = await axios.get(`${url}/testing`)
  // It's [1, 2, 3]

  // Process data into nodes.
  response.data.forEach(number =>
    createNode({
      // Data for the node.
      number,

      // Required fields.
      id: createNodeId(number),
      parent: null,
      children: [],
      internal: {
        type: "Numbers",
        contentDigest: createContentDigest(number),
      },
    })
  )

  // We're done, return.
  console.log("read from backend done.")
  return
}
