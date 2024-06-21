/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const sky = "s"
const border = "b"
const end = "e"

let level = 0
const levels = [
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
bbbbbbbbbb`
];

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
  [sky, bitmap`
7777777777777777
7722777777777772
7222277777777722
7777777722777777
7777777777777777
7777777777777777
7777777777722777
7777777777222277
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
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
);

setSolids([player, border])
setMap(levels[level])

setPushables({
  [player]: []
})


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
  if (tilesWith(end, player).length == 1 && level < 5) { 
    level = level + 1;
  } else if (level == 5) {
    addText("you win!", {y: 4, color: color`5` });
  }
})
