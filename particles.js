var lol = "<canvas style='height:100%;width:100$;'></canvas>";
  var ParticleSystem = function(container, center, count) {
    var i = 0,
        c = container.getContext('2d');

    count = count || 0;

    this.particles = [];

    this.center = {
      x: center.x || 0,
      y: center.y || 0
    };

    // Initialization
    for ( ; i < count ; ++i ) {
      var x = this.center.x,
          y = this.center.y,
          vx = Math.random() * 3 - 1.5,
          vy = Math.random() * 3 - 1.5;

      this.particles.push(new Particle(x, y, vx, vy));
    }

    this.update = function() {
      for ( i = 0 ; i < count ; ++i ) {

        // We don't want to process particles that
        // we can't see anymore
        if (this.particles[i].x > 0 &&
          this.particles[i].x < container.width &&
          this.particles[i].y > 0 &&
          this.particles[i].y < container.height) {

          this.particles[i].update();
          c.beginPath();
          c.arc(this.particles[i].x, this.particles[i].y, 1, 0 , 2 * Math.PI, false);
          c.fill();        
        } else {
          this.particles[i].x = this.center.x;
          this.particles[i].y = this.center.y;
        }
      }
    };
  };


  // shim layer with setTimeout fallback by Paul Irish
  // Used as an efficient and browser-friendly
  // replacement for setTimeout or setInterval
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame   ||
    window.mozRequestAnimationFrame      ||
    window.oRequestAnimationFrame        ||
    window.msRequestAnimationFrame       ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  // Call the init() function on load
 init();

  function init() {
    // Get a reference to the canvas object in the HTML
    var cobj = document.getElementsByTagName('canvas')[0],
        c = cobj.getContext('2d'),
        p = null;
      

    // Make the canvas have the same size as
    // the browser window
    cobj.width = document.body.clientWidth;
    cobj.height = document.body.clientHeight;

    c.fillStyle = '#FFFFFF';

    p = new ParticleSystem(cobj, { x: cobj.width / 2, y: cobj.height / 2 }, 1000);
      
      document.addEventListener('mousemove', function(e) {
        p.center.x = e.clientX;
        p.center.y = e.clientY;   

        c.clearRect(0, 0, cobj.width, cobj.height);              
        p.update();          
      }, false);
 
 
    //paint();      
      
    function paint() {
      

      p.update();

      // Call paint() again, recursively
      requestAnimFrame(paint);
    }
  }
})();
