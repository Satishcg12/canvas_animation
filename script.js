const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
var mouseX = null;
var mouseY = null;
var scrolltop = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
c.strokeStyle = "white";
 
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("scroll", () => {
  canvas.style.backgroundPositionY = `${canvas.getBoundingClientRect().y / 2}px`;

  for (var i = 0; i < dotsArray.length; i++) {
    dotsArray[i].update();
  }
  
  mousePositonChange()
});

const dotsArray = [];
function Dots(x, y) {
  this.x = x;
  this.y = y;
  const lineGap = 80;
  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
    c.moveTo(this.x, this.y);

    c.lineTo(mouseX, mouseY);
    if (
      mouseX - this.x < lineGap &&
      mouseX - this.x > -lineGap &&
      mouseY - this.y < lineGap &&
      mouseY - this.y > -lineGap
    )
      c.stroke();
    c.fill();
    c.closePath();
  };
  this.update = function () {
    this.draw();
  };
}
for (var i = 0; i < 180; i++) {
  const r = {
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
  };
  dotsArray.push(new Dots(r.x, r.y));
  dotsArray[i].draw();
}
console.log(dotsArray);
canvas.addEventListener("mousemove", () => {
  mousePositonChange()
});
canvas.addEventListener("mouseleave", () => {
  c.strokeStyle = "transparent";
});
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  dotsArray.forEach((e) => {
    e.update();
  });
}
animate();

const mousePositonChange= ()=>{
  
  const event = window.event;
  var react = canvas.getBoundingClientRect();
  mouseX = event.clientX - react.left;
  mouseY = event.clientY - react.top;
  c.strokeStyle = "white";

}

// text animation

const inViewport = (entries, observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
  });
};

const Obs = new IntersectionObserver(inViewport);
const obsOptions = {};

const ELs_inViewport = document.querySelectorAll("[data-inviewport]");
ELs_inViewport.forEach((EL) => {
  Obs.observe(EL, obsOptions);
});
