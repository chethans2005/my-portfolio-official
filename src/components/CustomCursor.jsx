import { useEffect, useRef, useState } from 'react'

const DEFAULT_CURSOR = { mode: 'default', label: '' }

function getCursorMeta(target) {
  if (!(target instanceof Element)) {
    return DEFAULT_CURSOR
  }

  if (target.closest('input, textarea, select, [contenteditable="true"]')) {
    return { mode: 'input', label: '' }
  }

  if (target.closest('.modal-close')) {
    return { mode: 'interactive', label: 'Close' }
  }

  if (target.closest('.project-card-shell')) {
    return { mode: 'interactive', label: 'View' }
  }

  if (target.closest('.project-link, .contact-link')) {
    return { mode: 'interactive', label: 'Open' }
  }

  if (target.closest('.nav-link')) {
    return { mode: 'interactive', label: 'Jump' }
  }

  if (target.closest('.btn-primary, .btn-secondary')) {
    return { mode: 'interactive', label: 'Go' }
  }

  if (target.closest('a, button, [role="button"], .chip')) {
    return { mode: 'interactive', label: 'Tap' }
  }

  return DEFAULT_CURSOR
}

function CustomCursor() {
  const shellRef = useRef(null)
  const haloRef = useRef(null)
  const coreRef = useRef(null)
  const labelRef = useRef(null)
  const frameRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState({
    visible: false,
    pressed: false,
    mode: 'default',
    label: '',
  })

  useEffect(() => {
    const canHover = window.matchMedia('(pointer: fine)').matches

    if (!canHover) {
      return undefined
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.body.classList.add('custom-cursor-enabled')

    const setTransforms = (x, y, smoothX, smoothY) => {
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${smoothX}px, ${smoothY}px, 0) translate(-50%, -50%)`
      }

      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${smoothX + 26}px, ${smoothY - 26}px, 0)`
      }
    }

    const tick = () => {
      const easing = reduceMotion ? 1 : 0.18
      smoothRef.current.x += (targetRef.current.x - smoothRef.current.x) * easing
      smoothRef.current.y += (targetRef.current.y - smoothRef.current.y) * easing

      setTransforms(
        targetRef.current.x,
        targetRef.current.y,
        smoothRef.current.x,
        smoothRef.current.y,
      )

      frameRef.current = window.requestAnimationFrame(tick)
    }

    const updateMeta = (target) => {
      const next = getCursorMeta(target)

      setCursorState((prev) => {
        if (prev.mode === next.mode && prev.label === next.label) {
          return prev
        }

        return { ...prev, mode: next.mode, label: next.label }
      })
    }

    const handleMove = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY }

      setCursorState((prev) => (prev.visible ? prev : { ...prev, visible: true }))
      updateMeta(event.target)
    }

    const handlePointerDown = () => {
      setCursorState((prev) => (prev.pressed ? prev : { ...prev, pressed: true }))
    }

    const handlePointerUp = () => {
      setCursorState((prev) => (prev.pressed ? { ...prev, pressed: false } : prev))
    }

    const handleWindowLeave = () => {
      setCursorState((prev) => ({ ...prev, visible: false, pressed: false, ...DEFAULT_CURSOR }))
    }

    const handleWindowEnter = (event) => {
      targetRef.current = { x: event.clientX, y: event.clientY }
      smoothRef.current = { x: event.clientX, y: event.clientY }
      setTransforms(event.clientX, event.clientY, event.clientX, event.clientY)
      setCursorState((prev) => ({ ...prev, visible: true }))
      updateMeta(event.target)
    }

    frameRef.current = window.requestAnimationFrame(tick)
    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mouseenter', handleWindowEnter, { passive: true })
    window.addEventListener('mouseleave', handleWindowLeave, { passive: true })
    window.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('blur', handleWindowLeave)

    return () => {
      document.body.classList.remove('custom-cursor-enabled')
      window.cancelAnimationFrame(frameRef.current)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseenter', handleWindowEnter)
      window.removeEventListener('mouseleave', handleWindowLeave)
      window.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('mouseup', handlePointerUp)
      window.removeEventListener('blur', handleWindowLeave)
    }
  }, [])

  const className = [
    'custom-cursor-shell',
    cursorState.visible ? 'is-visible' : '',
    cursorState.mode === 'interactive' ? 'is-interactive' : '',
    cursorState.mode === 'input' ? 'is-input' : '',
    cursorState.pressed ? 'is-pressed' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={shellRef} className={className} aria-hidden="true">
      <div ref={haloRef} className="custom-cursor-halo" />
      <div ref={coreRef} className="custom-cursor-core" />
      <div ref={labelRef} className="custom-cursor-label">
        {cursorState.label}
      </div>
    </div>
  )
}

export default CustomCursor