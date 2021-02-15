class Rectangle extends Figure{
    constructor(context, posX, posY, fill, width, height){
        super(context, posX, posY, fill)
        this.height = height
        this.width = width
    }
    
    setHeight(height){
        this.height = height
    }

    getHeight(){
        return this.height
    }

    setWidth(width){
        this.width = width
    }

    getWidth(){
        return this.width
    }

    draw(){
        super.draw()
        this.context.fillRect(this.posX, this.posY, this.width, this.height)
    }

}