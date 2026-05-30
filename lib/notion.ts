/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  cover: string | null;
  published: boolean;
  authors: string[];
}

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

function getRichText(prop: any): string {
  if (!prop) return "";
  if (prop.type === "rich_text") return prop.rich_text.map((t: any) => t.plain_text).join("");
  if (prop.type === "title") return prop.title.map((t: any) => t.plain_text).join("");
  return "";
}

function getSelect(prop: any): string {
  if (!prop || prop.type !== "select" || !prop.select) return "";
  return prop.select.name;
}

function getDate(prop: any): string {
  if (!prop || prop.type !== "date" || !prop.date) return "";
  return prop.date.start;
}

function getCover(page: PageObjectResponse): string | null {
  if (!page.cover) return null;
  if (page.cover.type === "external") return page.cover.external.url;
  if (page.cover.type === "file") return page.cover.file.url;
  return null;
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: { property: "Published", checkbox: { equals: true } },
      sorts: [{ property: "Date", direction: "descending" }],
    });

    return response.results.map((page) => {
      const p = page as PageObjectResponse;
      const props = p.properties;
      return {
        id: p.id,
        title: getRichText(props["Title"] || props["Name"]),
        slug: getRichText(props["Slug"]),
        date: getDate(props["Date"]),
        category: getSelect(props["Category"]),
        excerpt: getRichText(props["Excerpt"]),
        cover: getCover(p),
        published: true,
        authors: getRichText(props["Author"]).split(",").map((a) => a.trim()).filter(Boolean),
      };
    });
  } catch (e) {
    console.error("[notion] getAllPosts error:", e);
    return [];
  }
}

export async function getPostBySlug(
  slug: string
): Promise<{ post: BlogPost; markdown: string } | null> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      filter: {
        and: [
          { property: "Slug", rich_text: { equals: slug } },
          { property: "Published", checkbox: { equals: true } },
        ],
      },
    });

    if (!response.results.length) return null;

    const page = response.results[0] as PageObjectResponse;
    const props = page.properties;

    const post: BlogPost = {
      id: page.id,
      title: getRichText(props["Title"] || props["Name"]),
      slug: getRichText(props["Slug"]),
      date: getDate(props["Date"]),
      category: getSelect(props["Category"]),
      excerpt: getRichText(props["Excerpt"]),
      cover: getCover(page),
      published: true,
      authors: getRichText(props["Author"]).split(",").map((a) => a.trim()).filter(Boolean),
    };

    const mdBlocks = await n2m.pageToMarkdown(page.id);
    const markdown = n2m.toMarkdownString(mdBlocks).parent;

    return { post, markdown };
  } catch (e) {
    console.error("[notion] getPostBySlug error:", e);
    return null;
  }
}