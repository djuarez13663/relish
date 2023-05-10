import { TextField, Grid, Button, FormControlLabel, Switch, TablePagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "../../API/axios";
import { useDispatch } from "react-redux";
import { updateList } from "../../redux/photosDucks";

const Filters = () => {
    const [photoId, setPhotoId] = useState(0)
    const [title, setTitle] = useState()
    const [albumtitle, setAlbumtitle] = useState()
    const [email, setEmail] = useState()

    const [filters, setFilters] = useState(false)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [total, setTotal] = useState(0)

    const dispatch = useDispatch()

    const handleSearch = () => {
        let url = ''
        if (!filters) {
            url = photoId
        } else {
            url += '?'
            if (title) {
                url += `title=${title}&`
            }
            if (albumtitle) {
                url += `album.title=${albumtitle}&`
            }
            if (email) {
                url += `album.user.email=${email}&`
            }
            url += `offset=${rowsPerPage * page}&limit=${rowsPerPage}`
        }

        (async () => {
            await axios.get(url)
                .then(function (response) {
                    setTotal(response.data.total)
                    dispatch(updateList(response.data.items, response.data.total))
                })
                .catch(function (err) {
                    console.log(err)
                })
        })()
    }

    useEffect(() => {
        function reload() {
            if (photoId || title || albumtitle || email) {
                handleSearch()
            }
        }
        reload()
    }, [page])// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        dispatch(updateList([], 0))
    }, [filters])// eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Grid container spacing={2} style={{ marginTop: 20 }} justifyContent='center'>
                <Grid item xs={12}>

                    <FormControlLabel control={<Switch checked={filters} onChange={() => setFilters(!filters)} />} label="Use filters" />
                </Grid>
                {
                    !filters &&
                    <Grid item xs={12}>
                        <TextField id="standard-basic" label="Photo ID" variant="standard" type="number" onChange={(val) => setPhotoId(val.target.value)} />
                    </Grid>
                }
                {
                    filters &&
                    <>
                        <Grid item xs={4}>
                            <TextField id="standard-basic" label="Photo title" variant="standard" onChange={(val) => setTitle(val.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="standard-basic" label="Album title" variant="standard" onChange={(val) => setAlbumtitle(val.target.value)} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField id="standard-basic" label="User email" variant="standard" onChange={(val) => setEmail(val.target.value)} />
                        </Grid>
                    </>
                }
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </Grid>
                <Grid item xs={5} justifyContent='center'>
                    {
                        total > 1 &&
                        <TablePagination
                            component='div'
                            page={page}
                            rowsPerPage={rowsPerPage}
                            count={total}
                            onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0) }}
                            onPageChange={(e, newPage) => setPage(newPage)}
                        />
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Filters;