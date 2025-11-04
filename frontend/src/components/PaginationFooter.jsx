import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


export default function PaginationFooter({ currentPage, totalPages, onPageChange }) {
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <footer className="w-full mt-8 mb-4">
            <div className="max-w-7xl mx-auto flex justify-center items-center p-4 bg-white rounded-lg shadow-lg">
                <button
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                    className={`
                        p-2 rounded-full transition duration-150 ease-in-out
                        ${currentPage === 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-md'
                        }
                        flex items-center space-x-2 mr-4
                    `}
                >
                    <ChevronLeft size={20} />
                    <span className="hidden sm:inline">Anterior</span>
                </button>
                <span className="text-lg font-semibold text-gray-700 mx-4">
                    Página <span className="text-cyan-600">{currentPage}</span> de <span className="text-cyan-600">{totalPages}</span>
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`
                        p-2 rounded-full transition duration-150 ease-in-out
                        ${currentPage === totalPages 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-md'
                        }
                        flex items-center space-x-2 ml-4
                    `}
                >
                    <span className="hidden sm:inline">Siguiente</span>
                    <ChevronRight size={20} />
                </button>
            </div>
        </footer>
    );
}
