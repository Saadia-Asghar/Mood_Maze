import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black text-gold p-8 flex flex-col items-center justify-center font-serif text-center">
                    <h1 className="text-4xl text-red-600 mb-4">Something went wrong.</h1>
                    <div className="bg-gray-900 p-6 rounded-lg border border-red-900 max-w-2xl overflow-auto text-left">
                        <p className="text-red-400 font-bold mb-2">Error: {this.state.error?.toString()}</p>
                        <pre className="text-xs text-gray-400 whitespace-pre-wrap">
                            {this.state.errorInfo?.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-gold text-black rounded hover:bg-yellow-600 transition"
                    >
                        Reload Application
                    </button>
                    <p className="mt-4 text-gray-500 text-sm">
                        Please take a screenshot of this screen and share it with support.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
