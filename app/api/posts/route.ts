import { getAllPosts } from "@/lib/notion";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}
