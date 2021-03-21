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
import DefaultPhasesReducer from './reducer_default_phases.js';
import ActiveDefaultPhaseReducer from './reducer_active_default_phase.js';
import DefaultPhaseTaskReducer from './reducer_default_phase_tasks.js';
import DefaultPhaseInstructionReducer from './reducer_default_phase_instructions.js';
import DefaultPhaseEmailReducer from './reducer_default_phase_emails.js';
import ConfirmationEmailReducer from './reducer_confirmation_email';

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
  defaultPhases: DefaultPhasesReducer,
  selectedDefaultPhaseId: ActiveDefaultPhaseReducer,
    selectedDefaultPhaseTasks: DefaultPhaseTaskReducer,
    selectedDefaultPhaseInstructions: DefaultPhaseInstructionReducer,
    selectedDefaultPhaseEmails: DefaultPhaseEmailReducer,
    confirmationEmail: ConfirmationEmailReducer

});

export default rootReducer;
