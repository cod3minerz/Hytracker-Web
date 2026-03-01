import Link from "next/link";

export const metadata = {
  title: "Политика конфиденциальности — HyTracker",
  description: "Политика конфиденциальности сервиса HyTracker.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Политика конфиденциальности</span>
      </nav>
      <h1 className="font-heading mb-6 text-2xl font-semibold text-foreground sm:text-3xl">
        Политика конфиденциальности
      </h1>
      <p className="mb-4 text-sm text-muted-foreground">
        Последнее обновление: 2026 год.
      </p>
      <div className="space-y-4 text-sm leading-relaxed text-foreground">
        <p>
          HyTracker уважает вашу конфиденциальность. Настоящая Политика описывает, какие данные мы можем собирать и как их используем.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">1. Собираемые данные</h2>
        <p>
          При использовании сервиса мы можем получать технические данные (IP-адрес, тип браузера, данные об устройстве) и данные, которые вы добровольно предоставляете при авторизации через сторонние сервисы (например, Telegram), в объёме, разрешённом соответствующим сервисом.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">2. Цели использования</h2>
        <p>
          Данные используются для обеспечения работы сервиса, улучшения качества работы сайта, обеспечения безопасности и соблюдения применимого законодательства.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">3. Передача данных</h2>
        <p>
          Мы не продаём персональные данные третьим лицам. Данные могут передаваться только в случаях, предусмотренных законом, или при вашем явном согласии.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">4. Хранение и защита</h2>
        <p>
          Мы применяем разумные организационные и технические меры для защиты данных от несанкционированного доступа, изменения или уничтожения.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">5. Ваши права</h2>
        <p>
          Вы вправе запросить доступ к своим данным, их исправление или удаление в соответствии с применимым законодательством. Для этого свяжитесь с нами: contact@hytracker.com.
        </p>
        <h2 className="font-heading mt-6 text-lg font-medium text-foreground">6. Изменения политики</h2>
        <p>
          Мы можем обновлять Политику конфиденциальности. Актуальная версия публикуется на этой странице.
        </p>
      </div>
    </div>
  );
}
