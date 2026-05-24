import { NextRequest, NextResponse } from "next/server";
import users from "@/data/users.json";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = users.find(
    (user) => user.email === email && user.password == password,
  );

  if (user) {
    return NextResponse.json({ message: "success" }, { status: 200 });
  }
  // your logic here...

  return NextResponse.json({ message: "Failure" }, { status: 400 });
}
