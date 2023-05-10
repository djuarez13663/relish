import { Container, ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import React from "react";
import Filters from "../../components/Filters/Filters";
import { useSelector } from "react-redux";

const Metaphoto = () => {
    const { photoList } = useSelector(store => store.photoInfo)

    return (
        <Container maxWidth="lg" style={{backgroundColor: 'lightgray'}}>
            <Filters />
            {
                photoList && 
                <ImageList sx={{ width: '100%'}} cols={5}>
                    
                    {
                        photoList.map((photo) => 
                            <ImageListItem key={photo.id}>
                                <img
                                    src={`${photo.url}?w=248&fit=crop&auto=format`}
                                    srcSet={`${photo.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={photo.title}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    title={photo.album.title}
                                    subtitle={photo.album.user.name}
                                    actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${photo.title}`}
                                    >
                                        
                                    </IconButton>
                                    }
                                />
                                <ImageListItemBar position="top" title={photo.title} />
                            </ImageListItem>
                        )
                    }
                </ImageList>
            }
        </Container>
    )
}

export default Metaphoto;