import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
      <div className="bg-card rounded-2xl border border-border shadow-sm p-12 md:p-16 max-w-lg mx-auto">
        <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-8 h-8 text-muted-foreground" />
        </div>
        <h1 className="text-[1.5rem] font-bold text-foreground mb-3">
          Страница не найдена
        </h1>
        <p className="text-[0.9375rem] text-muted-foreground leading-relaxed mb-8">
          Такой страницы не существует. Проверьте адрес или перейдите на главную.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
