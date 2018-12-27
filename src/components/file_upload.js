import React, {Component} from 'react'

export default class FieldFileInput  extends Component{
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render(){
    const { input: { value } } = this.props
    const {input,label, required, meta, } = this.props  //whatever props you send to the component from redux-form Field
    return(
     <div className="form-group row">
     <label className="col-sm-2 col-form-label">File:</label>
     <div className="col-sm-10">
       <input className="line-height-zero"
        type='file'
        // accept='.jpg, .png, .jpeg'
        onChange={this.onChange}
       />
     </div>
     </div>
    )
}
}
