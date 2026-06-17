export async function POST() {
  return Response.json(
    {
      error: 'Database connection failed',
      code: 'ECONNREFUSED',
      detail: 'Unable to connect to postgres://db.internal:5432/expenses',
    },
    { status: 500 }
  )
}
