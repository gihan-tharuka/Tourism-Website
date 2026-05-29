import { Container } from '@/components/ui/container'

export default function ToursLoading() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="border-b border-white/10 py-16 sm:py-24">
        <Container>
          <div className="h-4 w-40 animate-pulse rounded-full bg-amber-200/20" />
          <div className="mt-6 h-12 max-w-2xl animate-pulse rounded-lg bg-white/10" />
          <div className="mt-4 h-6 max-w-xl animate-pulse rounded-lg bg-white/10" />
        </Container>
      </section>
      <Container>
        <div className="py-12">
          <div className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90"
            >
              <div className="h-72 animate-pulse bg-white/10" />
              <div className="space-y-4 p-6">
                <div className="h-5 animate-pulse rounded bg-white/10" />
                <div className="h-16 animate-pulse rounded bg-white/10" />
                <div className="h-10 animate-pulse rounded-full bg-amber-200/20" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  )
}
