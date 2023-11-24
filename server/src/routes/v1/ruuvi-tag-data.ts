import { Router } from '..';
import { RuuviTagData, RuuviTagHistoricalData } from '../../models';

const router = new Router('ruuvi-tag-data');

// GET /api/v1/ruuvi-tag-data
router.get('/', (req, res) => {
  RuuviTagData.findAll()
    .then(data => res.json(data))
    .catch((error: Error) => res.status(500).end('Could not get RuuviTag data: ' + error.message));
});

// GET /api/v1/ruuvi-tag-data/hourly
router.get('/hourly', (req, res) => {
  RuuviTagHistoricalData.findHourly()
    .then(data => res.json(data))
    .catch((error: Error) => res.status(500).end('Could not get hourly RuuviTag data: ' + error.message));
});

// GET /api/v1/ruuvi-tag-data/:tagId
router.get('/:tagId', (req, res) => {
  RuuviTagData.findByPk(req.params.tagId)
    .then(data => res.json(data))
    .catch((error: Error) => res.status(500).end('Could not get RuuviTag data: ' + error.message));
});

export default router;
