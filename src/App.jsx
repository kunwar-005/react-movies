import './App.css'
import { Routes, Route } from 'react-router-dom'
import { HomePage, VideoPlayer } from './pages'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:movieId" element={<VideoPlayer />} />
      </Routes>
    </>
  )
}

export default App
