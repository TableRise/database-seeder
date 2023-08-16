module.exports = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
