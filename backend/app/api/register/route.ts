import { NextRequest, NextResponse } from "next/server";
import users from "@/data/users.json";
import { User } from "@/app/intefaces/User";
import generateUUID from "@/app/helpers/generateUUID";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const { name, email, password, role, country } = await req.json();

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return NextResponse.json(
      { message: "User Already Exists" },
      { status: 400 },
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let id = generateUUID();
  while (users.find((user) => user.id === id)) {
    id = generateUUID();
  }

  const created_at = new Date().toISOString().split("T")[0];

  const userObject: User = {
    id,
    name,
    email,
    password: hashedPassword,
    role,
    country,
    created_at,
  };

  users.push(userObject);

  const filePath = path.join(process.cwd(), "data/users.json");
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ message: "Account Created" }, { status: 200 });
}
