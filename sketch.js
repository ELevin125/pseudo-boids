let MANAGER;

function setup() {
    createCanvas(windowWidth, windowHeight);

    MANAGER = new Manager(10)
}

function draw() {
    background(20);

    MANAGER.update();
}

class Manager {
    constructor(boidCount = 10) {
        this.boids = this._createBoids(boidCount)
    }

    _createBoids(boidCount) {
        return Array.from({ length: boidCount }, () => new Boid(random(width), random(height), 10));
    }

    update() {
        this.boids.forEach(boid => boid.update());
    }
}

class Boid {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    update() {
        this._draw();
    }

    _draw() {
        push();
        fill(255);
        translate(this.x, this.y);
        triangle(15, 37.5, 29, 10, 43, 37.5);
        pop();
    }
}
