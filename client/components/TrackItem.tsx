import React from "react";
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@material-ui/core";
import styles from "../styles/TrackItem.module.scss";
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import Image from "next/image";
import {useRouter} from "next/router";
import {useActions} from "../hooks/useActions";

interface TrackItemProps {
    track: ITrack;
    active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
    const router = useRouter();
    const { playTrack, pauseTrack, setActiveTrack } = useActions();

    const play = (e) => {
        e.stopPropagation()
        setActiveTrack(track)
        playTrack()
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton  onClick={play}>
                {!active
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <div className={styles.picture}>
                <Image width={70} height={70} src={'http://localhost:5000/' + track.picture}/>
            </div>
            <Grid container direction="column" className={styles.info}>
                <div className={styles.name}>{track.name}</div>
                <div className={styles.artists}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton className={styles.delete_btn} onClick={e => e.stopPropagation()}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;