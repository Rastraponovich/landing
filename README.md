# Landing

Лендинг-портфолио на `React + TypeScript + Vite` с блочной структурой интерфейса и адаптивной версткой.

## Стек

- `React 19`
- `TypeScript`
- `Vite`
- `Tailwind CSS 4`
- `ESLint + Prettier`

## Структура проекта

```text
landing/
├── public/                              # Публичные статические файлы
├── src/
│   ├── app/                             # Корневая композиция приложения
│   │   └── application.tsx
│   ├── views/                           # Страницы/экраны
│   │   └── home/
│   │       ├── index.ts
│   │       └── page.tsx
│   ├── widgets/                         # Самостоятельные секции лендинга
│   │   ├── header/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── stack/
│   │   ├── projects/
│   │   ├── contact/
│   │   └── footer/
│   ├── shared/
│   │   ├── lib/                         # Утилиты и хуки
│   │   └── ui/                          # Переиспользуемые UI-обертки
│   ├── index.css                        # Глобальные стили
│   └── main.tsx                         # Точка входа
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

## Скрипты

- `npm run dev` — запуск локального dev-сервера
- `npm run build` — production-сборка (`tsc -b && vite build`)
- `npm run preview` — локальный предпросмотр production-сборки
- `npm run lint` — проверка ESLint
- `npm run format` — форматирование Prettier
- `npm run format:check` — проверка форматирования Prettier

## Локальный запуск

```bash
npm ci
npm run dev
```

По умолчанию приложение доступно на `http://localhost:5173`.

## Качество и CI/CD

- Для pull request и push используется CI workflow с проверками `lint` и `build`.
- Релизы создаются по тегу формата `v*` (например, `v1.0.0`).
- В релиз прикладывается артефакт сборки `site-dist.zip`.
- Деплой GitHub Pages выполняется из release-артефакта после публикации релиза.
