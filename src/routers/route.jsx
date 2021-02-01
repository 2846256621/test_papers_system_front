import React from 'react'
import {HashRouter,Route,Redirect,Switch} from "react-router-dom";
import Login from '../pages/login/index.jsx';
import SignIn from '../pages/sign/index.jsx';
import Home from '../pages/home/content/home';
import ProblemList from '../pages/home/content/problem/problemList';
import ProblemManage from '../pages/home/content/problem/problemManage';
import PointsList from '../pages/home/content/points/points';
import SubjectsList from '../pages/home/content/subjects/subjects';
import TestPaperList from '../pages/home/content/testPaper/testPaperList';
import TestPaperAutomatic from '../pages/home/content/testPaper/testPaperAutomatic';
import TestPaperDetails from '../pages/home/content/testPaper/testPaperDetails';

import UserManager from '../pages/home/content/user/userManage';
import UserPerson from '../pages/home/content/user/userPerson';

class RouteMap extends React.Component {
    render() {
        return (
            <HashRouter>
                <main>
                    <Switch>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/signIn" exact component={SignIn}/>
                        <Route path="/home" exact component={Home}/>
                        <Route path="/problemList" exact component={ProblemList}/>
                        <Route path="/problemsManage/:type"  component={ProblemManage}/>
                        <Route path="/pointsList" exact component={PointsList}/>
                        <Route path="/subjectsList" exact component={SubjectsList}/>
                        <Route path="/testPaperAutomatic" exact component={TestPaperAutomatic}/>
                        <Route path="/testPaperList" exact component={TestPaperList}/>
                        <Route path="/testPaperDetails" exact component={TestPaperDetails}/>
                        <Route path="/userManager" exact component={UserManager}/>
                        <Route path="/userPerson" exact component={UserPerson}/>
                        <Redirect to='/login' />
                    </Switch>
                </main>
            </HashRouter>
        )
    }
}
 
export default RouteMap;