import React from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filterName : '',
      filterStatus: -1 //all -1 , active : 1 , deacitve : 0
    }
  }
  onChange =(event) => {
    //console.log("done");
    var target = event.target;
    var name = target.name;
    var value = target.value;
    // this.props.onFilter(name === 'filterName' ? value:this.state.filterName,
    //                     name ==='filterStatus'? value : this.state.filterStatus)
    var filter = {
      name: name === 'filterName' ? value:this.state.filterName,
      status: name ==='filterStatus'? value : this.state.filterStatus
    }
    this.props.onFilterTable(filter);
    this.setState({
      [name]: value
    })
  }
  render(){
    //console.log(this.props.todos);
    var {filterName, filterStatus} = this.state;
    var {tasks,filterTable,keyword,sort} = this.props; //lấy từ store
    if(filterTable){
      if(filterTable.name){
        console.log(filterTable);
         tasks = tasks.filter(task =>{
          return task.name.toLowerCase().indexOf(filterTable.name) !==-1;
        })
      }  

        tasks = tasks.filter(task =>{
          if (filterTable.status === -1){
            return task;
          }else {
            return task.status === (filterTable.status === 1? true: false);
          }
        })
        
    };
  // search
    if(keyword){
      tasks = tasks.filter(task =>{
        return task.name.toLowerCase().indexOf(keyword) !==-1;
    })
  }
    //sort
    if( sort.by === 'name'){
      tasks.sort((a,b) =>{
        if (a.name >b.name) return sort.value;
        else if (a.name < b.name) return -sort.value;
        else return 0;
      })}else {
        tasks.sort((a,b) =>{
          if (a.status >b.status) return -sort.value;
          else if (a.status < b.status) return sort.value;
          else return 0;
        }) };
    var eleTasks = tasks.map((task,index) => {
      return <TaskItem  key= {task.id} 
                        index = {index}
                         task= {task}
                         //onUpdateStatus = {this.props.onUpdateStatus} 
                        //onDelete = {this.props.onDelete}
                        //onUpdate = {this.props.onUpdate}
                         />
    })

  return (
   

             <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <table className="table table-bordered table-hover">
                        <thead>
                          <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Trạng thái</th>
                            <th className="text-center">Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td>
                            <input type="text"
                                   name="filterName" 
                                   id="input" 
                                   className="form-control"
                                   value = {filterName }
                                    onChange = {this.onChange }
                                   />
                            </td>
                            <td>
                                <select name="filterStatus" 
                                        id="input" 
                                        className="form-control" 
                                          value = {filterStatus }
                                          onChange = {this.onChange }>
                                  <option value={-1}>Tất cả</option>
                                  <option value={0}>Ẩn</option>
                                  <option value={1}>Kích hoạt</option>
                                </select>
                            </td>
                            <td></td>
                          </tr>
                                {eleTasks}
                        </tbody>
                      </table>
             </div>  

  
  )
}
}

const mapStateToProps = (state) =>{
    return {
      tasks : state.tasks,
      filterTable : state.filterTable,
      keyword : state.search,
      sort : state.sort
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onFilterTable : (filter) => {
      dispatch(actions.filterTask(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);























