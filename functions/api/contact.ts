interface Env {
  CONTACT_EMAIL: string
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  // Cheap drive-by-scraper guard: only serve same-origin requests.
  const origin = context.request.headers.get('Origin')
  const url = new URL(context.request.url)
  if (origin && new URL(origin).host !== url.host) {
    return new Response('Forbidden', { status: 403 })
  }
  const email = context.env.CONTACT_EMAIL
  if (!email) return new Response('Not configured', { status: 500 })
  return Response.json({ email }, { headers: { 'Cache-Control': 'no-store' } })
}
