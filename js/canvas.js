// paper.install(window);

// var SQRT_3 = Math.pow(3, 0.5);
// var triangle, D, mousePos, position;
// var count = 50;

// window.onload = function () {
//   paper.setup('triangle-lost-in-space');
//   // D = Math.max(paper.view.getSize().width, paper.view.getSize().height);
//   // D = Math.max(paper.view.getSize().width, paper.view.getSize().height);

//   mousePos = paper.view.center.add([view.bounds.width / 3, 100]);
//   position = paper.view.center;

//   // Draw the BG
//   var background = new Path.Rectangle(view.bounds);
//   // background.fillColor = '#3B3251';
//   buildStars();
//   triangle = new Triangle(50);
//   paper.view.draw();

//   paper.view.onFrame = function (event) {
//     position = position.add((mousePos.subtract(position).divide(10)));
//     var vector = (view.center.subtract(position)).divide(10);
//     moveStars(vector.multiply(3));
//     triangle.update();
//   };
// };
// // ---------------------------------------------------
// //  Helpers
// // ---------------------------------------------------
// window.onresize = function () {
//   project.clear();
//   // D = Math.max(paper.view.getSize().width, paper.view.getSize().height);
//   // Draw the BG
//   var background = new Path.Rectangle(view.bounds);
//   // background.fillColor = '#3B3251';
//   buildStars();
//   triangle.build(50);
// };

// var random = function (minimum, maximum) {
//   return Math.round(Math.random() * (maximum - minimum) + minimum);
// };

// var map = function (n, start1, stop1, start2, stop2) {
//   return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
// };
// // ---------------------------------------------------
// //  Triangle
// // ---------------------------------------------------
// var Triangle = function (a) {
//   this.build(a);
// };

// Triangle.prototype.build = function (a) {
//   // The points of the triangle
//   var segments = [new paper.Point(0, -a / SQRT_3),
//     new paper.Point(-a / 2, a * 0.5 / SQRT_3),
//     new paper.Point(a / 2, a * 0.5 / SQRT_3)
//   ];

//   this.flameSize = a / SQRT_3;
//   var flameSegments = [new paper.Point(0, this.flameSize),
//     new paper.Point(-a / 3, a * 0.4 / SQRT_3),
//     new paper.Point(a / 3, a * 0.4 / SQRT_3)
//   ];

//   // this.flame = new Path({
//   //   segments: flameSegments,
//   //   closed: false,
//   //   fillColor: '#FCE589'
//   // });
//   // this.ship = new Path({
//   //   segments: segments,
//   //   closed: false,
//   //   fillColor: '#FF7885'
//   // });
//   this.group = new Group({
//     children: [],
//     position: view.center
//   });
// };

// Triangle.prototype.update = function () {
//   // this.flame.segments[0].point.x = random(this.flame.segments[1].point.x, this.flame.segments[2].point.x);

//   // var dist = mousePos.subtract(paper.view.center).length;
//   // var angle = mousePos.subtract(paper.view.center).angle;
//   // var spread = map(dist, 0, D / 2, 10, 30);

//   // this.flame.segments[0].point = paper.view.center.subtract(new Point({
//   //   length: map(dist, 0, D / 2, 2 * this.flameSize / 3, this.flameSize),
//   //   angle: random(angle - spread, angle + spread)
//   // }));
// };

// Triangle.prototype.rotate = function () {
//   // var angle = paper.view.center.subtract(mousePos).angle - paper.view.center.subtract(this.ship.segments[0].point)
//   //   .angle;

//   // this.group.rotate(angle, paper.view.center);
// };
// // ---------------------------------------------------
// //  Stars (from paperjs.org examples section)
// // ---------------------------------------------------
// window.onmousemove = function (event) {
//   if (!event) return;
//   mousePos.x = event.x;
//   mousePos.y = event.y;
//   triangle.rotate();
// };

// var buildStars = function () {
//   // Create a symbol, which we will use to place instances of later:
//   var path = new Path.Circle({
//     center: [0, 0],
//     radius: 3,
//     fillColor: 'white',
//     strokeColor: 'white'
//   });

//   var symbol = new Symbol(path);

//   // Place the instances of the symbol:
//   for (var i = 0; i < count; i++) {
//     // The center position is a random point in the view:
//     var center = Point.random().multiply(paper.view.size);
//     var placed = symbol.place(center);
//     placed.scale(i / count + 0.01);
//     placed.data = {
//       vector: new Point({
//         angle: Math.random() * 360,
//         length: (i / count) * Math.random() /5
//       })
//     };
//   }

//   var vector = new Point({
//     angle: 45,
//     length: 0
//   });
// };

// var keepInView = function (item) {
//   var position = item.position;
//   var viewBounds = paper.view.bounds;
//   if (position.isInside(viewBounds))
//     return;
//   var itemBounds = item.bounds;
//   if (position.x > viewBounds.width + 5) {
//     position.x = -item.bounds.width;
//   }

//   if (position.x < -itemBounds.width - 5) {
//     position.x = viewBounds.width;
//   }

//   if (position.y > viewBounds.height + 5) {
//     position.y = -itemBounds.height;
//   }

//   if (position.y < -itemBounds.height - 5) {
//     position.y = viewBounds.height
//   }
// };

// var moveStars = function (vector) {
//   // Run through the active layer's children list and change
//   // the position of the placed symbols:
//   var layer = project.activeLayer;
//   for (var i = 1; i < count + 1; i++) {
//     var item = layer.children[i];
//     var size = item.bounds.size;
//     var length = vector.length / 10 * size.width / 10;
//     item.position = item.position.add(vector.normalize(length).add(item.data.vector));
//     keepInView(item);
//   }
// };


paper.install(window);

var SQRT_3 = Math.pow(3, 0.5);
var triangle, D, mousePos, position;
var count = 50;

// 设置屏幕的最小宽度和高度
var minWidth = 600;
var minHeight = 400;
var isAnimationInitialized = false;

function initializeAnimation() {
  if (isAnimationInitialized) return; // 防止重复初始化

  paper.setup('triangle-lost-in-space');

  mousePos = paper.view.center.add([view.bounds.width / 3, 100]);
  position = paper.view.center;

  // 绘制背景
  var background = new Path.Rectangle(view.bounds);
  buildStars();
  triangle = new Triangle(50);
  paper.view.draw();

  paper.view.onFrame = function (event) {
    if (!isAnimationInitialized) return; // 如果动画已销毁，不再处理

    position = position.add((mousePos.subtract(position).divide(10)));
    var vector = (view.center.subtract(position)).divide(10);
    moveStars(vector.multiply(3));
    triangle.update();
  };

  window.onresize = function () {
    handleResize();
  };

  window.onmousemove = function (event) {
    if (!event) return;
    mousePos.x = event.x;
    mousePos.y = event.y;
    triangle.rotate();
  };

  isAnimationInitialized = true;
}

function destroyAnimation() {
  if (!isAnimationInitialized) return; // 防止重复销毁

  project.clear();
  isAnimationInitialized = false;
  // 取消所有可能影响的事件处理
  paper.view.onFrame = null;
  window.onmousemove = null;
}

function handleResize() {
  var viewportWidth = window.innerWidth;
  var viewportHeight = window.innerHeight;

  if (viewportWidth >= minWidth && viewportHeight >= minHeight) {
    if (!isAnimationInitialized) {
      initializeAnimation();
    }
  } else {
    if (isAnimationInitialized) {
      destroyAnimation();
    }
  }
}

window.onload = function () {
  handleResize(); // 在页面加载时检查尺寸
};

// ---------------------------------------------------
//  Helpers
// ---------------------------------------------------
var random = function (minimum, maximum) {
  return Math.round(Math.random() * (maximum - minimum) + minimum);
};

var map = function (n, start1, stop1, start2, stop2) {
  return (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
};

// ---------------------------------------------------
//  Triangle
// ---------------------------------------------------
var Triangle = function (a) {
  this.build(a);
};

Triangle.prototype.build = function (a) {
  var segments = [new paper.Point(0, -a / SQRT_3),
    new paper.Point(-a / 2, a * 0.5 / SQRT_3),
    new paper.Point(a / 2, a * 0.5 / SQRT_3)
  ];

  this.flameSize = a / SQRT_3;
  var flameSegments = [new paper.Point(0, this.flameSize),
    new paper.Point(-a / 3, a * 0.4 / SQRT_3),
    new paper.Point(a / 3, a * 0.4 / SQRT_3)
  ];

  this.group = new Group({
    children: [],
    position: view.center
  });
};

Triangle.prototype.update = function () {
  // Empty for now, but intended for updates based on mouse position
};

Triangle.prototype.rotate = function () {
  // Empty for now, but intended for rotation based on mouse position
};

// ---------------------------------------------------
//  Stars
// ---------------------------------------------------
var buildStars = function () {
  var path = new Path.Circle({
    center: [0, 0],
    radius: 3,
    fillColor: 'white',
    strokeColor: 'white'
  });

  var symbol = new Symbol(path);

  for (var i = 0; i < count; i++) {
    var center = Point.random().multiply(paper.view.size);
    var placed = symbol.place(center);
    placed.scale(i / count + 0.01);
    placed.data = {
      vector: new Point({
        angle: Math.random() * 360,
        length: (i / count) * Math.random() /5
      })
    };
  }
};

var keepInView = function (item) {
  var position = item.position;
  var viewBounds = paper.view.bounds;
  if (position.isInside(viewBounds))
    return;
  var itemBounds = item.bounds;
  if (position.x > viewBounds.width + 5) {
    position.x = -item.bounds.width;
  }

  if (position.x < -itemBounds.width - 5) {
    position.x = viewBounds.width;
  }

  if (position.y > viewBounds.height + 5) {
    position.y = -itemBounds.height;
  }

  if (position.y < -itemBounds.height - 5) {
    position.y = viewBounds.height
  }
};

var moveStars = function (vector) {
  var layer = project.activeLayer;
  if (layer && layer.children) { // 添加 null 检查
    for (var i = 1; i < count + 1; i++) {
      var item = layer.children[i];
      var size = item.bounds.size;
      var length = vector.length / 10 * size.width / 10;
      item.position = item.position.add(vector.normalize(length).add(item.data.vector));
      keepInView(item);
    }
  }
};



