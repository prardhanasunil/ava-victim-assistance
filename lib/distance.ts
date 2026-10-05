export type Coordinates = {
  latitude: number;
  longitude: number;
};

/**
 * Calculates the straight-line distance between two coordinates
 * using the Haversine formula.
 *
 * Returns the distance in kilometres.
 */
export function calculateDistance(
  pointA: Coordinates,
  pointB: Coordinates
): number {
  const earthRadiusKm = 6371;

  const latitudeDifference =
    toRadians(pointB.latitude - pointA.latitude);

  const longitudeDifference =
    toRadians(pointB.longitude - pointA.longitude);

  const latitudeA = toRadians(pointA.latitude);
  const latitudeB = toRadians(pointB.latitude);

  const a =
    Math.sin(latitudeDifference / 2) *
      Math.sin(latitudeDifference / 2) +
    Math.cos(latitudeA) *
      Math.cos(latitudeB) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * Formats a distance into a user-friendly value.
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }

  if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km`;
  }

  return `${Math.round(distanceKm)} km`;
}