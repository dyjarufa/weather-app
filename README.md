Weather Forecast Demo
A lightweight React + TypeScript application that turns any U.S. street address into geographic coordinates (via the U.S. Census Geocoder) and displays a 7‑day forecast from the National Weather Service (NWS). The project uses modern tooling—Vite, React Query, Tailwind—and is fully covered by unit/component tests with Vitest + MSW.
***✨ Features
|  ✓  | Feature                                                                            |
| --- | ---------------------------------------------------------------------------------- |
| 🌎  | One‑Line address search powered by the Census Geocoder                             |
| ☀️  | 7‑day (day & night) forecast from the NWS Web API                                  |
| ⚡   | Smart cache / retry / SWR via @tanstack/react‑query                            |
| 🖌️ | Responsive UI with Tailwind CSS (dark‑mode ready)                                  |
| 🔒  | Local Vite proxy to bypass CORS and inject the User‑Agent header required by NWS |
| 🧪  | Full unit/component test suite with Vitest + MSW                               |
| 🏎️ | Instant HMR reloads thanks to Vite                                                 |
***🏗️ Tech Stack
React 18 + TypeScript 5
Vite – ultra‑fast dev server & bundler
@tanstack/react‑query – data fetching/caching layer
Tailwind CSS – utility‑first styling
Vitest – unit & component tests
Mock Service Worker (MSW) – API mocking in tests
Playwright (optional) – end‑to‑end browser tests
***🚀 Getting Started
# 1. Clone the repo
$ git clone https://github.com/your‑user/weather‑demo.git
$ cd weather‑demo
# 2. Install dependencies (pnpm recommended)
$ pnpm install          # or npm install / yarn install
# 3. Start the dev server
$ pnpm dev              # opens http://localhost:5173
# 4. Run tests
$ pnpm test             # Vitest in watch mode
# 5. Production build
$ pnpm build            # outputs to dist/
$ pnpm preview          # local static preview
Prerequisites
Node ≥ 18
pnpm ≥ 9 (or npm/yarn)
> No API keys are needed — both services are public.
***🗂️ Project Structure
src/
├─ components/          # AddressForm, ForecastCard, …
├─ hooks/               # useGeocode, useWeather
├─ lib/                 # queryClient, helpers
├─ mocks/               # MSW handlers + server
├─ pages/               # Home.tsx (single‑page app)
└─ App.tsx
***🔌 Data Flow
graph TD
  A[AddressForm] -->|submit| B(useGeocode)
  B -->|coords| C(useWeather)
  C --> D[ForecastGrid]
AddressForm captures user input.
useGeocode requests /geocoder/locations/onelineaddress → { lat, lon }.
useWeather requests:
/points/{lat},{lon}
the /forecast endpoint returned in the previous response.
ForecastGrid renders weather cards.
All external requests pass through the local proxy (/api/geocode and /api/weather).
***🧪 Testing
| Type        | Tooling               | Scope                        |
| ----------- | --------------------- | ---------------------------- |
| Unit / hook | Vitest + MSW  | useGeocode, useWeather   |
| Component   | React Testing Library | Full UI flow (input → cards) |
| E2E (opt.)  | Playwright            | End‑to‑end browser journey   |
Generate coverage with pnpm coverage (LCOV report under coverage/).
***📑 API References
Census Geocoder – /geocoder/locations/onelineaddress → API PDF
National Weather Service – /points, /forecast, /alerts → Web‑API docs
***🛣️ Roadmap
-
***🤝 Contributing
Pull requests are welcome! Please open an issue first to discuss major changes.
Fork the project
Create a feature branch (git checkout -b feature/my‑feature)
pnpm test — make sure everything passes
pnpm lint — keep the code style consistent
Open a PR 🙌
***📝 License
Distributed under the MIT License. See LICENSE for full text.
***Author
Crafted with 💙 by Your Name · @your‑github