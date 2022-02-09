const times = require('lodash/times')
const fs = require('fs').promises

const AMOUNT_OF_ASSETS = 9
const START_WITH_ZERO = false
const MIME_TYPE = "image/png"

async function main() {
    const assets = times(AMOUNT_OF_ASSETS).map(i => {
        const number = START_WITH_ZERO ? i : i + 1

        const id = `PIADA${number}`
        const [extension] = MIME_TYPE.split("/").reverse()

        return {
            id,
            name: `PIADA #${number}`,
            // description: "",
            image: `images/${id}_thumbnail.${extension}`,
            src: `images/${id}.${extension}`,
            type: MIME_TYPE,
            autors: ["David", "Kian"],
            website: "http://metatronic.io"
        }

    })

    await fs.writeFile(__dirname + '/assets.json', JSON.stringify(assets, null, 2))
}

main()