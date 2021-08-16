import React from 'react';
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";

const Index = () => {
    return (
        <MainLayout>
            <div className="center">
                <h1>Добро пожаловать!</h1>
                <h3>Здесь собраны лучшие треки!</h3>
            </div>
        </MainLayout>
    )
}

export default Index;