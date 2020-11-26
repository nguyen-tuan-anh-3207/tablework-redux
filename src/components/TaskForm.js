import React from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends React.Component {
    constructor(props){
      super(props);
      this.state = {
         name : '',
         status : false,
         id : ''
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      if ( nextProps && nextProps.task){
        this.setState({
          id : nextProps.task.id,
          name : nextProps.task.name,
          status : nextProps.task.status
        })
      } else if (!nextProps.task) {
        console.log('sửa -> thêm');
        this.setState({
          name : '',
          status : false,
          id : ''
        });
      }
      //console.log(this.state);
  }
  UNSAFE_componentWillMount(){
        if ( this.props.task){
          this.setState({
            id : this.props.task.id,
            name : this.props.task.name,
            status : this.props.task.status
          })
        }
        console.log(this.state);
    }
    onCloseForm =()=> {
      //this.props.onCloseForm();
      this.props.onCloseForm();
    }

    onChange =(event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value; 
        if (name === 'status') {
          value = target.value === 'true'? true : false;
        }                              
        this.setState({
          [name]:value
        });
    }

    onSubmit =(event)=> {
      event.preventDefault();
     // console.log(this.state);
     //this.props.onSubmit(this.state);
     this.props.onAddTask(this.state);
     this.onClear();
     this.onCloseForm();
    }

    onClear =() => {
       this.setState({
         name : '',
         status : false
       })
    }
    render(){
      var {id} =this.state;
        return(
          <div className="panel panel-warning">
          <div className="panel-heading">
            <h3 className="panel-title">
            {id !== '' ? 'Cập nhật công việc': 'Thêm công việc'}
            <span 
                 className="fas fa-times-circle text-right"
                 onClick = {this.onCloseForm}>
                 
            </span> </h3>
          </div>
          <div className="panel-body">
          <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label >Tên :</label>
                    <input type="text" 
                        className="form-control"  
                        name= "name"
                        value = {this.state.name}
                        onChange = {this.onChange}
                        />
                  </div>
                  <div className="form-group">
                    <label >Trạng thái</label>
                    <select name="status" 
                           className="form-control" 
                           onChange = {this.onChange}
                           value = {this.state.status}
                           >
                             <option value={true}>Hoạt động</option>
                             <option value={false}>Ẩn</option>
                    </select>

                  </div>

                  <button type="submit" className="btn btn-warning"><span className="fa fa-plus mr-5"></span>Lưu lại</button>&nbsp;
                  <button type="button" 
                          onClick = {this.onClear}
                          className="btn btn-danger">
                          <span className="fa fa-close mr-5"></span>Hủy bỏ</button>
          </form>

          </div>
           </div>
        )
    }
}
const mapStateToProps = (state ) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch,props) => {
  return {
    onAddTask: (task) => {
      dispatch(actions.addTask(task));
    },
    onCloseForm: ()=>{
      dispatch(actions.closeForm())
    }
  }
}
export default  connect(mapStateToProps,mapDispatchToProps)(TaskForm);