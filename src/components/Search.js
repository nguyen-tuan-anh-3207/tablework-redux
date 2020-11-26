import React from 'react';

class Search extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            keyword: ''
        }
    }
    onChange =(e)=> {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    onSearch = () => {
        console.log(this.state);
        this.props.onSearch(this.state.keyword);
    }
    render(){
        var {keyword} = this.state;
        return(    
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <div className="input-group">
                    <input
                        name ="keyword"
                        type ="text"
                        className ="form-control"
                        placeholder ="Nhập từ khóa"
                        value = {keyword}
                        onChange = {this.onChange}

                    ></input>
                    <span className="input-group-btn">
                    <button type="button" 
                            className="btn btn-primary"
                            onClick = {this.onSearch}
                            ><span
                             className="fa fa-search mr-5"></span>Tìm</button>
                  </span>
             </div>
              </div>  

        )
    }
}

export default Search;