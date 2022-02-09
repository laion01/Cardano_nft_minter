const random = require('lodash/random')
const axios = require('axios')
const fs = require('fs').promises

const assets = require('./assets.json')

async function main() {

    await Promise.all(
        assets.map(async asset => {
            const {data} = await axios.get(`https://source.unsplash.com/640x400?car&v=${random()}`, { responseType: 'arraybuffer'})
            console.log(`https://source.unsplash.com/640x400?car&v=${random()} downloaded ranom cat image`)

            await fs.writeFile(__dirname + '/' + asset.src, data)
            console.log(`[${asset.name}] saved to "${asset.src}"`)
        })
    )
}

main()