import { analyzeRoom } from "@/lib/roomMap";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    text?: string;
    previousInput?: string;
    previousRoomType?: Parameters<typeof analyzeRoom>[1] extends {
      previousRoomType?: infer T;
    }
      ? T
      : never;
  };
  const result = analyzeRoom(body.text ?? "", {
    previousInput: body.previousInput,
    previousRoomType: body.previousRoomType,
  });

  return NextResponse.json(result);
}
