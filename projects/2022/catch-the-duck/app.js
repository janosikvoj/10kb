/**
 * @type {HTMLImageElement}
 */
let duck = document.querySelector(".duck")
/**
 * @type {HTMLImageElement}
 */
let shot = document.querySelector(".shot")
shot.style.display = "none"

let speed = 8
let direction = {
    x: 1,
    y: 0
}
let rect = duck.getBoundingClientRect();
let pos = {
    x: 30,
    y: rect.y
}

let mouse = {
    x: 0,
    y: 0
}

document.onmousemove = (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

duck.onmousedown = () => {
    shot.style.display = "block";
    duck.style.display = "none";
    shot.style.left = pos.x - 5 + "px"
    shot.style.top = pos.y - 5 + "px"
}

function tick() {
    if (pos.x > window.innerWidth - (12 * 6)) {
        pos.x = window.innerWidth - (12 * 6) - 1;
        direction.x = direction.x * -1
        direction.y += (Math.random() - .5) * speed / 2
    }

    if (pos.x < 1) {
        pos.x = 0;
        direction.x = direction.x * -1
    }

    if (pos.y > window.innerHeight - (12 * 6)) {
        pos.y = window.innerHeight - (12 * 6) - 1
        direction.y = direction.y * -1
        direction.x += (Math.random() * .5) * speed / 2
    }

    if (pos.y < 1) {
        pos.y = 0
        direction.y = direction.y * -1
    }

    let dist = {
        x: pos.x - mouse.x,
        y: pos.y - mouse.y
    }
    let dist2 = Math.hypot(dist.x, dist.y);
    let angle = Math.atan2(dist.x, dist.y);
    if (dist2 < 300) {
        direction.x += (50 / dist2 + .005) * Math.sin(angle);
        direction.y += (50 / dist2 + .005) * Math.cos(angle);
    }
    direction.x = Math.min(direction.x, speed * 1.5);
    direction.y = Math.min(direction.y, speed * 1.5);


    pos.x += direction.x;
    pos.y += direction.y;

    duck.style.left = pos.x + "px"
    duck.style.top = pos.y + "px"
    if (direction.x < 0) 
        duck.style.transform = "scaleX(1)";
    else 
        duck.style.transform = "scaleX(-1)";

    window.requestAnimationFrame(tick)
}

tick()

function init() {
    document.querySelector("#start-screen").remove()
    tick()
}