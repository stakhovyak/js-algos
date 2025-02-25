# Хэширование

WARNING!
!!!Памятка сгенерирована chatgpt!!!

Хэширование — это метод преобразования данных (например, строки или числа) в фиксированный размер, обычно в виде целого числа, с помощью хэш-функции. Хэш-функция принимает входные данные и возвращает хэш-значение, которое используется для индексации в хэш-таблице.

## Хэш-таблица

Хэш-таблица — это структура данных, которая использует хэш-функцию для сопоставления ключей с индексами в массиве. Это позволяет быстро находить, вставлять и удалять элементы.

## Метод умножения

Метод умножения — это способ вычисления хэш-значения, который использует умножение ключа на константу и взятие дробной части результата. Формула выглядит так: [ h(k) = \lfloor m \cdot (k \cdot A \mod 1) \rfloor ] где:

( k ) — ключ,
( m ) — размер хэш-таблицы,
( A ) — константа (обычно выбирается в пределах от 0 до 1).
Константа Кнута
Константа Кнута — это значение, предложенное Дональдом Кнутом для метода умножения. Она равна ((\sqrt{5} - 1) / 2 \approx 0.6180339887).

## Разрешение коллизий

Коллизия возникает, когда два разных ключа хэшируются в один и тот же индекс. Разрешение коллизий — это методы, используемые для обработки таких ситуаций.

## Цепочки переполнения (Chaining)

Цепочки переполнения — это метод разрешения коллизий, при котором каждый элемент хэш-таблицы содержит ссылку на связанный список всех элементов, хэшированных в этот индекс.

## Линейное зондирование (Linear Probing)

Линейное зондирование — это метод разрешения коллизий, при котором при возникновении коллизии выполняется последовательный поиск следующего свободного индекса в хэш-таблице.

## Двойное хэширование (Double Hashing)

Двойное хэширование — это метод разрешения коллизий, при котором используется вторая хэш-функция для вычисления шага зондирования. Формула выглядит так: [ h(k, i) = (h1(k) + i \cdot h2(k)) \mod m ] где:

( h1(k) ) — первая хэш-функция,
( h2(k) ) — вторая хэш-функция,
( i ) — номер попытки.

## Вычислительный эксперимент

Вычислительный эксперимент — это процесс проведения серии вычислений для анализа и сравнения различных методов или параметров. В данном случае, это подбор константы для метода умножения и сравнение её с константой Кнута по наибольшей длине цепочек коллизий.
