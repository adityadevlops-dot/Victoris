'use client'

import { memo, type ReactNode } from 'react'

// ─── SKELETON COMPONENTS ──────────────────────────────────────────────────────

export const CardSkeleton = memo(function CardSkeleton(): ReactNode {
  return (
    <div className="bg-[#111111] border border-[#1a1a1a] rounded p-4 space-y-3 animate-pulse">
      <div className="h-6 bg-[#1a1a1a] rounded w-3/4" />
      <div className="h-4 bg-[#1a1a1a] rounded" />
      <div className="h-4 bg-[#1a1a1a] rounded w-5/6" />
      <div className="mt-4 flex gap-2">
        <div className="h-8 bg-[#1a1a1a] rounded w-20" />
        <div className="h-8 bg-[#1a1a1a] rounded w-20" />
      </div>
    </div>
  )
})

export const TableSkeleton = memo(function TableSkeleton({ rows = 5 }: { rows?: number }): ReactNode {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4 p-3 bg-[#111111] border border-[#1a1a1a] rounded animate-pulse">
          <div className="h-4 bg-[#1a1a1a] rounded flex-1" />
          <div className="h-4 bg-[#1a1a1a] rounded w-24" />
          <div className="h-4 bg-[#1a1a1a] rounded w-16" />
        </div>
      ))}
    </div>
  )
})

export const ListSkeleton = memo(function ListSkeleton({ items = 5 }: { items?: number }): ReactNode {
  return (
    <ul className="space-y-2">
      {Array.from({ length: items }).map((_, i) => (
        <li key={i} className="h-12 bg-[#111111] border border-[#1a1a1a] rounded animate-pulse" />
      ))}
    </ul>
  )
})

export const TextSkeleton = memo(function TextSkeleton({ lines = 3 }: { lines?: number }): ReactNode {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-[#1a1a1a] rounded animate-pulse"
          style={{ width: i === lines - 1 ? '85%' : '100%' }}
        />
      ))}
    </div>
  )
})

export const GridSkeleton = memo(function GridSkeleton({
  columns = 3,
  rows = 4,
}: {
  columns?: number
  rows?: number
}): ReactNode {
  return (
    <div className={`grid grid-cols-${columns} gap-4`}>
      {Array.from({ length: columns * rows }).map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-[#111111] border border-[#1a1a1a] rounded animate-pulse"
        />
      ))}
    </div>
  )
})

export const CircleSkeleton = memo(function CircleSkeleton({
  size = 40,
}: {
  size?: number
}): ReactNode {
  return (
    <div
      className="rounded-full bg-[#1a1a1a] animate-pulse"
      style={{ width: size, height: size }}
    />
  )
})
