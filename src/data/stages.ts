export const STAGES = ['Concept', 'Design', 'Analysis', 'Manufacture', 'Testing', 'Complete'] as const;
export type Stage = (typeof STAGES)[number];
