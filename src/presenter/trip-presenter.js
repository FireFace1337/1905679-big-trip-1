import SiteSort from '../view/site-sort';
import SiteEmptyList from '../view/site-empty-list';
import SiteEventList from '../view/site-event-list';
import {render, RenderPosition} from '../utils/render';
import PointPresenter from './point-presenter';
import {updateItem} from '../utils/utils';


export default class TripPresenter {
  #mainElement = null;
  #tripEventsElement = null;

  #sortComponent = new SiteSort();
  #emptyEventList = new SiteEmptyList();
  #tripEventsListElement = new SiteEventList();

  #tripEvents = [];
  #pointPresenter = new Map();

  constructor(mainElement) {
    this.#mainElement = mainElement;
    this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
  }

  init = (tripEvents) => {
    this.#tripEvents = [...tripEvents];
    this.#renderMain();
  }

  #renderEmptyList = () => {
    render(this.#tripEventsElement, this.#emptyEventList, RenderPosition.BEFOREEND);
  }

  #renderTripEventsListElement = () => {
    render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
  }

  #handleModeChange = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  }

  #handleTaskChange = (updatedPoint) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  #renderSort = () => {
    render(this.#tripEventsElement, this.#sortComponent, RenderPosition.AFTERBEGIN);
  }

  #renderTripEvent = (waypoint) => {
    const pointPresenter = new PointPresenter(this.#tripEventsListElement, this.#handleTaskChange, this.#handleModeChange);
    pointPresenter.init(waypoint);
    this.#pointPresenter.set(waypoint.id, pointPresenter);
  }

  #renderTripEventsList = () => {
    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderTripEvent(this.#tripEvents[i]);
    }
  }

  #renderMain = () => {
    if (this.#tripEvents.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      this.#renderTripEventsListElement();
      this.#renderTripEventsList();
    }
  }

  #clearTaskList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  }
}
