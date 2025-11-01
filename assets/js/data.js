// VexoStream mock catalog data (copyright-free sources)
export const titles = [
  {
    id: 'alps-flight',
    name: 'Alpine Flight',
    genres: ['Adventure','Aerial'],
    rating: 4.6,
    summary: 'Soar above snow-capped peaks and emerald valleys across the European Alps.',
    location: 'European Alps',
    year: 2021,
    durationMin: 6,
    thumb: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop',
    video: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    altVideos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ]
  },
  {
    id: 'sahara-dunes',
    name: 'Sahara Dunes',
    genres: ['Nature','Slow TV'],
    rating: 4.3,
    summary: 'Golden light paints ever-shifting dunes as winds trace patterns in the sand.',
    location: 'Sahara Desert',
    year: 2020,
    durationMin: 8,
    thumb: 'https://images.unsplash.com/photo-1509315902421-90b177b87e57?q=80&w=1200&auto=format&fit=crop',
    video: 'https://media.w3.org/2010/05/video/movie_300.mp4',
    altVideos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    ]
  },
  {
    id: 'tokyo-neon',
    name: 'Tokyo Neon Trails',
    genres: ['City','Night'],
    rating: 4.8,
    summary: 'Electric nights through Shinjuku and Shibuya—rain-slick streets reflect neon dreams.',
    location: 'Tokyo, Japan',
    year: 2022,
    durationMin: 7,
    thumb: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=1200&auto=format&fit=crop',
    video: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    altVideos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ]
  },
  {
    id: 'bali-shores',
    name: 'Bali Shores',
    genres: ['Beach','Relax'],
    rating: 4.5,
    summary: 'Azure waves and volcanic cliffs frame tranquil moments along Bali’s coastline.',
    location: 'Bali, Indonesia',
    year: 2019,
    durationMin: 5,
    thumb: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format&fit=crop',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    altVideos: [
      'https://media.w3.org/2010/05/sintel/trailer.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
    ]
  },
  {
    id: 'patagonia-rise',
    name: 'Patagonia Sunrise',
    genres: ['Mountains','Time-lapse'],
    rating: 4.7,
    summary: 'Granite spires glow at dawn over wind-swept steppe and glacial lakes.',
    location: 'Patagonia, Chile/Argentina',
    year: 2021,
    durationMin: 6,
    thumb: 'https://images.unsplash.com/photo-1483015403964-50e79c5a7b33?q=80&w=1200&auto=format&fit=crop',
    video: 'https://media.w3.org/2010/05/bunny/movie.mp4',
    altVideos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    ]
  },
  {
    id: 'rome-echoes',
    name: 'Echoes of Rome',
    genres: ['History','City'],
    rating: 4.4,
    summary: 'From the Colosseum to cobbled alleys, wander the Eternal City’s living museum.',
    location: 'Rome, Italy',
    year: 2018,
    durationMin: 5,
    thumb: 'https://images.unsplash.com/photo-1526483360412-f4dbaf036963?q=80&w=1200&auto=format&fit=crop',
    video: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    altVideos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
    ]
  },
  {
    id: 'norway-fjords',
    name: 'Norway Fjords',
    genres: ['Aerial','Nature'],
    rating: 4.9,
    summary: 'Carved by ice and time, mirror-still waters slice between towering cliffs.',
    location: 'Western Norway',
    year: 2023,
    durationMin: 7,
    thumb: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    altVideos: [
      'https://media.w3.org/2010/05/sintel/trailer.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ]
  },
  {
    id: 'kyoto-gardens',
    name: 'Kyoto Gardens',
    genres: ['Culture','Relax'],
    rating: 4.2,
    summary: 'Moss paths, maple leaves, and Zen stillness weave a quiet tapestry.',
    location: 'Kyoto, Japan',
    year: 2017,
    durationMin: 4,
    thumb: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=1200&auto=format&fit=crop',
    video: 'https://media.w3.org/2010/05/bunny/trailer.mp4',
    altVideos: [
      'https://www.w3schools.com/html/mov_bbb.mp4',
      'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
    ]
  }
];

export const genres = [...new Set(titles.flatMap(t=>t.genres))];
