import Link from "next/link";
import { blogPosts } from "../data/blog";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogPageContent() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-heading mb-2 text-2xl font-semibold text-foreground sm:text-3xl">
        Блог
      </h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Новости и материалы про Hytale и сообщество серверов.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            style={{ borderRadius: "var(--radius-xl)" }}
          >
            <div
              className="h-40 w-full bg-muted"
              style={{
                backgroundImage: "url('/background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              <time className="mb-1 text-xs text-muted-foreground">
                {formatDate(post.date)}
              </time>
              <h2 className="font-heading mb-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                {post.title}
              </h2>
              <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <span className="mt-3 text-sm font-medium text-primary">
                Читать далее
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
