import { Types, TypesMovies, TypesTvShows } from './utils';
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface IMovieResults {
  audult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMovieResult {
  dates?: {
    maximum?: string;
    minimum?: string;
  };
  page: number;
  results: IMovieResults[];
  total_pages: number;
  total_results: number;
}

export interface ITVResults {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface IGetTVResult {
  page: number;
  results: ITVResults[];
  total_pages: number;
  total_results: number;
}

export function getMovies(type: TypesMovies) {
  return fetch(
    `${BASE_PATH}/movie/${type}?api_key=${API_KEY}&language=ko-KR&region=kr`
  ).then((response) => response.json());
}

// export function getMovies(type: TypesMovies) {
//   return fetch(`/data/${type}.json`).then((response) => response.json());
// }

export function getTvShows(type: TypesTvShows) {
  return fetch(
    `${BASE_PATH}/tv/${type}?api_key=${API_KEY}&language=ko-KR&region=kr`
  ).then((response) => response.json());
}

// export function getTvShows(type: TypesTvShows) {
//   return fetch(`/data/TV_${type}.json`).then((response) => response.json());
// }

export interface IGetSearchResult {
  page: number;
  results: ISearchResults[];
  total_pages: number;
  total_results: number;
}

interface ISearchResults {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: string;
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ISearchItem {
  backdrop_path: string;
  name?: string;
  title?: string;
  id: number;
  media_type: string;
}

export interface ISearchList {
  results: ISearchItem[];
}

export interface ISearch {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetSearch {
  page: number;
  results: ISearch[];
  total_pages: number;
  total_results: number;
}

export function getSearch(keyword: string) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`
  ).then((response) => response.json());
}

// export function getSearch(keyword: string) {
//   return fetch(`/data/multi_search.json`).then((response) => response.json());
// }

interface IGenre {
  id: number;
  name: string;
}

export interface IGetDetail {
  title?: string;
  name?: string;
  id: string;
  overview: string;
  backdrop_path: string;
  genres: IGenre[];
  poster_path: string;
  release_date: string;
  vote_average: number;
  first_air_date: string;
}

export function getDetailData(id: string, requestType: string) {
  return fetch(
    `${BASE_PATH}/${requestType}/${id}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
