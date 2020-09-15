export default function capitalizeName (str) {
  let name = str.toLowerCase();
  let nameArr = name.split('');
  nameArr[0] = nameArr[0].toUpperCase();
  for (var i = 0; i < nameArr.length; i++) {
    if (nameArr[i] === ' ' && nameArr[i + 1] === ' ') {
      nameArr[i] = '';
    }
    if (nameArr[i] === ' ' && i === nameArr.length - 1) {
      nameArr[i] = '';
    }
    if (nameArr[i] === ' ') {
      nameArr[i + 1] = nameArr[i + 1].toUpperCase();
    }
  }
  return nameArr.join('');
}
