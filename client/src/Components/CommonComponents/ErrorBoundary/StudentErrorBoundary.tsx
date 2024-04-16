import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class StudentErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error Boundary caught an error:', error, errorInfo);
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center h-screen">
                    <div className="p-8 pr-20 rounded-lg text-center">
                        <img src="https://img.freepik.com/premium-vector/broken-pencil-school-office-supplies-vector-flat-illustration_647843-505.jpg" alt="Sad image" className="w-80 mb-8 mx-auto" />
                        <h1 className="text-3xl font-semibold text-red-600 mb-4">Oops! Something went wrong.</h1>
                        <p className="text-gray-700 text-lg mb-6">We apologize for the inconvenience. Our team has been notified and is working to fix the problem. Please try again later.</p>
                        <Link to="/" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded focus:outline-none focus:shadow-outline">
                            Back to Home
                        </Link>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default StudentErrorBoundary;
