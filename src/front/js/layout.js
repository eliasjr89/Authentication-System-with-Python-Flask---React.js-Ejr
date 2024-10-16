import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { LoginOk } from "./pages/loginOk";
import { PaginaPrivada } from "./pages/paginaPrivada";
import { SignupOk } from "./pages/signupOk";
import { LogoutOk } from "./pages/logoutOk";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Category } from "./pages/category";
import { AddCategory } from "./pages/addCategory";
import { AddAuthor } from "./pages/addAuthor";
import { Author } from "./pages/author";
import { AddNewspaper } from "./pages/addNewspaper";
import { Newspaper } from "./pages/newspaper";
import { UserCategories } from "./pages/userCategory";
import { AddArticle } from "./pages/addArticle";
import { SignupForm } from "./component/signupForm";
import { LoginForm } from "./component/loginForm";
import { Article } from "./pages/article";
import { EditArticle } from "./pages/editArticle";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<SignupForm />} path="/signup" />
                        <Route element={<SignupOk />} path="/signupok" />
                        <Route element={<LoginForm />} path="/login" />
                        <Route element={<LoginOk />} path="/loginok" />
                        <Route element={<Author />} path="/authors" />
                        <Route element={<Article />} path="/articles" />
                        <Route element={<AddAuthor />} path="/add-author" />
                        <Route element={<AddArticle />} path="/add-article" />
                        <Route element={<AddCategory />} path="/add-category" />
                        <Route element={<AddNewspaper />} path="/add-newspaper" />
                        <Route element={<EditArticle />} path="/edit-article/:id" />
                        <Route element={<PaginaPrivada />} path="/paginaprivada" />
                        <Route element={<Category />} path="/categories" />
                        <Route element={<UserCategories />} path="/user-categories" />
                        <Route element={<Newspaper />} path="/newspapers" />
                        <Route element={<LogoutOk />} path="/logoutOk" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);