import dayjs from 'dayjs';
import AbstractView from './abstract-view';
import {createOffersTemplate} from '../utils/utils';

const createSiteWayPoint = (wayPoint) => {
  const {waypointType, city, price, offers, isFavorite, dueDate} = wayPoint;
  const offerName = offers.offerName;
  const offerPrice = offers.price;

  const date = dayjs(dueDate).format('D MMM');

  const activeFavorite = isFavorite ? '--active' : '';

  return `<div class="event">
  <time class="event__date" datetime="2019-03-19">${date}</time>
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="img/icons/${waypointType}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${waypointType} ${city}</h3>
  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="2019-03-19T11:20">14:20</time>
      &mdash;
      <time class="event__end-time" datetime="2019-03-19T13:00">13:00</time>
    </p>
    <p class="event__duration">01H 20M</p>
  </div>
  <p class="event__price">
    &euro;&nbsp;<span class="event__price-value">${price}</span>
  </p>
  ${createOffersTemplate(offers, waypointType)}
    <li class="event__offer">
      <span class="event__offer-title">${offerName}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offerPrice}</span>
    </li>
  </ul>
  <button class="event__favorite-btn${activeFavorite}" type="button">
    <span class="visually-hidden">Add to favorite</span>
    <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
      <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
    </svg>
  </button>
  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>`;
};

export default class SiteWayPoint extends AbstractView {
  #waypoint = null;

  constructor(waypoint) {
    super();
    this.#waypoint = waypoint;
  }

  get template() {
    return createSiteWayPoint(this.#waypoint);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (event) => {
    event.preventDefault();
    this._callback.favoriteClick();
  }

  #editClickHandler = (event) => {
    event.preventDefault();
    this._callback.editClick();
  }
}
