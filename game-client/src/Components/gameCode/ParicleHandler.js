export default class Particle {
    constructor(StartX,StartY,Speed,Damage,MouseX,MouseY,lifetime,x,y,p5){
        this.StartX = StartX-x
        this.StartY = StartY-y
        this.Speed = Speed
        this.Damage = Damage
        this.MouseX = MouseX
        this.MouseY = MouseY
        this.lifetime = lifetime
        this.dir = p5.createVector(StartX-p5.mouseX, StartY-p5.mouseY).normalize()
    }
    draw(p5,x,y){
        p5.fill('rgba(200,169,169,0.8)');
        p5.circle(this.StartX+x,this.StartY+y,10);
        this.StartX += -(this.dir.x * this.Speed);
        this.StartY += -(this.dir.y * this.Speed);
        this.lifetime--
        if(this.lifetime < 0){
         return "kill me"   
        }
    }
}