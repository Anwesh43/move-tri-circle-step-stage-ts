const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
const steps : number = 3
const scGap : number = 0.1 / 3
const color : string = "#673AB7"
const strokeFactor : number = 90
const sizeFactor : number = 3

class MoveTriCircleStepStage {
    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = '#BDBDBD'
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : MoveTriCircleStepStage = new MoveTriCircleStepStage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
