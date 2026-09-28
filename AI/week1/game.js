// =====================================================
// CANVAS SETUP
// =====================================================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


// =====================================================
// WORLD
// =====================================================

const WORLD = {
    width: 4000,
    height: 3000
};


// =====================================================
// PLAYER / CAR
// =====================================================

const car = {
    x: 2000,
    y: 1450,

    width: 58,
    height: 32,

    angle: 0,

    speed: 0,

    maxSpeed: 7,
    reverseSpeed: -3,

    acceleration: 0.18,

    friction: 0.94,

    turnSpeed: 0.055
};


// =====================================================
// CAMERA
// =====================================================

const camera = {
    x: 0,
    y: 0,

    smoothness: 0.08
};


// =====================================================
// KEYBOARD
// =====================================================

const keys = {};

window.addEventListener("keydown", (event) => {

    keys[event.key.toLowerCase()] = true;

    // Open CV section
    if (event.key.toLowerCase() === "e") {
        interact();
    }

    // Close modal
    if (event.key === "Escape") {
        closeModal();
    }
});


window.addEventListener("keyup", (event) => {

    keys[event.key.toLowerCase()] = false;

});


// =====================================================
// CV LOCATIONS
// =====================================================

const locations = [

    {
        name: "ABOUT ME",

        x: 650,
        y: 600,

        color: "#00e5ff",

        content: `
            <p>
                Hi! I'm <strong>Peter</strong>.
            </p>

            <p>
                I'm a developer who enjoys technology,
                creativity and building things.
            </p>

            <h3>My Story</h3>

            <p>
                I am an educated technician with passion for it so i am trying to educate myself in the field of web development. I am a fast learner and I am always looking for new challenges.
            </p>
        `
    },

    {
        name: "EXPERIENCE",

        x: 3200,
        y: 600,

        color: "#8b5cf6",

        content: `
            <h3>CR STEGLICH</h3>

            <p>
                <strong>Foreman</strong><br>
                2021 - 2026
            </p>

            <ul>
                <li>Maintain machines </li>
                <li>Improved efficiency</li>
                <li>Technical skills </li>
            </ul>

            
        `
    },

    {
        name: "EDUCATION",

        x: 650,
        y: 2250,

        color: "#22c55e",

        content: `
            <h3>HackYourFuture</h3>

            <p>
                Web Development
            </p>

            <p>
                HTML, CSS, JavaScript, Git,
                APIs and more.
            </p>

            
        `
    },

    {
        name: "PROJECTS",

        x: 3200,
        y: 2250,

        color: "#f59e0b",

        content: `
            <h3>Project One</h3>

            <p>
                CHECK GITHUB
            </p>

            

            <h3>Technologies</h3>

            <p>
                HTML • CSS • JavaScript • Git
            </p>
        `
    },

    {
        name: "HOBBIES",

        x: 1200,
        y: 2600,

        color: "#ec4899",

        content: `
            <h3>🎮 Gaming</h3>

            <p>
                I enjoy playing video games in my free time. It helps me relax and also improves my problem-solving skills.
            </p>

            <h3>🚗 Cars</h3>

            <p>
               I have a passion for cars and enjoy learning about their mechanics and performance.
            </p>

            <h3>💻 Technology</h3>

            <p>
                I am fascinated by technology and love exploring new gadgets and software. It keeps me updated with the latest trends in the tech world.
            </p>
        `
    },

    {
        name: "CONTACT",

        x: 3350,
        y: 1450,

        color: "#ef4444",

        content: `
            <h3>Let's connect</h3>

            <p>
                📧  E-Mail:   alin_19932001@yahoo.com
            </p>

            <p>
                💼 LinkedIn:    https://www.linkedin.com/in/alin-petru-giubernea-271a841bb/
            </p>
             
            <p>
                💻 GitHub:    https://github.com/AlinPetru
            </p>
        `
    }

];


// =====================================================
// ROADS
// =====================================================

const roads = [

    {
        x: 0,
        y: 1250,
        width: WORLD.width,
        height: 400
    },

    {
        x: 1800,
        y: 0,
        width: 400,
        height: WORLD.height
    }

];


// =====================================================
// BUILDINGS
// =====================================================

const buildings = [

    {
        x: 300,
        y: 300,
        width: 500,
        height: 300
    },

    {
        x: 2600,
        y: 300,
        width: 500,
        height: 300
    },

    {
        x: 300,
        y: 1850,
        width: 500,
        height: 300
    },

    {
        x: 2600,
        y: 1850,
        width: 500,
        height: 300
    },

    {
        x: 1000,
        y: 700,
        width: 500,
        height: 300
    },

    {
        x: 2400,
        y: 700,
        width: 400,
        height: 300
    }

];


// =====================================================
// PLAYER MOVEMENT
// =====================================================

function updateCar() {

    const forward =
        keys["w"] ||
        keys["arrowup"];

    const backward =
        keys["s"] ||
        keys["arrowdown"];

    const left =
        keys["a"] ||
        keys["arrowleft"];

    const right =
        keys["d"] ||
        keys["arrowright"];


    // Accelerate

    if (forward) {

        car.speed += car.acceleration;

    }


    // Reverse

    if (backward) {

        car.speed -= car.acceleration;

    }


    // Friction

    car.speed *= car.friction;


    // Limit speed

    car.speed = Math.max(
        car.reverseSpeed,
        Math.min(
            car.maxSpeed,
            car.speed
        )
    );


    // Steering

    if (Math.abs(car.speed) > 0.10) {

        const direction =
            car.speed >= 0 ? 1 : -1;


        if (left) {

            car.angle -=
                car.turnSpeed *
                direction;

        }


        if (right) {

            car.angle +=
                car.turnSpeed *
                direction;

        }

    }


    // Save previous position

    const oldX = car.x;
    const oldY = car.y;


    // Move

    car.x +=
        Math.cos(car.angle) *
        car.speed;

    car.y +=
        Math.sin(car.angle) *
        car.speed;


    // World boundaries

    car.x = Math.max(
        30,
        Math.min(
            WORLD.width - 30,
            car.x
        )
    );

    car.y = Math.max(
        30,
        Math.min(
            WORLD.height - 30,
            car.y
        )
    );


    // Collision

    if (checkBuildingCollision()) {

        car.x = oldX;
        car.y = oldY;

        car.speed *= -0.25;

    }

}


// =====================================================
// BUILDING COLLISION
// =====================================================

function checkBuildingCollision() {

    const carRadius = 25;


    for (const building of buildings) {

        const closestX = Math.max(
            building.x,
            Math.min(
                car.x,
                building.x + building.width
            )
        );


        const closestY = Math.max(
            building.y,
            Math.min(
                car.y,
                building.y + building.height
            )
        );


        const distanceX =
            car.x - closestX;

        const distanceY =
            car.y - closestY;


        const distance =
            Math.sqrt(
                distanceX * distanceX +
                distanceY * distanceY
            );


        if (distance < carRadius) {

            return true;

        }

    }


    return false;

}


// =====================================================
// CAMERA
// =====================================================

function updateCamera() {

    const targetX =
        car.x -
        canvas.width / 2;

    const targetY =
        car.y -
        canvas.height / 2;


    camera.x +=
        (targetX - camera.x) *
        camera.smoothness;


    camera.y +=
        (targetY - camera.y) *
        camera.smoothness;


    camera.x = Math.max(
        0,
        Math.min(
            WORLD.width - canvas.width,
            camera.x
        )
    );


    camera.y = Math.max(
        0,
        Math.min(
            WORLD.height - canvas.height,
            camera.y
        )
    );

}


// =====================================================
// DRAW WORLD
// =====================================================

function drawWorld() {

    // Grass

    ctx.fillStyle = "#18351f";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.save();


    // Camera

    ctx.translate(
        -camera.x,
        -camera.y
    );


    drawRoads();

    drawBuildings();

    drawLocations();

    drawCar();


    ctx.restore();

}


// =====================================================
// DRAW ROADS
// =====================================================

function drawRoads() {

    roads.forEach(road => {

        // Road

        ctx.fillStyle = "#292d34";

        ctx.fillRect(
            road.x,
            road.y,
            road.width,
            road.height
        );


        // Road edges

        ctx.strokeStyle =
            "#444b55";

        ctx.lineWidth = 8;

        ctx.strokeRect(
            road.x,
            road.y,
            road.width,
            road.height
        );


        // Road markings

        ctx.strokeStyle = "#d5bb4b";

        ctx.lineWidth = 4;

        ctx.setLineDash([
            45,
            35
        ]);


        if (road.width > road.height) {

            ctx.beginPath();

            ctx.moveTo(
                road.x,
                road.y +
                road.height / 2
            );

            ctx.lineTo(
                road.x +
                road.width,
                road.y +
                road.height / 2
            );

            ctx.stroke();

        } else {

            ctx.beginPath();

            ctx.moveTo(
                road.x +
                road.width / 2,
                road.y
            );

            ctx.lineTo(
                road.x +
                road.width / 2,
                road.y +
                road.height
            );

            ctx.stroke();

        }


        ctx.setLineDash([]);

    });

}


// =====================================================
// DRAW BUILDINGS
// =====================================================

function drawBuildings() {

    buildings.forEach(building => {

        // Shadow

        ctx.fillStyle =
            "rgba(0,0,0,0.3)";

        ctx.fillRect(
            building.x + 15,
            building.y + 15,
            building.width,
            building.height
        );


        // Building

        ctx.fillStyle = "#26323b";

        ctx.fillRect(
            building.x,
            building.y,
            building.width,
            building.height
        );


        // Border

        ctx.strokeStyle =
            "#394651";

        ctx.lineWidth = 3;

        ctx.strokeRect(
            building.x,
            building.y,
            building.width,
            building.height
        );


        // Windows

        ctx.fillStyle =
            "rgba(0,229,255,0.15)";


        for (
            let x = building.x + 30;
            x < building.x + building.width - 20;
            x += 45
        ) {

            for (
                let y = building.y + 30;
                y < building.y + building.height - 20;
                y += 45
            ) {

                ctx.fillRect(
                    x,
                    y,
                    20,
                    18
                );

            }

        }

    });

}


// =====================================================
// DRAW CV LOCATIONS
// =====================================================

function drawLocations() {

    locations.forEach(location => {

        const pulse =
            Math.sin(
                Date.now() / 400
            ) * 5;


        // Glow

        ctx.beginPath();

        ctx.arc(
            location.x,
            location.y,
            65 + pulse,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            location.color + "18";

        ctx.fill();


        // Outer ring

        ctx.strokeStyle =
            location.color;

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.arc(
            location.x,
            location.y,
            45 + pulse,
            0,
            Math.PI * 2
        );

        ctx.stroke();


        // Marker

        ctx.fillStyle =
            location.color;

        ctx.beginPath();

        ctx.arc(
            location.x,
            location.y,
            28,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // Label

        ctx.font =
            "bold 15px Arial";

        ctx.textAlign = "center";

        ctx.fillStyle = "white";

        ctx.fillText(
            location.name,
            location.x,
            location.y - 58
        );

    });

}


// =====================================================
// DRAW CAR
// =====================================================

function drawCar() {

    ctx.save();


    ctx.translate(
        car.x,
        car.y
    );


    ctx.rotate(
        car.angle
    );


    // Shadow

    ctx.fillStyle =
        "rgba(0,0,0,0.4)";

    ctx.beginPath();

    ctx.roundRect(
        -27,
        -13,
        58,
        32,
        8
    );

    ctx.fill();


    // Car body

    ctx.fillStyle =
        "#00e5ff";

    ctx.beginPath();

    ctx.roundRect(
        -29,
        -16,
        58,
        32,
        7
    );

    ctx.fill();


    // Car roof

    ctx.fillStyle =
        "#0b2730";

    ctx.beginPath();

    ctx.roundRect(
        -8,
        -12,
        23,
        24,
        5
    );

    ctx.fill();


    // Front lights

    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        23,
        -10,
        6,
        6
    );

    ctx.fillRect(
        23,
        4,
        6,
        6
    );


    // Back lights

    ctx.fillStyle = "#ff3344";

    ctx.fillRect(
        -29,
        -10,
        5,
        6
    );

    ctx.fillRect(
        -29,
        4,
        5,
        6
    );


    // Wheels

    ctx.fillStyle = "#080808";

    ctx.fillRect(
        -17,
        -19,
        12,
        5
    );

    ctx.fillRect(
        -17,
        14,
        12,
        5
    );

    ctx.fillRect(
        10,
        -19,
        12,
        5
    );

    ctx.fillRect(
        10,
        14,
        12,
        5
    );


    ctx.restore();

}


// =====================================================
// INTERACTION
// =====================================================

let nearbyLocation = null;


function checkInteraction() {

    nearbyLocation = null;

    let closestDistance =
        Infinity;


    locations.forEach(location => {

        const dx =
            car.x - location.x;

        const dy =
            car.y - location.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distance < 150 &&
            distance < closestDistance
        ) {

            closestDistance =
                distance;

            nearbyLocation =
                location;

        }

    });


    const interaction =
        document.getElementById(
            "interaction"
        );


    if (nearbyLocation) {

        interaction.style.opacity = "1";

        interaction.textContent =
            `Press E to explore ${nearbyLocation.name}`;

    } else {

        interaction.style.opacity = "0";

    }

}


// =====================================================
// OPEN CV PANEL
// =====================================================

function interact() {

    if (!nearbyLocation) {
        return;
    }


    const modal =
        document.getElementById("modal");

    const title =
        document.getElementById(
            "modal-title"
        );

    const body =
        document.getElementById(
            "modal-body"
        );


    title.textContent =
        nearbyLocation.name;


    body.innerHTML =
        nearbyLocation.content;


    modal.classList.add("active");

}


// =====================================================
// CLOSE CV PANEL
// =====================================================

function closeModal() {

    const modal =
        document.getElementById("modal");

    modal.classList.remove("active");

}


// =====================================================
// MINIMAP
// =====================================================

function drawMinimap() {

    const minimap =
        document.getElementById(
            "minimap"
        );


    const width =
        minimap.clientWidth;

    const height =
        minimap.clientHeight;


    // Remove previous canvas

    minimap
        .querySelectorAll("canvas")
        .forEach(c => c.remove());


    const miniCanvas =
        document.createElement(
            "canvas"
        );


    miniCanvas.width = width;
    miniCanvas.height = height;


    const mini =
        miniCanvas.getContext("2d");


    // Background

    mini.fillStyle =
        "#13281a";

    mini.fillRect(
        0,
        0,
        width,
        height
    );


    // Roads

    mini.fillStyle =
        "#292d34";


    mini.fillRect(
        0,
        height * 0.42,
        width,
        height * 0.15
    );


    mini.fillRect(
        width * 0.45,
        0,
        width * 0.1,
        height
    );


    // Locations

    locations.forEach(location => {

        const x =
            location.x /
            WORLD.width *
            width;

        const y =
            location.y /
            WORLD.height *
            height;


        mini.fillStyle =
            location.color;


        mini.beginPath();

        mini.arc(
            x,
            y,
            4,
            0,
            Math.PI * 2
        );

        mini.fill();

    });


    // Player

    const playerX =
        car.x /
        WORLD.width *
        width;

    const playerY =
        car.y /
        WORLD.height *
        height;


    mini.fillStyle = "white";

    mini.beginPath();

    mini.arc(
        playerX,
        playerY,
        4,
        0,
        Math.PI * 2
    );

    mini.fill();


    minimap.appendChild(
        miniCanvas
    );

}


// =====================================================
// GAME LOOP
// =====================================================

function gameLoop() {

    updateCar();

    updateCamera();

    checkInteraction();

    drawWorld();

    drawMinimap();

    requestAnimationFrame(
        gameLoop
    );

}


// =====================================================
// START GAME
// =====================================================

gameLoop();
