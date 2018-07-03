export function formatObject (obj, text) {
  for (let key in obj) {
    if (typeof obj[key] !== 'string') {
    } else {
      obj[key] = obj[key].replace(text,"<span style='color:#0c73c2'>"+text+"</span>")
    }
  }
  return obj
}
