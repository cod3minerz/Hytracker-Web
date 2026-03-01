import Link from "next/link";

export const metadata = {
  title: "Условия использования — HyTracker",
  description: "Условия использования сервиса HyTracker.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Условия использования</span>
      </nav>
      <h1 className="font-heading mb-6 text-2xl font-semibold text-foreground sm:text-3xl">
        Условия использования
      </h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Последнее обновление: 2026 год.
      </p>
      <div className="space-y-4 text-sm leading-relaxed text-foreground">
        <p>
          Добро пожаловать на HyTracker. Используя наш сервис, вы соглашаетесь с настоящими Условиями. Если вы не согласны с какими-либо положениями, пожалуйста, не используйте сервис.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">1. Предмет соглашения</h2>
        <p>
          HyTracker предоставляет информационный каталог игровых серверов и инструменты для их отслеживания. Сервис предназначен для личного некоммерческого использования в соответствии с действующим законодательством.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">2. Права и обязанности пользователя</h2>
        <p>
          Вы обязуетесь не использовать сервис для распространения незаконного контента, не нарушать права третьих лиц и не осуществлять действия, способные нанести вред работе платформы или другим пользователям.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">3. Ограничение ответственности</h2>
        <p>
          Сервис предоставляется «как есть». Мы не гарантируем бесперебойную работу и не несём ответственности за косвенные убытки, связанные с использованием или невозможностью использования HyTracker.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">4. Изменения</h2>
        <p>
          Мы вправе изменять Условия использования. Актуальная версия всегда доступна на этой странице. Продолжение использования сервиса после публикации изменений означает ваше согласие с ними.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">5. Контакты</h2>
        <p>
          По вопросам, связанным с Условиями использования, вы можете связаться с нами по адресу: contact@hytracker.com.
        </p>
      </div>
    </div>
  );
}
