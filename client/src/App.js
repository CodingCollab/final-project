import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from '../../client/src/components/Pages/firstComponentRoutes';
import Second from '../../client/src/components/Pages//secondComponentRoutes';

const App = () => [
    <Header />,
    <Main />,
    <Second />,
    <Footer />
];

export default App;


