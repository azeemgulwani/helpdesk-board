'use client';

export default function TicketCard({ ticket, inQueue, onAdd }) {
  const { title, description, priority, status, assignee, updatedAt } = ticket;
  const time = new Date(updatedAt).toLocaleString();

  return (
    <div className="rounded-2xl border p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-lg">{title}</h3>
        <span className="text-xs px-2 py-1 rounded-full border">{priority}</span>
      </div>
      <p className="text-sm text-gray-600 mt-2 line-clamp-3">{description}</p>
      <div className="mt-3 text-sm">
        <div><span className="font-medium">Status:</span> {status}</div>
        <div><span className="font-medium">Assignee:</span> {assignee}</div>
        <div className="text-gray-500">Updated: {time}</div>
      </div>
      <button
        className="mt-4 w-full rounded-xl border px-3 py-2 disabled:opacity-50"
        onClick={onAdd}
        disabled={inQueue}
      >
        {inQueue ? 'Already in My Queue' : 'Add to My Queue'}
      </button>
      {inQueue && (
        <p className="mt-2 text-xs text-gray-500">This ticket is already in your queue.</p>
      )}
    </div>
  );
}