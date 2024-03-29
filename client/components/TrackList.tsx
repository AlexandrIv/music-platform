import React from "react";
import { ITrack } from "../types/track";
import { Grid, Box } from "@material-ui/core";
import TrackItem from "./TrackItem";
import styles from "../styles/TrackLists.module.scss"

interface TrackListProps {
    tracks: ITrack[]
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    return (
        <Grid container direction="column">
            <Box p={2} className={styles.track_list}>
                {tracks.map(track => <TrackItem key={track._id} track={track} />)}
            </Box>
        </Grid>
    );
};

export default TrackList;