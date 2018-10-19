import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EventTasksReducer from './reducer_event_tasks';
import ActiveEventReducer from './reducer_active_event';
import ActivePhaseReducer from './reducer_active_phase';
import EventsReducer from './reducer_events';
import PhasesReducer from './reducer_phases';
import PhaseReducer from './reducer_phase';
import RetreatantsReducer from './reducer_retreatants';
import StoredFormsReducer from './reducer_stored_forms';
import EmailsReducer from './reducer_emails';
import PhaseInstructionsReducer from './reducer_phase_instructions';
import PhaseTasksReducer from './reducer_phase_tasks';

const rootReducer = combineReducers({
  form: formReducer,
  eventTasks: EventTasksReducer,
  eventPhases: PhasesReducer,
  eventPhase: PhaseReducer,
  events: EventsReducer,
  activeEvent: ActiveEventReducer,
  activePhase: ActivePhaseReducer,
  retreatants: RetreatantsReducer,
  storedForms: StoredFormsReducer,
  emails: EmailsReducer,
  phaseInstructions: PhaseInstructionsReducer,
    phaseTasks: PhaseTasksReducer,
});

export default rootReducer;
