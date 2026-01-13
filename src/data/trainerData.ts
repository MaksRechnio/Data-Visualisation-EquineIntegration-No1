// Data model for Trainer Overview dashboard

export interface Horse {
  id: string;
  name: string;
  age: number;
  discipline: string;
}

export interface DailyMetrics {
  date: string; // YYYY-MM-DD
  trainingIntensity: number; // 0-10
  recoveryScore: number; // 0-100
  injuryRisk: number; // 0-100
  restingHR: number; // bpm
  symmetryPct: number; // 0-100
  behaviour: {
    focus: number; // 0-100
    stress: number; // 0-100
    willingness: number; // 0-100
  };
}

export interface Alert {
  id: string;
  severity: 'low' | 'med' | 'high';
  title: string;
  description: string;
  metricKey: string;
  history: Array<{ date: string; value: number }>;
  recommendedAction: string;
}

export interface Update {
  id: string;
  dateTime: string; // ISO string
  role: 'Trainer' | 'Vet' | 'Nutritionist';
  category: 'Health' | 'Training' | 'Nutrition' | 'Biomechanics' | 'Environment';
  text: string;
}

// Generate dates for the last 30 days
const generateDates = (days: number): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

// Generate realistic daily metrics with some variation
const generateMetrics = (horseId: string, dates: string[]): DailyMetrics[] => {
  const baseValues: Record<string, Partial<DailyMetrics>> = {
    'horse-1': {
      trainingIntensity: 7,
      recoveryScore: 75,
      injuryRisk: 25,
      restingHR: 38,
      symmetryPct: 88,
      behaviour: { focus: 82, stress: 18, willingness: 90 },
    },
    'horse-2': {
      trainingIntensity: 6,
      recoveryScore: 68,
      injuryRisk: 35,
      restingHR: 42,
      symmetryPct: 75,
      behaviour: { focus: 70, stress: 30, willingness: 75 },
    },
    'horse-3': {
      trainingIntensity: 8,
      recoveryScore: 82,
      injuryRisk: 20,
      restingHR: 36,
      symmetryPct: 92,
      behaviour: { focus: 88, stress: 15, willingness: 95 },
    },
  };

  const base = baseValues[horseId] || baseValues['horse-1'];

  return dates.map((date, idx) => {
    // Add some realistic variation
    const dayVariation = Math.sin(idx * 0.3) * 0.15;
    const randomVariation = (Math.random() - 0.5) * 0.2;

    return {
      date,
      trainingIntensity: Math.max(0, Math.min(10, (base.trainingIntensity || 7) + dayVariation * 2 + randomVariation * 2)),
      recoveryScore: Math.max(0, Math.min(100, (base.recoveryScore || 75) + dayVariation * 10 + randomVariation * 10)),
      injuryRisk: Math.max(0, Math.min(100, (base.injuryRisk || 25) - dayVariation * 5 + randomVariation * 5)),
      restingHR: Math.max(30, Math.min(50, (base.restingHR || 38) + dayVariation * 3 + randomVariation * 3)),
      symmetryPct: Math.max(60, Math.min(100, (base.symmetryPct || 88) + dayVariation * 5 + randomVariation * 5)),
      behaviour: {
        focus: Math.max(0, Math.min(100, (base.behaviour?.focus || 82) + dayVariation * 8 + randomVariation * 8)),
        stress: Math.max(0, Math.min(100, (base.behaviour?.stress || 18) - dayVariation * 5 + randomVariation * 5)),
        willingness: Math.max(0, Math.min(100, (base.behaviour?.willingness || 90) + dayVariation * 8 + randomVariation * 8)),
      },
    };
  });
};

// Generate alerts based on metrics
const generateAlerts = (horseId: string, metrics: DailyMetrics[]): Alert[] => {
  const alerts: Alert[] = [];
  const latest = metrics[metrics.length - 1];

  // Injury risk alert
  if (latest.injuryRisk > 40) {
    alerts.push({
      id: `${horseId}-alert-injury`,
      severity: latest.injuryRisk > 60 ? 'high' : latest.injuryRisk > 50 ? 'med' : 'low',
      title: 'Elevated Injury Risk',
      description: `Injury risk has increased to ${latest.injuryRisk.toFixed(0)}%. Monitor closely.`,
      metricKey: 'injuryRisk',
      history: metrics.slice(-7).map(m => ({ date: m.date, value: m.injuryRisk })),
      recommendedAction: 'Reduce training intensity by 20% and increase recovery time.',
    });
  }

  // Recovery score alert
  if (latest.recoveryScore < 60) {
    alerts.push({
      id: `${horseId}-alert-recovery`,
      severity: latest.recoveryScore < 40 ? 'high' : 'med',
      title: 'Low Recovery Score',
      description: `Recovery score is at ${latest.recoveryScore.toFixed(0)}%, indicating insufficient recovery.`,
      metricKey: 'recoveryScore',
      history: metrics.slice(-7).map(m => ({ date: m.date, value: m.recoveryScore })),
      recommendedAction: 'Schedule rest day and consider recovery protocols.',
    });
  }

  // Symmetry alert
  if (latest.symmetryPct < 80) {
    alerts.push({
      id: `${horseId}-alert-symmetry`,
      severity: latest.symmetryPct < 70 ? 'med' : 'low',
      title: 'Asymmetry Detected',
      description: `Symmetry has dropped to ${latest.symmetryPct.toFixed(0)}%.`,
      metricKey: 'symmetryPct',
      history: metrics.slice(-7).map(m => ({ date: m.date, value: m.symmetryPct })),
      recommendedAction: 'Review biomechanics data and consult with vet if persists.',
    });
  }

  // Stress alert
  if (latest.behaviour.stress > 40) {
    alerts.push({
      id: `${horseId}-alert-stress`,
      severity: latest.behaviour.stress > 60 ? 'high' : 'med',
      title: 'Elevated Stress Levels',
      description: `Stress levels are at ${latest.behaviour.stress.toFixed(0)}%.`,
      metricKey: 'behaviour.stress',
      history: metrics.slice(-7).map(m => ({ date: m.date, value: m.behaviour.stress })),
      recommendedAction: 'Reduce training intensity and provide additional rest periods.',
    });
  }

  return alerts;
};

// Generate updates feed
const generateUpdates = (): Update[] => {
  const updates: Update[] = [
    {
      id: 'update-1',
      dateTime: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      role: 'Trainer',
      category: 'Training',
      text: 'Completed 45min dressage session. Horse showed good focus and responsiveness.',
    },
    {
      id: 'update-2',
      dateTime: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      role: 'Vet',
      category: 'Health',
      text: 'Routine check-up completed. All vitals within normal range.',
    },
    {
      id: 'update-3',
      dateTime: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      role: 'Nutritionist',
      category: 'Nutrition',
      text: 'Adjusted feed ratios based on current training load. Increased protein intake.',
    },
    {
      id: 'update-4',
      dateTime: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      role: 'Trainer',
      category: 'Biomechanics',
      text: 'Noted slight asymmetry in left hind during trot. Monitoring closely.',
    },
    {
      id: 'update-5',
      dateTime: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      role: 'Vet',
      category: 'Health',
      text: 'Follow-up on previous concern: symmetry improving with targeted exercises.',
    },
    {
      id: 'update-6',
      dateTime: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
      role: 'Trainer',
      category: 'Environment',
      text: 'Stable conditions optimal. Temperature and humidity within ideal range.',
    },
    {
      id: 'update-7',
      dateTime: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      role: 'Nutritionist',
      category: 'Nutrition',
      text: 'Horse showing good appetite. Current diet supporting recovery well.',
    },
    {
      id: 'update-8',
      dateTime: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      role: 'Trainer',
      category: 'Training',
      text: 'Increased jumping intensity. Horse handling well with proper warm-up.',
    },
  ];

  return updates;
};

// Export data
export const horses: Horse[] = [
  { id: 'horse-1', name: 'Thunder', age: 8, discipline: 'Dressage' },
  { id: 'horse-2', name: 'Storm', age: 6, discipline: 'Jumping' },
  { id: 'horse-3', name: 'Aurora', age: 10, discipline: 'Eventing' },
];

const allDates = generateDates(30);
export const dailyMetricsByHorseId: Record<string, DailyMetrics[]> = {
  'horse-1': generateMetrics('horse-1', allDates),
  'horse-2': generateMetrics('horse-2', allDates),
  'horse-3': generateMetrics('horse-3', allDates),
};

export const alertsByHorseId: Record<string, Alert[]> = {
  'horse-1': generateAlerts('horse-1', dailyMetricsByHorseId['horse-1']),
  'horse-2': generateAlerts('horse-2', dailyMetricsByHorseId['horse-2']),
  'horse-3': generateAlerts('horse-3', dailyMetricsByHorseId['horse-3']),
};

export const updatesFeed: Update[] = generateUpdates();
