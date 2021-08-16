import React from "react";

interface TrackProgressProps {
    left: number;
    right: number;
    time: boolean
    onChange: (e) => void;
}

function convertTime(sec: any) {
    let min: any = Math.floor(sec / 60);

    (min >= 1) ? sec = sec - (min * 60) : min = '00';
    (sec < 1) ? sec = '00' : void 0;

    (min.toString().length == 1) ? min = '0' + min : void 0;
    (sec.toString().length == 1) ? sec = '0' + sec : void 0;

    return min + ':' + sec;
}

const TrackProgress: React.FC<TrackProgressProps> = ({ left,right, onChange, time  }) => {
    return (
        <div style={{display: 'flex'}}>
            <input
                type="range"
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{time ? convertTime(left) : left} / {time ? convertTime(right) : right}</div>
        </div>
    );
};

export default TrackProgress;