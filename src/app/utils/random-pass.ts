export function randomPassword(length) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&";
  let pass = "";
  for (let x = 0; x < length; x++) {
    let i = Math.floor(Math.random() * 62);
    pass += chars.charAt(i);
  }
  return pass;
}
