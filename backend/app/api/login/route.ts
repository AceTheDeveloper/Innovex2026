import { NextRequest, NextResponse } from "next/server";
import users from "@/data/users.json";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = users.find(
    async (user) =>
      user.email === email && (await bcrypt.compare(password, user.password)),
  );

  if (user) {
    return NextResponse.json({ message: "success" }, { status: 200 });
  }

  return NextResponse.json({ message: "Failure" }, { status: 400 });
}
