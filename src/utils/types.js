// Checks if all the elements in a list have the
// same node type
export const allOfType = (
  (list, type, typeOf = (n) => n.nodeType) => (
    Array.from(list)
    .all(n => typeOf(n) === type)
  )
)

export const arraysEqual = (a, b) => {
  if(a === b) return true
  if(a == null || b == null) return false
  if(a.length !== b.length) return false

  for(let i = 0; i < a.length; ++i) {
    if(a[i] !== b[i]) return false
  }
  return true
}
