import React from "react";
import Header from "./components/Header";
// import Login from "./components/Login"; // commented out during merge
import Footer from "./components/Footer";
// import NewRequestForm from "./components/NewRequestForm"; // commented out during merge
// import NewLanguageForm from "./components/NewLanguageForm"; // commented out during merge
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; // commented out during merge
import Main from '../../client/src/components/Pages/htmlRoutes'

const App = () => [ // ( // [
    <Header />, // uncommented from kevin
    <Main />,
    <Footer /> // uncommented from kevin
    /* commented out during merge
    * // // <NewRequestForm />
    * // // ];
    * // //
    * // // export default App;
    * // //
    * // // <div />
    * // <Router>
    * //     <div>
    * //     <Header />
    * //         <Switch>
    * //             <Route exact path="login.html" component={Login} />
    * //             <Route exact path="newLanguage.html" component={NewLanguageForm} />
    * //             <Route exact path="newRequest.html" component={NewRequestForm} />
    * //         </Switch>
    * //         <Footer />
    * //     </div>
    * // </Router> // ,
    * // // <div />
    * // // <Footer />
]; // uncommented from kevin
    // <NewLanguageForm /> commented out during merge
// ); commented out during merge

export default App;