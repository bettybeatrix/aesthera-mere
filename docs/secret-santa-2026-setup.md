# Secret Santa 2026 setup

The Secret Santa page is available at `/secret-santa`.

## Required Vercel environment variables

Add these to the existing `aesthera-mere` Vercel project:

- `SUPABASE_URL`: the Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: the Supabase service-role key (keep private; never use a `NEXT_PUBLIC_` prefix)
- `SECRET_SANTA_SETUP_KEY`: a long random secret used only by the organizer to initialize participants and start the draw

The app uses the existing `@supabase/supabase-js` dependency. No new package is required.

## Database setup

1. Open the Supabase SQL Editor for the project used by the website.
2. Run `supabase/migrations/202611280001_secret_santa.sql`.
3. Add the three environment variables above to Vercel (Production and Preview as appropriate).
4. Redeploy the Aesthera Mère project.

## Initialize the 13 participants

After deployment, send one POST request to:

`https://YOUR-AESTHERA-DOMAIN/api/secret-santa/setup`

with header:

`x-secret-santa-setup-key: YOUR_SECRET_SANTA_SETUP_KEY`

The response contains each participant's unique access code exactly once. Save the response securely and privately distribute each person's code. Do not post the response in a group chat or commit it to GitHub. The database stores only SHA-256 hashes of access codes.

The setup endpoint is one-time only and refuses to run if participants already exist.

## Start the draw

After all 13 participants have saved their wishlists, send a POST request to:

`https://YOUR-AESTHERA-DOMAIN/api/secret-santa/draw`

using the same `x-secret-santa-setup-key` header.

The draw is performed by an atomic database function. It requires exactly 13 participants, all 13 wishlists, one recipient per giver, no self-assignment, and no duplicate recipients. It refuses to overwrite a completed draw. The endpoint does not return the matching list.

## Privacy design

- Access codes are random, high-entropy codes; only their hashes are stored.
- Participant sessions use random tokens stored as hashes and HTTP-only, secure cookies.
- The browser can only request its own recipient and that recipient's wishlist.
- There is no public endpoint that lists all participants' assignments.
- Database row-level security is enabled and direct access for anonymous/authenticated Supabase roles is revoked; server routes use the service-role key.
- The setup and draw endpoints require the private setup key.

## Important

The app is not ready for public use until the SQL migration has been run and all three Vercel environment variables have been configured. Keep the service-role key and setup key private.
