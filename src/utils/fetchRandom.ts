import { KinopoiskDev,} from '@openmoviedb/kinopoiskdev_client';
  
  const kp = new KinopoiskDev('ZMR9H1X-2MQ4XTP-N8TJ976-7M7DRD5');
  
 export const fetchRandom = async () => {
    const { data, error, message } = await kp.movie.getRandom();
  
    if (data) {
      return data;
    }
  
    if (error) console.log(error, message);
  };
  