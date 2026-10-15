export type LatLng = [number, number];

export const TRAIL_INCLUDE_THRESHOLD_M = 50;

const M_PER_DEG_LAT = 110540;
const M_PER_DEG_LNG = 111320;

function metersPerDegLng(lat: number): number {
  return M_PER_DEG_LNG * Math.cos((lat * Math.PI) / 180);
}

export function haversineMeters(a: LatLng, b: LatLng): number {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

export interface PolylineProjection {
  distM: number;
  alongM: number;
}

export function distanceToPolyline(
  point: LatLng,
  waypoints: LatLng[]
): PolylineProjection {
  if (waypoints.length === 0) {
    return { distM: Infinity, alongM: 0 };
  }
  if (waypoints.length === 1) {
    return { distM: haversineMeters(point, waypoints[0]), alongM: 0 };
  }

  const [lat, lng] = point;
  const kx = metersPerDegLng(lat);
  const ky = M_PER_DEG_LAT;
  const px = lng * kx;
  const py = lat * ky;

  let best: PolylineProjection = { distM: Infinity, alongM: 0 };
  let cumulative = 0;

  for (let i = 0; i < waypoints.length - 1; i++) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const ax = a[1] * kx;
    const ay = a[0] * ky;
    const bx = b[1] * kx;
    const by = b[0] * ky;
    const dx = bx - ax;
    const dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    let t = lenSq === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx;
    const cy = ay + t * dy;
    const dist = Math.hypot(px - cx, py - cy);
    const segLen = Math.sqrt(lenSq);
    if (dist < best.distM) {
      best = { distM: dist, alongM: cumulative + t * segLen };
    }
    cumulative += segLen;
  }

  return best;
}
