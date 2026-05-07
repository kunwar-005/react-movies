import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/spinner'
const VideoPlayer = () => {
  const navigate = useNavigate()
  const { movieId } = useParams()
  // Dummy data - you can replace this with real data from props
  // movieId from URL params: {movieId}
  const [videoInfo, setVideoInfo] = useState([])
  const [movieDetails, setMovieDetails] = useState([])


 



  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzdiYWEzNzJlZjg1MDczM2U0M2RiMmU5ZTgwYTZlYSIsIm5iZiI6MTc1NzE0NzA2My40Mywic3ViIjoiNjhiYmVmYjcxZjkwNWI3NjdmOWJmYzQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.EHARvdkBTO3gyCgQFAP9wWrMFRdz1LfbmBfxPvQ5wq8";

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchvideo = async (movieId) => {
    const endpoint = `https://api.themoviedb.org/3/movie/${movieId}/videos`;
    const response = await fetch(endpoint, API_OPTIONS)
    const data = await response.json()
    // console.log('API Response:', data)
    // console.log('Results array:', data.results)

    setVideoInfo(data.results || [])
    // console.log('Video info after setting:', videoInfo)
  }
   const fetchMovieDetails = async (movieId) => {
    try {
      const endpoint = `https://api.themoviedb.org/3/movie/${movieId}`;
      const response = await fetch(endpoint, API_OPTIONS)
      const data = await response.json()
      setMovieDetails(data)
      console.log('Video info after setting:', data)
      return data
    } catch (error) {
      // console.error('Error fetching movie details:', error)
      return null
    }
  }

  useEffect(() => {
    fetchvideo(movieId)
  }, [movieId])
  useEffect(() => {
    fetchMovieDetails(movieId)
  }, [movieId])

  const handleBackClick = () => {
    navigate('/')
  }

  return (
    <div className="video-player-container">
      <main>
        <div className="pattern">
          <div className="wrapper">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="back-button"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '8px',
                marginBottom: '20px',
                cursor: 'pointer',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              ← Back to Home
            </button>

            {/* Video Section */}
            <section className="video-section" style={{ marginBottom: '30px' }}>
              <div
                className="video-container"
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
              >
                {videoInfo.length > 0 ? (
                  <iframe style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                    src={`https://www.youtube.com/embed/${videoInfo[0].key}?autoplay=1&mute=1`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen 
                    
                  ></iframe>
                ) : (
                  
                    <Spinner/>
                 
                )}

              </div>
            </section>

            {/* Movie Details Section */}
            <section className="movie-details">
              <div
                className="details-container"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '12px',
                  padding: '30px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="movie-header" style={{ marginBottom: '20px' }}>
                  <h1
                    style={{
                      color: 'white',
                      fontSize: '2.5rem',
                      marginBottom: '10px',
                      fontWeight: 'bold'
                    }}
                  >
                    {movieDetails.title}
                  </h1>

                  {/* Movie Stats */}
                  <div
                    className="movie-stats"
                    style={{
                      display: 'flex',
                      gap: '20px',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      marginBottom: '20px'
                    }}
                  >
                    <div className="rating" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <img src="/star.svg" alt="Star" style={{ width: '20px', height: '20px' }} />
                      <span style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '18px' }}>
                        {movieDetails?.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A'}

                      </span>
                    </div>

                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>•</span>

                    <div className="release-date">
                      <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {new Date(movieDetails.release_date).getFullYear()}
                      </span>
                    </div>

                    <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>•</span>

                    <div className="language">
                      <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                        {movieDetails.original_language}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="description">
                  <h3
                    style={{
                      color: 'white',
                      fontSize: '1.5rem',
                      marginBottom: '15px'
                    }}
                  >
                    Overview
                  </h3>
                  <p
                    style={{
                      color: 'rgba(255, 255, 255, 0.9)',
                      lineHeight: '1.6',
                      fontSize: '16px',
                      maxWidth: '800px'
                    }}
                  >
                    {movieDetails.overview}
                  </p>
                </div>

                {/* Additional Details */}
                <div
                  className="additional-details"
                  style={{
                    marginTop: '30px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px'
                  }}
                >
                  <div className="detail-item">
                    <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '5px' }}>
                      Release Date
                    </h4>
                    <p style={{ color: 'white', fontSize: '16px' }}>
                      {new Date(movieDetails.release_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>

                  <div className="detail-item">
                    <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '5px' }}>
                      Language
                    </h4>
                    <p style={{ color: 'white', fontSize: '16px' }}>
                      {movieDetails.original_language}
                    </p>
                  </div>

                  <div className="detail-item">
                    <h4 style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '5px' }}>
                      Rating
                    </h4>
                    <p style={{ color: 'white', fontSize: '16px' }}>
                      {movieDetails?.vote_average ? movieDetails.vote_average.toFixed(1) : 'N/A'}/10

                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default VideoPlayer