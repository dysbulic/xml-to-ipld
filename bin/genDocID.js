#!/usr/bin/env node

const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/http-client').default
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')
const { Ed25519Provider } = require('key-did-provider-ed25519')
const fromString = require('uint8arrays/from-string')
const { DID } = require('dids')
const { default: KeyDidResolver } = require('key-did-resolver')
const DOMSchema = require('../public/dom-node.schema.json')

const out = 'src/docID.json'
const CERAMIC_URL = (
  process.env.CERAMIC_URL || 'https://d12-a-ceramic.3boxlabs.com'
)

async function run() {
  if(!process.env.SEED) {
    throw new Error('Environment Variable SEED Required')
  }
  const seed = fromString(process.env.SEED, 'base16')
  const ceramic = new Ceramic(CERAMIC_URL)
  const keyProvider = new Ed25519Provider(seed)
  ceramic.setDID(new DID({
    provider: keyProvider,
    resolver: { ...KeyDidResolver.getResolver() },
  }))
  await ceramic.did.authenticate()

  const domSchema = await publishSchema(ceramic, {
    content: DOMSchema
  })

  const domDefinition = await createDefinition(ceramic, {
    name: 'DOMNode',
    description: 'Nodes in the DOM tree', // optional
    schema: domSchema.commitId.toUrl(),
  })

  const config = {
    definitions: {
      dom: domDefinition.id.toUrl(),
    },
    schemas: {
      dom: domSchema.commitId.toUrl(),
    },
  }
  await writeFile(`./${out}`, JSON.stringify(config, null, '  '))

  console.log(`Config written to ${out} file:`, config)
  process.exit(0)
}

run().catch(console.error)