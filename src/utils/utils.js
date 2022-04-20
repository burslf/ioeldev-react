const concatenatedAdd = (add) => {
    let start = add.slice(0, 4);
    let end = add.slice(add.length - 4, add.length);
    return `${start}...${end}`
}

const getGatewayUrl = (ipfs) => {
    let hash = ipfs.split("ipfs://").pop()
    return `https://gateway.moralisipfs.com/ipfs/${hash}`
}

const fileToBase64 = async (f) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(f)
        reader.onload = () => {
            // console.log("Called", reader)
            resolve(reader.result.split(',')[1])
        }
    })
}

export {
    concatenatedAdd,
    getGatewayUrl,
    fileToBase64
}