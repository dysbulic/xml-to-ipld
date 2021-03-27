# XML-to-IPLD

A simple React app to take a DOM tree and serialize it to IPFS's IPLD data structure.

The eventual plan is to have each level in the tree be a separate document with CID pointers to its children.

It seems that in this situation updates will only replace those levels that changed for efficient storage.