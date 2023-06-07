# Инструкция

1. Разместить файл базы данных `bdkkrit.sql` в клиенте на локальной машине (MySQL Workbench 8.0 CE для отображения этажей и работоспособности самого приложения)
2. В файле server.js обновить логин и пароль в блоке connection

```
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: '<...>',
    password: '<...>'
});
```

3. Склонировать репозиторий
4. Выполнить `npm i`
5. Заполнить данные по базе данных, убедиться что БД запущена
6. Запустить проект: `node server.js`
