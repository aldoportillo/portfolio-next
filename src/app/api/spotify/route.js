import axios from 'axios';

export async function GET(request) {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_PLAYLIST_ID } = process.env;

  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_PLAYLIST_ID) {
    return new Response(
      JSON.stringify({ error: 'Missing Spotify environment variables.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({ grant_type: 'client_credentials' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64'),
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    const playlistResponse = await axios.get(
      `https://api.spotify.com/v1/playlists/${SPOTIFY_PLAYLIST_ID}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return new Response(JSON.stringify(playlistResponse.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Spotify API Error:', error.response?.data || error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch playlist from Spotify.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
