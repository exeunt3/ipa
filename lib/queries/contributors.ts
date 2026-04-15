import { queryOne } from "../db";
import { randomUUID } from "crypto";

export type ContributorRow = {
  id:          number;
  handle:      string | null;
  session_key: string;
  points:      number;
  created_at:  Date;
};

/**
 * Look up a contributor by session key, or create a new one.
 * Returns the contributor row and whether it was just created.
 */
export async function getOrCreateContributor(sessionKey: string | null): Promise<{
  contributor: ContributorRow;
  sessionKey:  string;
  isNew:       boolean;
}> {
  if (sessionKey) {
    const existing = await queryOne<ContributorRow>(
      `SELECT id, handle, session_key, points, created_at
       FROM contributors
       WHERE session_key = $1`,
      [sessionKey]
    );
    if (existing) {
      return { contributor: existing, sessionKey, isNew: false };
    }
  }

  // Create a new contributor with a fresh session key
  const newKey = randomUUID();
  const contributor = await queryOne<ContributorRow>(
    `INSERT INTO contributors (session_key)
     VALUES ($1)
     RETURNING id, handle, session_key, points, created_at`,
    [newKey]
  );
  if (!contributor) throw new Error("Contributor insert returned no row");
  return { contributor, sessionKey: newKey, isNew: true };
}
