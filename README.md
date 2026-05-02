# Frontend Developer Portfolio

Персональный сайт-визитка фронтенд-разработчика на React + Vite + TypeScript.

**Стиль:** Кинетическая типографика + швейцарский дизайн (чёрный, белый, красный акцент).

## 🚀 Технологии

- **React 19** — UI библиотека
- **Vite** — сборщик
- **TypeScript** — типизация
- **CSS Modules** — стилизация компонентов

## 📁 Структура

```
webpage/
├── public/             # Статические файлы
├── src/
│   ├── app/            # Сборка приложения (App)
│   ├── views/          # Страницы (home → HomePage)
│   ├── widgets/        # Самостоятельные блоки (nav, hero, about, …)
│   ├── shared/         # UI-kit, стили, утилиты (SectionLayout, variables)
│   ├── main.tsx        # Точка входа
│   └── index.css       # Глобальные стили
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Открой http://localhost:5173
```

## 🌐 Публикация на GitHub Pages

### 1. Подготовь репозиторий

```bash
cd /Users/wilde/projects/webpage

# Инициализируй git
git init
git add .
git commit -m "Initial commit"

# Подключи GitHub репозиторий (замени USERNAME)
git remote add origin https://github.com/USERNAME/webpage.git
git branch -M main
git push -u origin main
```

### 2. Настрой GitHub Pages

В `vite.config.ts` измени `base` на имя твоего репозитория:

```ts
export default defineConfig({
  plugins: [react()],
  base: '/webpage/',  // ← тут имя репозитория
  build: {
    outDir: 'dist',
  },
})
```

### 3. Собери и задеплой

**Вариант A: GitHub Actions (автоматический деплой)**

Создай файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Закоммить и запушь — деплой произойдёт автоматически.

**Вариант B: Ручной деплой (gh-pages)**

```bash
# Установи пакет для деплоя
npm install -D gh-pages

# Добавь в package.json:
# "scripts": {
#   "deploy": "gh-pages -d dist"
# }

# Собери и задеплой
npm run build
npm run deploy
```

### 4. Настройки репозитория

1. На GitHub зайди в **Settings** → **Pages**
2. В разделе "Build and deployment" выбери:
   - **Source:** GitHub Actions
3. Сайт будет доступен по адресу: `https://username.github.io/webpage/`

## ✏️ Кастомизация

### Изменить имя и контакты

Открой `src/widgets/` и отредактируй нужный блок, или `src/views/home/` для страницы:

- **Hero.tsx** — имя (`АЛЕКСЕЙ К.`), заголовок
- **Contact.tsx** — email, telegram, github
- **About.tsx** — текст о себе
- **Projects.tsx** — проекты

### Изменить цвет акцента

В `src/index.css`:

```css
:root {
  --color-accent: #e63946;      /* Красный */
  --color-accent-hover: #ff4d5a;
}
```

Варианты:
- `#00d9ff` — голубой
- `#50fa7b` — зелёный
- `#bd93f9` — фиолетовый
- `#ffb86c` — оранжевый

### Добавить фото

1. Положи фото в `public/`
2. В `Hero.tsx` добавь `<img src="/photo.jpg" alt="..." />`
3. Стилизуй в `Hero.css`

## 📱 Особенности

- **Адаптивный** — от десктопа до мобильных
- **Анимации при скролле** — плавное появление секций
- **Параллакс в Hero** — эффект глубины
- **Навигация с активным состоянием** — подсветка текущей секции
- **Оптимизирован для GitHub Pages** — статическая сборка

## 📄 Лицензия

Свободно используй и модифицируй под себя.
