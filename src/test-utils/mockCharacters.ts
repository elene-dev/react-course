import type { Character } from '../models/Character';

export const lightCharacter: Character = {
  mal_id: 1,
  name: 'Light Yagami',
  description: 'A student who finds the Death Note.',
  name_kanji: '夜神月',
  nicknames: ['Kira'],
  role: 'Character',
  favorites: 50000,
  image_url:
    'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg',
};

export const misaCharacter: Character = {
  mal_id: 2,
  name: 'Misa Amane',
  description: 'A model who owns a Death Note.',
  name_kanji: '弥海砂',
  nicknames: ['Second Kira'],
  role: 'Character',
  favorites: 25000,
  image_url: 'https://deathnote.com/misa.jpg',
};

export const ichigoCharacter: Character = {
  mal_id: 3,
  name: 'Ichigo Kurosaki',
  description: 'A substitute Soul Reaper who protects the living world.',
  name_kanji: '黒崎一護',
  nicknames: ['Strawberry'],
  role: 'Character',
  favorites: 50000,
  image_url:
    'https://upload.wikimedia.org/wikipedia/en/1/1e/IchigoKurosakiBleach.jpg',
};

export const aizenCharacter: Character = {
  mal_id: 4,
  name: 'Sosuke Aizen',
  description: 'A former captain with powerful illusion abilities.',
  name_kanji: '藍染惣右介',
  nicknames: ['Aizen'],
  role: 'Character',
  favorites: 25000,
  image_url: 'https://i.redd.it/pk48nwd6j39d1.jpeg',
};

export const rukiaCharacter: Character = {
  mal_id: 5,
  name: 'Rukia Kuchiki',
  description: 'A Soul Reaper from the Kuchiki clan.',
  name_kanji: '朽木ルキア',
  nicknames: ['Rukia'],
  role: 'Character',
  favorites: 20000,
  image_url:
    'https://upload.wikimedia.org/wikipedia/en/0/0c/RukiaKuchikiKubo.jpg',
};

export const renjiCharacter: Character = {
  mal_id: 6,
  name: 'Renji Abarai',
  description: 'A lieutenant of the sixth division.',
  name_kanji: '阿散井恋次',
  nicknames: ['Renji'],
  role: 'Character',
  favorites: 15000,
  image_url:
    'https://static.wikia.nocookie.net/bleach/images/8/81/Ep320RenjiProfile.png/revision/latest/scale-to-width/360?cb=20231105054609&path-prefix=en',
};

export const deathNoteCharacters: Character[] = [lightCharacter, misaCharacter];

export const bleachCharacters: Character[] = [ichigoCharacter, aizenCharacter];

export const bleachCharactersWithPagination: Character[] = [
  ichigoCharacter,
  aizenCharacter,
  rukiaCharacter,
  renjiCharacter,
];
