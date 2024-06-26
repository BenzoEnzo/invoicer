import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Company from './company/Company';
import {ToastContainer} from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <header className="header">
                    <div className="header-content">
                        <h1 className="logo">INVOICER PROJECT</h1>
                    </div>
                </header>

                <main className="detail">
                    <div className="content-card">
                        <Routes>
                            <Route path="/" element={<Company showContainer/>} />
                            <Route path="/firma/:id" element={<Company />} />
                            <Route path="/firma/:id/dane" element={<Company />} />
                            <Route path="/firma/:id/produkty" element={<Company />} />
                            <Route path="/firma/:id/faktury" element={<Company />} />
                            <Route path="/firma/:id/faktury/tworzenie" element={<Company />} />
                            <Route path="/firma" element={<Company/>} />
                        </Routes>
                    </div>
                </main>

                <footer className="footer"></footer>
                <ToastContainer />
            </div>
        </BrowserRouter>
    );
}

export default App;
