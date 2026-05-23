import { Container } from '@/components/ui/container'

export default function TourDetailLoading() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative h-[620px] overflow-hidden bg-slate-900">
        <div className="absolute inset-0 animate-pulse bg-white/10" />
        <Container className="relative flex h-full items-end pb-16">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-950/80 p-8">
            <div className="h-4 w-32 animate-pulse rounded-full bg-amber-200/20" />
            <div className="mt-5 h-12 animate-pulse rounded bg-white/10" />
            <div className="mt-4 h-20 animate-pulse rounded bg-white/10" />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="h-24 animate-pulse rounded-2xl bg-white/10" />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}
