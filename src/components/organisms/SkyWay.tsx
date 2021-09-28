import Peer, { SfuRoom } from "skyway-js";
import React, { useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";

type VideoStream = {
    stream: MediaStream;
    peerId: string;
};
type Props = {
    roomId: string
    uid: string
    start: boolean
}

type UidWithPeerId = Array<{
    uid: string
    peerId: string
}>

const useStyles = makeStyles({
    button: {
        width: 200,
        height: 100,
    },
});

const SkyWay = (props: Props) => {
    const classes = useStyles();
    const history = useHistory()
    const roomId: string = props.roomId
    const uid = props.uid
    const start = props.start
    const peer = useRef(new Peer({ key: 'd2d9d44a-dc3e-40c1-9db9-e5de23d63d81' as string }))
    const [remoteVideo, setRemoteVideo] = React.useState<VideoStream[]>([]);
    const [localStream, setLocalStream] = React.useState<MediaStream>();
    const [room, setRoom] = React.useState<SfuRoom>();
    const localVideoRef = React.useRef<HTMLVideoElement>(null);
    const [isStarted, setIsStarted] = React.useState(false);
    const uidWithPeerId: UidWithPeerId = []


    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: false, audio: true })
            .then((stream) => {
                setLocalStream(stream);
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = stream;
                    localVideoRef.current.play().catch((e) => console.log(e));
                }
            })
            .catch((e) => {
                console.log(e);
            });

        // // ブラウザバック禁止
        // window.addEventListener('popstate', (e) => {
        //     history.go(1)
        // });

    }, []);


    useEffect(() => {
        if (start) {
            onStart()
        }
    }, [start])



    const onStart = () => {
        if (peer.current) {
            if (!peer.current.open) {
                return;
            }
            const tmpRoom = peer.current.joinRoom<SfuRoom>(roomId, {
                mode: "sfu",
                stream: localStream,
            });
            tmpRoom.once("open", () => {
                console.log("=== You joined ===\n");
            });
            tmpRoom.on("peerJoin", (peerId) => {
                console.log(`=== ${peerId} joined ===\n`);
            });
            tmpRoom.on("stream", async (stream) => {
                setRemoteVideo((prev) => [
                    ...prev,
                    { stream: stream, peerId: stream.peerId },
                ]);
            });
            tmpRoom.on("peerLeave", (peerId) => { // 参加者が抜けたとき
                setRemoteVideo((prev) => {
                    return prev.filter((video) => {
                        if (video.peerId === peerId) {
                            video.stream.getTracks().forEach((track) => track.stop());
                        }
                        return video.peerId !== peerId;
                    });
                });
                console.log(`=== ${peerId} left ===\n`);
            });
            console.log(tmpRoom.eventNames())

            tmpRoom.on('close', () => { // 自分が抜けたとき
                history.push('/home')
            });
            setRoom(tmpRoom);
        }
        setIsStarted((prev) => !prev);
        console.log(peer.current.id)
    };

    const onEnd = () => {

        console.log(room?.members)
        if (room) {
            room.close();
            console.log('===  room end ===')
            setRemoteVideo((prev) => {
                return prev.filter((video) => {
                    video.stream.getTracks().forEach((track) => track.stop());
                    return false;
                });
            });
        }
        setIsStarted((prev) => !prev);
    };

    const castVideo = () => {
        return remoteVideo.map((video) => {
            return <RemoteVideo video={video} key={video.peerId} />;
        });
    };
    return (
        <div>
            <div className='flex items-center justify-center' >
                <Button className={classes.button} onClick={() => onEnd()} disabled={!isStarted}>
                    <p className='text-3xl' >退室する</p>
                </Button>
            </div>
            {castVideo()}
            {isStarted && (
                <div>
                    <video ref={localVideoRef} playsInline muted style={{ display: 'none' }}></video>
                    <p className='text-center' >自分の通信は繋がっています</p>
                </div>
            )}

        </div>
    );
};
export default SkyWay

const RemoteVideo = (props: { video: VideoStream }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = props.video.stream;
            videoRef.current.play().catch((e) => console.log(e));
        }

    }, [props.video]);
    return <div><video ref={videoRef} playsInline style={{ display: 'none' }}></video><p className='text-center'>相手は繋がっています</p></div>;
};