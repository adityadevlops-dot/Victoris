'use client'

import { useState, useEffect } from 'react'
import { RankBadge, StatWidget } from '@/components/shared'

interface BattleRecord {
  id: string
  opponent: string
  result: 'win' | 'loss'
  problemTitle: string
  date: string
  points: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

const MOCK_BATTLES: BattleRecord[] = [
  {
    id: '1',
    opponent: 'AlgoMaster92',
    result: 'win',
    problemTitle: 'Two Sum',
    date: '2 hours ago',
    points: 45,
  },
  {
    id: '2',
    opponent: 'CodeNinja',
    result: 'win',
    problemTitle: 'LRU Cache',
    date: '5 hours ago',
    points: 62,
  },
  {
    id: '3',
    opponent: 'BinarySearcher',
    result: 'loss',
    problemTitle: 'Merge K Lists',
    date: '1 day ago',
    points: 0,
  },
  {
    id: '4',
    opponent: 'DPWizard',
    result: 'win',
    problemTitle: 'Coin Change',
    date: '2 days ago',
    points: 58,
  },
]

const ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    title: 'First Blood',
    description: 'Win your first battle',
    icon: '⚔️',
    unlocked: true,
  },
  {
    id: '2',
    title: 'Winning Streak',
    description: '5 wins in a row',
    icon: '🔥',
    unlocked: true,
  },
  {
    id: '3',
    title: 'Speed Runner',
    description: 'Solve a problem in under 30 seconds',
    icon: '⚡',
    unlocked: false,
  },
  {
    id: '4',
    title: 'Diamond Mind',
    description: 'Reach Diamond rank',
    icon: '💎',
    unlocked: false,
  },
]

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userStats, setUserStats] = useState({
    username: 'Champion',
    rank: 'Gold',
    points: 2450,
    wins: 24,
    losses: 6,
    winRate: 80,
    problemsSolved: 127,
    streakDays: 12,
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const getRankColor = (rank: string) => {
    const rankColors: { [key: string]: string } = {
      Bronze: '#cd7f32',
      Silver: '#c0c0c0',
      Gold: '#ffd700',
      Platinum: '#e5e4e2',
      Diamond: '#7dd3fc',
      Master: '#f87171',
      Legend: '#dc2626',
    }
    return rankColors[rank] || '#dc2626'
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.3); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.6); }
        }
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .stat-card {
          animation: slide-in 0.5s ease-out;
        }
        .rank-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with User Profile */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-5xl font-bold mb-2 font-['Orbitron']">
                WELCOME BACK, <span className="text-[#dc2626]">{userStats.username}</span>
              </h1>
              <p className="text-[#a1a1aa] font-['Orbitron'] tracking-widest text-sm">
                ─── COMPETITIVE ARENA DASHBOARD ───
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="px-6 py-2 bg-[#dc2626] hover:bg-[#ef4444] text-white font-bold rounded transition-colors font-['Orbitron'] text-sm tracking-wider"
                onClick={() => (window.location.href = '/platform/arena')}
              >
                ⚔️ ENTER BATTLE
              </button>
              <button
                className="px-6 py-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333333] text-white font-bold rounded transition-colors font-['Orbitron'] text-sm tracking-wider"
                onClick={() => (window.location.href = '/platform/leaderboard')}
              >
                🏆 LEADERBOARD
              </button>
            </div>
          </div>

          {/* Rank Card */}
          <div
            className="rank-glow p-6 rounded-lg border-2 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]"
            style={{ borderColor: getRankColor(userStats.rank) + '40' }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#a1a1aa] font-['Orbitron'] text-xs tracking-widest mb-2">
                  CURRENT RANK
                </p>
                <div className="flex items-center gap-3">
                  <span
                    className="text-4xl font-bold font-['Orbitron'] tracking-wider"
                    style={{ color: getRankColor(userStats.rank) }}
                  >
                    {userStats.rank.toUpperCase()}
                  </span>
                  <div>
                    <p className="text-[#a1a1aa] font-['Orbitron'] text-xs">
                      {userStats.points} VICTO POINTS
                    </p>
                    <div className="w-64 h-2 bg-[#1a1a1a] rounded-full mt-1 border border-[#333333]">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${(userStats.points % 1000) / 10}%`,
                          background: `linear-gradient(90deg, ${getRankColor(userStats.rank)}, ${getRankColor(userStats.rank)}dd)`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-6xl opacity-20">🏅</div>
            </div>
          </div>
        </div>

        {/* Core Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="stat-card p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg hover:border-[#dc2626] transition-colors">
            <p className="text-[#a1a1aa] font-['Orbitron'] text-xs tracking-widest mb-3">
              WIN RATE
            </p>
            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold font-['Orbitron'] tracking-wider">
                {userStats.winRate}%
              </p>
              <div className="w-16 h-10 bg-[#1a1a1a] rounded flex items-end justify-between px-1 py-1 gap-0.5 border border-[#333333]">
                {[65, 78, 82, 76, 80].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#dc2626] rounded"
                    style={{ height: `${(h / 100) * 32}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="stat-card p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg hover:border-[#dc2626] transition-colors">
            <p className="text-[#a1a1aa] font-['Orbitron'] text-xs tracking-widest mb-3">
              WINS / LOSSES
            </p>
            <p className="text-4xl font-bold font-['Orbitron'] tracking-wider mb-1">
              <span className="text-[#00ff00]">{userStats.wins}</span>
              <span className="text-[#a1a1aa] mx-2">/</span>
              <span className="text-[#ff6b6b]">{userStats.losses}</span>
            </p>
            <p className="text-xs text-[#a1a1aa]">Battles fought: {userStats.wins + userStats.losses}</p>
          </div>

          <div className="stat-card p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg hover:border-[#dc2626] transition-colors">
            <p className="text-[#a1a1aa] font-['Orbitron'] text-xs tracking-widest mb-3">
              PROBLEMS SOLVED
            </p>
            <p className="text-4xl font-bold font-['Orbitron'] tracking-wider">{userStats.problemsSolved}</p>
            <p className="text-xs text-[#a1a1aa] mt-2">Across all difficulties</p>
          </div>

          <div className="stat-card p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg hover:border-[#dc2626] transition-colors">
            <p className="text-[#a1a1aa] font-['Orbitron'] text-xs tracking-widest mb-3">
              STREAK
            </p>
            <p className="text-4xl font-bold font-['Orbitron'] tracking-wider text-[#ffd700]">
              {userStats.streakDays} 🔥
            </p>
            <p className="text-xs text-[#a1a1aa] mt-2">Days of glory</p>
          </div>
        </div>

        {/* Recent Battles & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recent Battles */}
          <div className="lg:col-span-2">
            <div className="p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg">
              <h2 className="text-2xl font-bold font-['Orbitron'] tracking-wider mb-6 text-[#dc2626]">
                ⚔️ RECENT BATTLES
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {MOCK_BATTLES.map((battle, idx) => (
                  <div
                    key={battle.id}
                    className="p-4 bg-[#0a0a0a] border border-[#1a1a1a] rounded hover:border-[#dc2626] transition-colors"
                    style={{
                      animation: `slide-in 0.5s ease-out ${idx * 0.1}s both`,
                    }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-['Orbitron'] tracking-wide">
                            {battle.opponent}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-xs font-bold rounded font-['Orbitron'] ${
                              battle.result === 'win'
                                ? 'bg-[#00ff00] text-[#000]'
                                : 'bg-[#ff6b6b] text-white'
                            }`}
                          >
                            {battle.result === 'win' ? '✓ WIN' : '✗ LOSS'}
                          </span>
                        </div>
                        <p className="text-xs text-[#a1a1aa]">
                          {battle.problemTitle} • {battle.date}
                        </p>
                      </div>
                      {battle.result === 'win' && (
                        <span className="text-lg font-bold text-[#00ff00] font-['Orbitron']">
                          +{battle.points}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <div className="p-6 bg-[#111111] border border-[#1a1a1a] rounded-lg h-full">
              <h2 className="text-2xl font-bold font-['Orbitron'] tracking-wider mb-6 text-[#dc2626]">
                🏆 ACHIEVEMENTS
              </h2>
              <div className="space-y-3">
                {ACHIEVEMENTS.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded border transition-all ${
                      achievement.unlocked
                        ? 'bg-[#0a0a0a] border-[#1a1a1a] hover:border-[#ffd700]'
                        : 'bg-[#0a0a0a] border-[#0f0f0f] opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold font-['Orbitron'] tracking-wide">
                          {achievement.title}
                        </p>
                        <p className="text-xs text-[#a1a1aa] mt-0.5 line-clamp-2">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && (
                          <p className="text-xs text-[#00ff00] mt-1 font-['Orbitron']">
                            ✓ UNLOCKED
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-6 bg-gradient-to-br from-[#1a0a0a] to-[#0a0a0a] border-2 border-[#dc2626] rounded-lg hover:shadow-lg hover:shadow-[#dc2626]/20 transition-all font-['Orbitron'] tracking-wider font-bold text-[#dc2626] hover:text-white">
            🎯 PRACTICE PROBLEMS
          </button>
          <button className="p-6 bg-gradient-to-br from-[#1a0a0a] to-[#0a0a0a] border-2 border-[#dc2626] rounded-lg hover:shadow-lg hover:shadow-[#dc2626]/20 transition-all font-['Orbitron'] tracking-wider font-bold text-[#dc2626] hover:text-white">
            📊 VIEW STATISTICS
          </button>
          <button className="p-6 bg-gradient-to-br from-[#1a0a0a] to-[#0a0a0a] border-2 border-[#dc2626] rounded-lg hover:shadow-lg hover:shadow-[#dc2626]/20 transition-all font-['Orbitron'] tracking-wider font-bold text-[#dc2626] hover:text-white">
            ⚙️ SETTINGS
          </button>
        </div>
      </div>
    </div>
  )
}
