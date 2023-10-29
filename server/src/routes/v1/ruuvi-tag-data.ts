import { Router } from '..';
import { RuuviTagData } from '../../models';

const router = new Router('ruuvi-tag-data');

// GET /api/v1/ruuvi-tag-data
router.get('/', (req, res) => {
  RuuviTagData.findAll()
    .then(data => res.json(data))
    .catch(() => res.status(500).end('Could not get RuuviTag data from database'));
});

export default router;
