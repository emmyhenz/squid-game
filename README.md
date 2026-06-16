# SQUID-GAME green light - red light game using Three.js
Code from my Youtube video, [I Coded a Squid Game Javascript Game Using Three.js](https://www.youtube.com/watch?v=s1e1sI4Zz3k)

## Run locally
```
npm install
npm run dev      # Parcel dev server with hot reload
```

## Production build & serve
```
npm install
npm run build    # bundles into ./dist with Parcel
npm start        # serves ./dist with Express on $PORT (default 3000)
```

## Deploy on Railway
Railway auto-detects this as a Node project (Nixpacks). On deploy it runs
`npm run build`, then `npm start`. The Express server in `server.js` binds to
`0.0.0.0` and reads the `PORT` Railway injects, so no extra setup is needed.
Configuration lives in `railway.json` / `nixpacks.toml`.

## Mobile
- Tries to enter fullscreen and lock to landscape when you press Play.
- Shows a "rotate your device" prompt while held in portrait.
- On-screen analog joystick (move) and a RUN button (sprint) appear on touch
  devices; push the joystick all the way to auto-run.

# ⭐️3D Models⭐️
🔗 Player 3D model: https://sketchfab.com/3d-models/squid-game-people-2b158ecbe1734d7e8da813795aef6682

🔗 Pink Soldier 3D model: https://sketchfab.com/3d-models/red-soldier-from-squid-game-111366aed5b547c5add63937cc4b99e2

🔗 Doll 3D model: https://sketchfab.com/3d-models/squidgamedoll-4d6eb3321a2e42d4be1c83a983825e8e

🔗 Tree 3D model: https://sketchfab.com/3d-models/low-poly-dead-tree-31d4fb51a0744cf6916d90928d5a936e
