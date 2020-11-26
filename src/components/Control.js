import React from 'react';
import Search from './Search'
import Sort from './Sort'
class Control extends React.Component {
    render(){
        return(
            <div className="row mt-15">
             <Search  onSearch = { this.props.onSearch}/>
              <Sort onSort = {this.props.onSort} />
              </div>
        )
    }
}

export default Control;