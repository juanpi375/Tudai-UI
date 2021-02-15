class Figure{
    constructor(context, posX, posY, fill){
        this.context = context
        this.posY = posY
        this.posX = posX
        this.fill = fill
        this.isClicked = false
    }

    setPosition(x, y){
        this.posX = x
        this.posY = y
    }

    getPosition(){
        return {
            x: this.posX,
            y: this.posY
        }
    }

    setFill(fill){
        this.fill = fill
    }

    getFill(){
        return this.fill
    }

    draw(){
        this.context.fillStyle = this.fill
    }

}