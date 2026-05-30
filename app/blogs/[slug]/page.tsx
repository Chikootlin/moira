/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPostBySlug, getAllPosts } from "@/lib/notion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPostBySlug(decodeURIComponent(slug));
  if (!result) return {};
  return {
    title: `${result.post.title} | ~/Moira`,
    description: result.post.excerpt,
  };
}

const components: any = {
  h1: ({ children }: any) => (
    <h1 className="font-display font-bold text-3xl mt-10 mb-4 text-white">{children}</h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="font-display font-bold text-2xl mt-8 mb-3 pb-2 text-white border-b border-[#1e2d4d]">{children}</h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="font-display font-bold text-xl mt-6 mb-2 text-[#4dc9e6]">{children}</h3>
  ),

  p: ({ children, node }: any) => {
    const hasPreChild = node?.children?.some((c: any) => c.tagName === "pre");
    if (hasPreChild) return <>{children}</>;
    return (
      <p className="font-mono text-sm leading-[1.9] mb-5 text-[#e2e8f0] text-justify">{children}</p>
    );
  },

  strong: ({ children }: any) => (
    <strong className="font-bold text-white">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-[#6b7fa3]">{children}</em>
  ),

  a: ({ href, children }: any) => (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="text-[#4dc9e6] underline underline-offset-2 transition-colors hover:text-white">
      {children}
    </a>
  ),

  pre: ({ children }: any) => {
    const child = Array.isArray(children) ? children[0] : children;
    const className = child?.props?.className || "";
    const language = className.replace("language-", "") || "";
    const code = String(child?.props?.children ?? "").replace(/\n$/, "");
    return <CodeBlock code={code} language={language} />;
  },

  code: ({ className, children, ...rest }: any) => {
    if (className) return <code className={className} {...rest}>{children}</code>;
    return (
      <code className="font-mono text-sm px-1.5 py-0.5 rounded bg-[#111c33] border border-[#1e2d4d] text-[#4dc9e6]">
        {String(children)}
      </code>
    );
  },

  blockquote: ({ children }: any) => (
    <blockquote className="my-6 pl-4 border-l-[3px] border-[#4dc9e6] font-mono text-sm leading-relaxed italic text-[#6b7fa3]">
      {children}
    </blockquote>
  ),

  ul: ({ children }: any) => (
    <ul className="my-4 space-y-1 font-mono text-sm text-[#e2e8f0] list-disc pl-6">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="my-4 space-y-1 font-mono text-sm text-[#e2e8f0] list-decimal pl-6">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed text-[#e2e8f0]">{children}</li>
  ),

  img: ({ src, alt }: any) => {
    if (!src || typeof src !== "string") return null;
    return (
      <span className="block my-6">
        <Image src={src} alt={alt || ""} width={800} height={450} className="rounded-lg w-full h-auto border border-[#1e2d4d]" unoptimized />
        {alt && (
          <span className="block text-center font-mono text-xs text-[#6b7fa3] mt-2">{alt}</span>
        )}
      </span>
    );
  },

  hr: () => <hr className="my-8 border-[#1e2d4d]" />,

  table: ({ children }: any) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-[#1e2d4d]">
      <table className="w-full font-mono text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="px-4 py-2 text-left font-semibold bg-[#162040] text-[#4dc9e6] border-b border-[#1e2d4d]">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-4 py-2 text-[#e2e8f0] border-b border-[#1e2d4d]">{children}</td>
  ),
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getPostBySlug(decodeURIComponent(slug));
  if (!result) notFound();

  const { post, markdown } = result;
  const date = post.date ? format(new Date(post.date), "MMM dd, yyyy").toUpperCase() : "";
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 animate-fade-in-up">
      <Link href="/blogs" className="font-mono text-xs flex items-center gap-1 mb-8 text-[#6b7fa3] hover:text-[#4dc9e6] transition-colors">
        <ArrowLeft size={12} /> Back To All Post
      </Link>

      <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 leading-tight text-[#e2e8f0]">
        {post.title}
      </h1>

      {post.excerpt && (
        <p className="font-mono text-sm mb-6 text-[#6b7fa3] text-justify">{post.excerpt}</p>
      )}

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-10">
        <span className="font-mono text-xs text-[#6b7fa3]">{date}</span>
        {post.category && (
          <>
            <span className="text-[#1e2d4d]">·</span>
            <span className="font-mono text-xs uppercase tracking-wider text-[#4dc9e6]">
              {post.category}
            </span>
          </>
        )}
        {post.authors && post.authors.length > 0 && (
          <>
            <span className="text-[#1e2d4d]">·</span>
            <div className="flex items-center gap-2">
              {post.authors.map((author) => (
                <span key={author} className="font-mono text-xs px-2 py-0.5 rounded-full border border-[#1e2d4d] bg-[#111c33] text-[#6b7fa3]">
                  {author}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      {post.cover && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 border border-[#1e2d4d]">
          <Image src={post.cover} alt={post.title} fill sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority quality={85} />
        </div>
      )}

      <article>
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
          {markdown}
        </ReactMarkdown>
      </article>
    </div>
  );
}