import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ActiveEventReducer from './reducer_active_event';
import ActivePhaseReducer from './reducer_active_phase';
import EventsReducer from './reducer_events';
import FutureEventsReducer from './reducer_future_events';
import PhasesReducer from './reducer_phases';
import RetreatantsReducer from './reducer_retreatants';
import StoredFormsReducer from './reducer_stored_forms';
import EmailsReducer from './reducer_emails';
import PhaseInstructionsReducer from './reducer_phase_instructions';
import PhaseTasksReducer from './reducer_phase_tasks';
import PhaseEmailsReducer from './reducer_phase_emails';

const rootReducer = combineReducers({
  form: formReducer,
  eventPhases: PhasesReducer,
  events: EventsReducer,
  futureEvents: FutureEventsReducer,
  activeEvent: ActiveEventReducer,
  activePhase: ActivePhaseReducer,
  retreatants: RetreatantsReducer,
  storedForms: StoredFormsReducer,
  emails: EmailsReducer,
  phaseInstructions: PhaseInstructionsReducer,
  phaseTasks: PhaseTasksReducer,
  phaseEmails: PhaseEmailsReducer
});

export default rootReducer;
