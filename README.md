# mcmansion
Home intelligence &amp; automation

Designed to run on a Raspberry Pi with the [800x480 touch display](https://www.raspberrypi.com/products/raspberry-pi-touch-display)

## Features
* Transit departure board for nearby train and bus stations
* RuuviTag temperature & humidity tracking across different rooms
* Hour-by-hour electricity price tracking
* Stopwatch
* In-app customization

<img src="https://github.com/ounai/mcmansion/assets/19166017/fba3fa86-5705-43e6-833b-810cd5e01a46" width="800" height="auto" />

## Environment variables
* `POSTGRES_HOST`
* `POSTGRES_DATABASE`
* `POSTGRES_USERNAME`
* `POSTGRES_PASSWORD`
* `POSTGRES_ALTER` (set "true" to sync altering changes to the database schema)
* `DIGITRANSIT_SUBSCRIPTION_KEY` (one can be acquired [here](https://portal-api.digitransit.fi))
* `DISABLE_RUUVI_TAG_DATABASE` (set "true" to disable listening for RuuviTags and saving measurements to DB)
