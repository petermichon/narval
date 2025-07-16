import http from 'http'
import { getVideos } from './db.ts'

export function main() {
  const videos = getVideos()
  const videosJson = JSON.stringify(videos, null, 0)

  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173')
    // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    res.setHeader('Content-Type', 'application/json')
    res.end(videosJson)
  })

  server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/')
  })
}
