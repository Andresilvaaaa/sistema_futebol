Annotations
1 error
⚛️ Build & Push Frontend image
buildx failed with: ERROR: failed to build: failed to solve: process "/bin/sh -c pnpm build" did not complete successfully: exit code: 1
🚀 Build & Deploy
failed 20 minutes ago in 2m 28s
Search logs
2s
0s
7s
4s
0s
0s
1m 29s
39s
Run docker/build-push-action@v5
GitHub Actions runtime token ACs
Docker info
Proxy configuration
Buildx version
Builder info
/usr/bin/docker buildx build --build-arg NEXT_PUBLIC_API_URL=http://backend:5000 --cache-from type=gha --cache-to type=gha,mode=max --file frontend/Dockerfile --iidfile /home/runner/work/_temp/docker-actions-toolkit-fUQtCs/build-iidfile-47c83f645a.txt --attest type=provenance,mode=max,builder-id=https://github.com/***/sistema_futebol/actions/runs/18565428784 --tag ghcr.io/andresilvaaaa/sistema-futebol-frontend:latest --tag ghcr.io/andresilvaaaa/sistema-futebol-frontend:4f1feeabfe7e5a9f76c992ba0ca5926efdeacf46 --metadata-file /home/runner/work/_temp/docker-actions-toolkit-fUQtCs/build-metadata-792b700005.json --push .
#0 building with "builder-fbddf4b0-9e20-4998-80af-adc10699370e" instance using docker-container driver

#1 [internal] load build definition from Dockerfile
#1 DONE 0.0s

#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 981B done
#1 DONE 0.0s

#2 [auth] library/node:pull token for registry-1.docker.io
#2 DONE 0.0s

#3 [internal] load metadata for docker.io/library/node:20-alpine
#3 DONE 0.3s

#4 [internal] load .dockerignore
#4 transferring context: 2B done
#4 DONE 0.0s

#5 importing cache manifest from gha:3784034962909325141
#5 DONE 0.1s

#6 [builder 1/7] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
#6 resolve docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48 done
#6 ...

#7 [internal] load build context
#7 transferring context: 815.15kB 0.0s done
#7 DONE 0.0s

#6 [builder 1/7] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
#6 sha256:f2fbe8556258562779088bb23277d1d0b7e43fc6ddd52623166a2ac6d92bc73a 1.26MB / 1.26MB 0.0s done
#6 sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b 3.80MB / 3.80MB 0.1s done
#6 extracting sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b
#6 sha256:c74c90aa7c8726728fa9d2e330254ef29381efbd566aaee9933c3113c26f20ce 445B / 445B 0.1s done
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 2.10MB / 42.75MB 0.2s
#6 extracting sha256:2d35ebdb57d9971fea0cac1582aa78935adf8058b2cc32db163c988***e5dfa1b 0.1s done
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 9.44MB / 42.75MB 0.3s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 13.63MB / 42.75MB 0.5s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 16.78MB / 42.75MB 0.6s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 19.92MB / 42.75MB 0.8s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 23.07MB / 42.75MB 0.9s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 26.21MB / 42.75MB 1.1s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 31.46MB / 42.75MB 1.2s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 36.70MB / 42.75MB 1.4s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 42.75MB / 42.75MB 1.5s
#6 sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 42.75MB / 42.75MB 1.5s done
#6 extracting sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c
#6 extracting sha256:c087321cece4f408fdac87711c4c5c51945101848dffd8848840912c1fceb02c 0.9s done
#6 DONE 2.4s

#6 [builder 1/7] FROM docker.io/library/node:20-alpine@sha256:1ab6fc5a31d515dc7b6b25f6acfda2001821f2c2400252b6cb61044bd9f9ad48
#6 extracting sha256:f2fbe8556258562779088bb23277d1d0b7e43fc6ddd52623166a2ac6d92bc73a 0.0s done
#6 extracting sha256:c74c90aa7c8726728fa9d2e330254ef29381efbd566aaee9933c3113c26f20ce done
#6 DONE 2.4s

#8 [runner 2/5] WORKDIR /app
#8 DONE 0.1s

#9 [builder 2/7] WORKDIR /app/frontend
#9 DONE 0.1s

#10 [builder 3/7] RUN corepack enable
#10 DONE 0.1s

#11 [builder 4/7] COPY frontend/package.json frontend/pnpm-lock.yaml ./
#11 DONE 0.0s

#12 [builder 5/7] RUN pnpm install --frozen-lockfile
#12 0.288 ! Corepack is about to download https://registry.npmjs.org/pnpm/-/pnpm-10.18.3.tgz
#12 1.315 Lockfile is up to date, resolution step is skipped
#12 1.393 Progress: resolved 1, reused 0, downloaded 0, added 0
#12 1.481 Packages: +480
#12 1.481 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
#12 2.393 Progress: resolved 480, reused 0, downloaded 115, added 108
#12 3.392 Progress: resolved 480, reused 0, downloaded 143, added 129
#12 4.393 Progress: resolved 480, reused 0, downloaded 153, added 132
#12 5.393 Progress: resolved 480, reused 0, downloaded 187, added 144
#12 6.394 Progress: resolved 480, reused 0, downloaded 410, added 406
#12 7.394 Progress: resolved 480, reused 0, downloaded 479, added 479
#12 8.397 Progress: resolved 480, reused 0, downloaded 480, added 480, done
#12 8.692 
#12 8.692 dependencies:
#12 8.692 + @hookform/resolvers 5.2.2
#12 8.692 + @radix-ui/react-accordion 1.2.12
#12 8.692 + @radix-ui/react-alert-dialog 1.1.15
#12 8.692 + @radix-ui/react-aspect-ratio 1.1.7
#12 8.692 + @radix-ui/react-avatar 1.1.10
#12 8.692 + @radix-ui/react-checkbox 1.3.3
#12 8.692 + @radix-ui/react-collapsible 1.1.12
#12 8.692 + @radix-ui/react-context-menu 2.2.16
#12 8.692 + @radix-ui/react-dialog 1.1.15
#12 8.692 + @radix-ui/react-dropdown-menu 2.1.16
#12 8.692 + @radix-ui/react-hover-card 1.1.15
#12 8.692 + @radix-ui/react-label 2.1.7
#12 8.692 + @radix-ui/react-menubar 1.1.16
#12 8.692 + @radix-ui/react-navigation-menu 1.2.14
#12 8.692 + @radix-ui/react-popover 1.1.15
#12 8.692 + @radix-ui/react-progress 1.1.7
#12 8.692 + @radix-ui/react-radio-group 1.3.8
#12 8.692 + @radix-ui/react-scroll-area 1.2.10
#12 8.692 + @radix-ui/react-select 2.2.6
#12 8.692 + @radix-ui/react-separator 1.1.7
#12 8.692 + @radix-ui/react-slider 1.3.6
#12 8.692 + @radix-ui/react-slot 1.2.3
#12 8.692 + @radix-ui/react-switch 1.2.6
#12 8.692 + @radix-ui/react-tabs 1.1.13
#12 8.692 + @radix-ui/react-toast 1.2.15
#12 8.692 + @radix-ui/react-toggle 1.1.10
#12 8.692 + @radix-ui/react-toggle-group 1.1.11
#12 8.692 + @radix-ui/react-tooltip 1.2.8
#12 8.692 + @vercel/analytics 1.5.0
#12 8.692 + autoprefixer 10.4.21
#12 8.692 + class-variance-authority 0.7.1
#12 8.692 + clsx 2.1.1
#12 8.692 + cmdk 1.1.1
#12 8.692 + date-fns 4.1.0
#12 8.692 + embla-carousel-react 8.6.0
#12 8.692 + geist 1.5.1
#12 8.692 + input-otp 1.4.2
#12 8.692 + lucide-react 0.544.0
#12 8.692 + next 15.5.4
#12 8.692 + next-themes 0.4.6
#12 8.692 + react 19.1.1
#12 8.692 + react-day-picker 9.11.0
#12 8.692 + react-dom 19.1.1
#12 8.692 + react-hook-form 7.63.0
#12 8.692 + react-resizable-panels 3.0.6
#12 8.692 + recharts 3.2.1
#12 8.692 + sonner 2.0.7
#12 8.692 + tailwind-merge 3.3.1
#12 8.692 + tailwindcss-animate 1.0.7
#12 8.692 + vaul 1.1.2
#12 8.692 + zod 4.1.11
#12 8.692 
#12 8.692 devDependencies:
#12 8.692 + @tailwindcss/postcss 4.1.13
#12 8.692 + @testing-library/jest-dom 6.9.1
#12 8.692 + @testing-library/react 14.3.1
#12 8.692 + @testing-library/user-event 14.6.1
#12 8.692 + @types/node 24.6.0
#12 8.692 + @types/react 19.1.15
#12 8.692 + @types/react-dom 19.1.9
#12 8.692 + @vitejs/plugin-react 4.7.0
#12 8.692 + @vitest/coverage-v8 1.6.1
#12 8.692 + @vitest/ui 1.6.1
#12 8.692 + jsdom 24.1.3
#12 8.692 + postcss 8.5.6
#12 8.692 + tailwindcss 4.1.13
#12 8.692 + tw-animate-css 1.4.0
#12 8.692 + typescript 5.9.2
#12 8.692 + vite 5.4.20
#12 8.692 + vitest 1.6.1
#12 8.692 
#12 8.692 ╭ Warning ─────────────────────────────────────────────────────────────────────╮
#12 8.692 │                                                                              │
#12 8.692 │   Ignored build scripts: @tailwindcss/oxide, esbuild, sharp.                 │
#12 8.692 │   Run "pnpm approve-builds" to pick which dependencies should be allowed     │
#12 8.692 │   to run scripts.                                                            │
#12 8.692 │                                                                              │
#12 8.692 ╰──────────────────────────────────────────────────────────────────────────────╯
#12 8.692 
#12 8.745 Done in 7.9s using pnpm v10.18.3
#12 DONE 10.4s

#13 [builder 6/7] COPY frontend .
#13 DONE 0.5s

#14 [builder 7/7] RUN pnpm build
#14 0.408 
#14 0.408 > my-v0-project@0.1.0 build /app/frontend
#14 0.408 > next build
#14 0.408 
#14 1.113 Attention: Next.js now collects completely anonymous telemetry regarding usage.
#14 1.113 This information is used to shape Next.js' roadmap and prioritize features.
#14 1.113 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
#14 1.113 https://nextjs.org/telemetry
#14 1.113 
#14 1.172    ▲ Next.js 15.5.4
#14 1.172 
#14 1.282    Creating an optimized production build ...
#14 10.41  ⚠ Compiled with warnings in 8.1s
#14 10.41 
#14 10.41 ./app/dashboard/profile/page.tsx
#14 10.41 Attempted import error: 'saveProfile' is not exported from '@/lib/profile-storage' (imported as 'saveProfile').
#14 10.41 
#14 10.41 Import trace for requested module:
#14 10.41 ./app/dashboard/profile/page.tsx
#14 10.41 
#14 20.64  ⚠ Compiled with warnings in 8.1s
#14 20.64 
#14 20.64 ./app/dashboard/profile/page.tsx
#14 20.64 Attempted import error: 'saveProfile' is not exported from '@/lib/profile-storage' (imported as 'saveProfile').
#14 20.64 
#14 20.64 Import trace for requested module:
#14 20.64 ./app/dashboard/profile/page.tsx
#14 20.64 
#14 20.70  ✓ Compiled successfully in 16.4s
#14 20.71    Skipping validation of types
#14 20.71    Skipping linting
#14 20.98    Collecting page data ...
#14 ***.87    Generating static pages (0/13) ...
#14 23.85 Error occurred prerendering page "/public/dashboard". Read more: https://nextjs.org/docs/messages/prerender-error
#14 23.85 ReferenceError: Pie is not defined
#14 23.85     at qQ (.next/server/app/public/dashboard/page.js:2:287792) {
#14 23.85   digest: '838688307'
#14 23.85 }
#14 23.85 Export encountered an error on /public/dashboard/page: /public/dashboard, exiting the build.
#14 23.86  ⨯ Next.js build worker exited with code: 1 and signal: null
#14 23.90  ELIFECYCLE  Command failed with exit code 1.
#14 ERROR: process "/bin/sh -c pnpm build" did not complete successfully: exit code: 1
------
 > [builder 7/7] RUN pnpm build:
20.98    Collecting page data ...
***.87    Generating static pages (0/13) ...
23.85 Error occurred prerendering page "/public/dashboard". Read more: https://nextjs.org/docs/messages/prerender-error
23.85 ReferenceError: Pie is not defined
23.85     at qQ (.next/server/app/public/dashboard/page.js:2:287792) {
23.85   digest: '838688307'
23.85 }
23.85 Export encountered an error on /public/dashboard/page: /public/dashboard, exiting the build.
23.86  ⨯ Next.js build worker exited with code: 1 and signal: null
23.90  ELIFECYCLE  Command failed with exit code 1.
------
Dockerfile:***
--------------------
  20 |     
  21 |     # Build app (expects next.config.mjs with output: 'standalone')
  *** | >>> RUN pnpm build
  23 |     
  24 |     # ---- Runtime stage ----
--------------------
ERROR: failed to build: failed to solve: process "/bin/sh -c pnpm build" did not complete successfully: exit code: 1
Error: buildx failed with: ERROR: failed to build: failed to solve: process "/bin/sh -c pnpm build" did not complete successfully: exit code: 1