export type ArtPiece = {
  title: string;
  description?: string;
  image: string;
  year?: string;
  medium?: string;
  tags?: string[];
};

export const artPieces: ArtPiece[] = [
  //art piece example format:
  // {
  //   title: 'untitled',
  //   description: 'hihihi',
  //   image: '/art/untitled.jpg',
  //   year: '2024',
  //   medium: 'mixed media',
  //   tags: ['mixed media'],
  // },
];

