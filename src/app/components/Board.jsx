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