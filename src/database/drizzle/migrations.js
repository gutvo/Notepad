// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_massive_shiva.sql';
import m0001 from './0001_cuddly_franklin_richards.sql';
import m0002 from './0002_wet_cannonball.sql';
import m0003 from './0003_even_mojo.sql';
import m0004 from './0004_steady_luminals.sql';
import m0005 from './0005_colossal_corsair.sql';

  export default {
    journal,
    migrations: {
      m0000,
      m0001,
      m0002,
      m0003,
      m0004,
      m0005
    }
  }
  