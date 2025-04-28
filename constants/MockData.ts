export const products = [
    {
        id: 1,
        name: 'Эспрессо',
        type: 'coffee',
        price: 150,
        description: 'Крепкий черный кофе, приготовленный под высоким давлением. Идеален для настоящих ценителей насыщенного вкуса.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632844fbad60f7d3dc2a7180_Polyakovfoto_Simple%20Coffee17793%202-p-800.jpg', 'https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632844fbad60f7d3dc2a7180_Polyakovfoto_Simple%20Coffee17793%202-p-800.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Константин Александрович', text: 'Хороший Эспрессо! Всегда быстрое обслуживание)' },
            { id: 2, userName: 'Юлиан', text: 'Чил место приду еще' },
            { id: 3, userName: 'Маркус', text: 'Великолепный бодрящий напиток по утрам' }
        ]
    },
    {
        id: 2,
        name: 'Капучино',
        type: 'coffee',
        price: 180,
        description: 'Нежный кофе с молочной пенкой и слоем взбитого молока. Идеальный баланс кофе и молока.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632845fd4a30f55ce6011c1d_Polyakovfoto_Simple%20Coffee17803.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Юлиана', text: 'Капуч пушка' },
            { id: 2, userName: 'Вилли', text: 'Весьма неплохо за такие деньги' },
            { id: 3, userName: 'ПОКЕРФЕЙС', text: 'ГУУУУД' }
        ]
    },
    {
        id: 3,
        name: 'Американо',
        type: 'coffee',
        price: 130,
        description: 'Разбавленный эспрессо с добавлением горячей воды. Мягкий вкус с долгим послевкусием.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/608fd6042da2fc40bdeaa74c_black1-p-800.jpeg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Алекс', text: 'Хороший кофе' },
            { id: 2, userName: 'Валя', text: 'ставлю 5 звезд' },
            { id: 3, userName: 'Маша', text: 'Хочу добавки' }
        ]
    },
    {
        id: 4,
        name: 'Латте',
        type: 'coffee',
        price: 200,
        description: 'Кофе с большим количеством вспененного молока и нежной текстурой. Утонченный вкус для любителей мягких напитков.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632846cae4afaaf461ad8657_Polyakovfoto_Simple%20Coffee17782-p-800.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Саша', text: 'Латте пушка' },
            { id: 2, userName: 'Дуня', text: 'ДАЙТЕ ЕЩЕ' },
            { id: 3, userName: 'Клара', text: 'Готова у вас работать за этот кофе' }
        ]
    },
    {
        id: 5,
        name: 'Фраппе',
        type: 'coffee',
        price: 220,
        description: 'Холодный кофе, взбитый со льдом и сахаром. Освежающий напиток для жарких дней.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632f1db76a137188c11ef861_cacaovddd-p-800.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Владимир Пушкин', text: 'Год семьи, но кофе пьем по расписанию' },
            { id: 2, userName: 'Петр', text: 'В эту кофейню я бы окно прорубил' },
            { id: 3, userName: 'Антонио', text: 'Бандерос чилит с таким кофе' }
        ]
    },
    {
        id: 6,
        name: 'Глясе',
        type: 'coffee',
        price: 210,
        description: 'Кофе с шариком ванильного мороженого и шоколадной стружкой. Десертный вариант для сладкоежек.',
        image: ['https://avatars.dzeninfra.ru/get-zen_doc/3614639/pub_60c71c71123d127494fa1539_60c71c837c47271203687fd1/scale_2400'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Кирил', text: 'Мороженое хорошее и вкусное' },
            { id: 2, userName: 'Евгений', text: 'Я назову планету именнем Гляссе' },
            { id: 3, userName: 'Всеволод', text: 'Это кофе точно не для гоев, для гоев оно слишком шикарное' }
        ]
    },
    {
        id: 7,
        name: 'Кофе с молоком',
        type: 'coffee',
        price: 160,
        description: 'Классический вариант с добавлением горячего молока. Простой и комфортный вкус для каждого.',
        image: ['https://images.gastronom.ru/Ew3yF2XwAVl_Am1fIhPfI23dSbEuPrTJgBBPomgZq8Y/pr:article-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzM0OGVjNWVhLTgwODktNGNmMi1hNDY2LWMxZjU5MDczNDAyMy5qcGc.webp'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Дуня', text: 'на сеновале самое то пить' },
            { id: 2, userName: 'Клара', text: 'Сыграю на вашем кларнете за такое кофе' },
            { id: 3, userName: 'ИРИНА', text: 'Я конечно продаю пылесосы но с этим кофе продается проще' }
        ]
    },
    {
        id: 8,
        name: 'Кофе со льдом',
        type: 'coffee',
        price: 170,
        description: 'Охлажденный эспрессо с кубиками льда и карамельным сиропом. Бодрящий напиток для летнего дня.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/609008308e7a077ea96ba930_cold1-p-800.jpeg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Паша Т', text: 'Нужен кофе' },
            { id: 2, userName: 'Никита', text: 'А я Никита люблю кофе со льдом' },
            { id: 3, userName: 'Дюша', text: 'USB здесь и кофе со льдом с нами' }
        ]
    },
    {
        id: 9,
        name: 'Кофе по-ирландски',
        type: 'coffee',
        price: 250,
        description: 'Ароматный кофе с добавлением виски и взбитых сливок. Напиток с характером для особых моментов.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/608fd1df6c9455749dd7887d_coctail1-p-800.jpeg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Конор', text: 'UFS, я больше не буду драться не попив этот шедевр' },
            { id: 2, userName: 'Майкл', text: 'В универ только с ним' },
            { id: 3, userName: 'Пэдро', text: 'Паскали лучше считаются когда кофе ирландский с тобой' }
        ]
    },
    {
        id: 10,
        name: 'Мокка',
        type: 'coffee',
        price: 230,
        description: 'Кофе с шоколадным сиропом, молоком и взбитыми сливками. Изысканный выбор для ценителей сладких напитков.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/63340de4ebba5bc95270dd9d_Polyakovfoto_Simple%20Coffee178071-p-800.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Биллли', text: 'ай эм бэд гай))' },
            { id: 2, userName: 'Наталья', text: 'Я сечас начну стрелять пока не принесут этот кофе' },
            { id: 3, userName: 'Гена', text: 'Продаю обувь, выиграл турнир кожанный мяч' }
        ]
    },
    {
        id: 11,
        name: 'Маккаруны',
        type: 'sweets',
        price: 230,
        description: 'Хочется сладкого, но совсем немножко? Возьмите малый десерт в нашей кофейне! Свежие макаруны, конфеты ручной работы из бельгийского шоколада (по рецепту 2010 года!), тарты и штрудели – каждый найдет лакомство по вкусу!',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/6329ad5461fe6a988eb8e0b3_md-p-800.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'ПАША ТЕХНИК', text: 'Принесите мне 3 макаруны' },
            { id: 2, userName: 'Яна', text: 'Я мадам кошкина и я люблю макаруны!!!' },
            { id: 3, userName: 'Серафима', text: 'кайф продукт' }
        ]
    },
    {
        id: 12,
        name: 'Вариант завтрака I',
        type: 'lunch',
        price: 230,
        description: 'Начните день с отличного настроения! Выберите завтрак с горячей кашей и любимым напитком по специальной цене! Ищите фирменные завтраки во всех кофейнях сети каждый день с открытия до 12:00.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/63283c9e2bb524ad84cf6f28_Polyakovfoto_Simple%20Coffee17860.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Саша', text: 'Прекрасный завтрак' },
            { id: 2, userName: 'Петя', text: 'Всегда беру по утрам' },
            { id: 3, userName: 'Маша', text: 'Правильное соблюдение БЖУ' }
        ]
    },
    {
        id: 13,
        name: 'Вариант завтрака II',
        type: 'lunch',
        price: 230,
        description: 'Начните день с отличного настроения! Выберите завтрак с горячей кашей и любимым напитком по специальной цене! Ищите фирменные завтраки во всех кофейнях сети каждый день с открытия до 12:00.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/63283e3cc6ac55aed5bb9508_Polyakovfoto_Simple%20Coffee17859.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Катя Кищук', text: 'Фараон всегда мне такое покупает' },
            { id: 2, userName: 'Ваня', text: 'Норма' },
            { id: 3, userName: 'Артемий', text: 'Мой любимый завтрак' }
        ]
    },
    {
        id: 14,
        name: 'Вариант завтрака III',
        type: 'lunch',
        price: 230,
        description: 'Завтрак настоящего чемпиона! Любимый напиток, пара сырников и горячая каша наполнят вас силами на целый день, а свежий фрукт станет отличным свидетельством здорового образа жизни! Ищите фирменные завтраки во всех кофейнях сети каждый день с открытия до 12:00.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/63283e85a1de316e2f625c0c_Polyakovfoto_Simple%20Coffee17856.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Клава', text: 'не хватает кокосовой стружки' },
            { id: 2, userName: 'Иван', text: 'Всегда беру такое перед эфиром' },
            { id: 3, userName: 'Маруся', text: 'Я просто ппшница и люблю писать коменты' }
        ]
    },
    {
        id: 15,
        name: 'Сырники на завтрак',
        type: 'lunch',
        price: 230,
        description: 'Завтрак настоящего чемпиона! Любимый напиток, пара сырников и горячая каша наполнят вас силами на целый день, а свежий фрукт станет отличным свидетельством здорового образа жизни! Ищите фирменные завтраки во всех кофейнях сети каждый день с открытия до 12:00.',
        image: ['https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/63283cacbfe14e4acfa36ac5_Polyakovfoto_Simple%20Coffee17868.jpg'],
        rating: 5,
        reviews: [
            { id: 1, userName: 'Илья', text: 'Очень вкусно!' },
            { id: 2, userName: 'Билли', text: 'Кайф, наложу еще своему другу' },
            { id: 3, userName: 'Шелдон', text: 'КЕФТЕМЕ' }
        ]
    }
]

export const promoCard = [
    {
        id: 1,
        img: 'https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/63340ee7e9a8174d42056bd8_SimpleCoffee16763-222-p-500.jpg',
        title: 'Коферолл',
        text: 'Действует акция, при покупке "Коферолл" большой капучино в подарок',
        description: 'Действует акция, при покупке "Коферолл" большой капучино в подарок',
        time: 24,
        price: 2
    },
    {
        id: 2,
        img: 'https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/648050f8c155fed70c03d046_611680697b50ea273425f28b_SimpleCoffee16792-p-500.jpg',
        title: 'Кендвич',
        text: 'Действует акция, при покупке "Кендвич" средний американо в подарок',
        description: 'Действует акция, при покупке "Коферолл" большой капучино в подарок',
        time: 24,
        price: 2
    },
    {
        id: 3,
        img: 'https://cdn.prod.website-files.com/5f92b98ef775e43402afe27f/632eef43fc80c821e1fe3cb0_Polyakovfoto_Simple%20Coffee17887-p-500.jpg',
        title: 'Курасан с ветчиной',
        text: 'Действует акция, при покупке "Курсанан с ветчиной" большой раф в подарок',
        description: 'Действует акция, при покупке "Коферолл" большой капучино в подарок',
        time: 24,
        price: 2
    },
]

export const userData = {
  firstName: 'Александр',
  lastName: 'Грехов',
  email: 'btld_grekhov@mail.ru',
  password: ''
};