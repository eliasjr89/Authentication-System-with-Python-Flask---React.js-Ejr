import React, { useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext.js"

import { FaCircleArrowLeft } from 'react-icons/fa6';
import { Certificate } from '../User/Certificate.jsx';

import { ManagerCourses } from '../Manager/ManagerCourses.jsx';
import { ManagerProfile } from '../Manager/ManagerProfile.jsx';
import { Payments } from './Payments.jsx';
import { Teachers } from './Teachers.jsx';
import { ActiveUsers } from './ActiveUsers.jsx';
import { GeneralFiles } from '../Manager/GeneralFiles.jsx';
import { PostCourseM } from './PostCourseM.jsx';
import { CourseCard } from '../Courses/CourseCard.jsx';
import { ModuleCourse } from '../Module/ModuleCourse.jsx'
import { QuizzesCourse } from '../Quizzes/QuizzesCourse.jsx';
import { CreateCategory } from './CreateCategory.jsx';
import { GetQuizzes } from './GetQuizzes.jsx';
import { CreatePayment } from './CreatePayment.jsx';
import { GetPayment } from './GetPayment.jsx';
import { GetModule } from './GetModule.jsx';
import { WelcomeManager } from './WelcomeManager.jsx';



export const ManagerDashboard = () => {
    const { store, actions } = useContext(Context)
    const [buttonSelected, setButtonSelected] = useState(<WelcomeManager />)

    function homeManager(){
        setButtonSelected(<WelcomeManager />)
    }

    const handleCreateCourse = () => {
        setButtonSelected(<PostCourseM />)
    }

    const handleGetPayment = () => {
        setButtonSelected(<GetPayment />)
        actions.getPayments()
    }

    const handleCreatePayment = () => {
        setButtonSelected(<CreatePayment />)
    }

    const handleUpdateCourse = () => {
        setButtonSelected(<CourseCard />)
    }

    const handleMyCourses = () => {
        setButtonSelected(<ManagerCourses />)
        actions.getCourse()
    }

    const handleMyModule = () => {
        setButtonSelected(<ModuleCourse />)
        actions.getModules()
    }


    const handleMyQuizzes = () => {
        setButtonSelected(<QuizzesCourse />)
        actions.getQuizzes()
    }

    const handleGetModules = () => {
        setButtonSelected(<GetModule />)
        actions.getModules()
    }

    

    const handleMyProfile = () => {
        setButtonSelected(<ManagerProfile />)
    }

    const handlePayments = () => {
        setButtonSelected(<Payments />)
    }

    const handleTeachers = () => {
        setButtonSelected(<Teachers />)
        actions.getUser()
    }

    const handleUsers = () => {
        setButtonSelected(<ActiveUsers />)
        actions.getUser()
    }

    const HandleFiles = () => {
        setButtonSelected(<GeneralFiles />)
    }

    const handlePDF = () => {
        setButtonSelected(<Certificate />)
    }

    const handleCreateCategory = () => {
        setButtonSelected(<CreateCategory />)
    }

    const navigate = useNavigate()
    function handleHome() {
        navigate('/')
    }
    return (
        <div className="row">
            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">CLICK</button>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <div className="text-center">
                        <p>Dashboard</p>
                        <div className="fs-4" onClick={handleHome} style={{ cursor: 'pointer' }}>
                            <FaCircleArrowLeft />
                            <h1>Welcome!</h1>
                            <h5 onClick={homeManager}>Manager</h5>
                        </div>
                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleCreatePayment}>Create Payment</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleCreateCourse}>Create Courses</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyModule}>Create Modules</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyQuizzes}>Create Quizzes</button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handleCreateCategory}>Create Category</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleUpdateCourse}>Update Courses</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyQuizzes}>View Quizzes</button>  

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleGetModules}>View Modules</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleGetPayment}>View Payment</button>
                        
                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyCourses}>View Courses</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handleMyProfile}>Profile</button>

                        <button className="btn btn-outline-primary my-2 w-75" onClick={handlePayments} disabled>Sin datos </button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handleTeachers}>Teachers</button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handleUsers}>Users</button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={HandleFiles}>Files</button>

                        <button className='btn btn-outline-primary my-2 w-75' onClick={handlePDF}>Certificate</button>

                    </div>
                </div>
            </div>
            
            <div className="d-flex justify-content-center h-100">
                {buttonSelected}
            </div>
        </div>
    )
}

