import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getChars } from './jikan';

const successfulResponse = {
  ok: true,
  json: async () => ({
    data: [
      {
        mal_id: 1,
        name: 'Light Yagami',
        name_kanji: null,
        nicknames: ['Kira'],
        about: null,
        favorites: 50000,
        images: {
          jpg: {
            image_url:
              'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg',
          },
        },
      },
    ],
  }),
} as Response;

describe('jikan API', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('formats API response into characters', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    fetchMock.mockResolvedValue(successfulResponse);

    const characters = await getChars('light');

    expect(characters).toEqual([
      {
        mal_id: 1,
        name: 'Light Yagami',
        description: 'No description available.',
        name_kanji: '-',
        nicknames: ['Kira'],
        role: 'Character',
        favorites: 50000,
        image_url:
          'https://upload.wikimedia.org/wikipedia/en/0/0c/Light_from_Death_Note.jpg',
      },
    ]);
  });

  it('sends trimmed search query in the URL', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    fetchMock.mockResolvedValue(successfulResponse);

    await getChars(' light ');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.jikan.moe/v4/characters?page=1&limit=12&q=light'
    );
  });

  it('throws an error for unsuccessful API responses', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    const failedResponse = {
      ok: false,
      json: async () => ({}),
    } as Response;

    fetchMock.mockResolvedValue(failedResponse);

    await expect(getChars('light')).rejects.toThrow(
      'Failed to fetch characters'
    );
  });

  it('skips search query if input is empty', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch');

    fetchMock.mockResolvedValue(successfulResponse);

    await getChars('');

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.jikan.moe/v4/characters?page=1&limit=12'
    );
  });
});
