let MANAGER;

function setup() {
    createCanvas(windowWidth, windowHeight);

    const boidCount = 25;
    const boidColor = color(255, 100, 0);
    MANAGER = new Manager(boidCount, boidColor);
}

function draw() {
    background(20);

    MANAGER.update();
}

class Manager {
    constructor(boidCount = 10, color) {
        this.direction = p5.Vector.random2D(); // overall direction of the boids

        const size = 20;
        const paddingScalar = 3;
        this.boids = this._createBoids(boidCount, size, paddingScalar, color);
    }

    _createBoids(boidCount, size, paddingScalar, color) {
        return Array.from({ length: boidCount }, () => new Boid(random(width / 2), 
                                                                random(height / 2), 
                                                                size,
                                                                color,
                                                                paddingScalar,
                                                                this.direction));
    }

    update() {
        // change direction slightly to let the boids' movement seem more random over time
        // make sure mult value is low, to prevent rapidly changing directions
        let perturbation = p5.Vector.random2D().mult(0.1);
        this.direction.add(perturbation);

        this.boids.forEach(boid => boid.update(this.direction, this.boids));
    }
}

class Boid {
    constructor(x, y, size, color, paddingScalar, mainDirection) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.paddingScalar = paddingScalar;

        this.mainDirection = mainDirection.copy();
        this._direction = p5.Vector.add(this.mainDirection, p5.Vector.random2D().mult(0.1));
        this._prevDirection = this._direction.copy();

        this._currentRandom = p5.Vector.random2D().mult(0.1);
    }

    update(mainDirection, boids) {
        this._currentRandom.add(p5.Vector.random2D().mult(0.03));
        let newDirection = mainDirection.copy().add(this._currentRandom);
    
        // slightly adjust the direction to be away from any intersecting boids
        boids.forEach(other => {
            if (other !== this && this._isWithinPadding(other)) {
                let avoidance = p5.Vector.sub(this._getPositionVector(), other._getPositionVector());
                avoidance.normalize();
                newDirection.add(avoidance.mult(0.4));
            }
        });
    
        newDirection.normalize();

        // prevents jittering 
        this._direction = p5.Vector.lerp(this._prevDirection, newDirection, 0.03);
        this._prevDirection = this._direction.copy();
    
        this._move();
        this._draw();
    }
    

    _isWithinPadding(other) {
        let d = dist(this.x, this.y, other.x, other.y);
        return d < this.size * this.paddingScalar;
    }

    _getPositionVector() {
        return createVector(this.x, this.y);
    }

    _move() {
        this.x += this._direction.x;
        this.y += this._direction.y;

        // Handle edge wrapping
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    _draw() {
        push();
        noStroke()
        fill(this.color);
        translate(this.x, this.y);
        rotate(this._direction.heading());
        let s = this.size / 2;
        triangle(s * -1, s * 1, s * -1, s * -1, s * 1.5, s * 0);
        // draw debug
        // noFill();
        // stroke(0, 255, 0);
        // ellipse(0, 0, this.size * this.paddingScalar, this.size * this.paddingScalar);
        pop();
    }
}
