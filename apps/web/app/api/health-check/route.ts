export async function GET() {
  try {
    return Response.json({ success: "OK" });
  } catch (_e) {
    return Response.json({ success: "Not Ok" });
  }
}
