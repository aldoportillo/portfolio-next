'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './SpotifyPlaylist.module.css';

export default function SpotifyPlaylist() {
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  useEffect(() => {
    if (playlist && playlist.tracks && playlist.tracks.items.length > 0) {
      loadTrack(0);
    }
    return () => {
      if (audio) {
        audio.pause();
        setAudio(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  const loadTrack = (index) => {
    if (!playlist?.tracks?.items[index]) return;
    const track = playlist.tracks.items[index].track;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    if (track.preview_url) {
      const newAudio = new Audio(track.preview_url);
      newAudio.addEventListener('ended', () => {
        setIsPlaying(false);
      });
      setAudio(newAudio);
      setCurrentTrackIndex(index);
      setIsPlaying(false);
    } else {
      setAudio(null);
      setCurrentTrackIndex(index);
      setIsPlaying(false);
    }
  };

  const handlePlayPause = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handlePrevTrack = () => {
    if (!playlist) return;

    console.log(playlist.tracks.items[2]);
    const newIndex =
      currentTrackIndex === 0
        ? playlist.tracks.items.length - 1
        : currentTrackIndex - 1;
    loadTrack(newIndex);
  };

  const handleNextTrack = () => {
    if (!playlist) return;
    const newIndex = (currentTrackIndex + 1) % playlist.tracks.items.length;
    loadTrack(newIndex);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!playlist) return <p>No playlist available</p>;

  const currentItem = playlist.tracks.items[currentTrackIndex];
  const currentTrack = currentItem?.track || {};
  const albumImages = currentTrack.album?.images || [];
  const trackName = currentTrack.name || 'Untitled';
  const artistName = currentTrack.artists?.[0]?.name || 'Unknown Artist';

  const albumCoverUrl =
    albumImages[0]?.url || '/placeholder.png';

  return (
    <div className={styles.container}>
      <div className={styles.albumCoverWrapper}>
        <Image
          src={albumCoverUrl}
          alt={trackName}
          width={250}
          height={250}
          className={styles.albumCover}
        />
        <div className={styles.overlay}>
          <div className={styles.trackInfo}>
            <p className={styles.trackName}>{trackName}</p>
            <p className={styles.artistName}>{artistName}</p>
          </div>
          <div className={styles.controls}>
            <button onClick={handlePrevTrack} className={styles.controlButton}>
              ◀
            </button>
            <button onClick={handlePlayPause} className={styles.controlButton}>
              {isPlaying ? '❙❙' : '►'}
            </button>
            <button onClick={handleNextTrack} className={styles.controlButton}>
              ▶
            </button>
          </div>
        </div>
      </div>

      <p className={styles.text}>
        I have a playlist for coding
      </p>
      <p className={styles.small}>
        explore my <a href="https://open.spotify.com/playlist/2Nct7cXHNSIUpqmoSqKjZd?si=7c8d3974e67f43a5" target='blank' className={styles.accent}>Wired In</a> Playlist
      </p>
    </div>
  );
}
