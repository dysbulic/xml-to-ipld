# XML-to-IPLD

A simple React app to take a DOM tree and serialize it to IPFS's IPLD data structure or the Ceramic Network's "tile" documents.

Each level in the tree be a separate document with references to its children.

In this situation, updates will only replace those levels that changed, making for for efficient storage and cache invalidation.

## Generating Ceramic Document IDs

A copy of the document definition IDs is checked into the repo, but should you need to generate a new set, the method is:

* `RANDBYTES=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")`
* `SEED=$RANDBYTES yarn bootstrap`