# margxx.github.io

Personal portfolio site for Margeaux Corrigan, EE student at Brown University.

**Live site:** https://margxx.github.io/

## About

A single static HTML page with a light circuit-board theme: a purple hero band, a faint dot grid, and project cards built around photos, key numbers, and expandable write-ups. No frameworks and no build step. The small script handles the photo viewer and a ⌘K quick menu for jumping between sections.

## Stack

- HTML / CSS / JavaScript (inline in `index.html`)
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts
- Hosted on GitHub Pages

## Sections

- **Projects:** three featured builds, each with a photo, stats, highlights, and a full write-up
- **Toolkit**
- **Experience:** timeline of GE Aerospace (incoming co-op), IVL Lab, AdaCore, Brown Rocketry, Brown Space Engineering, and Persistence Labs
- **On the side**
- **Contact**

## Projects featured

- Bare-Metal Driver Stack: portable GPIO, SysTick, UART, I2C, and BMP390 drivers, hardware-verified on the RP2040 (no HAL) and the STM32G431 (HAL backend); host unit tests and CI for both targets
- Rocket Payload Sensor System: bare-metal Ada firmware on RP2040 that logged 25 hours with no dropped records, flown as a payload on a live high-power rocket launch
- Boba Machine: self-serve milk tea machine with phone ordering, ESP32-based dispensing, and a ratings-trained recipe model

## Previous designs

- [`datasheet-site`](https://github.com/MargXX/MargXX.github.io/tree/datasheet-site): component-datasheet layout
- [`classic-site`](https://github.com/MargXX/MargXX.github.io/tree/classic-site): original card-based design
