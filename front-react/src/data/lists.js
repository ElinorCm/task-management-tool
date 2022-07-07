export default [
  {
    id: 1,
    name: 'TODO',
    position: 1,
    user_id: 1,
    cards: [
      {
        id: 5,
        name: 'Home page',
        position: 1,
        color: '#800080',
        created_at: '2022-07-06T12:08:24.513Z',
        updated_at: null,
        list_id: 1,
        tags: [
          {
            id: 1,
            name: 'P1',
            color: '#F7DC6F',
            created_at: '2022-07-06T12:08:24.515Z',
            updated_at: null,
            card_has_tag: {
              card_id: 5,
              tag_id: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'WIP',
    position: 2,
    user_id: 1,
    cards: [
      {
        id: 3,
        name: 'MLD',
        position: 1,
        color: '#F08080',
        created_at: '2022-07-06T12:08:24.513Z',
        updated_at: null,
        list_id: 2,
        tags: [
          {
            id: 2,
            name: 'P2',
            color: '#F8C471',
            created_at: '2022-07-06T12:08:24.515Z',
            updated_at: null,
            card_has_tag: {
              card_id: 3,
              tag_id: 2,
            },
          },
        ],
      },
      {
        id: 4,
        name: 'Database',
        position: 2,
        color: '#FA8072',
        created_at: '2022-07-06T12:08:24.513Z',
        updated_at: null,
        list_id: 2,
        tags: [
          {
            id: 1,
            name: 'P1',
            color: '#F7DC6F',
            created_at: '2022-07-06T12:08:24.515Z',
            updated_at: null,
            card_has_tag: {
              card_id: 4,
              tag_id: 1,
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: 'DONE',
    position: 3,
    user_id: 1,
    cards: [
      {
        id: 1,
        name: 'MCD',
        position: 1,
        color: '#FA8072',
        created_at: '2022-07-06T12:08:24.513Z',
        updated_at: null,
        list_id: 3,
        tags: [
          {
            id: 3,
            name: 'P3',
            color: '#DC7633',
            created_at: '2022-07-06T12:08:24.515Z',
            updated_at: null,
            card_has_tag: {
              card_id: 1,
              tag_id: 3,
            },
          },
        ],
      },
      {
        id: 2,
        name: 'user-stories',
        position: 2,
        color: '#F08080',
        created_at: '2022-07-06T12:08:24.513Z',
        updated_at: null,
        list_id: 3,
        tags: [
          {
            id: 2,
            name: 'P2',
            color: '#F8C471',
            created_at: '2022-07-06T12:08:24.515Z',
            updated_at: null,
            card_has_tag: {
              card_id: 2,
              tag_id: 2,
            },
          },
        ],
      },
    ],
  },
];
