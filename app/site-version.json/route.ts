export const dynamic = "force-static";

export function GET() {
  return Response.json(
    { version: process.env.NEXT_PUBLIC_SITE_VERSION },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
