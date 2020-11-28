import React from 'react';
import './App.css';
import TaskForm from './components/TaskForm'
import Control from './components/Control'
import TaskList from './components/TaskList';
import {connect} from 'react-redux';
import * as actions from './actions/index'

class App extends React.Component {

  constructor(props){
        super(props);
        this.state = {
          //tasks : [], //id, name, status
          //isDisplayForm : false,
          //taskEditing : null,
          filter : {name: '',
                    status: -1},
          keyword: '',
          sort :{
            by:'',
            value: 1
          }
        }
  }

  // componentWillMount() {
  //   if (localStorage && localStorage.getItem('tasks')){
  //     var tasks = JSON.parse(localStorage.getItem('tasks'));
  //     this.setState({
  //       tasks : tasks
  //     });
  //   }
  // }


  onToggleForm = () =>{
    // if (this.state.isDisplayForm && this.state.taskEditing !==null) {
    // this.setState({
    //   isDisplayForm :true ,
    //   taskEditing : null
    // }); }else {
    //   this.setState({
    //     isDisplayForm : !this.state.isDisplayForm,
    //     taskEditing: null
    //   })
    // }
    var {itemEditing} = this.props;
    if ( itemEditing && itemEditing.id !== ''){
      this.props.onOpenForm();
    }else{
      this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
  }

  // onCloseForm =()=>{
  //   this.setState({
  //     isDisplayForm :false
  //   });
  // }

  onShowForm = () => {
    this.setState({
      isDisplayForm :true
    });
  }

  // onSubmit =(data) => {
  //   var {tasks} = this.state;
  //   if (data.id === ''){
  //     data.id = this.generateId();
  //     tasks.push(data);
  //   } else {
  //     var index = this.findIndex(data.id);
  //     tasks[index] = data;

  //   }
  //   //console.log(data);
  //   this.setState({
  //     tasks : tasks,
  //     taskEditing: null
  //   });
  //   localStorage.setItem('tasks', JSON.stringify(tasks));

  // }
  // onUpdateStatus =(id)=>{
  //     //console.log(id);
  //     var {tasks} = this.state;
  //     var index = this.findIndex(id);
  //     if ( index !== -1 ) {
  //       tasks[index].status = !tasks[index].status;
  //     }
  //     this.setState({
  //       tasks : tasks
  //     })
  //     localStorage.setItem('tasks', JSON.stringify(tasks))
  // }

  findIndex =(id)=> {
      var {tasks} = this.state;
      var result = -1;
      tasks.forEach((task, index)=>{
          if (task.id ===id) result = index;
      })
      return result;
  }

  // onDelete =(id) =>{
  //   var {tasks} = this.state;
  //   var index = this.findIndex(id);
  //   if ( index !== -1 ) {
  //     tasks.splice(index, 1);
  //   }
  //   this.setState({
  //     tasks : tasks
  //   })
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  //   this.onCloseForm();
  // }

  onFilter =(filterName, filterStatus) => {
    //kiểu dữ liệu của filterStatus đang là string
    console.log(filterName + ' ' + filterStatus);
    filterStatus = parseInt(filterStatus,10); // --> chuyển sang number
    this.setState({ 
      filter :{
      name : filterName.toLowerCase(),
      status : filterStatus
    }})

  }
  onSearch = (keyword)=> {
      console.log(keyword);
      this.setState({
        keyword : keyword
      })
  }
  onSort =async(sortBy, sortValue) =>{
    console.log(sortBy, sortValue);
    await this.setState({
      sort: {
        by: sortBy,
        value: sortValue
      }
    })
  }

  render(){
    var {  filter,keyword,sort} = this.state // var tasks = this.state.tasks;
    var {isDisplayForm} = this.props;
//     if(filter){
//       if(filter.name){
//          tasks = tasks.filter(task =>{
//           return task.name.toLowerCase().indexOf(filter.name) !==-1;
//         })
//       }  

//         // tasks = tasks.filter(task =>{
//         //   if (filter.status === -1){
//         //     return tasks;
//         //   }else {
//         //     return task.status === (filter.status === 1? true: false)
//         //   }
//         // })
        
//     };

//     if(keyword){
//       tasks = tasks.filter(task =>{
//         return task.name.toLowerCase().indexOf(keyword) !==-1;
//     })
//   }
// //sort
// if( sort.by === 'name'){
//     tasks.sort((a,b) =>{
//       if (a.name >b.name) return sort.value;
//       else if (a.name < b.name) return -sort.value;
//       else return 0;
//     })}else {
//       tasks.sort((a,b) =>{
//         if (a.status >b.status) return -sort.value;
//         else if (a.status < b.status) return sort.value;
//         else return 0;
//       }) };
  return (
    <div className="container">
      <div className="text-center">
           <h1>Quản lí công việc</h1>
    </div>  
      <div className="row">
      <div className= {isDisplayForm? 'col-xs-4 col-sm-4 col-md-4 col-lg-4': ''}>
            {<TaskForm
                //onCloseForm = {this.onCloseForm}
                //onSubmit = {this.onSubmit} 
                //task = {taskEditing}
                />}
      </div>
      <div className={isDisplayForm? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
             <button  type="button" 
                      className="btn btn-primary"
                      onClick = {this.onToggleForm}>
                <span className="fa fa-plus mr-5"> 
                </span>Thêm công việc
              </button>&nbsp;
              {/*search -sort */}
                <Control 
                  onSearch = {this.onSearch}
                  onSort = {this.onSort}
                />
  
             <div className="row mt-15">
             {/*list */}
                  <TaskList 
                            
                            //onUpdateStatus = {this.onUpdateStatus}
                           // onDelete = {this.onDelete}
                            //onUpdate = {this.onUpdate}
                            onFilter = {this.onFilter}
                            />
             </div>
      </div>
      </div>  
    </div>    
  )
}
}
const mapStateToProps = (state, ownProps) => {
  return {
      isDisplayForm : state.isDisplayForm,
      itemEditing : state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleForm: ()=>{
      dispatch(actions.toggleForm())
    },
    onClearTask: (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm: ()=>{
      dispatch(actions.openForm())
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);






















