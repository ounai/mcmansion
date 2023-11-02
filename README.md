# mcmansion
Home intelligence &amp; automation

Designed to run on a Raspberry Pi with the [800x480 touch display](https://www.raspberrypi.com/products/raspberry-pi-touch-display)

## Features
* Transit departure board for nearby train and bus stations
* RuuviTag temperature & humidity tracking across different rooms
* Hour-by-hour electricity price tracking
* Customization menu in-app

<img src="https://github.com/ounai/mcmansion/assets/19166017/d3c798db-7ab9-48a6-b31e-5f533b67e1ce" width="800" height="auto" />

## Environment variables
* `POSTGRES_HOST`
* `POSTGRES_DATABASE`
* `POSTGRES_USERNAME`
* `POSTGRES_PASSWORD`
* `POSTGRES_ALTER` (set "true" to sync altering changes to the database schema)
* `DIGITRANSIT_SUBSCRIPTION_KEY` (one can be acquired [here](https://portal-api.digitransit.fi))
