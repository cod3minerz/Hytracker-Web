
  # Server Monitoring Platform Design

  This is a code bundle for Server Monitoring Platform Design. The original project is available at https://www.figma.com/design/Tv92vwdfVuT33NderHDiA2/Server-Monitoring-Platform-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  **Важно:** Команда `npm run dev` каждый раз перед запуском удаляет папку `.next`, чтобы не было ошибок вида "Cannot find module [turbopack]_runtime.js". Не используйте `next dev --turbopack`.

  **Если localhost не открывается:**
  1. Остановите все `npm run dev` в других терминалах.
  2. В корне проекта выполните: `npm install` (если обновляли зависимости), затем `npm run dev`.
  3. Откройте в браузере адрес из строки **Local:** в терминале (например `http://localhost:3000`).
