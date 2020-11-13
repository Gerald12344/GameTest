import React, { useEffect } from 'react';
import Sketch from "react-p5";
import { SocketIOContext } from '../IOHandler';

import ParticleHamdler from './gameCode/ParicleHandler'

export default (props) => {

    let debounce = false

    const getCountTimeout = () => {
        setTimeout(() => {
            debounce = false
        }, 10);
    };

    const socket = React.useContext(SocketIOContext);
    console.log(socket)
    let x = 50;
    let y = 50;
    let img

    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(1000, 1000).parent(canvasParentRef);
        img = p5.loadImage('https://cdnb.artstation.com/p/marketplace/presentation_assets/000/307/165/medium/file.jpg?1583704652')
    };
    let text
    let particle = []

    const draw = (p5) => {
        p5.background(255, 255, 200);

        p5.image(img, x, y, 700, 700);
        p5.image(img, x - 700, y, 700, 700);
        p5.image(img, x - 700, y + 700, 700, 700);
        p5.image(img, x, y + 700, 700, 700);

        particle.forEach((element, i) => {
            let out = element.draw(p5,x,y)
            if (out === 'kill me') {
                particle.splice(i, 1)
            }
        })

        p5.translate(p5.width / 2, p5.height / 2);
        p5.fill(255, 255, 255)
        let angle = Math.atan2(p5.mouseY - p5.height / 2, p5.mouseX - p5.width / 2);
    p5.text(particle.length,50,50)
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
            particle.push(new ParticleHamdler(p5.width / 2, p5.height / 2, 10, 50, p5.mouseX, p5.mouseY, 100,x,y,p5))
            debounce = true
            getCountTimeout()
        }

    };

    return <Sketch setup={setup} draw={draw} />;
};
