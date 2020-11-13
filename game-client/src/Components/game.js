import React from 'react';
import Sketch from "react-p5";
import { SocketIOContext } from '../IOHandler';

import ParticleHamdler from './gameCode/ParicleHandler'

export default () => {

    let debounce = false

    const getCountTimeout = () => {
        setTimeout(() => {
            debounce = false
        }, 100);
    };

    const socket = React.useContext(SocketIOContext);
    console.log(socket)
    let x = 50;
    let y = 50;
    let players = {
        '325328935893258329': {
            location: { x: 50, y: 50 },
            health: 100,
            weapons: [],
            name: "Hello"
        }
    }

    socket.on('WelcomePacket', (data) => {
        players = data
    })

    let img
    let tree 
    let trees = [{x:50,y:50}]


    const setup = (p5, canvasParentRef) => {
        for(let i=0;i<50;i++){
            trees.push({x:(Math.random()*4000)-2000,y:(Math.random()*4000)-2000})
        }
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(1000,1000).parent(canvasParentRef);
        tree = p5.loadImage('assets/clipart-tree-bird-6.png')
        img = p5.loadImage('https://cdnb.artstation.com/p/marketplace/presentation_assets/000/307/165/medium/file.jpg?1583704652')
    };
    let text
    let particle = []
    var grid = 700;
    var gridOffset = grid / 2;

    function snap(op) {
        // subtract offset (to center lines)
        // divide by grid to get row/column
        // round to snap to the closest one
        var cell = Math.round((op - gridOffset) / grid);
        // multiply back to grid scale
        // add offset to center
        return cell * grid + gridOffset;
    }
    let gridRender = (p5) => {
        console.log(x,y)
        let snappy = snap(-x)
        let snappyY = snap(-y)
        p5.image(img, snappy+x-700, snappyY+y, 700, 700);
        p5.image(img, snappy+x, snappyY+y, 700, 700);
        p5.image(img, snappy+x+700, snappyY+y, 700, 700);
        p5.image(img, snappy+x+1400, snappyY+y, 700, 700);
        p5.image(img, snappy+x-700, snappyY+y-700, 700, 700);
        p5.image(img, snappy+x, snappyY+y-700, 700, 700);
        p5.image(img, snappy+x+700, snappyY+y-700, 700, 700);
        p5.image(img, snappy+x+1400, snappyY+y-700, 700, 700);
        p5.image(img, snappy+x-700, snappyY+y+700, 700, 700);
        p5.image(img, snappy+x, snappyY+y+700, 700, 700);
        p5.image(img, snappy+x+700, snappyY+y+700, 700, 700);
        p5.image(img, snappy+x+1400, snappyY+y+700, 700, 700);
        p5.image(img, snappy+x-700, snappyY+y+1400, 700, 700);
        p5.image(img, snappy+x, snappyY+y+1400, 700, 700);
        p5.image(img, snappy+x+700, snappyY+y+1400, 700, 700);
        p5.image(img, snappy+x+1400, snappyY+y+1400, 700, 700);
        //p5.image(img, Math.floor(x / 700) * 700 + x, Math.floor(y / 700) * 700 + y, 700, 700);
    }

    const draw = (p5) => {
        p5.background(255, 255, 200);
        gridRender(p5)

        //p5.image(img, x, y, 700, 700);
        //p5.image(img, x - 700, y, 700, 700);
        //p5.image(img, x - 700, y + 700, 700, 700);
        //p5.image(img, x, y + 700, 700, 700);

    

        p5.fill(255, 255, 255)
        let entires = Object.entries(players);
        p5.textAlign(p5.CENTER);
        p5.rectMode(p5.CENTER);
        entires.forEach(e => {
            p5.text(e[1].name, e[1].location.x - 15 + x, e[1].location.y + y + 20, 30, 20)
            let angle = Math.atan2(50 - e[1].location.x + x, 50 - e[1].location.y + y);

            p5.circle(e[1].location.x + x - 15, e[1].location.y + y - 15, 30, 30)
        })
        p5.rectMode(p5.CORNER);
        particle.forEach((element, i) => {
            let out = element.draw(p5,x,y)
            if (out === 'kill me') {
                particle.splice(i, 1)
            }
        })
        p5.translate(p5.width / 2, p5.height / 2);
        p5.fill(255, 255, 255)
        let angle = Math.atan2(p5.mouseY - p5.height / 2, p5.mouseX - p5.width / 2);
        p5.text(x, 50, 50)
        p5.text(y, 100, 50)
        p5.rotate(Math.PI + angle);
        p5.rect(-30, -5, 30, 10)

        p5.rotate(Math.PI - angle);
        p5.circle(0, 0, 30, 30)
        p5.translate(-p5.width / 2, -p5.height / 2);



        // NOTE: Do not use setState in the draw function or in functions that are executed
        // in the draw function...
        // please use normal variables or class properties for these purposes
        //x++;
        p5.text(text, 10, 90)
        if (p5.keyIsDown(87)) {
            y += 5;
        }
        if (p5.keyIsDown(83)) {
            y -= 5;
        }
        if (p5.keyIsDown(65)) {
            x += 5;
        }
        if (p5.keyIsDown(68)) {
            x -= 5;
        }
        
        if (p5.mouseIsPressed && debounce === false) {
            particle.push(new ParticleHamdler(p5.width / 2, p5.height / 2, 10, 50, p5.mouseX, p5.mouseY, 100, x, y, p5))
            debounce = true
            getCountTimeout()
        }
        trees.forEach(e => {
            console.log(e)
            p5.image(tree,e.x+x,e.y+y,200,200)
        })
    };

    return <Sketch setup={setup} draw={draw} />;
};
