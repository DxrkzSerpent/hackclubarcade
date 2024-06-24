/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const border = "b"
const end = "e"
const powerup = "u"
var speed = false;
var counter = 0;

setLegend(
  [player, bitmap`
................
......00000.....
.....00...0.....
....00....00....
....0......0....
....00...000....
.....00..0......
......0000......
.......00.......
....00000000....
.......00.......
.......00.......
......0000......
.....00..00.....
.....0....0.....
.....0....0.....`],
  [border, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [end, bitmap`
................
................
................
................
....HHHHHHHH....
....H555555H....
....H5HHHH5H....
....H5H55H5H....
....H5H55H5H....
....H5HHHH5H....
....H555555H....
....HHHHHHHH....
................
................
................
................`],
  [powerup, bitmap`
................
....99999999....
..999666666999..
..966666666669..
.99666666666699.
.96666666666669.
.96666666666669.
.96666666666669.
.96666666666669.
.96666666666669.
.96666666666669.
.99666666666699.
..966666666669..
..999666666999..
....99999999....
................`],
);

setSolids([player, border])

setPushables({
  [player]: []
})

let level = 0
const levels = [
  map`
bbbbbbb
bpbu..b
b.b.b.b
b.b.b.b
b.b.b.b
b...beb
bbbbbbb`,
  map`
bbbbbbbbbb
bpb......b
b.b.bbbb.b
b.b.b....b
b.b.b.bb.b
b.b.b.bb.b
b.b.b.eb.b
b.b.bbbb.b
b.....bb.b
bbbbbbbbbb`,
  map`
bbbbbbbbbb
bp.......b
bbbbb.bb.b
bbbbb..b.b
bb..eb.b.b
bb.bbb.b.b
bb.....b.b
b..bbbbb.b
b.bb.....b
bbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbb
b...p...........b
b.bb.bbbbbbbbbbbb
b.b...........b.b
b.b..bbbbbbbbbb.b
b.b..be.........b
b.b..bbbbbbbbbb.b
b.b.bbbbbbbbbbb.b
b.b.b.........b.b
b.b.bbbbbbbbb.b.b
b.b.......bbb.b.b
b.b.bbbbb.......b
b.b.....bbbbbbbbb
b.b.bbb.........b
b.b.b...bbbbbbb.b
b...bbbbb.......b
bbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
b............b.b...b
b.bb..bbbbbbbb.b.b.b
b.b...b........b.b.b
b.bbbbb.b.bbbb.b.b.b
b.......b.b..b.b.b.b
bbbbbbbbb....b...b.b
b.......bbbb.bbbbb.b
b.bbbbb.b..b...b.b.b
b.b...b.b..bbb.b.b.b
b.b.b........b.b.b.b
b.bbbb.b.bbbbb.b.b.b
b....b.b.b.....b.b.b
bbbb.b.b.b.bbb.b.b.b
b....b.b.b.b.b.b.b.b
b.bbbbbbbb.b...b.b.b
b.be.......b.b.b...b
b.bbbbbbbbbbbbbbbb.b
b....p.............b
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbb
b...................p.....b
bbbbbbbbbb.b.bbbbbbb.bbbb.b
b..........b.b.b...b.b.bb.b
b.bbbbbbbb.b.....b.b.b..b.b
b.b........b.bbb.b.b.bb.b.b
b.b.bbbbbbbb.b.b.b.b....b.b
b.bbb........b.bbb.b.bbbb.b
b.....bbbbbb.b.bb..b......b
bbbbb.b......b....bbbbb.b.b
b...bbbbbbbb.bbb.bb.b.b.b.b
b.b.b......b...bbbb.b.bbb.b
b.b.b..bbbbbbb......b.b...b
b.b.bb.be....bbbbbbbb.b.b.b
b.b....bbbbb........b...b.b
b.b.bb.b...b.bbbbbbbbbbbb.b
b.b.b...bb.b.b..........b.b
b.b.bbb.bb.b.b.bbbbbbbb.b.b
b.b...b..b.b.b.b...b..b.b.b
b.b.b.bb.b.b.b...b....b.b.b
bbb.b.b..b.b.bbbbbbbb.b.b.b
b.b.b.b.bb.b........b.b...b
b.b.b.b..b.bbbbbb.bbb.bbbbb
b.b.b.b.............b.....b
b.b.bbbbbbbbbbbbbbbbbbb.bbb
b.........................b
bbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
...............
.........p.....`,
];

setMap(levels[level])

onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("s", () => {
  getFirst(player).y += 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});


afterInput(() => {
  if (tilesWith(end, player).length == 1 && level < 6) {
    level = level + 1;
    setMap(levels[level])
  } else if (level == 6) {
    addText("you win!", { y: 4, color: color`5` });
  }

  
})

function superspeed() {
  if (tilesWith(powerup, player).length == 1) {
     counter += 1;
  } 
  if (counter == 1) {
      speed = true;
  }
}

var gameLoop = setInterval(() => {
  superspeed()
})
