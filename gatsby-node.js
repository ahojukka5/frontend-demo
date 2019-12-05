exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  console.log("onCreateNode, node.internal.type", node.internal.type)
}
