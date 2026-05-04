import type { Character } from '../models/Character';

type JikanCharacter = {
  mal_id: number;
  name: string;
  name_kanji: string | null;
  nicknames: string[];
  about: string | null;
  favorites: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
};

type CharactersResponse = {
  data: JikanCharacter[];
};

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const PAGE_SIZE = 12;

export async function getChars(query: string): Promise<Character[]> {
  await delay(300);

  const params = new URLSearchParams({
    page: '1',
    limit: String(PAGE_SIZE),
  });

  const trimmedQuery = query.trim();

  if (trimmedQuery) {
    params.set('q', trimmedQuery);
  }

  const response = await fetch(
    `https://api.jikan.moe/v4/characters?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }

  const result: CharactersResponse = await response.json();

  return result.data.map((character) => ({
    mal_id: character.mal_id,
    name: character.name,
    description: character.about ?? 'No description available.',
    name_kanji: character.name_kanji ?? '-',
    nicknames: character.nicknames,
    role: 'Character',
    favorites: character.favorites,
    image_url: character.images.jpg.image_url,
  }));
}
