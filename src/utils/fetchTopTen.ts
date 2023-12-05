import { KinopoiskDev, Filter,MovieFields,} from '@openmoviedb/kinopoiskdev_client';
  
  const kp = new KinopoiskDev('ZMR9H1X-2MQ4XTP-N8TJ976-7M7DRD5');
  
 export const fetchTopTen = async () => {

    const query: Filter<MovieFields> = {
        selectFields: ['id', 'name', 'alternativeName', 'rating', 'poster', 'year'],
        sortField: 'rating.kp',
        sortType: '-1',
        limit: 10,
      };
  
    const data = await kp.movie.getByFilters(query);

    return data;
  };