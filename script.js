const fs = require('fs')

function parseJsonFile(fileName) {
    let raw = fs.readFileSync(fileName + '.json')
    let parsedFromRaw = JSON.parse(raw)
    //console.log(parsedFromRaw)

    let parsedData = 'some'

    if (fileName === "YourLibrary")
        parseLibrary(parsedFromRaw)
    else if (fileName === "Playlist1")
        parseAlbums(parsedFromRaw)

    //writeToFile(parsedData, fileName + '.txt', "result")
}

function parseAlbums(data) {
    
    let playlistsData = data.playlists
    //console.log(playlistsData)

    playlists = []
    playlistsData.forEach(
        el => {
            let text = ''
            //text += 'Playlist: \n' + el.name + '\n\n'

            el.items.forEach(
                trackObj => {
                    text += trackObj.track.artistName + ' - ' + trackObj.track.trackName + ',\n'
                }
            )
            //console.log(text)
            //playlists.push(text)

            writeToFile(text, el.name + '.txt', 'result-playlists')
        }
    )

    //console.log(playlists.length)

}

function parseLibrary(data) {
    console.log(Object.keys(data))
    let keys = Object.keys(data)


    let tracksString = ''
    data.tracks.forEach(
        el => {
            tracksString += el.artist + ' - ' + el.track + ',\n'
        }
    )
    writeToFile(tracksString, 'YourLibrary - tracks.txt', 'result')

    let albumsString = ''
    data.albums.forEach(
        el => {
            albumsString += el.artist + ' - ' + el.track + ',\n'
        }
    )
    writeToFile(albumsString, 'YourLibrary - albums.txt', 'result')

    let artistsString = ''
    data.artists.forEach(
        el => {
            artistsString += el.name + ',\n'
        }
    )
    writeToFile(artistsString, 'YourLibrary - artists.txt', 'result')

}

function writeToFile(data, fileName, subDir = "") {
    if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
    }

    let path =
        subDir != ""
        ? `${__dirname}/${subDir}/${fileName}`
        : `${__dirname}/${fileName}`;
    
    fs.writeFile(path, data, (err) => {
        if (err) {
            console.log(`[✖] error with save: ${err}`);
        } else {
            console.log(`[✔] File saved as: ${path}`);
        }
    });
}


//parseJsonFile('Userdata')
parseJsonFile('YourLibrary')
parseJsonFile('Playlist1')
