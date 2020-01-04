import React, {Component} from 'react';

export class Snow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: ''
    };
  }

  componentDidMount() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var maxRaindrops = 500;
    var opacity = 1;
    var zVariance = 1;
    var xvelVariance = 4;
    var yvelVariance = 10;
    var yvelMin = 2;
    var xvelMin = 1;
    var raindrops = [];
    var splashes = [];
    var canvas = this.refs.mainCanvas;

    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = `hsla(205, 12%, 74%, ${opacity})`;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    for(var i = 0; i < maxRaindrops; i++){
        raindrops.push({
            xpos: Math.random() * width,
            ypos: Math.random() * height,
            zpos: Math.random() * zVariance,
            xvel: (Math.random() * xvelVariance) + xvelMin,
            yvel: (Math.random() * yvelVariance) + yvelMin
        });
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.strokeStyle = `hsla(205, 12%, 74%, ${opacity})`;
        for(var curRaindrop of raindrops){
            ctx.beginPath(curRaindrop.xpos, curRaindrop.ypos);
            ctx.moveTo(curRaindrop.xpos, curRaindrop.ypos);
            ctx.lineTo(curRaindrop.xpos + (curRaindrop.xvel*curRaindrop.zpos)*1,
                       curRaindrop.ypos + (curRaindrop.yvel*curRaindrop.zpos)*1);
            ctx.strokeStyle = `hsla(0,
                                    0%,
                                    ${65 * curRaindrop.zpos}%,
                                    ${opacity * curRaindrop.zpos})`;

            ctx.stroke();
        }
        for(var curSplash of splashes){
            ctx.beginPath();
            ctx.ellipse(curSplash.xpos,
                        curSplash.ypos,
                        curSplash.xradius,
                        curSplash.yradius,
                        0,
                        0,
                        2 * Math.PI);
            var splashOpacity = (opacity/(curSplash.frame*3));
            ctx.strokeStyle = `hsla(205,
                12%,
                ${65 * curSplash.zpos}%,
                ${splashOpacity})`;
            ctx.stroke();
        }
        move();
    }

    function move() {
        for(var curRaindrop of raindrops){
            curRaindrop.xpos += curRaindrop.xvel;
            curRaindrop.ypos += curRaindrop.yvel;

            if(curRaindrop.xpos > width){
                curRaindrop.xpos = Math.random() * width;
                curRaindrop.ypos = -20;
            } else if (curRaindrop.ypos > (height + (curRaindrop.zpos * 100) - 150)){
                splashes.push({
                    xradius: 0.8*curRaindrop.zpos,
                    yradius: 0.3*curRaindrop.zpos,
                    xpos: curRaindrop.xpos,
                    ypos: curRaindrop.ypos,
                    zpos: curRaindrop.zpos,
                    frame: 1
                })
                curRaindrop.xpos = Math.random() * width;
                curRaindrop.ypos = -20;

            }
        }

        for(var i = splashes.length - 1; i >= 0; i--){
            var curSplash = splashes[i];
            curSplash.xradius += 0.5*curSplash.zpos;
            curSplash.yradius += 0.2*curSplash.zpos;
            curSplash.frame += 1;
            if(curSplash.frame > 7){
                splashes.splice(i, 1);
            }
        }
    }
    function run(){
        window.requestAnimationFrame(run);
        draw();
    }
    run();
  }

  render(){
    return (
      <div className="App">
        <canvas id="canvas" ref="mainCanvas" />
      </div>
    );
  }

}

export default Snow;
