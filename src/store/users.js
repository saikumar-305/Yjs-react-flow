import { axisBottom } from "d3-axis";
import { atom } from "recoil";

const usersState = atom({
  key: "users",
  default: [],
});
