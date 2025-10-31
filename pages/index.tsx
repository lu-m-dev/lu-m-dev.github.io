import { useState, useRef } from 'react'

export default function Home() {
  const [introShown] = useState(true)
  const introRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="page-bg">
      <div ref={introRef} className={`intro ${introShown ? 'show' : ''}`} aria-hidden={!introShown}>
        Hi, I’m Lu.
        &nbsp;
        I compute science.
      </div>
    </div>
  )
}
