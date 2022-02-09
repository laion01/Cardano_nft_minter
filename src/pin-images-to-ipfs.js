const fs = require('fs').promises
const pinToIpfs = require('./pin-to-ipfs')
const Throttle = require('promise-parallel-throttle')

const assets = require("./assets.json")

async function main() {
    const updated_assetes = await Throttle.sync(
        assets.map(asset => async() => {

            const {ipfsLink: image, httpLink: imageLink} = await pinToIpfs(`${asset.id}_image`,__dirname + '/' + asset.image)
            console.log(`[${asset.name}] pinned image to ipfs (${imageLink})`)

            const {ipfsLink: src, httpLink: srcLink} = await pinToIpfs(`$(asset.id)_src`, __dirname + '/' + asset.src)

            return {
                ...asset,
                image,
                src
            }
        })
    )

    await fs.writeFile(__dirname + '/assets.json', JSON.stringify(updated_assetes, null, 2))
}

main()