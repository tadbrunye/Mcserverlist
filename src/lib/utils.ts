import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`

  return formatDate(date)
}

/**
 * Calculate revenue per vote from the pool
 * @param totalVotesWithAds - Total votes from servers with ads enabled
 * @param totalAdRevenue - Total ad revenue for the period
 * @returns Value per vote
 */
export function calculateValuePerVote(
  totalVotesWithAds: number,
  totalAdRevenue: number
): number {
  if (totalVotesWithAds === 0) return 0

  const poolPercent = parseInt(process.env.AD_REVENUE_POOL_PERCENT || '30')
  const revenuePool = totalAdRevenue * (poolPercent / 100)

  return revenuePool / totalVotesWithAds
}

/**
 * Calculate popularity bonus for top servers
 * @param rank - Server's ranking (1-10)
 * @param totalAdRevenue - Total ad revenue for the period
 * @returns Bonus amount
 */
export function calculatePopularityBonus(rank: number, totalAdRevenue: number): number {
  if (rank > 10) return 0

  const bonusPercent = parseInt(process.env.POPULARITY_BONUS_PERCENT || '20')
  const bonusPool = totalAdRevenue * (bonusPercent / 100)

  // Top 10 servers get decreasing share of bonus pool
  const weights = [25, 18, 14, 11, 9, 7, 6, 4, 3, 3] // Percentages that sum to 100
  return (bonusPool * weights[rank - 1]) / 100
}
