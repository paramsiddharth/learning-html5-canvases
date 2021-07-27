import utils, { randomColor, randomIntFromRange } from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

const gravity = 0.6
const friction = 0.7

// Event Listeners
addEventListener('mousemove', (event) => {
	mouse.x = event.clientX
	mouse.y = event.clientY
})

addEventListener('resize', () => {
	canvas.width = innerWidth
	canvas.height = innerHeight

	init()
})

// Objects
class Ball {
	constructor(x, y, dx, dy, radius, color) {
		this.x = x
		this.y = y
		this.dx = dx
		this.dy = dy
		this.radius = radius
		this.color = color
	}

	draw() {
		c.beginPath()
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
		c.fillStyle = this.color
		c.strokeStyle = 'black'
		c.lineWidth = 2
		c.fill()
		c.stroke()
		c.closePath()
	}

	update() {
		if (this.y + this.radius + this.dy >= canvas.height) {
			this.dy *= -1 * friction
		} else {
			this.dy += gravity
		}

		if (
			this.x + this.radius + this.dx >= canvas.width
			|| this.x - this.radius + this.dx <= 0
		) {
			this.dx *= -1 * friction
		}

		this.y += this.dy
		this.x += this.dx
		this.draw()
	}
}

// Implementation
let objects
function init() {
	objects = []
	
	const count = 500
	for (let i = 0; i < count; i++) {
		const radius = randomIntFromRange(10, 26)
		const x = randomIntFromRange(radius, canvas.width - radius)
		const y = randomIntFromRange(radius, canvas.height - radius * 3)
		const dx = randomIntFromRange(-8, 8)
		const dy = randomIntFromRange(-4, 4)

		const ball = new Ball(
			x,
			y,
			dx,
			dy,
			radius,
			randomColor(colors)
		)
		objects.push(ball)
	}
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate)
	c.clearRect(0, 0, canvas.width, canvas.height)

	c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
	objects.forEach(object => {
	 object.update()
	})
}

init()
requestAnimationFrame(animate)

window.addEventListener('click', () => {
	// init();
	objects.forEach(o => o.dy = Math.min(o.dy, randomIntFromRange(-16, -6)));
});