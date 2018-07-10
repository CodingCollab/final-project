import React from "react";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import NewRequestForm from "./components/NewRequestForm";
import NewLanguageForm from "./components/NewLanguageForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => ( // [
    // // <Header /> // ,
    // // <Footer />    
    // // <NewRequestForm />
    // // ];
    // //
    // // export default App;
    // //
    // // <div />
    // <Router>
    //     <div>
    //     <Header />
    //         <Switch>
    //             <Route exact path="login.html" component={Login} />
    //             <Route exact path="newLanguage.html" component={NewLanguageForm} />
    //             <Route exact path="newRequest.html" component={NewRequestForm} />
    //         </Switch>
    //         <Footer />
    //     </div>
    // </Router> // ,
    // // <div />
    // // <Footer />
// // ];
    <NewLanguageForm />
);

export default App;