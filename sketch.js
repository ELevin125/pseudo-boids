let MANAGER;

function setup() {
    createCanvas(windowWidth, windowHeight);

    MANAGER = new Manager(25, color(255, 100, 0));
}

function draw() {
    background(20);

    MANAGER.update();
}

class Manager {
    constructor(boidCount = 10, color) {
        this.direction = p5.Vector.random2D();
        this.boids = this._createBoids(boidCount, color);
    }

    _createBoids(boidCount, color) {
        return Array.from({ length: boidCount }, () => new Boid(random(width / 2), 
                                                                random(height / 2), 
                                                                20,
                                                                color,
                                                                3,
                                                                this.direction));
    }

    update() {
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
        this.color = color
        this.paddingScalar = paddingScalar;

        this.mainDirection = mainDirection.copy();
        this.direction = p5.Vector.add(this.mainDirection, p5.Vector.random2D().mult(0.1));
        this.prevDirection = this.direction.copy();

        this.currentRandom = p5.Vector.random2D().mult(0.1);
    }

    update(mainDirection, boids) {
        this.currentRandom.add(p5.Vector.random2D().mult(0.03));
        let newDirection = mainDirection.copy().add(this.currentRandom);
    
        boids.forEach(other => {
            if (other !== this && this._isWithinPadding(other)) {
                let avoidance = p5.Vector.sub(this._getPositionVector(), other._getPositionVector());
                avoidance.normalize();
                newDirection.add(avoidance.mult(0.4)); // Small perturbation
            }
        });
    
        newDirection.normalize();
        // Smooth transition between previous and new direction
        this.direction = p5.Vector.lerp(this.prevDirection, newDirection, 0.03);
    
        this.prevDirection = this.direction.copy();
    
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
        this.x += this.direction.x;
        this.y += this.direction.y;

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
        rotate(this.direction.heading());
        let s = this.size / 2;
        triangle(s * -1, s * 1, s * -1, s * -1, s * 1.5, s * 0);
        // noFill();
        // stroke(0, 255, 0);
        // ellipse(0, 0, this.size * this.paddingScalar, this.size * this.paddingScalar);
        pop();
    }
}
