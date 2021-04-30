import React, { Component } from 'react';
import { Field, DropdownList, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import { fetchFiles, createEmail } from '../actions';

class NewEmail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showSuccessModal: false,
      showErrorModal: false,
    };
    this.props.initialize({
      phase: 'Registration'
    });
  }
  componentDidMount() {
    this.props.fetchFiles();
  }


  renderPhaseField(field) {
    return (
      <div className="form-group row">
         <label className="col-sm-2 col-form-label">Event Phase:</label>
         <div className="col-sm-10">
           <select className="form-control" {...field.input}>
             <option value="Registration">Registration</option>
             <option value="Preparation">Preparation</option>
             <option value="Arrival">Arrival</option>
             <option value="During">On Retreat</option>
             <option value="Closing">Closing</option>
             <option value="Follow Up">Follow Up</option>
           </select>
         </div>
       </div>
    )
  }
  renderNameField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Name:</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  renderDateField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Date to Send:</label>
        <div className="col-sm-10">
        <input type="date" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  renderBodyField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email Body:</label>
        <div className="col-sm-10">
        <textarea className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  renderSubjectField(field) {
    return (
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Subject:</label>
        <div className="col-sm-10">
        <input type="text" className="form-control" {...field.input}/>
        </div>
      </div>
    )
  }
  // renderFileSelectOption() {
  //   return this.props.files.map((file) => {
  //     return (
  //       <option value={file._id}>{file.name}</option>
  //     );
  //   })
  // }
  // renderAttachmentField(field) {
  //   return (
  //     <div className="form-group row">
  //        <label className="col-sm-2 col-form-label">Attachment:</label>
  //        <div className="col-sm-10">
  //          <select className="form-control" {...field.input}>
  //          {
  //                templateList.result.map((type, index) => {
  //                  return (<option value={templateList.entities.template[ type ].id}>{templateList.entities.template[ type ].name}</option>)
  //                })
  //              }
  //          </select>
  //        </div>
  //      </div>
  //   )
  // }

renderFieldSelect ({ data }){
  if(data[0]._id !== null) {data.unshift({_id:null, name:"None"})}

  return (
    <div className="form-group row">
       <label className="col-sm-2 col-form-label">Attachment:</label>
       <div className="col-sm-10">
       <Field
         className="form-control"
         name="attachment"
         component="select">
         {
           data.map((form, index) => {
             return (<option key={form._id} value={form._id}>{form.name}</option>)
           })
         }
       </Field>
       </div>
     </div>
  )

  }

  renderNoFilesMessage() {
      return (
        <span>No files saved. Click 'new form' to upload a file.</span>
      );
  }

  onSubmit(values) {

    values.event_id = this.props.activeEvent;
    for (let phase of this.props.eventPhases) {
      if (phase.name === values.phase) {
        values.phase_id = phase._id;
      }
    }
    if(values.attachment=="None"){values.attachment=null}
    if(values.attachment && values.attachment !== null) {values.attachment=[values.attachment]}
    console.log(values)

    this.props.createEmail(values, () => {
      this.setState({ showSuccessModal: true })},
      () => {
        this.setState({ showErrorModal: true })

    });
  }

  render() {
    const { handleSubmit } = this.props;
    return(
      <div>
      <div>
        <h3> Schedule an Email </h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field name="phase" component={this.renderPhaseField} />
          <Field name="name" component={this.renderNameField} />
          <Field name="date" component={this.renderDateField} />
          <Field name="subject" component={this.renderSubjectField} />
          <Field name="body" component={this.renderBodyField} />
          {this.props.files.length ? <Field name="attachment" component={this.renderFieldSelect} data={this.props.files}/> : this.renderNoFilesMessage() }

          <div className="button-row">
            <button type="submit" className="btn btn-primary">Add Email</button>
          </div>
        </form>
      <p>To Do: <br/>Send Now or schedule option. <br/>Multiselect for stored forms.<br/>Better datepicker.</p>
      </div>
      <div>
        <SweetAlert
          show={this.state.showSuccessModal}
          title="Success!"
          type="success"
          text="This email was successfully saved."
          onConfirm={() => this.props.history.push('/')}
        />
      </div>
      <div>
        <SweetAlert
          show={this.state.showErrorModal}
          title="Error"
          type="error"
          text="There was an error saving this email. Please try again."
          onConfirm={() => this.setState({ showErrorModal: false })}
        />
      </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    activeEvent: state.activeEvent,
    eventPhases: state.eventPhases,
    files: state.files,
  }
}
export default reduxForm({
  form: 'EmailNewForm'
})(
  connect(mapStateToProps, { fetchFiles, createEmail })(NewEmail)
);
