import { Router } from '..';

const router = new Router('transit');

// GET /api/v1/transit/digitransit-subscription-key
router.get('/digitransit-subscription-key', (req, res) => res.json({
  digitransitSubscriptionKey: process.env.DIGITRANSIT_SUBSCRIPTION_KEY ?? ''
}));

export default router;
