import { Container } from '@/components/ui/container'

export default function CustomTourLoading() {
  return (
    <main className="min-h-screen bg-slate-950">
      <section className="min-h-[600px] bg-slate-900">
        <Container className="flex min-h-[600px] items-center py-12">
          <div className="w-full max-w-2xl">
            <div className="h-4 w-44 animate-pulse rounded-full bg-amber-200/20" />
            <div className="mt-6 h-16 animate-pulse rounded-lg bg-white/10" />
            <div className="mt-6 h-20 animate-pulse rounded-lg bg-white/10" />
          </div>
        </Container>
      </section>
      <Container>
        <div className="py-12 md:py-20">
          <div className="h-96 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
        </div>
      </Container>
    </main>
  )
}
