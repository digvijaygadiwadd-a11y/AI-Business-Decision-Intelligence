import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg max-w-xl mx-auto my-8">
          <h2 className="text-lg font-bold text-red-800">Something went wrong in this component.</h2>
          <p className="text-sm text-red-600 mt-2">{this.state.error && this.state.error.toString()}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded text-sm font-semibold hover:bg-red-700"
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
