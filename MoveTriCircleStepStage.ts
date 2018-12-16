const w : number = window.innerWidth, h : number = window.innerHeight
const nodes : number = 5
const steps : number = 3
const scGap : number = 0.1 / 3
const color : string = "#673AB7"
const strokeFactor : number = 90
const sizeFactor : number = 3

const divideScale : Function = (scale : number, i : number, n : number) : number => Math.min(1/n, Math.max(0, scale - i / n )) * n

const drawMTCNode : Function = (context : CanvasRenderingContext2D, i : number, scale : number) => {
    const gap : number = w / (nodes + 1)
    const size : number = gap / sizeFactor
    const sc1 : number = divideScale(scale, 0, 3)
    const sc2 : number = divideScale(scale, 1, 3)
    const sc3 : number = divideScale(scale, 2, 3)
    const sf : number = 1 - 2 * (i % 2)
    const h : number = size * Math.sqrt(3) / 2
    context.strokeStyle = color
    context.lineWidth = Math.min(w, h) / strokeFactor
    context.lineCap = 'round'
    context.save()
    context.translate(w/2 + w/2 * sc2, gap * (i + 1))
    context.rotate(Math.PI/2 * sf * sc3)
    context.beginPath()
    context.moveTo(-size, -h/2)
    context.lineTo(size, -h/2)
    context.lineTo(0, h/2)
    context.lineTo(-size, -h/2)
    context.stroke()
    context.beginPath()
    for(var t = 0; t <= 2 * Math.PI * sc1; t++) {
        const x = (h/2) * Math.cos(t * Math.PI/180)
        const y = (h/2) * Math.sin(t * Math.PI/180)
        if (t == 0) {
            context.moveTo(x, y)
        } else {
            context.lineTo(x, y)
        }
    }
    context.stroke()
    context.restore()
}

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

class State {
    scale : number = 0
    dir : number = 0
    prevScale : number = 0

    update(cb : Function) {
        this.scale += scGap * this.dir
        if (Math.abs(this.scale - this.prevScale) > 1) {
            this.scale = this.prevScale + this.dir
            this.dir = 0
            this.prevScale = this.scale
            cb(this.prevScale)
        }
    }

    startUpdating(cb : Function) {
        if (this.dir == 0) {
            this.dir = 1 - 2 * this.prevScale
            cb()
        }
    }

}
