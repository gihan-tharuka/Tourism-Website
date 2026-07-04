'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Badge } from '@/components/shadcn/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/shadcn/card'
import { Separator } from '@/components/shadcn/separator'
import type { Tour } from '@/types/tour'
import { cn } from '@/lib/utils'

interface TourCardProps {
  tour: Tour
  destinationLabels?: string[]
  href?: string
}

export function TourCard({
  tour,
  destinationLabels,
  href,
}: TourCardProps) {
  const destinations = destinationLabels ?? tour.destinationIds

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group transition duration-300 hover:-translate-y-1"
    >
      <Card className="gap-0 overflow-hidden rounded-[2rem] border-white/15 bg-slate-900/95 py-0 text-slate-100 shadow-[0_30px_90px_rgba(15,23,42,0.45)] transition duration-300 group-hover:shadow-[0_34px_120px_rgba(15,23,42,0.55)]">
        <CardHeader className="relative h-72 overflow-hidden p-0">
          <Image
            src={tour.image}
            alt={`${tour.title} travel image`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-slate-100">
            <Badge className="border-0 bg-transparent px-0 py-0 text-sm uppercase tracking-[0.3em] text-amber-200/90">
              {tour.durationDays} days
            </Badge>
            <h3 className="mt-2 text-2xl font-semibold leading-tight">{tour.title}</h3>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 p-6">
          <p className="text-sm leading-7 text-slate-300">{tour.summary}</p>
          <div className="flex flex-wrap gap-2">
            {destinations.slice(0, 3).map((destination) => (
              <Badge
                key={destination}
                variant="outline"
                className="border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-slate-300"
              >
                {destination}
              </Badge>
            ))}
          </div>
          <Separator className="bg-white/10" />
          <CardFooter className="justify-between gap-4 px-0 pt-2">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Starting price</p>
              <p className="mt-1 text-xl font-semibold text-white">${tour.startingPrice.toLocaleString()}</p>
            </div>
            <Link
              href={href ?? `/tours/${tour.slug}`}
              className={cn(
                'rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-950 transition hover:bg-amber-200',
              )}
            >
              Explore
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </motion.article>
  )
}
