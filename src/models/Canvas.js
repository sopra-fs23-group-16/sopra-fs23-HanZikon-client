import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
    const canvasRef = useRef(null);
    const [lines, setLines] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        const context = canvas.getContext("2d");
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        setLines(prevState => [...prevState, { x: offsetX, y: offsetY }]);
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        const { offsetX, offsetY } = nativeEvent;
        setLines(prevState => [...prevState, { x: offsetX, y: offsetY }]);
    };

    const undo = () => {
        setLines(prevState => prevState.slice(0, -1));
    };

    const clearCanvas = () => {
        setLines([]);
    };

    return (
        <div>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                ref={canvasRef}
            />
            <div>
                <button onClick={undo}>Undo</button>
                <button onClick={clearCanvas}>Clear</button>
            </div>
            <pre>{JSON.stringify(lines, null, 2)}</pre>
        </div>
    );
};

export default Canvas;