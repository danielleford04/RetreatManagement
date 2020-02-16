import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ActiveEventReducer from './reducer_active_event';
import ActivePhaseReducer from './reducer_active_phase';
import EventsReducer from './reducer_events';
import FutureEventsReducer from './reducer_future_events';
import PhasesReducer from './reducer_phases';
import RetreatantsReducer from './reducer_retreatants';
import FilesReducer from './reducer_files';
import EmailsReducer from './reducer_emails';
import PhaseInstructionsReducer from './reducer_phase_instructions';
import PhaseTasksReducer from './reducer_phase_tasks';
import PhaseEmailsReducer from './reducer_phase_emails';
import AuthenticationReducer from './reducer_authentication';
import ErrorReducer from './reducer_error.js';
import UserReducer from './reducer_user.js';
import DefaultsReducer from './reducer_defaults.js';

const rootReducer = combineReducers({
  form: formReducer,
  eventPhases: PhasesReducer,
  events: EventsReducer,
  futureEvents: FutureEventsReducer,
  activeEvent: ActiveEventReducer,
  activePhase: ActivePhaseReducer,
  retreatants: RetreatantsReducer,
  files: FilesReducer,
  emails: EmailsReducer,
  phaseInstructions: PhaseInstructionsReducer,
  phaseTasks: PhaseTasksReducer,
  phaseEmails: PhaseEmailsReducer,
  authentication: AuthenticationReducer,
  errors: ErrorReducer,
  user: UserReducer,
  defaults: DefaultsReducer,
});

export default rootReducer;
