import { pointSites } from '../points/registry';
import { TRAIL_INCLUDE_THRESHOLD_M, distanceToPolyline, type LatLng } from '../lib/geo';

export function computeTrailPoints(
  waypoints: LatLng[],
  manualPoints: number[] = [],
  thresholdM: number = TRAIL_INCLUDE_THRESHOLD_M
): number[] {
  const manual = new Set(manualPoints);

  return pointSites
    .map((point) => {
      const projection = distanceToPolyline(point.coords, waypoints);
      return { id: point.id, ...projection };
    })
    .filter((candidate) => manual.has(candidate.id) || candidate.distM <= thresholdM)
    .sort((a, b) => a.alongM - b.alongM || a.id - b.id)
    .map((candidate) => candidate.id);
}
