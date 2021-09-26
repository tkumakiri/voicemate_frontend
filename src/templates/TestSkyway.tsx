import React, { useState, useRef, useEffect } from "react";
import Peer, { MediaConnection } from "skyway-js";
const peer = new Peer({
    key: "460cd8cc-668c-4afb-a1a1-1e84af04e87a",   //チュートリアルの1,準備で取得したkey
    debug: 3,
});
let localStream: MediaStream;

export default function TestSkyway() {
    const ref = useRef<HTMLVideoElement>(null);
    const theirRef = useRef<HTMLVideoElement>(null);
    const [peerId, setPeerId] = useState<string>("");
    const [theirId, setTheirId] = useState<string>("");

    useEffect(() => {
        const getMedia = () => {
            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then((stream) => {
                    const videoElm = ref.current;
                    if (videoElm) {
                        videoElm.srcObject = stream;
                        videoElm.play();
                    }
                    localStream = stream;
                })
                .catch((error) => {
                    console.error("mediaDevice.getUserMedia() error:", error);
                    return;
                });
        };
        getMedia();

        peer.on("open", () => {
            setPeerId(peer.id);
        });
    }, []);

    const handleCall = () => {
        const mediaConnection = peer.call(theirId, localStream);
        setEventListener(mediaConnection);
    };

    const setEventListener = (mediaConnection: MediaConnection) => {
        mediaConnection.on("stream", (stream: MediaStream) => {
            const videoElm = theirRef.current;
            if (videoElm) {
                videoElm.srcObject = stream;
                videoElm.play();
            }
        });
    };

    peer.on("call", (mediaConnection) => {
        mediaConnection.answer(localStream);
        setEventListener(mediaConnection);
    });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTheirId(e.target.value);
    };

    return (
        <div className="App">
            <div>React TypeScript SkyWay</div>
            <video ref={ref} width="400px" autoPlay muted playsInline></video>
            <p>{peerId}</p>
            <textarea value={theirId} onChange={handleChange}></textarea>
            <button onClick={handleCall}>発信</button>
            <video ref={theirRef} width="400px" autoPlay playsInline></video>
        </div>
    );
}