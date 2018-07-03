export function formatObject (obj, text) {
  for (let key in obj) {
    if (typeof obj[key] !== 'string') {
    } else {
      obj[key] = obj[key].replace(text,"<span style='color:#0c73c2'>"+text+"</span>")
    }
  }
  return obj
}

export function curry(fn) {
  const arg = [].slice.call(arguments, 1);
  return function() {
    const newArgs = arg.concat([].slice.call(arguments));
    fn.apply(null, newArgs);
  }
}

function add (x, y) {
  return x + y;
}
