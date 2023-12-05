import { KinopoiskDev,} from '@openmoviedb/kinopoiskdev_client';
  
  const kp = new KinopoiskDev('ZMR9H1X-2MQ4XTP-N8TJ976-7M7DRD5');
  
 export const fetchItem = async (itemId: number) => {
    const { data, error, message } = await kp.movie.getById(itemId);

    if (data) {
      return data;
    }
  
    if (error || message)  {
      console.log('FETCH' ,error, message);
    }
  };