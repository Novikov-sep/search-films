import { KinopoiskDev, Filter,MovieFields,} from '@openmoviedb/kinopoiskdev_client';
  
  const kp = new KinopoiskDev('ZMR9H1X-2MQ4XTP-N8TJ976-7M7DRD5');

  export interface fetchFilmsAddParams {
    page: number,
    limit: number,
  }

  export interface fetchFilmsAddDocs {
    id: number,
    description: string,
    shortDescription: string,
    movieLength: number,
    ageRating: number,
    name: string,
    rating: {
      await: number
      filmCritics: number,
      imdb: number
      kp: number,
      russianFilmCritics: number,
    },
    poster: {
      previewUrl: string,
      url: string,
    },
    year: number,
  }
  
 export const fetchFilmsAdd = async (params: fetchFilmsAddParams) => {
    const {page, limit} = params;

    const query: Filter<MovieFields> = {
        selectFields: ['id', 'description', 'shortDescription', 'movieLength', 'ageRating', 'name', 'rating', 'poster', 'year'],
        page: page,
        limit: limit,
      };

      const res = await kp.movie.getByFilters(query);

      const { data, error, message} = res;
      if(data){
        return res;
      } else if(error) {
        return [];
      }
      
  };