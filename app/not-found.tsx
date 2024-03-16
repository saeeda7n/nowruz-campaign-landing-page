import React from "react";
import type { Metadata } from "next";
import prisma from "@/prisma/prisma";

const NotFound = async () => {
  return <div>چیزی یافت نشد!</div>;
};

export default NotFound;
