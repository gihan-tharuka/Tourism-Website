export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', message: 'API root is active' }), {
    headers: { 'content-type': 'application/json' },
  })
}
