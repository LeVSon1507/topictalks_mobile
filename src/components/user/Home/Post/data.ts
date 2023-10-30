import { IPost } from '../../../../utils';

export const fakePostData: IPost[] = [
   {
      id: 1,
      title: 'Car',
      content: 'Car Vintage',
      img_url:
         'https://previews.123rf.com/images/popcar/popcar1511/popcar151100072/49142886-vintage-garage-retro-poster.jpg',
      tparent_id: 3,
      author_id: 1,
      username: 'SonLV',
      avatar_url: '',
      totalComment: 0,
      like: {
         totalLike: 0,
         userLike: [],
      },
      created_at: '2023-10-30T12:30:53.4486',
      updated_at: '2023-10-30T12:42:05.114709',
      approved: true,
   },
   {
      id: 2,
      title: 'Memory',
      content: 'Memory in mind',
      img_url:
         'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=1928&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      tparent_id: 3,
      author_id: 1,
      username: 'SonLV',
      avatar_url: '',
      totalComment: 0,
      like: {
         totalLike: 0,
         userLike: [],
      },
      created_at: '2023-10-30T12:31:49.645',
      updated_at: '2023-10-30T12:42:06.416073',
      approved: true,
   },
];
