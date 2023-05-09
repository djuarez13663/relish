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

module.exports = { getInfobyId }