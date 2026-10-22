"use client"

import { useEffect } from "react"

/**
 * Last-resort boundary. It replaces the root layout, so it must render its own
 * <html> and <body> and cannot rely on global styles being applied.
 */
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
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
          <a
            href="/"
            style={{
              display: "inline-block",
              marginTop: "1.75rem",
              padding: "0.85rem 1.75rem",
              borderRadius: "9999px",
              background: "#e0453f",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            Back to home
          </a>
        </div>
      </body>
    </html>
  )
}
