// Utility functions for status computation and data processing

export type Status = 'good' | 'warning' | 'critical';

/**
 * Get status based on score (lower is better for some metrics)
 */
export function getStatus(score: number, lowerIsBetter = false): Status {
  if (lowerIsBetter) {
    if (score <= 30) return 'good';
    if (score <= 60) return 'warning';
    return 'critical';
  } else {
    if (score >= 70) return 'good';
    if (score >= 40) return 'warning';
    return 'critical';
  }
}

/**
 * Compute overall readiness score and reason
 */
export function computeReadiness(metrics: Array<{ recoveryScore: number; injuryRisk: number; behaviour: { stress: number } }>): { score: number; reason: string } {
  if (metrics.length === 0) {
    return { score: 0, reason: 'No data available' };
  }

  const latest = metrics[metrics.length - 1];
  const recovery = latest.recoveryScore;
  const injuryRisk = latest.injuryRisk;
  const stress = latest.behaviour.stress;

  // Weighted average: recovery 50%, injury risk 30%, stress 20%
  const score = (recovery * 0.5) + ((100 - injuryRisk) * 0.3) + ((100 - stress) * 0.2);

  // Determine reason
  let reason = '';
  if (recovery < 60) {
    reason = 'Low recovery score';
  } else if (injuryRisk > 40) {
    reason = 'Elevated injury risk';
  } else if (stress > 40) {
    reason = 'High stress levels';
  } else {
    reason = 'All systems optimal';
  }

  return { score: Math.round(score), reason };
}

/**
 * Compute trend from time series data
 */
export function computeTrend(series: Array<{ value: number }>): 'improving' | 'stable' | 'declining' {
  if (series.length < 2) return 'stable';

  const firstHalf = series.slice(0, Math.floor(series.length / 2));
  const secondHalf = series.slice(Math.floor(series.length / 2));

  const firstAvg = firstHalf.reduce((sum, item) => sum + item.value, 0) / firstHalf.length;
  const secondAvg = secondHalf.reduce((sum, item) => sum + item.value, 0) / secondHalf.length;

  const change = secondAvg - firstAvg;
  const threshold = (firstAvg * 0.05); // 5% threshold

  if (change > threshold) return 'improving';
  if (change < -threshold) return 'declining';
  return 'stable';
}

/**
 * Filter metrics by date range
 */
export function filterByRange<T extends { date: string }>(
  data: T[],
  range: 'today' | '7d' | '30d'
): T[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let startDate: Date;
  switch (range) {
    case 'today':
      startDate = new Date(today);
      break;
    case '7d':
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 6); // Include today + 6 days back = 7 days
      break;
    case '30d':
      startDate = new Date(today);
      startDate.setDate(startDate.getDate() - 29); // Include today + 29 days back = 30 days
      break;
  }

  return data.filter(item => {
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    return itemDate >= startDate && itemDate <= today;
  });
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Format datetime for display
 */
export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `${diffMins}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays === 1) {
    return 'Yesterday';
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
