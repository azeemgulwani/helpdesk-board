## Helpdesk Ticket Board

A Next.js + Tailwind CSS app (JavaScript + JSX only) for browsing, filtering, searching, and queueing helpdesk tickets with simulated live updates.

---

## Setup

npm install

npm run dev

## visit http://localhost:3000

## Production

npm run build

npm start


## Features Checklist
Core Functionality

1. Loads ticket data dynamically from /api/tickets

2. Displays 15 sample tickets with varied priorities and statuses

3. Supports real-time updates — every ~8 seconds a random ticket’s status or priority changes

Filtering & Search

1. Status Filter: All / Open / In Progress / On Hold / Resolved

2. Priority Filter: All / Low / Medium / High / Critical

3. Search Box: Filters tickets instantly by title or description (case-insensitive)

My Queue

1. Add any ticket to My Queue

2. Prevents duplicates and disables the button for queued tickets

3. Remove individual tickets or clear the entire queue

4. Shows total queued count and ticket titles

Status & UX

1. Loading State: “Loading…” message while fetching data

2. Error State: “Unable to load tickets.” if fetch fails

3. Empty State: “No tickets match your filters.” when no results

4. Disabled buttons when actions aren’t available

5. Responsive grid layout with clean Tailwind styling

Technical Details

1. page.js is a Server Component

2. All interactive components (Board, filters, list, etc.) are Client Components using 'use client'

3. Board holds lifted state (tickets, filters, search, queue)

4. Clean useEffect hooks for data fetch and live-update interval (with proper cleanup)

5. Uses plain .js / .jsx files — no TypeScript

6. Utility file severity.js defines priorityOrder, statusOrder, and simple mapping helpers

## How It Works
API: GET /api/tickets serves 15 sample tickets (src/app/api/tickets/route.js)

Board: Fetches data, manages filters/search/queue, and simulates live updates every ~8s

Filters/Search: Case-insensitive match on title/description; status/priority selects

Queue: Add/remove items and clear all; no duplicates stored

Utilities: src/app/lib/severity.js exports priorityOrder, statusOrder, plus simple status/priority progressions

##File Structure

src/
  app/
    page.js
    api/
      tickets/
        route.js
    components/
      Board.jsx
      TicketList.jsx
      TicketCard.jsx
      StatusFilter.jsx
      PriorityFilter.jsx
      SearchBox.jsx
      MyQueueSummary.jsx
      StatusMessage.jsx
    lib/
      severity.js

## Notes
1. page.js is a Server Component

2. All interactive components start with 'use client'

3. No TypeScript; only .js / .jsx files