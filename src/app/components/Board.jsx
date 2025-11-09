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