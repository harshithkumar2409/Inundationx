import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function getRiskColor(level: string) {
  switch (level.toUpperCase()) {
    case 'LOW':
    case 'GREEN':
      return 'text-brand-green';
    case 'MODERATE':
    case 'YELLOW':
      return 'text-yellow-400';
    case 'HIGH':
    case 'ORANGE':
      return 'text-brand-amber';
    case 'SEVERE':
    case 'RED':
    case 'CRITICAL':
      return 'text-brand-red';
    default:
      return 'text-gray-400';
  }
}

export function getRiskBgColor(level: string) {
  switch (level.toUpperCase()) {
    case 'LOW':
    case 'GREEN':
      return 'bg-green-500/20 border-green-500/30';
    case 'MODERATE':
    case 'YELLOW':
      return 'bg-yellow-500/20 border-yellow-500/30';
    case 'HIGH':
    case 'ORANGE':
      return 'bg-amber-500/20 border-amber-500/30';
    case 'SEVERE':
    case 'RED':
    case 'CRITICAL':
      return 'bg-red-500/20 border-red-500/30';
    default:
      return 'bg-gray-500/20 border-gray-500/30';
  }
}

export function getAlertEmoji(level: string) {
  switch (level.toUpperCase()) {
    case 'GREEN': return '🟢';
    case 'YELLOW': return '🟡';
    case 'ORANGE': return '🟠';
    case 'RED': return '🔴';
    default: return '⚪';
  }
}

export function formatNumber(num: number): string {
  if (num >= 10000000) return (num / 10000000).toFixed(1) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(1) + ' L';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function getStatusColor(status: string) {
  switch (status.toUpperCase()) {
    case 'RECEIVED': return 'bg-blue-500/20 text-blue-400';
    case 'TEAM_ASSIGNED': return 'bg-amber-500/20 text-amber-400';
    case 'IN_PROGRESS': return 'bg-purple-500/20 text-purple-400';
    case 'COMPLETED': return 'bg-green-500/20 text-green-400';
    default: return 'bg-gray-500/20 text-gray-400';
  }
}
