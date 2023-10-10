import styles from './TopButton.module.css'
import { useState, useEffect } from 'react'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

export default function TopButton() {
  const [showButton, setShowButton] = useState<boolean>(false)

  const handleScroll = () => {
    if (!window.scrollY) return

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > window.innerHeight) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleShowButton)
    return () => {
      window.removeEventListener('scroll', handleShowButton)
    }
  }, [])

  return (
    <div className={styles.topBtn_wrap}>
      {showButton && (
        <button className={styles.topBtn} onClick={handleScroll}>
          <BsFillArrowUpCircleFill />
        </button>
      )}
    </div>
  )
}