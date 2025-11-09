export const priorityOrder = { Low: 1, Medium: 2, High: 3, Critical: 4 };
export const statusOrder = { 'Open': 1, 'In Progress': 2, 'On Hold': 3, 'Resolved': 4 };

export const nextStatus = {
  Open: 'In Progress',
  'In Progress': 'Resolved',
  'On Hold': 'In Progress',
  Resolved: 'Resolved',
};

export const escalatePriority = {
  Low: 'Medium',
  Medium: 'High',
  High: 'Critical',
  Critical: 'Critical',
};