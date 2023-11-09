import { Router } from '..';
import { electricityPrices } from '../../services';

const router = new Router('electricity-prices');

// GET /api/v1/electricity-prices
router.get('/', (req, res) => {
  electricityPrices.query()
    .then(data => res.json(data))
    .catch((error: Error) => res.status(500).end('Could not fetch electricity prices from external API: ' + error.message));
});

export default router;
