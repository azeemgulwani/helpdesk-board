'use client';

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) return <p className="text-sm text-gray-600">Loading…</p>;
  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (isEmpty) return <p className="text-sm text-gray-600">No tickets match your filters.</p>;
  return null;
}