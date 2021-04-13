const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/http-client').default
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')
const { Ed25519Provider } = require('key-did-provider-ed25519')
const fromString = require('uint8arrays/from-string')
const DOMSchema = require('../public/dom-node.schema.json')

const out = 'src/docID.json'
const CERAMIC_URL = (
  process.env.CERAMIC_URL || 'https://ceramic-clay.3boxlabs.com'
)

async function run() {
  if(!process.env.SEED) {
    throw new Error('Environment Variable SEED Required')
  }
  // The seed must be provided as an environment variable
  const seed = fromString(process.env.SEED, 'base16')
  // Connect to the local Ceramic node
  const ceramic = new Ceramic(CERAMIC_URL)
  // Authenticate the Ceramic instance with the provider
  await ceramic.setDIDProvider(new Ed25519Provider(seed))

  // Publish the two schemas
  const domSchema = await publishSchema(ceramic, { content: DOMSchema })

  // Create the definition using the created schema ID
  const domDefinition = await createDefinition(ceramic, {
    name: 'DOMNode',
    description: 'Nodes in the DOM tree', // optional
    schema: domSchema.commitId.toUrl(),
  })

  // Write config to JSON file
  const config = {
    definitions: {
      dom: domDefinition.id.toUrl(),
    },
    schemas: {
      dom: domSchema.commitId.toUrl(),
    },
  }
  await writeFile(`./${out}`, JSON.stringify(config))

  console.log(`Config written to ${out} file:`, config)
  process.exit(0)
}

run().catch(console.error)