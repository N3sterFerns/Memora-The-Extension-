import React from 'react'
import "../styles/youtubeBtn.scss"

const YoutubeBtn = ({url}) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="yt-btn"
    >
      <span className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M23.5 6.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.4-1C16.8 2.5 12 2.5 12 2.5h0s-4.8 0-8.2.4c-.5.1-1.5.1-2.4 1-.7.7-.9 2.3-.9 2.3S0 8.1 0 10v1.9c0 1.9.5 3.8.5 3.8s.2 1.6.9 2.3c.9.9 2.1.9 2.6 1 1.9.2 8 .4 8 .4s4.8 0 8.2-.4c.5-.1 1.5-.1 2.4-1 .7-.7.9-2.3.9-2.3s.5-1.9.5-3.8V10c0-1.9-.5-3.8-.5-3.8zM9.5 14.6V7.8l6.3 3.4-6.3 3.4z" />
        </svg>
      </span>

      <span className="text">Visit YouTube</span>
    </a>
  )
}

export default YoutubeBtn