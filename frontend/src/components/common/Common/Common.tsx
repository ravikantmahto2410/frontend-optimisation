import {Component} from 'react';
import type { ReactNode } from 'react';

interface ErrorBoundaryProps {
    children : ReactNode;
}

interface ErrorBoundaryState{
    hasError : boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState>{
    constructor(props: ErrorBoundaryProps){
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError() : ErrorBoundaryState {
        return {hasError : true};
    }
    render(){
        if(this.state.hasError){
            return (
                <div className='p-4 text-red-600'>
                    something went wrong. Please try again later 
                </div>
            )
        }
        return this.props.children;
    }
}
export default ErrorBoundary;