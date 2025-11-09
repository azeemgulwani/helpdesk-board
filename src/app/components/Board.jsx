'use client';

import { useEffect, useState, useMemo } from 'react';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import StatusMessage from './StatusMessage';
import TicketList from './TicketList';
import MyQueueSummary from './MyQueueSummary';
import { nextStatus, escalatePriority } from '../lib/severity';

export default function Board() {
  // lifted state
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({});

  // fetch on mount
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('/api/tickets');
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        if (!ignore) setTickets(data);
      } catch (e) {
        if (!ignore) setError('Unable to load tickets.');
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  // live updates every ~8s (within 6–10s), cleanup on unmount
  useEffect(() => {
    if (!tickets.length) return;

    const interval = setInterval(() => {
      setTickets((prev) => {
        if (!prev.length) return prev;
        const i = Math.floor(Math.random() * prev.length);
        const changed = { ...prev[i] };
        if (Math.random() < 0.5) {
          changed.status = nextStatus[changed.status] || changed.status;
        } else {
          changed.priority = escalatePriority[changed.priority] || changed.priority;
        }
        changed.updatedAt = new Date().toISOString();

        const copy = [...prev];
        copy[i] = changed;
        return copy;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [tickets.length]);

  // derive visible tickets from filters + search
  const visibleTickets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets.filter((t) => {
      const sOk = filters.status === 'All' || t.status === filters.status;
      const pOk = filters.priority === 'All' || t.priority === filters.priority;
      const qOk =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return sOk && pOk && qOk;
    });
  }, [tickets, filters, search]);

  // queue helpers
  const addToQueue = (id) => setQueue((q) => (q[id] ? q : { ...q, [id]: true }));
  const removeFromQueue = (id) =>
    setQueue((q) => {
      if (!q[id]) return q;
      const c = { ...q };
      delete c[id];
      return c;
    });
  const clearQueue = () => setQueue({});

  return (
    <div className="grid gap-6">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <StatusFilter
          value={filters.status}
          onChange={(v) => setFilters((f) => ({ ...f, status: v }))}
        />
        <PriorityFilter
          value={filters.priority}
          onChange={(v) => setFilters((f) => ({ ...f, priority: v }))}
        />
        <SearchBox value={search} onChange={setSearch} />
      </section>

      <StatusMessage
        loading={loading}
        error={error}
        isEmpty={!loading && !error && visibleTickets.length === 0}
      />

      {!loading && !error && visibleTickets.length > 0 && (
        <TicketList tickets={visibleTickets} queue={queue} onAddToQueue={addToQueue} />
      )}

      <MyQueueSummary
        tickets={Object.keys(queue)
          .map((id) => tickets.find((t) => t.id === id))
          .filter(Boolean)}
        count={Object.keys(queue).length}
        onRemove={removeFromQueue}
        onClear={clearQueue}
      />
    </div>
  );
}