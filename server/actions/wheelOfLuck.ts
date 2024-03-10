"use server";
import { POINTS } from "@/lib/consts";
import * as crypto from "crypto";

export async function rollWheel() {
  const roll = {
    id: crypto.randomUUID(),
    point: POINTS[getRandomInt(0, POINTS.length - 1)],
  };
  return roll;
}

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
