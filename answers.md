1. Когда запускается эффект useEffect, если массив зависимостей: 
а) не указан; б) пустой []; в) [x]?
ответ: 
    a) 1. первом монтировании,
       2. любом обновлении состояния/пропсов,
       3. повторном рендере родителя.

    б) 1 раз

    в) 1. 1 раз при рендере
       2. каждый раз при изменении состояния



2. Для чего нужна функция очистки (cleanup) в useEffect? Назовите два случая, когда она
обязательна.
ответ: 
    Для чего: cleanup в useEffect нужен для очистки старых возвращаемых значений
    Два случая: 1. подписки на внешние события
                2. promise операции

3. Чем Link из react-router отличается от обычного тега <a>?
ответ: 
    тэг <a> пытается найти страницу из сервера с которого пришла страница
    Link в react-router рендерит только нужный компонент на клиенте

4. Что роутер делает автоматически после выполнения action и что action обязан вернуть?
ответ (что роутер делает автоматически после выполнения action):
    1. дожидается action (в том числе и промис)
    2. если action вернул данные кладет их в текущий маршрут
    3. если action вернул redirect, делает redirect
    4. Рендер компонентов
ответ (что action обязан вернуть): json, redirect, response

5. Почему данные из FormData нужно преобразовывать перед записью в хранилище? Как
получить из FormData обычный объект?
ответ (почему данные из FormData нужно преобразовывать перед записью в хранилище):
    formData не совместим ни с одним приемлемым форматом для любого хранилища, будь то localstorage,
    бд и тд.
ответ (как получить из FormData обычный объект):
    formdata представляет собой формат данных, где есть ключ и значение, поэтому его легко приобразовать в обьект, например в js есть инструмент: Object.fromEntries()


Задача 10.
function BookPanel({ book, showNote, loading }) {
    if (loading) {
        return <p>Загрузка...</p>;
    }
    const [note, setNote] = useState(''); <--- 1 ошибка (хук после return)
    if (showNote) {
        useEffect(() => { <--- 2 ошибка (useEffect внутри if)
            document.title = `${book.title}: ${note}`;
        }, []);
    }
    useEffect(() => {
        const id = setInterval(() => console.log(note), 1000); <--- 3 ошибка (нету cleanUp)
    }, [note]);
    return <input value={note} onChange={(e) => setNote(e.target.value)} />;
}

исправленный компонент:
import { useState, useEffect } from "react";

function BookPanel({ book, showNote, loading }) {
    // 1.Все хуки в начале
    const [note, setNote] = useState("");

    // 2. Условие внутри эффекта
    useEffect(() => {
        if (showNote) {
            document.title = `${book.title}: ${note}`;
        }
    }, [showNote, book.title, note]);

    // 3. Cleanup
    useEffect(() => {
        const id = setInterval(() => console.log(note), 1000);
        return () => clearInterval(id);
    }, [note]);

    // 4. return — только ПОСЛЕ всех хуков
    if (loading) {
        return <p>Загрузка...</p>;
    }

    return (
        <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
        />
    )
}