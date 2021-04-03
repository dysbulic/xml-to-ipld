// Creates a sharded object where each level
// is a separate document.
export const toTree = (
  async ({
    obj, leafFor = async (n) => n,
  }) => {
    const out = {}
    await Promise.all(
      Object.entries(obj).map(
        async ([key, val]) => {
          if(Array.isArray(val)) {
            out[key] = await Promise.all(
              val.map(v => toTree({ obj: v, leafFor }))
            )
          } else if(typeof val === 'object') {
            out[key] = await toTree({ obj: val, leafFor })
          } else {
            out[key] = val
          }
        }
      )
    )
    return await leafFor(out)
  }
)

// Depth-first search
export const dfs = ({
  node, depth = 1, count = { current: 1 },
  pre = (..._) => {},
  step = (..._) => {},
  post = (..._) => {},
  childrenOf = (node) => Array.from(node.childNodes),
}) => {
  // SQL nested set model, "right" is count on exit
  const left = count.current
  pre(node, depth, left)
  const children = []
  childrenOf(node).forEach(
    (child) => {
      count.current++
      const result = dfs({
        node: child, pre, post,
        depth: depth + 1, count,
      })
      if(result) {
        children.push(result)
        step({
          node, children,
          depth, left, right: count.current,
        })
      }
    }
  )
  post({
    node, children,
    depth, left, right: count.current,
  })
  return children
}
