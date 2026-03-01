import Link from "next/link";

export const metadata = {
  title: "Использование Cookie — HyTracker",
  description: "Информация об использовании файлов cookie на HyTracker.",
};

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Cookie</span>
      </nav>
      <h1 className="font-heading mb-6 text-2xl font-semibold text-foreground sm:text-3xl">
        Использование Cookie
      </h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Последнее обновление: 2026 год.
      </p>
      <div className="space-y-4 text-sm leading-relaxed text-foreground">
        <p>
          На сайте HyTracker могут использоваться файлы cookie и аналогичные технологии для обеспечения корректной работы сервиса и улучшения пользовательского опыта.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">Что такое cookie</h2>
        <p>
          Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они позволяют запоминать настройки, предпочтения и обеспечивать базовую функциональность сайта.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">Какие cookie мы используем</h2>
        <p>
          <strong>Необходимые cookie</strong> — обеспечивают работу авторизации, выбора темы и других базовых функций. Без них отдельные части сайта могут работать некорректно.
        </p>
        <p>
          <strong>Функциональные cookie</strong> — запоминают ваши предпочтения (например, язык или тему оформления) для последующих посещений.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">Управление cookie</h2>
        <p>
          Вы можете ограничить или отключить cookie в настройках вашего браузера. Обратите внимание, что отключение необходимых cookie может повлиять на работу сайта.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">Дополнительная информация</h2>
        <p>
          Подробнее о сборе и использовании данных см. в нашей <Link href="/privacy" className="text-primary hover:underline">Политике конфиденциальности</Link>. По вопросам: contact@hytracker.com.
        </p>
      </div>
    </div>
  );
}
