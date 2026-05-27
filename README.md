# Radio Waves — Spectrum Allocation Explorer

An interactive web app for visualizing the radio frequency spectrum from VLF (3 kHz) through EHF (300 GHz). Built with React, TypeScript, and Vite.

## What it does

- Displays the full radio spectrum on a logarithmic scale, organized by ITU frequency regions
- Color-coded bands for different services: amateur radio, broadcast, aeronautical, maritime, cellular, ISM/Wi-Fi, satellite, navigation, and more
- Click any ITU section (VLF, LF, MF, HF, VHF, UHF, SHF, EHF) to zoom in and see detailed frequency allocations
- Click a specific band to view a description of what it is used for
- Search bar to quickly find any band by name or description
- ~60+ frequency allocations including ham radio bands, broadcast services, Wi-Fi, cellular, Meshtastic/LoRa, GPS, aviation, marine, and more

## How to use

```
npm install
npm run dev        # development server at localhost:5173
npm run build      # production build to dist/
```

Browse the spectrum, zoom into sections, and click bands for details. Use the search bar to jump directly to a band.

## Work in progress

This project is a work in progress. The frequency allocation data is based on publicly available information and may contain inaccuracies, omissions, or oversimplifications. Many allocations are region-dependent (FCC, ITU Region 1/2/3, etc.), and the app does not yet account for these regional differences.

Contributions, corrections, and suggestions from people with more experience in radio waves, spectrum management, and amateur radio are very welcome. If you notice something wrong or missing, please open an issue or pull request.
