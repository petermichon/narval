import db from 'tona-db-mini'

type Video = {
  id: string
  time: string
}

export function getVideos() {
  const collection = db.collection<Video>('videos')
  const videos = collection.get()
  return videos
}
