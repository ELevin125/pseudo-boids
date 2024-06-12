**Pseudo Boids**
![pseudo_boids](https://github.com/ELevin125/pseudo-boids/assets/123626350/42d44d93-0fb8-40bb-9607-97ef599d7542)
---


### Overview:

This project demonstrates a simplified rendition of the classic "Boids" algorithm used for flocking behaviour. This implementation is a simplified version of the algorithm, whilst still offering similar results.

### Differences from Classic Boids:
- In this implementation, each boid's direction is slightly perturbed over time, instead of being simulated. This adds some randomness to their movement without needing to calculate cohesion and allignment.
- The avoidance behavior is simplified compared to the classic boids algorithm. Instead of considering separation, alignment, and cohesion behaviors separately, it only focuses on avoiding collisions with neighboring boids. This simplification makes the implementation easier but may result in less realistic flocking behavior.
- There's no explicit consideration of alignment or cohesion behavior, which are essential components of the classic boids algorithm for simulating realistic flocking behavior. Instead a Manager class controls an target direction that changes over time, approximating the result of the classic cohesion and allignment rules

### Key Components:

- **Manager Class:** Governs the overall behavior of the boids, including their initial setup and global direction.
  
- **Boid Class:** Represents individual boids, encapsulating their position, movement, and interaction with other boids.


