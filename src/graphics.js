import {splitMeeple} from './index';

function paintMeeple(ctx, mps, elevator, bounds, floors) {
  for (var floor = 0; floor < mps.length; ++floor) {
    var meepleAtFloor = mps[floor];
    var [goingDown, goingUp] = splitMeeple(meepleAtFloor, floor);
    ctx.beginPath();
    ctx.fillStyle = 'red';
    for (var m = 0; m < goingDown.length; ++m) {
      ctx.arc(elevator.x + elevator.elevatorSize + 20 + 15 * m,
              (bounds.height / floors) * (0.5 + floors - (floor + 1)),
              5, 0, 2 * Math.PI, false);
      ctx.closePath();
    }
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'green';
    for (var m = 0; m < goingUp.length; ++m) {
      ctx.arc(elevator.x - 20 - 15 * m,
              (bounds.height / floors) * (0.5 + floors - (floor + 1)),
              5, 0, 2 * Math.PI, false);
      ctx.closePath();
    }
    ctx.fill();
  }
}

function paintCallFloors(ctx, elevator, bounds, floors) {
  ctx.fillStyle = 'rgba(254, 165, 40, 0.3)';
  var floorHeight = bounds.height / floors;
  for (var index = 0; index < elevator.meeple.length; ++index) {
    var floor = elevator.meeple[index];
    var floorY = bounds.height - (floor + 1) * floorHeight;
    ctx.fillRect(0, floorY, bounds.width, floorHeight);
  }
}

function paintBuilding(ctx, elevator, bounds, floors) {
  // track
  ctx.fillStyle = 'darkgray';
  ctx.fillRect(elevator.x, 0, elevator.elevatorSize, bounds.height);
  // floors
  ctx.font = '16pt sans-serif';
  var floorHeight = bounds.height / floors;
  ctx.textAlign = 'center';
  for (var f = floors; f > 0; --f) {
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, f * floorHeight, bounds.width, 2);
    ctx.fillStyle = 'white';
    ctx.fillText('' + floors - f,
      elevator.x + elevator.elevatorSize / 2, f * floorHeight - floorHeight / 2 + 5);
  }
}

function paintElevator(ctx, e) {
  // car
  ctx.fillStyle = 'black';
  ctx.fillRect(e.x, e.y, e.elevatorSize, e.elevatorSize);
}

function paint(canvas, elevator, bounds, floors, meeple) {
  let ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width, canvas.height);
  paintBuilding(ctx, elevator, bounds, floors);
  paintCallFloors(ctx, elevator, bounds, floors);
  paintElevator(ctx, elevator);
  paintMeeple(ctx, meeple, elevator, bounds, floors);
}

export {paint};
