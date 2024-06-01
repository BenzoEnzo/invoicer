import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Company from './company/Company'

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
                        <Route path="/" element={<Company/>}/>
                        <Route path="/products" element={<Company/>}/>
                    </Routes>
                </div>
            </main>

            <footer className="footer">
            </footer>
        </div>
    </BrowserRouter>
  );
}

export default App;