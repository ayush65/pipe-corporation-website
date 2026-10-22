export default function Loading() {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl animate-pulse space-y-5">
          <div className="h-3 w-32 rounded-full bg-muted" />
          <div className="h-12 w-full rounded-2xl bg-muted" />
          <div className="h-12 w-4/5 rounded-2xl bg-muted" />
          <div className="h-5 w-full rounded-full bg-muted" />
          <div className="h-5 w-3/4 rounded-full bg-muted" />
        </div>
        <div className="mt-14 grid animate-pulse gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-2xl border border-border p-4">
              <div className="aspect-square w-full rounded-xl bg-muted" />
              <div className="h-3 w-3/4 rounded-full bg-muted" />
              <div className="h-3 w-1/2 rounded-full bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
