import Image from "next/image";
import Link from "next/link";

export function AboutPageContent() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <div className="mb-6 inline-flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="HyTracker"
            width={160}
            height={42}
            className="h-12 w-auto"
          />
        </div>
        <h1 className="font-heading mb-4 text-2xl font-semibold text-foreground sm:text-3xl">
          О нас
        </h1>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
          HyTracker — это каталог и мониторинг игровых серверов Hytale. Мы помогаем игрокам находить серверы под свой стиль игры и следить за онлайном и активностью сообществ.
        </p>
      </div>

      <section className="mb-12 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8" style={{ borderRadius: "var(--radius-xl)" }}>
        <h2 className="font-heading mb-3 text-xl font-medium text-foreground">
          Наша миссия
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Сделать выбор сервера простым и прозрачным: актуальный онлайн, голоса игроков и рейтинг в одном месте. Мы не связаны с Hypixel Studios — мы независимый проект для сообщества.
        </p>
      </section>

      <section className="mb-12 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8" style={{ borderRadius: "var(--radius-xl)" }}>
        <h2 className="font-heading mb-3 text-xl font-medium text-foreground">
          Команда
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          HyTracker поддерживается энтузиастами Hytale и мониторинга игровых серверов. Мы развиваем проект в свободное время и рады обратной связи от пользователей и владельцев серверов.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8" style={{ borderRadius: "var(--radius-xl)" }}>
        <h2 className="font-heading mb-3 text-xl font-medium text-foreground">
          Связаться с нами
        </h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          По вопросам сотрудничества, добавления сервера или предложений:
        </p>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="mailto:contact@hytracker.com" className="text-primary hover:underline">
              contact@hytracker.com
            </a>
          </li>
          <li>
            <Link href="/blog" className="text-primary hover:underline">
              Блог — новости и статьи
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
