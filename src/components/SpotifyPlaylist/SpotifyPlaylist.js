'use client';

import { useEffect, useState } from 'react';
import styles from './SpotifyPlaylist.module.css';
import Image from 'next/image';

export default function SpotifyPlaylist() {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (!response.ok) {
          throw new Error('Failed to fetch playlist');
        }
        const data = await response.json();
        setPlaylist(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchPlaylist();
  }, []);

  function playTrack(track) {
    if (track.preview_url) {
      const audio = new Audio(track.preview_url);
      audio.play();
    } else {
      console.log('No preview available');
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      {playlist && (
        <>
          <h2 className={styles.title}>{playlist.name}</h2>
          <div className={styles.tracks}>
            {playlist.tracks.items.map((item) => (
              <div key={item.track.id} className={styles.trackItem}>
                <div className={styles.trackInfo}>
                  <Image
                    src={
                      item.track.album.images?.[2]?.url ||
                      '/placeholder.png'
                    }
                    alt={item.track.name}
                    width={64}
                    height={64}
                    className={styles.albumCover}
                  />
                  <span className={styles.trackDetails}>
                    {item.track.name} - {item.track.artists?.[0]?.name}
                  </span>
                </div>
                <button
                  onClick={() => playTrack(item.track)}
                  className={styles.playButton}
                >
                  Play
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
