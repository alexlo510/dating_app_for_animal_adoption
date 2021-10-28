import React, { useEffect, useState } from 'react';
import Axios from "axios"
import { Button, CircularProgress, Container, Grid } from '@mui/material/';
import NewsCard from '../components/NewsCard';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function LatestNews() {
    const [data, setData] = useState([])
    
    useEffect(() => {
        try {
            async function fetchNews() {
                const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/news")
                // sort list by date
                res.data.sort((a, b) => (a.date_created < b.date_created) ? 1 : (a.date_created === b.date_created) ? (a.id > b.id ? 1 : -1) : -1 )
                console.log(res.data); // remove after testing
                setData(res.data)
                //setAnimal(res.data[res.data.length - 1]) // set to the latest animal
                //setIndex(res.data.length - 1) // set the index of the animal 
            }
            fetchNews();
        } catch (err) {
            console.log(err);
        }
    }, []);

    // async function handleClick(fetchID) {
    //     setDisableButtons(prevState => !prevState) // disable buttons        
    //     try {
    //         async function fetchNewAnimal(fetchID) {
    //             const res = await Axios.get("https://pet-shelter-api.uw.r.appspot.com/pets")
    //             // sort list by date
    //             res.data.sort((a, b) => (a.date_created > b.date_created) ? 1 : (a.date_created === b.date_created) ? (a.id > b.id ? 1 : -1) : -1 )
                
    //             setData(res.data)

    //             if (fetchID >= data.length) {
    //                 fetchID = 0
    //             }
    //             if (fetchID === -1) {
    //                 fetchID = data.length - 1
    //             }
                
    //             setAnimal(data[fetchID])
    //             setIndex(fetchID)
    //             setAdoptSuccess(false)
    //             setAdoptFail(false)
    //         }
    //         await fetchNewAnimal(fetchID);
    //         setDisableButtons(prevState => !prevState) // enable button
    //     } catch (err) {
    //         console.log(err);
    //         setDisableButtons(prevState => !prevState) // enable button
    //     }
    // }

    return (
        <>
            <Container>
                <Grid container justifyContent="center" sx={{marginTop: 2}} xs={12} s={9} md={12} lg={12}>
                        {!data && <div style={{display: 'flex', justifyContent: 'center'}}><CircularProgress/></div>}
                        {data && data.map((news) => 
                            <Grid item sx={{margin: 2}}>
                                <NewsCard {...news}/>
                            </Grid>)
                        }
                </Grid>
                {/* <Grid container justifyContent="center" sx={{marginTop: 1}}>
                    <Grid item xs={2} md={2} lg={2}>
                        {animal && <Button sx={buttonStyle} disabled={disableButtons} onClick={() => handleClick(index - 1)}>
                            <ChevronLeftIcon sx={{color: "white"}}/>
                        </Button>}
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                    </Grid>
                    <Grid item xs={2} md={1} lg={1}>
                        {animal && <Button sx={buttonStyle} disabled={disableButtons} onClick={() => handleClick(index + 1)}>
                            <ChevronRightIcon sx={{color: "white"}}/>
                        </Button>}
                    </Grid>
                </Grid> */}
            </Container>
        </>
    );
}