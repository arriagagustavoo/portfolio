import { Component } from "react"
import "./ErrorBoundary.css"

// a class, because getDerivedStateFromError has no hook equivalent
class ErrorBoundary extends Component {

    constructor(props){
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError(){
        return { failed: true };
    }

    componentDidCatch(error, info){
        console.error("Render failed:", error, info);
    }

    render(){
        if(this.state.failed){
            return (
                <div className = "boundary">
                    <p className = "boundary-code" aria-hidden = "true">!</p>
                    <h1 className = "boundary-title">Something broke on this page.</h1>

                    <p className = "boundary-text">
                        That is my fault, not yours. Reload the page and it will most likely come back.
                        If it keeps happening, email gus@arriagagustavoo.com and tell me what you clicked.
                    </p>

                    {/* a plain reload, not a router link: the router may be what failed */}
                    <a className = "boundary-back" href = "/">Reload the site</a>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary
