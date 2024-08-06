import '../css/game.css'
import { useEffect, useRef } from 'react';
import shipImage from '../img/ship.webp';
import alienImage from '../img/alien.webp'

export default function Game() {
    // canvas
    let frame = 32;
    let row = 16;
    let column = 16;
    let playgroundWidth = frame * column;
    let playgroundHeght = frame * row;
    const playground = useRef();
    // ship
    let shipWidth = frame * 2;
    let shipHeght = frame * 2;
    let initialShipX = frame * column / 2 - frame;
    let initialShipY = frame * row - frame * 2;
    const shipRef = useRef({ x: initialShipX, y: initialShipY, width: shipWidth, height: shipHeght });
    let shipSpeedX = frame;
    // aliens
    let alienArray = [];
    let alienWidth = frame * 2;
    let alienHeight = frame;
    let alienX = frame;
    let alienY = frame;
    let alienRows = 2;
    let alienColumns = 4;
    let aliensCount = 0; // aliens to defeat
    let alienIMG;
    let alienSpeedX = 1; // alien move speed
    // guns 
    let bulletArray = [];
    let bulletSpeedY = -10;
    // create alins
    function createAliens() {
        let occupiedPositions = [];
        for (let i = 0; i < alienColumns; i++) {
            for (let a = 0; a < alienRows; a++) {
                if (occupiedPositions.includes(`${alienX + i * alienWidth},${alienY + a * alienHeight}`)) {
                    continue;
                }
                let alien = {
                    img: alienIMG,
                    x: alienX + i * alienWidth,
                    y: alienY + a * alienHeight,
                    width: alienWidth,
                    height: alienHeight,
                    alive: true
                }
                alienArray.push(alien);
                occupiedPositions.push(`${alienX + i * alienWidth},${alienY + a * alienHeight}`);
            }
        }
        aliensCount = alienArray.length;
    }
    // move the ship
    document.addEventListener("keydown", moveShip);
    function moveShip(e) {
        if (e.code === "ArrowLeft" && shipRef.current.x >= frame) {
            shipRef.current.x -= shipSpeedX;
        } else if (e.code === "ArrowRight" && shipRef.current.x <= (playgroundWidth - (shipRef.current.width + frame))) {
            shipRef.current.x += shipSpeedX;
        }
    }
    // shoot bullets
    document.addEventListener("keyup", shoot)
    function shoot(e) {
        if (e.code == "Space") {
            let bullet = {
                x: shipRef.current.x + shipWidth * 15 / 32,
                y: shipRef.current.y,
                width: frame / 8,
                height: frame / 2,
                used: false
            }
            bulletArray.push(bullet);
        }
    }
    // bullets hits an alien
    function detectHits(a, b) {
        // condicion to collision of two rectangles
        return a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y;
    }

    useEffect(() => {
        let canvasContext = playground.current.getContext('2d');
        let shipIMG = new Image();
        shipIMG.src = shipImage;
        shipIMG.onload = function () {
            requestAnimationFrame(updateCanvas);
        };
        function updateCanvas() {
            requestAnimationFrame(updateCanvas);
            canvasContext.clearRect(0, 0, playgroundWidth, playgroundHeght); // clear canvas
            //ship
            canvasContext.drawImage(shipIMG, shipRef.current.x, shipRef.current.y, shipRef.current.width, shipRef.current.height);
            //aliens
            for (let i = 0; i < alienArray.length; i++) {
                let alien = alienArray[i];
                if (alien.alive) {
                    alien.x += alienSpeedX;
                    // aliens touch the borders
                    if (alien.x + alien.width >= playgroundWidth || alien.x <= 0) {
                        alienSpeedX *= -1;
                        alien.x += alienSpeedX * 2;
                        // move down aliens
                        for (let s = 0; s < alienArray.length; s++) {
                            alienArray[s].y += alienHeight;
                        }
                    }
                    canvasContext.drawImage(alienIMG, alien.x, alien.y, alien.width, alien.height)
                }
            }
            // bullets
            for (let h = 0; h < bulletArray.length; h++) {
                let bullet = bulletArray[h];
                bullet.y += bulletSpeedY;
                canvasContext.fillStyle = "white";
                canvasContext.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                // bullets hits an alien
                for (let s = 0; s < alienArray.length; s++) {
                    let alien = alienArray[s];
                    if (!bullet.used && alien.alive && detectHits(bullet, alien)) {
                        bullet.used = true;
                        alien.alive = false;
                        aliensCount--;
                    }
                }
            }
            // clear bullets 
            while (bulletArray.length > 0 && (bulletArray[0].used || bulletArray[0].y < 0)) {
                bulletArray.shift(); // remove te firs bullet
            }
            // next level (all aliens are dead)
            if (aliensCount == 0) {
                // cap the number of colimns can have an alien (6 columns)
                alienColumns = Math.min(alienColumns + 1, column / 2 - 2);
                // cap the number of row can have an alien (12)
                alienRows = Math.min(alienRows + 1, row - 4);
                // increase the velocity of aliens
                alienSpeedX += 0.1;
                alienArray = [];
                bulletArray = [];
                createAliens();
            }
        }
        alienIMG = new Image();
        alienIMG.src = alienImage
        createAliens();
    }, []);

    return (
        <div className="game__container">
            <div className='game__container__score' style={{ width: `${playgroundWidth}px` }}>
                1900
            </div>
            <canvas ref={playground} height={playgroundHeght} width={playgroundWidth} className='game__container__playGround'>

            </canvas>
        </div>
    )
}