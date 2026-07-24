/**
 * Uploads all about-section images to Sanity and prints the asset references.
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node scripts/upload-about-images.mjs
 *
 * Get a token at: https://manage.sanity.io → your project → API → Tokens
 * Create a token with "Editor" permissions.
 *
 * After running, paste the printed `const A = { … }` block into About.jsx.
 */

import { createClient } from '../frontend/node_modules/@sanity/client/dist/index.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const PROJECT_ID = 'u08j7a8z'
const DATASET    = 'production'
const TOKEN      = process.env.SANITY_TOKEN

if (!TOKEN) {
  console.error('❌  Set SANITY_TOKEN env var before running.')
  console.error('   Get one at: https://manage.sanity.io → API → Tokens (Editor role)')
  process.exit(1)
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset:   DATASET,
  apiVersion: '2025-04-01',
  token:     TOKEN,
  useCdn:    false,
})

// Map of JS key → filename in frontend/public/about/
const IMAGES = {
  adult:              'dcd222f392546fb2864b506b2c7a6e4beea9605f.png',
  baby:               '5f6ac0ba9c1a20f615851418fddeeae91ad2eb1e.png',
  uwLogo:             'mhcid-logo.png',
  ucrLogo:            'ucr-logo.png',
  tazMatcha:          '59063ee506182d99e8822130984bb261f937984d.png',
  eyesPeeled:         '82eedc1b72bb74d540335d95396db61a38ecfc44.png',
  condron:            'ba203d6521e78a378ed271f141d2f4314f612985.png',
  lighthouseRoasters: '0478886e1310b946795651cc62155c5db2f50e1a.png',
  moment:             'b39f224a164156b490351e78d63b34d8e13d7c02.png',
  subject5:           '358adb5da1ecede036fd6481f2b3032a2f4be65f.png',
  mexicoCity:         'f5df3811854318a85ccbfc6f62ffa7aa47b18f60.png',
  uji:                '7c4789d7135f7fc66dd191981dc0f7974bb33ab9.png',
  oaxaca:             '122682a4dd5e3fb6cf55be0706bb1c33fc791820.png',
  la:                 'ed7daf4755fa01e896412eedf5f0a8202e664ab8.png',
  forest:             '6a4c8870bc93c1c1182914d55263f0969eea7a83.png',
}

const PUBLIC_DIR = path.join(__dirname, '../frontend/public/about')

async function upload(key, filename) {
  const filePath = path.join(PUBLIC_DIR, filename)
  const ext = path.extname(filename).slice(1)
  const mimeType = ext === 'png' ? 'image/png' : ext === 'jpg' ? 'image/jpeg' : `image/${ext}`

  const stream = fs.createReadStream(filePath)
  const asset  = await client.assets.upload('image', stream, {
    filename,
    contentType: mimeType,
  })
  return asset._id  // e.g. "image-abc123-400x600-png"
}

async function run() {
  console.log('⬆️  Uploading about images to Sanity…\n')
  const refs = {}

  for (const [key, filename] of Object.entries(IMAGES)) {
    process.stdout.write(`  ${key.padEnd(20)} `)
    try {
      const assetId = await upload(key, filename)
      refs[key] = assetId
      console.log(`✓  ${assetId}`)
    } catch (err) {
      console.log(`✗  ${err.message}`)
    }
  }

  console.log('\n✅  Done! Replace the `const A` block in About.jsx with:\n')
  console.log('const A = {')
  for (const [key, id] of Object.entries(refs)) {
    console.log(`  ${key.padEnd(20)}: { _type: 'reference', _ref: '${id}' },`)
  }
  console.log('}')
}

run()
