const spriteRight = new Image();
spriteRight.src = 'hero.png'; // Your original image

const spriteLeft = new Image();
spriteLeft.src = 'heroleft.png';  // Your flipped version
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d'); // This is the "paint brush"
const platforms = [
    { x: 250, y: 150, width: 150, height: 20 },  // A floating block
    { x: 450, y: 250, width: 100, height: 20 },   // Another block
    { x: 50, y: 250, width: 100, height: 20 }   // Another block
];
const floor = [
    { x: 0, y: 350, width: 600, height: 50 },    // The Main Floor
]
function rectIntersect(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}
const sprite = {
    x: 500,
    y: 100,
    width: 30,
    height: 30,
    speed: 2,
    dy: 0,          // Vertical Velocity (how fast he's falling/jumping)
    jumpPower: -10, // How high he jumps (must be negative)
    gravity: 0.6,   // The strength of the pull
    grounded: false, // A "switch" to tell if he's on the floor
    facing: "right",
    img: spriteRight,
    maxHealth: 100,
    currentHealth: 100
};
const npc = {
    x: 400,
    y: 100,
    width: 64,
    height: 64,
    speed: 2,
    dy: 0,
    gravity: 0.6,
    direction: 1, // 1 for right, -1 for left
    lastTurn: 0,  // Keeps track of when he last changed direction
    maxHealth: 100,
    currentHealth: 100
};
const projectiles = [];

// Track player direction: "right" or "left" (Default to right)
let playerFacing = "right"; 

// Track the last time the player shot to prevent a solid wall of bullets
let lastShotTime = 0; 
const shootCooldown = 300; // Milliseconds between shots (0.3 seconds)
function drawNPCHealth() {
    ctx.fillStyle = "green"; // Or draw an image here
    ctx.fillRect(npc.x +32, npc.y, ((32 * npc.currentHealth)/100), 8);
}
function drawPlayerHealth() {
    ctx.fillStyle = "green"; // Or draw an image here
    ctx.fillRect(sprite.x +32, sprite.y, ((32 * sprite.currentHealth)/100), 8);
}
function updateNPC() {
    drawNPCHealth()
    npcPhysics()
    let now = Date.now();

    // Change direction every 2000 milliseconds (2 seconds)
    if (now - npc.lastTurn > 2000) {
        // Randomly pick -1 (left), 1 (right), or 0 (standing still)
        npc.direction = Math.floor(Math.random() * 3) - 1;
        npc.lastTurn = now;
    }

    // Move the NPC
    npc.x += npc.direction * npc.speed;
    // Keep him inside the canvas walls
    if (npc.x < 0) npc.direction = 1;
    if (npc.x + npc.width > canvas.width) npc.direction = -1;
}
function applyPhysics() { 
    // 1. Apply gravity to velocity
    sprite.dy += sprite.gravity;
    
    // 2. Apply velocity to position
    sprite.y += sprite.dy;

    // 3. Reset grounded status every frame before checking
    let wasOnGround = sprite.grounded;
    sprite.grounded = false;

    for (let block of platforms) {
        // AABB Collision Check
        if (sprite.x < block.x + block.width &&
            sprite.x + sprite.width > block.x &&
            sprite.y < block.y + block.height &&
            sprite.y + sprite.height > block.y) {

            // THE FIX: Only collide if the sprite's FEET are above the block's CENTER
            // and the sprite is falling (dy > 0)
            if (sprite.dy > 0 && (sprite.y + sprite.height - sprite.dy) <= block.y + 5) {
                sprite.y = block.y - sprite.height; // Snap to surface
                sprite.dy = 0;                      // Kill downward momentum
                sprite.grounded = true;             // Allow jumping again
            }
        }
    }
        for (let block of floor) {
        // AABB Collision Check
        if (sprite.x < block.x + block.width &&
            sprite.x + sprite.width > block.x &&
            sprite.y < block.y + block.height &&
            sprite.y + sprite.height > block.y) {

            // THE FIX: Only collide if the sprite's FEET are above the block's CENTER
            // and the sprite is falling (dy > 0)
            if (sprite.dy > 0 && (sprite.y + sprite.height - sprite.dy) <= block.y + 5) {
                sprite.y = block.y - sprite.height; // Snap to surface
                sprite.dy = 0;                      // Kill downward momentum
                sprite.grounded = true;             // Allow jumping again
            }
        }
    }
}
function npcPhysics() {
    // 1. Apply gravity to velocity
    npc.dy += npc.gravity;
    
    // 2. Apply velocity to position
    npc.y += npc.dy;

    // 3. Reset grounded status every frame before checking
    let wasOnGround = npc.grounded;
    npc.grounded = false;

    for (let block of platforms) {
        // AABB Collision Check
        if (npc.x < block.x + block.width &&
            npc.x + npc.width > block.x &&
            npc.y < block.y + block.height &&
            npc.y + npc.height > block.y) {

            // THE FIX: Only collide if the sprite's FEET are above the block's CENTER
            // and the sprite is falling (dy > 0)
            if (npc.dy > 0 && (npc.y + npc.height - npc.dy) <= block.y + 5) {
                npc.y = block.y - npc.height; // Snap to surface
                npc.dy = 0;                      // Kill downward momentum
                npc.grounded = true;             // Allow jumping again
            }
        }
    }
        for (let block of floor) {
        // AABB Collision Check
        if (npc.x < block.x + block.width &&
            npc.x + npc.width > block.x &&
            npc.y < block.y + block.height &&
            npc.y + npc.height > block.y) {

            // THE FIX: Only collide if the sprite's FEET are above the block's CENTER
            // and the sprite is falling (dy > 0)
            if (npc.dy > 0 && (npc.y + npc.height - npc.dy) <= block.y + 5) {
                npc.y = block.y - npc.height; // Snap to surface
                npc.dy = 0;                      // Kill downward momentum
                npc.grounded = true;             // Allow jumping again
            }
        }
    }
}
const keys = {};
function drawPlatforms() {
    ctx.fillStyle = "brown"; // Or draw an image here
    for (let block of platforms) {
        ctx.fillRect(block.x, block.y, block.width, block.height);
    }
}
function drawFloor() {
    ctx.fillStyle = "green"; // Or draw an image here
    for (let block of floor) {
        ctx.fillRect(block.x, block.y, block.width, block.height);
    }
}
window.addEventListener('keydown', (e) => {
    keys[e.key] = true; // Mark key as pressed
});
window.addEventListener('keydown', (e) => {
    if ((e.key === "ArrowUp" || e.key === " ") && sprite.grounded) {
        sprite.dy = sprite.jumpPower; // Give upward force
        sprite.grounded = false;      // BREAK the connection to the floor
        sprite.y -= 2;                // Nudge upward so feet aren't touching
    }
});
window.addEventListener('keyup', (e) => {
    keys[e.key] = false; // Mark key as released
});
function handleShooting() {
    let now = Date.now();

    // Check if player presses 'x' and cooldown has passed
    if (keys['KeyX'] && now - lastShotTime > shootCooldown) {
        
        // Determine the horizontal speed based on direction
        let bulletSpeed = playerFacing === "right" ? 8 : -8;

        // Instantiate a new projectile object
        projectiles.push({
            x: playerFacing === "right" ? sprite.x + sprite.width : sprite.x - 10,
            y: sprite.y + (sprite.height / 2) - 4, // Center vertically on sprite
            width: 12,
            height: 6,
            vx: bulletSpeed, // Horizontal velocity vector
            damage: 25
        });

        lastShotTime = now; // Reset cooldown timer
    }
}
function updateProjectiles() {
    for (let i = projectiles.length - 1; i >= 0; i--) {
        let bullet = projectiles[i];

        // Move the bullet forward
        bullet.x += bullet.vx;

        // 1. Check Collision with Enemy NPC
        if (bullet.x < npc.x + npc.width &&
            bullet.x + bullet.width > npc.x &&
            bullet.y < npc.y + npc.height &&
            bullet.y + bullet.height > npc.y) {
            
            // Reduce enemy health by bullet damage
            npc.currentHealth = Math.max(0, npc.currentHealth - bullet.damage);
            
            // Remove the bullet instantly upon impact
            projectiles.splice(i, 1);
            continue; 
        }

        // 2. Clear out off-screen bullets to preserve system memory
        if (bullet.x < 0 || bullet.x > canvas.width) {
            projectiles.splice(i, 1);
        }
    }
}
function drawProjectiles() {
    ctx.fillStyle = "#00ff00"; // Neon Matrix Green to fit your style!
    
    for (let bullet of projectiles) {
        // Draw a glowing energy projectile capsule
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        
        // Optional glow styling properties
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00ff00";
    }
    // Clean reset shadow styling so other entities don't glow unintentionally
    ctx.shadowBlur = 0; 
}
function drawSprite() {
    ctx.save();

    if (sprite.facing === "left") {
        // Move to the horizontal center of the sprite
        ctx.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
        // Flip only the X axis
        ctx.scale(-1, 1);
        // Draw the image centered on that point
        ctx.drawImage(sprite.img, -sprite.width / 2, -sprite.height / 2, sprite.width, sprite.height);
    } else {
        // Draw normally
        ctx.drawImage(sprite.img, sprite.x, sprite.y, sprite.width, sprite.height);
    }

    ctx.restore();
}
function draw() {
    // ... clear canvas and draw background ...

    // Draw your player
    drawSprite(); 
    drawProjectiles()
    // Draw the NPC
    ctx.fillStyle = "red";
    ctx.fillRect(npc.x +32, npc.y+32, 32, 32);
}
function playerUpdate() {
    drawPlayerHealth()
        applyPhysics()
        if (sprite.x > 575){
        sprite.x = 575
    }
    if (sprite.x < 0) {
        sprite.x =0
    }
    if (keys['ArrowLeft']) {
    sprite.x -= sprite.speed;
    playerFacing = "left"
    sprite.facing = "left"; 
}
    if (keys['ArrowRight']) {
    sprite.x += sprite.speed;
    playerFacing = "right"
    sprite.facing = "right";
}
    // 1. Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function gameLoop() {

    playerUpdate()
    handleShooting();     // Listen for firing requests
    updateProjectiles();  // Process bullet movement and enemy impact checks
    updateNPC()
    drawFloor()
    drawPlatforms()
    // 2. Update Position
    if (keys['ArrowUp'] && sprite.y <= 338) sprite.y -= sprite.speed;
    if (keys['ArrowLeft'] && sprite.x > 0) sprite.x -= sprite.speed;
    if (keys['ArrowRight'] && sprite.x < canvas.width - sprite.width) sprite.x += sprite.speed;
    draw()



    // 4. Call the next frame
    requestAnimationFrame(gameLoop);
}

// Start the engine!
gameLoop();