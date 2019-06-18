/*
card.js

Реализуйте и экспортируйте обобщенную функцию damage.
generic.js

Реализуйте функцию getMethod, которая производит поиск конкретной реализации функции для переданного типа.
simpleCard.js

Реализуйте интерфейс типа simpleCard.
Подсказки

    В percentCard.js можно подсмотреть пример использования.
    Обратите внимание в модуле generic.js на следующую строчку: let methods = l();. Именно здесь определяется та самая виртуальная таблица, механизм работы с которой подробно описан в текстовой части этого урока.
*/
//card.js
import { contents } from '@hexlet/tagged-types';
import { getMethod } from './generic';

export const getName = self => getMethod(self, 'getName')(contents(self));

// BEGIN (write your solution here)
export const damage = (self, health) => getMethod(self, 'damage')(contents(self), health);
// END

//generic.js
import { cons, car, cdr, toString as pairToString } from 'hexlet-pairs'; // eslint-disable-line
import {
  l, cons as consList, isEmpty, head, tail,
} from 'hexlet-pairs-data';
import { attach, typeTag, contents } from '@hexlet/tagged-types';

let methods = l();

export const getMethod = (obj, methodName) => {
  // BEGIN (write your solution here)
const searchMethod = (methods) => {
    if(isEmpty(methods)) {
      return methods;          //определяем пустой ли метод
    }
    if(typeTag(obj) === typeTag(head(methods)) && methodName === car(contents(head(methods)))) {
      return cdr(contents(head(methods))); //возвращаем остаток списка
    }
    return searchMethod(tail(methods)); //рекурсия
  };
return searchMethod(methods); //вход
  // END
};

export const definer = type => (methodName, f) => {
  methods = consList(attach(type, cons(methodName, f)), methods);
};
