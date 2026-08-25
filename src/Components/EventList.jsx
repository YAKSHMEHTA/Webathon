import React from 'react'
import { Link } from 'react-router-dom'
import EventInfoCard, { SAMPLE_EVENTS } from './EventInfoCard'
import { slugify } from '../lib/utils'

export default function EventList({ events = SAMPLE_EVENTS }) {
  return (
    <section className="p-6">
      <h3 className="text-xl font-bold text-white mb-4">All Events</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((ev) => (
          <div key={ev.id} className="space-y-2">
            <EventInfoCard event={ev} />
            <div className="mt-2">
              <Link
                to={`/detail/${encodeURIComponent(slugify(ev.title))}`}
                className="text-[#cdfb4a] text-sm font-medium"
              >
                View details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
