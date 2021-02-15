class Circle extends Figure{
    constructor(context, posX, posY, fill, radius){
        super(context, posX, posY, fill)
        this.radius = radius
        // console.log("create: "+radius)
    }

    setRadius(radius){
        this.radius = radius
    }

    getRadius(){
        return this.radius
    }

    draw(){
        super.draw()
        this.context.beginPath()
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI)
        this.context.closePath()
        this.context.fill()
    }
}