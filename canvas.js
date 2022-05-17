const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined
}



class Circle {
  constructor(x, y, dx, dy, radius, maxRadius, fillColor, strokeColor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;  
    this.originalRadius = radius;
    this.maxRadius = maxRadius;
    this.fillColor = fillColor;  
    this.strokeColor = strokeColor;  


    this.draw = function () {
      c.beginPath();      
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);     
      c.strokeStyle = this.strokeColor;
      c.stroke();
      c.fillStyle = this.fillColor;
      c.fill();  
    };

    this.update = function () { 
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) this.dx = -this.dx;
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) this.dy = -this.dy;
      this.x += this.dx;
      this.y += this.dy;
      
      if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < this.maxRadius) {
           this.radius += 3;
        }
       
      } else if(this.radius > this.originalRadius) {
        this.radius -= 1;
      }

      this.draw();
    }
  }
}

function build(count) {
  const circleArray = [];
  const speed = 3;
  const maxRadius = 100;

  for (let i = 0; i < count; i++) {
    const radius = getRandom(10, 30)
    const x = Math.random() * (window.innerWidth - radius * 2) + radius;
    const y = Math.random() * (window.innerHeight - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * speed;
    const dy = (Math.random() - 0.5) * speed;
    const opacity = getRandom(0.1, 0.9)
    const h = Math.floor(Math.random() * 255);
    const s = Math.floor(Math.random() * 100);
    const l = Math.floor(Math.random() * 100);
    const fillColor = `hsla(${h},${s}%,${l}%,${opacity}`;
    strokeColor = `hsla(${h},${s}%,${l}%, 1`;
    circleArray.push(new Circle(x, y, dx, dy, radius, maxRadius, fillColor, strokeColor));
  }
 
  return circleArray;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function animate() {    
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight); 
  circles.map(item => {
    item.update()
  })
}

let circles = build(500);

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function (event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  circles = build(500);
});

animate();
