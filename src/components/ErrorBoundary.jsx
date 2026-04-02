import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production you'd send this to a logging service (e.g. Sentry)
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-8">
          <div className="card bg-base-100 shadow-xl p-8 max-w-md">
            <h1 className="text-3xl font-bold text-error mb-2">Oops!</h1>
            <p className="text-base-content/70 mb-6">
              Something went wrong. Please refresh the page or try again later.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;