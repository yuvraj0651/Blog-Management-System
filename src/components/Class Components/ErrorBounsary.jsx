import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        }
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error,
        }
    };

    componentDidCatch(error, info) {
        console.log("Error is:", error);
        console.log("The error from where your error is coming:", info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-slate-100">
                    <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm">
                        <h2 className="text-lg font-semibold text-slate-900">
                            {this.state.error?.message || "Something went wrong 😕"}
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Please refresh the page or try again later.
                        </p>
                    </div>
                </div>
            )
        }
        return (
            <>
                {this.props.children}
            </>
        )
    }
}

export default ErrorBoundary;