export function getRandomColor() {
  var colors = [
    "blue",
    "yellow",
    "orange",
    "pink",
    "purple",
    "red",
    "green",
    "cyan",
    "magenta",
    "gold",
  ];

  let id = Math.floor(Math.random() * 10);

  return colors[id];
}
