const axios = require('../axios')

const getPhoto = async (id) => {
    let photoItem
    await (async () => {
        await axios.get(`photos/${id ? id : ''}`)
            .then(function (response) {
                photoItem = response.data
            })
            .catch(function (err) {
                console.log(err)
            })
    })()
    return photoItem
}

const getUser = async (id) => {
    let userItem
    await (async () => {
        await axios.get(`users/${id ? id : ''}`)
            .then(function (response) {
                userItem = response.data
            })
            .catch(function (err) {
                console.log(err)
            })
    })()
    return userItem
}

const getAlbum = async (id) => {
    let albumItem
    await (async () => {
        await axios.get(`albums/${id ? id : ''}`)
            .then(function (response) {
                albumItem = response.data
            })
            .catch(function (err) {
                console.log(err)
            })
    })()
    return albumItem
}

const getInfobyId = async (req, res) => {
    const {
        params: { id }
    } = req

    if (!id) {
        res.status(400).send({ status: 'FAILED', data: { error: 'Parameter :id can not be empty' } })
    }

    try{
        const photoItem = await getPhoto(id)
        const albumItem = await getAlbum(photoItem.albumId)
        const userItem = await getUser(albumItem.userId)

        delete albumItem.userId
        delete photoItem.albumId

        albumItem.user = { ...userItem }
        photoItem.album = albumItem

        res.status(200).send({ items: [photoItem], total: 1 })
    } catch (e) {
        res.status(e?.status || 500).send({ status: "FAILED", data: { error: e?.message || e } })
    }

}

const getInfobyFilter = async (req, res) => {
    const title = req.query['title']
    const album_title = req.query['album.title']
    const user_email = req.query['album.user.email']
    
    let photos = await getPhoto()
    let albums = await getAlbum()
    let users = await getUser()

    if (user_email && user_email.trim().length > 0) {
        users = users.filter((user) =>
            user.email == user_email
        )
    }

    albums = albums.filter((album) => {
        return users.some(f => {
            return f.id === album.userId && (album_title && album_title.trim().length > 0 ? album.title.includes(album_title.toLowerCase()) : true)
        })
    })

    photos = photos.filter((photo) => {
        return albums.some(f => {
            return f.id === photo.albumId && (title && title.trim().length > 0 ? photo.title.includes(title.toLowerCase()) : true)
        })
    })

    let total = photos.length
    

    res.status(200).send({ items: await format(photos, albums, users), total: total })
}

const format = async (photos, albums, users) => {
    return await photos.map((photo) => {
        photo.album = albums.filter(e => e.id === photo.albumId).map((album) => {
            album.user = users.filter(u => u.id === album.userId)[0]

            return {
                ...album
            }
        })[0]
        delete photo.albumId
        delete photo.album.userId
        return {
            ...photo
        }
    })

}

module.exports = { getInfobyId, getInfobyFilter }