import type { FestivalLanding, FestivalTeaser, SportSection } from './types';

/* ───────── Спорт ───────── */

export const mockSport: SportSection[] = [
  {
    id: 's1',
    slug: 'sambo',
    name: 'Самбо · ДЮСШ им. Жукова',
    category: 'единоборства',
    venue: 'ДЮСШ им. Жукова',
    address: 'ул. Калинина, 17',
    age: '6–17 лет',
    schedule: 'пн–пт',
    scheduleDetailed: ['пн 17:00 / 19:00', 'ср 17:00 / 19:00', 'пт 17:00 / 19:00'],
    description:
      'Классическое и боевое самбо. Группы по возрасту от 6 лет. Соревновательная подготовка.',
    contacts: { phone: '+7 (343) 555-12-34', vk: 'sambopyshma' },
    fallbackPattern: 'zigzag',
    gallery: ['zigzag', 'cross'],
  },
  {
    id: 's2',
    slug: 'plavanie',
    name: 'Плавание · «Дельфин»',
    category: 'плавание',
    venue: 'Бассейн «Дельфин»',
    address: 'ул. Ленина, 130',
    age: '4+',
    schedule: 'ежедневно',
    description: 'Группы для дошкольников, школьников и взрослых. Аква-аэробика по средам.',
    fallbackPattern: 'dots',
    gallery: ['dots', 'warm'],
  },
  {
    id: 's3',
    slug: 'la',
    name: 'Лёгкая атлетика',
    category: 'циклические',
    venue: 'стадион «Металлург»',
    address: 'пр. Успенский, 100',
    age: '8–18',
    schedule: 'пн, ср, пт',
    fallbackPattern: 'cross',
  },
  {
    id: 's4',
    slug: 'tt',
    name: 'Настольный теннис',
    category: 'игровые',
    venue: 'ФОК «Молодость»',
    address: 'ул. Юбилейная, 7',
    age: '7+',
    schedule: 'вт, чт, сб',
    fallbackPattern: 'block',
  },
  {
    id: 's5',
    slug: 'yoga',
    name: 'Йога для взрослых',
    category: 'фитнес',
    venue: 'студия «Поток»',
    address: 'пр. Успенский, 22',
    age: '18+',
    schedule: 'пн, ср, сб',
    fallbackPattern: 'sun',
  },
  {
    id: 's6',
    slug: 'voleybol',
    name: 'Волейбол · школа №3',
    category: 'игровые',
    venue: 'спортзал школы №3',
    age: '12–18',
    schedule: 'вт, чт',
    fallbackPattern: 'warm',
  },
  {
    id: 's7',
    slug: 'box',
    name: 'Бокс · «Ринг»',
    category: 'единоборства',
    venue: 'клуб «Ринг»',
    age: '10+',
    schedule: 'пн, ср, пт',
    fallbackPattern: 'zigzag',
  },
  {
    id: 's8',
    slug: 'fitness-mama',
    name: 'Фитнес для мам',
    category: 'фитнес',
    venue: 'студия «Поток»',
    age: '18+',
    schedule: 'вт, чт',
    fallbackPattern: 'dots',
  },
];

/* ───────── Фестиваль (главная-тизер) ───────── */

export const mockFestival: FestivalTeaser = {
  date: '12 мая',
  weekday: 'воскресенье',
  ctaUrl: '/festival',
};

/* ───────── Фестиваль (полный лендинг) ───────── */

export const mockFestivalLanding: FestivalLanding = {
  date: '10–12 мая',
  startsAt: '2026-05-10T12:00:00+05:00',
  weekday: 'сб – пн',
  city: 'Верхняя Пышма',
  tagline: 'Три дня · две сцены · весь город',
  intro:
    'Главное городское событие года. 40+ выступлений на 6 площадках, фуд-корт, ярмарка ремесленников и финальный концерт на главной сцене.',
  scenes: [
    { id: 'main', name: 'Главная сцена', description: 'Площадь Кулибина' },
    { id: 'second', name: 'Малая сцена', description: 'У амфитеатра' },
  ],
  activities: [
    /* 10 мая · пятница — открытие */
    {
      id: 'a-fri-1',
      startsAt: '2026-05-10T18:00:00+05:00',
      endsAt: '2026-05-10T18:40:00+05:00',
      sceneId: 'main',
      title: 'Открытие фестиваля',
      performer: 'духовой оркестр Пышмы',
      category: 'музыка',
    },
    {
      id: 'a-fri-2',
      startsAt: '2026-05-10T19:30:00+05:00',
      sceneId: 'main',
      title: 'Уральский хор · folk-сет',
      performer: 'песни заводов',
      category: 'музыка',
    },
    {
      id: 'a-fri-3',
      startsAt: '2026-05-10T21:00:00+05:00',
      sceneId: 'second',
      title: 'Премьера короткометражек ШИП',
      performer: 'летний кинотеатр',
      category: 'лекция',
    },

    /* 11 мая · суббота — разговоры и сцена */
    {
      id: 'a-sat-1',
      startsAt: '2026-05-11T13:00:00+05:00',
      sceneId: 'second',
      title: 'Барабашки · музыкальная сказка',
      performer: 'детская поляна',
      category: 'детям',
    },
    {
      id: 'a-sat-2',
      startsAt: '2026-05-11T15:00:00+05:00',
      sceneId: 'second',
      title: 'Будущее Пышмы · урбан-discussion',
      performer: 'лекторий',
      category: 'лекция',
    },
    {
      id: 'a-sat-3',
      startsAt: '2026-05-11T17:00:00+05:00',
      sceneId: 'second',
      title: 'Зин-мастерская: делаем номер о городе',
      performer: 'двор-маркет',
      category: 'мастер-класс',
    },
    {
      id: 'a-sat-4',
      startsAt: '2026-05-11T20:00:00+05:00',
      sceneId: 'main',
      title: 'Аигел · большой сет',
      performer: 'хедлайнер · 60 минут',
      category: 'музыка',
    },

    /* 12 мая · воскресенье — финал */
    {
      id: 'a-sun-1',
      startsAt: '2026-05-12T14:00:00+05:00',
      sceneId: 'second',
      title: 'Маркет местных проектов',
      performer: '60 ремесленников',
      category: 'еда',
    },
    {
      id: 'a-sun-2',
      startsAt: '2026-05-12T16:00:00+05:00',
      sceneId: 'second',
      title: 'Полумарафон Пышмы · 7 км',
      performer: 'набережная',
      category: 'спорт',
    },
    {
      id: 'a-sun-3',
      startsAt: '2026-05-12T18:00:00+05:00',
      sceneId: 'main',
      title: 'Сводный сет городских коллективов',
      performer: 'главная сцена',
      category: 'музыка',
    },
    {
      id: 'a-sun-4',
      startsAt: '2026-05-12T20:30:00+05:00',
      sceneId: 'main',
      title: 'Закрытие · фейерверк над прудом',
      performer: 'финал фестиваля',
      category: 'музыка',
    },
  ],
  venues: [
    {
      id: 'v-main',
      name: 'Главная сцена',
      description: 'Площадь Кулибина — концерты, открытие, файер-шоу.',
      fallbackPattern: 'block',
    },
    {
      id: 'v-amf',
      name: 'Амфитеатр у пруда',
      description: 'Вторая сцена — лекции, поэты, вечерний джаз.',
      fallbackPattern: 'warm',
    },
    {
      id: 'v-kids',
      name: 'Детская площадка',
      description: 'Мастер-классы, ростовые куклы, спектакли.',
      fallbackPattern: 'sun',
    },
    {
      id: 'v-food',
      name: 'Фуд-корт',
      description: '24 локальных кафе и фермера. Зона столиков на 400 мест.',
      fallbackPattern: 'cross',
    },
    {
      id: 'v-craft',
      name: 'Ярмарка ремесленников',
      description: '60 мастеров. Керамика, текстиль, дерево, украшения.',
      fallbackPattern: 'dots',
    },
    {
      id: 'v-sport',
      name: 'Спорт-зона',
      description: 'Турнир по стритболу, скейт-сессия, шашки на гигантской доске.',
      fallbackPattern: 'zigzag',
    },
  ],
  partners: [
    'УГМК',
    'Администрация ВП',
    '«Дельфин»',
    'ДК Металлург',
    'ШИП-Медиа',
    'Кофейня «Рельеф»',
  ],
  pastYears: [
    {
      year: 2025,
      title: '12 000 человек на одной площади',
      lead: 'Хедлайнерами стали Markul и «Каста». Открыли маркет местных и детскую сцену.',
      stats: [
        { v: '12k', l: 'гостей' },
        { v: '38', l: 'выступлений' },
        { v: '6', l: 'площадок' },
      ],
      fallbackPattern: 'warm',
    },
    {
      year: 2023,
      title: 'Старт фестиваля. Один день, один город',
      lead: 'Первый сезон. Одна сцена, ярмарка локальных проектов и городской бег по набережной.',
      stats: [
        { v: '5k', l: 'гостей' },
        { v: '14', l: 'выступлений' },
        { v: '3', l: 'площадки' },
      ],
      fallbackPattern: 'cross',
    },
  ],
  faq: [
    { q: 'Сколько стоит вход?', a: 'Бесплатно. Все площадки и сцены доступны без билетов.' },
    {
      q: 'Будет ли еда?',
      a: 'Да, фуд-корт работает с 12:00 до 23:00. 24 локальных кафе и фермера.',
    },
    {
      q: 'Можно с детьми?',
      a: 'Конечно. Отдельная детская площадка с мастер-классами и спектаклями.',
    },
    { q: 'А если дождь?', a: 'Часть площадок крытые. Концерты главной сцены идут под навесом.' },
  ],
};
