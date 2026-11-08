# margxx.github.io

Personal portfolio site for Margeaux Corrigan, EE student at Brown University.

**Live site:** https://margxx.github.io/

## About

A single static HTML page styled like an electronic component datasheet: numbered sections, spec tables, figure captions, and expandable "application notes" with full project write-ups. No frameworks and no build step. The only JavaScript is the light/dark theme toggle.

## Stack

- HTML / CSS (inline in `index.html`)
- [IBM Plex Sans and IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Sans) via Google Fonts
- Hosted on GitHub Pages

## Sections

1. **Projects:** bullets, figures, tags, and expandable write-ups
2. **Experience:** GE Aerospace (incoming co-op), IVL Lab, AdaCore, Persistence Labs
3. **Leadership & Activities:** Brown Rocketry, Brown Space Engineering
4. **Technical Skills**
5. **Education**
6. **Licenses, Awards & Grants**
7. **On the Side**
8. **Contact**

## Projects featured

- Bare-Metal Driver Stack in C: portable GPIO, SysTick, UART, I2C, and BMP390 drivers, hardware-verified on the RP2040 (no HAL) and the STM32G431 (HAL backend); host unit tests and CI for both targets
- Rocket Payload Sensor System: bare-metal Ada firmware on RP2040 that logged 25 hours with no dropped records, flown as a payload on a live high-power rocket launch
- Boba Machine: self-serve milk tea machine with phone ordering, ESP32-based dispensing, and a ratings-trained recipe model

## Previous design

The earlier card-based design (Inter, animated background) is preserved on the [`classic-site`](https://github.com/MargXX/MargXX.github.io/tree/classic-site) branch.
