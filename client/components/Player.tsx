import React, {useEffect} from 'react';
import { Pause, PlayArrow, VolumeUp } from "@material-ui/icons";
import { Grid, IconButton } from "@material-ui/core";
import styles from '../styles/Player.module.scss';
import { ITrack } from "../types/track";
import Image from "next/image";
import TrackProgress from "./TrackProgress";
import {useTypeSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";

let audio;

const Player: React.FC = () => {
    const { pause, volume, active, duration, currentTime } = useTypeSelector(state => state.player);
    const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions();

    useEffect(() => {
        if(!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active]);

    const setAudio = () => {
        if(active) {
            audio.src = 'http://localhost:5000/' + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if(pause) {
            playTrack();
            audio.play();
        } else {
            pauseTrack();
            audio.pause();
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    if(!active) {
        return null;
    }

    return (
        <div className={styles.player}>
            <IconButton  onClick={play}>
                {pause
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <div className={styles.picture}>
                <Image width={40} height={40} src={'http://localhost:5000/' + active?.picture}/>
            </div>
            <Grid container direction="column" className={styles.info}>
                <div className={styles.name}>{active?.name}</div>
                <div className={styles.artists}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} time={true} />
            <VolumeUp style={{ marginLeft: 'auto' }} />
            <TrackProgress left={volume} right={100} onChange={changeVolume} time={false} />
        </div>
    );
};

export default Player;