'use client'

import { Car, Users, Compass, ShieldCheck } from 'lucide-react'

const vehicleRanges = [
  { range: '1–3 guests', vehicle: 'Sedan / Estate', icon: Car },
  { range: '4–6 guests', vehicle: 'Luxury SUV', icon: Users },
  { range: '7–9 guests', vehicle: 'Mini Van', icon: Compass },
  { range: '10+ guests', vehicle: 'Coach / Private Transfer', icon: ShieldCheck },
]

export function TourDetailVehicles() {
  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.36em] text-amber-200/80">Vehicle guidance</p>
          <h2 className="text-3xl font-semibold text-white">Vehicle suggestions for every group size.</h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-300">
            We recommend the right vehicle for your party so transfers feel comfortable, smooth and premium from door to door.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {vehicleRanges.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.range} className="rounded-[2rem] border border-white/10 bg-slate-950/85 p-6 text-slate-300 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-amber-300/10 text-amber-200">
                  <Icon size={22} />
                </div>
                <p className="mt-6 text-sm uppercase tracking-[0.32em] text-amber-200/80">{item.range}</p>
                <p className="mt-3 text-xl font-semibold text-white">{item.vehicle}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
