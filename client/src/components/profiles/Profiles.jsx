import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import {getProfiles} from '../../actions/profileAction';
import ProfileItem from './ProfileItem';
import ReactPaginate from 'react-paginate';
import './style.css';

class Profiles extends Component {

    constructor(){
        super();
    
        this.state = {
          search: null,
          data: [],
          offset: 0,
          perPage: 1,
          currentPage: 0
        };

        this.handlePageClick = this.handlePageClick.bind(this);
      }

    searchSpace = (event) => {
    let keyword = event.target.value;
    this.setState({search:keyword})
    }

    //this will remove the spinner 
    componentDidMount(){
        this.props.getProfiles();
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
  
        this.setState({
            currentPage: selectedPage,
            offset: offset
        });
  
    };

    render() {
        const {profiles, loading} = this.props.profile;
        let profileItems;
        var pagination,pageCount;

        if(profiles === null || loading) {
            profileItems = <Spinner/>
        }

        else{
            if(profiles.length > 0){
                //here we are making multiple components 'ProfileItem'
                
                if(this.state.search){
                    profileItems = profiles.filter((data) => {

                        if(data.user.name.toLowerCase().includes(this.state.search.toLowerCase())){
                            return data;
                        }
                        
                    }).map( profile => 
                        (   
                            <ProfileItem key={profile._id} profile={profile} />
                        )
                    )
                }      
                
                else{
                    
                    const slice = profiles.slice(this.state.offset, this.state.offset + this.state.perPage);
                    profileItems = slice.map(profile => (
                        <ProfileItem key={profile._id} profile={profile} />
                    ));

                    pageCount = Math.ceil(profiles.length / this.state.perPage);

                    pagination = (
                        <ReactPaginate
                                previousLabel={"prev"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            />
                    );

                }
  
                
            }
            else{
                profileItems = <h4>No profiles found...</h4>
            }
        }

        return (
            
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">Developer Profiles</h1>
                            <p className="lead text-center">
                                Browse and connect with developers
                            </p>
                            <div className="d-flex justify-content-center m-3">
                            <input type="text" className="form-control w-50" placeholder="Search Profile" onChange={(e)=>this.searchSpace(e)} />
                            </div>
                            {profileItems}
                            <div className="d-flex justify-content-center">
                            {pagination}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{getProfiles})(Profiles);