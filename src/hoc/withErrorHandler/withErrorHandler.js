import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler =(ErrComponent, axios) => (
  class extends Component { 
    state = {
      error:null
    };
  
    componentWillMount() {
      this.reqInterceptor = axios.interceptors
          .request
          .use(request=>{
        this.setState({error:null});
        return request;
      });
  
      this.resInterceptor = axios.interceptors
        .response
        .use(response=>response, error=>{
                            this.setState({error});
            });
    }
    
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    render() {
      return (
        <Aux>
          <Modal show={this.state.error}
                onModalClose={()=>{this.setState({error:null})}}
          >
            {
              this.state.error?(
               this.state.error.message
                ): null
            }
          </Modal>
          <ErrComponent {...this.props} />
        </Aux>
  )
    }
  }
);

export default withErrorHandler;