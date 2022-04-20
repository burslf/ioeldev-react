import { useEffect, useRef, useState } from "react";
import { useMoralisFile, useMoralisWeb3Api } from "react-moralis";
import { address } from "../../services/auth";
import { singleContract } from "../../services/contracts";
import { artist, artwork, prod, song, album, composer, uploadSongService, bpm, key } from "../../services/uploadSong";
import { fileToBase64 } from "../../utils/utils";
import './uploadSong.scss';

const UploadSong = (props) => {
    const { saveFile } = useMoralisFile();
    const Web3Api = useMoralisWeb3Api();
    const fileRef = useRef();
    const artworkRef = useRef();
    useRef({ fileRef, artworkRef })

    const [curAddress, setCurAddress] = useState(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [songField, setSong] = useState("");
    const [artworkField, setArtwork] = useState(null);
    const [bpmField, setBpm] = useState("");
    const [keyField, setKey] = useState("");
    const [artPreview, setArtPreview] = useState(null);

    const [isLoading, setIsLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState({
        state: false,
        url: ""
    });

    useEffect(() => {
        address.subscribe(r => { setCurAddress(r) });
        bpm.subscribe(r => setBpm(r));
        song.subscribe(r => setSong(r));
        artwork.subscribe(r => {
            setArtwork(r)
        });
        key.subscribe(r => setKey(r));

        return () => {
            bpm.unsubscribe.bind(bpm)
            song.unsubscribe.bind(song)
            artwork.unsubscribe.bind(artwork)
            key.unsubscribe.bind(key)
        }
    }, []);


    const runSafeMint = async (uri) => {
        try {
            const SingleContract = singleContract.getValue()
            await SingleContract["safeMint"](curAddress, uri)
        } catch (e) {
            console.log(e)
        }

    }

    const handleFileSelection = async () => {
        try {
            setUploadSuccess({ state: false, url: "" })
            setIsLoading(true)
            const file = await saveFile(
                `file.${selectedFile.name.split('.').pop()}`,
                selectedFile.file,
                { saveIPFS: true, }
            )
            console.log("song hash: ", file.hash())
            let artFile = null
            if (artworkField) {
                artFile = await saveFile(
                    `file.${artworkField.name.split('.').pop()}`,
                    artworkField,
                    { saveIPFS: true, }
                )
            }

            const metaJSON = {
                artist: curAddress,
                song: songField,
                bpm: bpmField,
                key: keyField,
                source: `ipfs://${file.hash()}`,
            }

            if (artFile) {
                console.log("artwork hash: ", artFile.hash())

                metaJSON.artwork = `ipfs://${artFile.hash()}`
            }

            const metadata = await saveFile(
                "metadata.json",
                {
                    base64: btoa(JSON.stringify(metaJSON))
                },
                {
                    type: "base64",
                    saveIPFS: true,
                }
            )
            await runSafeMint(`ipfs://${metadata.hash()}`)

            setIsLoading(false);
            setSelectedFile(null);
            setUploadSuccess({ state: true, url: `https://ipfs.io/ipfs/${metadata.hash()}` });
            uploadSongService.setArtwork(null);
            uploadSongService.setKey("");
            uploadSongService.setBpm("");
            uploadSongService.setSong("");
        } catch (e) {
            setIsLoading(false);
            setSelectedFile(null);
            setArtPreview(null)
            setUploadSuccess({ state: false, url: "" });
            console.log(e)
        }
    }
    

    const uploadFolder = async (f) => {
        let options = {
            abi: []
        }
        for (let i = 0; i < f.length; i++) {
            const b64 = await fileToBase64(f[i])
            options.abi.push({
                path: f[i].webkitRelativePath,
                content: b64
            })
        }
        console.log(options)
        let res = await Web3Api.storage.uploadFolder(options)
        return res
    }

    const selectFile = async (e) => {
        const data = e.target.files[0]
        console.log(data)
        setSelectedFile({
            file: data,
            name: data.name
        })
    }

    const selectArtwork = (e) => {
        console.log(e.target.files[0])
        uploadSongService.setArtwork(e.target.files[0])
        let artUrl = URL.createObjectURL(e.target.files[0])
        setArtPreview(artUrl)
    }

    const openFile = (e) => {
        console.log(e.target.innerText)
        window.open(e.target.innerText, '_blank')
    }


    const handleSongField = (e) => {
        uploadSongService.setSong(e.target.value);
    }

    const handleBpmField = (e) => {
        uploadSongService.setBpm(e.target.value);
    }
    const handleKeyField = (e) => {
        uploadSongService.setKey(e.target.value);
    }


    return (
        <div className="price-ctnr">
            <div className="card">
                <div className="price-header">
                    <h3 className="text-xl font-bold text-center">Upload a beat</h3>
                </div>
                <div className="content">
                    <input ref={fileRef} className="file-hidden" type="file" name="song" id="" onChange={(e) => selectFile(e)} />
{/* webkitdirectory="true" mozdirectory="true" directory="true"  */}
                    {(selectedFile) &&

                        <div className="input py-4 rounded-2xl w-3/4 tracking-widest text-center  font-semibold">
                            <span className="text-lg">{selectedFile.name}</span>
                        </div>
                    }

                    {(!selectedFile) &&
                        <div className="input py-3 rounded-2xl w-3/4 tracking-widest text-center  font-semibold">
                            <span className="text-md">No file selected</span>
                        </div>
                    }


                    <form action="" className="w-3/4 flex flex-col">
                        {/* <input onChange={(e) => handleArtistField(e)} value={artistField} type="text" className="input my-3 p-2 text-sm w-100 rounded-2xl font-semibold" name="artist" id="" placeholder="Artist" /> */}
                        <input onChange={(e) => handleSongField(e)} value={songField} type="text" className="input my-3 p-2 text-sm w-100 rounded-2xl font-semibold" name="song" id="" placeholder="Song name" />
                        {/* <input onChange={(e) => handleAlbumField(e)} value={albumField} type="text" className="input my-3 p-2 text-sm w-100 rounded-2xl font-semibold" name="album" id="" placeholder="Album" /> */}
                        <div className="w-100 flex justify-between">
                            <input onChange={(e) => handleBpmField(e)} value={bpmField} type="text" className="input my-3 mr-3 p-2 text-sm w-1/2 rounded-2xl font-semibold" name="prod" id="" placeholder="BPM" />
                            <input onChange={(e) => handleKeyField(e)} value={keyField} type="text" className="input my-3 ml-3 p-2 text-sm w-1/2 rounded-2xl font-semibold" name="composer" id="" placeholder="Key" />
                        </div>
                        {!artworkField && <div onClick={() => artworkRef.current.click()} className="input py-3 rounded-2xl text-center w-100 cursor-pointer font-semibold">
                            <span className="text-md">Add Artwork</span>
                        </div>}
                        {artworkField && <div onClick={() => artworkRef.current.click()} className="input py-3 rounded-2xl text-center w-100 cursor-pointer font-semibold flex items-center justify-center">
                            <img className="art-img" src={artPreview} alt="" srcSet="" />
                        </div>}
                        <h3 className="mt-4 text-sm">Make sure your artwork has a ratio of 1:1, we won't crop it for you and it can result as a non pretty cover</h3>
                        <input ref={artworkRef} className="file-hidden" type="file" name="song" id="" onChange={(e) => selectArtwork(e)} />
                    </form>



                </div>
                <div className="bottom">
                    {
                        (selectedFile && !isLoading) &&
                        <button className="gradient py-2 rounded-2xl bg-slate-400" onClick={async () => await handleFileSelection()}>Upload</button>
                    }

                    {
                        (!selectedFile && !isLoading) &&
                        <button className="gradient py-2 rounded-2xl bg-slate-400" onClick={() => fileRef.current.click()}>Select File</button>
                    }
                    {isLoading && <div className="flex justify-center items-center">
                        <div className="loading spinner-border animate-pulse inline-block w-8 h-8 rounded-full" role="status">
                            <span className="invisible">Loading...</span>
                        </div>
                    </div>}
                </div>
            </div>
            {
                (uploadSuccess.state) &&
                <div className="price-card mt-5 mb-10">
                    <div className="price-header">
                        <h3 className="text-xl font-bold text-center">There you go !</h3>
                    </div>
                    <div className="content">
                        <div className="input mt-3 px-1 py-4 rounded-2xl w-3/4 tracking-widest text-center  font-semibold">
                            <span onClick={(e) => openFile(e)} style={{ 'cursor': 'pointer' }} className="text-sm">{uploadSuccess.url}</span>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}

export default UploadSong;