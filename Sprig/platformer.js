/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"

setLegend(
  [ player, bitmap`
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
.....0....0.....` ]
);

setSolids([])

let level = 0
const levels = [
  map`
...............
...............
...............
...............
...............
...............
.............p.`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

function inAir() {
  if (player.y >= 1) {
    return true
  }
}
onInput("w", () => {
  if (!inAir()) {
    getFirst(player).y -=3;
  } else if (inAir()) {
    getFirst(player).y +=1;
  }
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
  if (inAir()) {
    getFirst(player).y += 1;
  }
  
})