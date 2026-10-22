"use client"

/* eslint-disable @next/next/no-html-link-for-pages --
 * `global-error` replaces the root layout and is rendered outside the App
 * Router context, so `next/link` has no router to push to. A plain anchor
 * performs a full navigation, which also resets the broken router state —
 * exactly the behaviour a last-resort error page wants.
 */

import { useEffect } from "react"

/**
 * Last-resort boundary. It replaces the root layout, so it must render its own
 * <html> and <body> and cannot rely on global styles being applied.
 *
 * Next.js passes the recovery callback as `reset`; the previous version ignored
 * it entirely, so a transient failure could only be recovered from by a manual
 * browser refresh.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#0f0f10",
          color: "#f7f7f8",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          padding: "2rem",
        }}
      >
        <div style={{ maxWidth: "34rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "#e0453f",
            }}
          >
            Unexpected error
          </p>
          <h1 style={{ margin: "1rem 0 0", fontSize: "2rem", lineHeight: 1.15 }}>
            We hit an unexpected snag.
          </h1>
          <p style={{ margin: "1rem 0 0", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
            The page could not be loaded. Please refresh, or contact us on +91 85550 68339 and we will help you
            straight away.
          </p>
          {error.digest ? (
            <p style={{ margin: "1.25rem 0 0", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
              Reference: {error.digest}
            </p>
          ) : null}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.75rem" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                display: "inline-block",
                padding: "0.85rem 1.75rem",
                borderRadius: "9999px",
                border: 0,
                background: "#e0453f",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* Plain anchor by design — see the file-level eslint-disable note above. */}
            <a
              href="/"
              style={{
                display: "inline-block",
                padding: "0.85rem 1.75rem",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
