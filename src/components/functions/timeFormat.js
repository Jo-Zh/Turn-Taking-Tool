const timeFormat = (i) => {
  let min = Math.floor(i / 60);
  let sec = i % 60;
  return (min >= 10 ? min : "0" + min) + ":" + (sec >= 10 ? sec : "0" + sec);
};

export default timeFormat;
