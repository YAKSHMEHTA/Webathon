import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import EventInfoCard, { SAMPLE_EVENTS } from '../Components/EventInfoCard'
import { slugify } from '../lib/utils'

export default function EventDetail() {
  const { eventName } = useParams()

  const event = useMemo(() => {
    if (!eventName) return null
    const slug = decodeURIComponent(eventName)
    return SAMPLE_EVENTS.find((e) => {
      const titleSlug = slugify(e.title)
      const categorySlug = slugify(e.category)
      const idStr = String(e.id)
      // match exact title slug, category slug, id, or if title contains the slug
      return (
        titleSlug === slug ||
        categorySlug === slug ||
        idStr === slug ||
        titleSlug.includes(slug)
      )
    })
  }, [eventName])

  if (!event) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h2 className="text-2xl font-bold text-white">Event not found</h2>
          <p className="mt-2 text-neutral-400">No event matches that name.</p>
          <div className="mt-4">
            <Link to="/" className="text-[#cdfb4a]">Return home</Link>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] p-8">
      <div className="mx-auto max-w-3xl">
        <EventInfoCard event={event} defaultExpanded={true} />
      </div>
    </main>
  )
}
