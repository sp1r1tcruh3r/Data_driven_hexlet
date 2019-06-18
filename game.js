/*
Допишите функцию iter, которая является частью ядра игрового движка и описывает в себе логику одного хода
Алгоритм

    Если здоровье игрока, которого атаковали на предыдущем шаге (в примерах этого и следующего пунктов мы предполагаем, что это первый игрок с именем name1), меньше или равно 0, то добавляем в лог элемент с сообщением вида ${name1} был убит и возвращаем лог. Игра закончена.

    В ином случае, берём рандомную карту, вычисляем урон, записываем новое здоровье, формируем сообщение формата:

    const message = `Игрок '${name1}' применил '${cardName}'
    против '${name2}' и нанес урон '${damage}'`;

    Формируем элемент лога формата cons(cons(health1, health2), message) и добавляем его в лог.

    Повторяем.

Подсказки

    Параметр order в функции iter нужен для определения того, какой игрок сейчас атакует.
    Используйте функцию random для выбора карты из колоды.
    Колода карт передаётся в игру через параметр cards.
*/


import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
import { cons as consList, l, random, head, reverse, toString as listToString } from 'hexlet-pairs-data'; // eslint-disable-line

const run = (player1, player2, cards) => {
  const iter = (health1, name1, health2, name2, order, log) => {

    if (health1 <= 0) {
      return consList(cons(car(head(log)), `${name1} был убит`), log);
    }//создает список из первой части списка лога, интерполяции и самого лога
    const card = random(cards);//берет рандомную карту
    const cardName = car(card);//забирает из пары имя карты
    const damage = cdr(card)();//забирает дамаг из карточной пары
    const newHealth = health2 - damage;//считает дамаг
    const message = `Игрок '${name1}' применил '${cardName}' против '${name2}' и нанес урон '${damage}'`;
    let newLog; //ну тут хуйня все ясно
    if (order === 1) {
      newLog = consList(cons(cons(health1, newHealth), message), log);//по алгоритму
    } else {
      newLog = consList(cons(cons(newHealth, health1), message), log);//тоже по алгоритму
    }
    return iter(newHealth, name2, health1, name1, order === 1 ? 2 : 1, newLog);

    // END
  };

  const startHealth = 10;
  const logItem = cons(cons(startHealth, startHealth), 'Начинаем бой!');
  return reverse(iter(startHealth, player1, startHealth, player2, 1, l(logItem)));
};

export default cards => (name1, name2) => run(name1, name2, cards);
