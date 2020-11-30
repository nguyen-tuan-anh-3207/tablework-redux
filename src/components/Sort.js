import React from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';

class Sort extends React.Component {

  onClick = (sortBy, sortValue)=> {
    //console.log(sortBy ,'-', sortValue);
    //console.log(this.state);
    this.props.onSort({
      by: sortBy,
      value: sortValue
    });
  }
    render(){
     //  var {sort} = this.props;
        return(
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <div className="dropdown">
                      <button className="btn btn-primary dropdown-toggle" type="button"
                       id="dropdownMenu1" data-toggle="dropdown" 
                       aria-haspopup="true"
                          aria-expanded="true">
                            sắp xếp <span className="fa fa-caret-square-down ml-5"></span>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <a   className="dropdown-item text-center" 
                                  onClick ={() => this.onClick('name', 1)}
                                  >
                                <span className =" fa fa-sort-alpha-asc p-5 mr-5"></span>
                                Tên A - Z
                            </a>
                            <a className="dropdown-item text-center" 
                              onClick ={() => this.onClick('name', -1)}
                              >
                                <span className =" fa fa-sort-alpha-desc p-5 mr-5"></span>
                                Tên Z - A 
                            </a>
                            <a className="dropdown-item text-center " 
                              onClick ={() => this.onClick('status', 1)}
                              >Trạng thái kích hoạt</a>
                            <a className="dropdown-item text-center " 
                              onClick ={() => this.onClick('status', -1)}
                              >Trạng thái ẩn</a>
                          </div>
                    </div>
              </div>
 
        )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {  
    sort : state.sort
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      onSort : (sort) =>{
          dispatch(actions.sortTask(sort));
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sort);