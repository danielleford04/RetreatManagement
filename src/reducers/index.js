import { combineReducers } from 'redux';
import WeatherReducer from './reducer_weather';
import EventTasksReducer from './reducer_event_tasks';
import EventsReducer from './reducer_events';
import RetreatantsReducer from './reducer_retreatants';
import StoredFormsReducer from './reducer_stored_forms';
import EmailsReducer from './reducer_emails';

const rootReducer = combineReducers({
  weather: WeatherReducer,
  eventTasks: EventTasksReducer,
  events: EventsReducer,
  retreatants: RetreatantsReducer,
  storedForms: StoredFormsReducer,
  emails: EmailsReducer
});

export default rootReducer;
