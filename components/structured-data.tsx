/**
 * Renders schema.org JSON-LD. Payloads are serialised with `<` escaped so that
 * user-controlled strings can never break out of the script tag.
 */
export function StructuredData({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  )
}
