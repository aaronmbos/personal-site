import { hash, compare } from "bcrypt";

const saltRounds = 10;
const value = "";

const hashed = await hash(value, saltRounds);

console.log(hashed);

console.log(await compare(value, hashed));
console.log(await compare(value + "sdfa", hashed));
