import React, { useEffect, useRef } from 'react';
import { Stage, Layer, Image } from 'react-konva';

const VideoCanvas = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const renderFrame = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(renderFrame);
        };

        video.addEventListener('play', renderFrame);

        return () => {
            video.removeEventListener('play', renderFrame);
        };
    }, []);

    return (
        <Stage width={500} height={400}>
            <Layer>
                <Image
                    image={canvasRef.current}
                    width={500}
                    height={400}
                    ref={canvasRef}
                />
            </Layer>
            <video
                ref={videoRef}
                src="path_to_your_video.mp4"
                style={{ display: 'none' }}
            />
        </Stage>
    );
};

export default VideoCanvas;
