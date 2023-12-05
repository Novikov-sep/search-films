import { KinopoiskDev, Filter,MovieFields, MovieQueryBuilder,} from '@openmoviedb/kinopoiskdev_client';
  
  const kp = new KinopoiskDev('ZMR9H1X-2MQ4XTP-N8TJ976-7M7DRD5');
  
 export const fetchSearch = async (search: string) => {
    const queryBuilder = new MovieQueryBuilder();
    const query = queryBuilder
      .query(search)
      .paginate(1, 10)
      .build();
  
    const { data, error, message } = await kp.movie.getBySearchQuery(query);
  
    if (data) {
      const { docs, page, limit } = data;
      return docs;
    }
  
    if (error) console.log(error, message);
  };
  