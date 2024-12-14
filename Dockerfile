# Используем базовый образ с Node.js
FROM node:22-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в контейнер
COPY . .

# Создаем папку для загрузок
RUN mkdir -p /app/images && chmod -R 777 /app/images && chmod -R 777 /app/public

# Компилируем TypeScript
RUN npm run build

# Открываем порт
EXPOSE 3666

# Запускаем приложение
CMD ["npm", "start"]
