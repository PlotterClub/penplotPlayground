export const drawPath = (context, path) => {
  context.beginPath();
  path.forEach(point => context.lineTo(point[0], point[1]));
  context.stroke();
}
