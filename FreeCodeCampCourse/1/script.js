const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
let frameX = 0;
let frameY = 0;
const spritWidth = 575;
const spritHeight = 523;
let gameFrame = 0;
const staggerFrame = 3;

const spriteAnimation = [];
const animationState = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 5,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationState.forEach((state, index) => {
  let frames = {
    loc: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spritWidth;
    let positionY = index * spritHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimation[state.name] = frames;
});
let playerState = "bite";
console.log(spriteAnimation);

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // ctx.fillRect(100, 50, 100, 100);
  //ctx.drearImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
  let position =
    Math.floor(gameFrame / staggerFrame) %
    spriteAnimation[playerState].loc.length;
  frameX = spritWidth * position;
  ctx.drawImage(
    playerImage,
    spriteAnimation[playerState].loc[position].x,
    spriteAnimation[playerState].loc[position].y,
    spritWidth,
    spritHeight,
    0,
    0,
    spritWidth,
    spritHeight
  );
  /* if (gameFrame % staggerFrame === 0)
    if (frameX < 4) frameX++;
    else frameX = 0; */
  gameFrame++;
  requestAnimationFrame(animate);
};

animate();
document.getElementById("animations").addEventListener("change", (e) => {
  playerState = e.target.value;
});
