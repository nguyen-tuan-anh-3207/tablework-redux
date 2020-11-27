import React from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';



class TaskItem extends React.Component {
  onUpdateStatus = () =>{
    //console.log(this.props.task.id);
    this.props.onUpdateStatus(this.props.task.id);
  }

  onDelete = () =>{
    this.props.onDeleteTask(this.props.task.id); //~~ dispatch
    this.props.onCloseForm();
  }

  onUpdate = () =>{
    this.props.onUpdate(this.props.task.id);
  }

  render(){
    var {task} = this.props;
    var {index} =this.props;
  return ( 
                          <tr>
                            <td>{index +1}  </td>
                            <td>{task.name}</td>
                            <td className="text-center">
                              <span 
                                  className= { task.status === true? 'label label-danger' : 'label label-success'}
                                  onClick = {this.onUpdateStatus}
                                  >
                              {task.status=== true? 'Kích hoạt' : 'Ẩn'}
                              </span>
                            </td>
                            <td className="text-center">
                                 <button
                                       type="button"
                                       className="btn btn-warning"
                                       onClick= {this.onUpdate}>
                                   <span className=" fa fa-pencil mr-5"></span>Sửa
                                 </button>&nbsp;
                                 <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={this.onDelete}>
                                   <span className=" fa fa-trash mr-5"></span>Xóa
                                 </button>
                            </td>
                          </tr>



  
  )
}
}

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      onUpdateStatus : (id)=>{
        dispatch(actions.updateStatus(id))
      },
      onDeleteTask : (id) =>{
        dispatch(actions.deleteTask(id))
      },
      onCloseForm: ()=>{
        dispatch(actions.closeForm())
      }
    }
  };

export default connect(mapStateToProps,mapDispatchToProps )(TaskItem);






















