import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogSlugs } from "../../data/blog";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Simple render: paragraphs and **bold** */
function ArticleBody({ content }: { content: string }) {
  const paragraphs = content.trim().split(/\n\n+/);
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => {
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={i} className="text-sm leading-relaxed text-foreground">
            {parts.map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j}>{part.slice(2, -2)}</strong>
              ) : (
                <span key={j}>{part}</span>
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Статья — HyTracker" };
  return {
    title: `${post.title} — HyTracker`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          Главная
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:text-primary">
          Блог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{post.title}</span>
      </nav>
      <article>
        <time className="block text-xs text-muted-foreground">
          {formatDate(post.date)}
        </time>
        <h1 className="font-heading mt-2 mb-6 text-2xl font-semibold text-foreground sm:text-3xl">
          {post.title}
        </h1>
        <ArticleBody content={post.content} />
      </article>
      <div className="mt-10 border-t border-border pt-6">
        <Link
          href="/blog"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Все статьи
        </Link>
      </div>
    </div>
  );
}
