import { IPost } from '../../../../utils';

export const fakePostData: IPost[] = [
   {
      id: 1,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elitasdasdasd.',
      title: 'Sample Title 1',
      img_url:
         'https://previews.123rf.com/images/popcar/popcar1511/popcar151100072/49142886-vintage-garage-retro-poster.jpg',
      totalComment: 10,
      tparent_id: 0,
      author_active: true,
      like: {
         totalLike: 25,
         userLike: [
            {
               id: 123,
               username: 'user1',
            },
            {
               id: 456,
               username: 'user2',
            },
         ],
      },
      avatar_url:
         'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg',
      username: 'user1',
      author_id: 123,
      created_at: '2023-10-25T12:00:00Z',
      updated_at: '2023-10-25T13:30:00Z',
      approved: true,
   },
   {
      id: 2,
      content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      title: 'Sample Title 2',
      img_url: 'https://images.photowall.com/products/62094/vintage-london.jpg?h=699&q=85',
      totalComment: 5,
      tparent_id: 0,
      author_active: false,
      like: {
         totalLike: 25,
         userLike: [
            {
               id: 12,
               username: 'user3',
            },
            {
               id: 789,
               username: 'user4',
            },
         ],
      },
      avatar_url:
         'https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg',
      username: 'user2',
      author_id: 456,
      created_at: '2023-10-24T09:30:00Z',
      updated_at: '2023-10-25T10:45:00Z',
      approved: true,
   },
];
