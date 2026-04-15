import React from 'react';

export default function Navbar() {
    return (
        <nav className="navbar">
            <a href="/" className="logo">
                <div className="logo-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
                        <path
                            id="color_1_flame"
                            d="M 200 60 C 200 60 130 130 135 200 C 140 250 215 265 250 225 C 270 200 260 160 260 160 C 260 160 240 190 220 190 C 195 190 200 140 200 140 C 200 140 220 110 200 60 Z"
                            fill="currentColor"
                        />
                        <g id="color_2_base" fill="currentColor">
                            <path d="M 140 270 L 151 281 L 112 305 L 151 329 L 140 340 L 89 305 Z" />
                            <path d="M 185 345 L 175 340 L 215 255 L 225 260 Z" />
                            <path d="M 260 270 L 311 305 L 260 340 L 249 329 L 288 305 L 249 281 Z" />
                        </g>
                    </svg>
                </div>
                <span>CampLog</span>
            </a>

            <div className="nav-actions">
                <a href="/login" className="btn btn-entrar">Entrar</a>
            </div>
        </nav>
    );
}