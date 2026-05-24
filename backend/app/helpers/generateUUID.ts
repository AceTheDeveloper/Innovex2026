import crypto from "crypto";

export default function generateUUID(): string {
  const UUID = crypto.randomUUID();

  return UUID.toString();
}
