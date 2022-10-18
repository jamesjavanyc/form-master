import React from "react";

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo:"", error:{} };
    }

    static getDerivedStateFromError(error) {
        // 更新 state 使下一次渲染能够显示降级后的 UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.state.error=error
        this.state.errorInfo = errorInfo
        this.setState(this.state)
    }

    render() {
        if (this.state.hasError) {
            return (
                <>
                    <h1>Something went wrong.</h1>
                    <p>{this.state.error}</p>
                    <p>{this.state.errorInfo}</p>
                </>
            )
        }

        return this.props.children;
    }
}