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
import { CategoryDetails } from "./pages/categoryDetails";
import { EditCategory } from "./pages/editCategory";
import { AddAuthor } from "./pages/addAuthor";
import { Author } from "./pages/author";
import { AddNewspaper } from "./pages/addNewspaper";
import { Newspaper } from "./pages/newspaper";
import { NewspaperDetails } from "./pages/newspaperDetails";
import { EditNewspaper } from "./pages/editNewspaper";
import { UserCategories } from "./pages/userCategory";
import { AddArticle } from "./pages/addArticle";

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
                        <Route element={<LoginOk />} path="/loginok" />
                        <Route element={<UserCategories />} path="/user-Categories" />
                        <Route element={<PaginaPrivada />} path="/paginaprivada" />
                        <Route element={<Author />} path="/author"/>
                        <Route element={<AddAuthor />} path="/add-Author"/>
                        <Route element={<Newspaper />} path="/newspaper"/>
                        <Route element={<AddNewspaper />} path="/add-Newspaper"/>
                        <Route element={<NewspaperDetails />} path="/newspaper-details/:id"/>
                        <Route element={<EditNewspaper />} path="/edit-newspaper/:id" />
                        <Route element={<AddArticle />} path="/add-Article"  />
                        <Route element={<Category />} path="/category" />
                        <Route element={<AddCategory />} path="/add-category" />
                        <Route element={<EditCategory />} path="/edit-category/:id" />
                        <Route element={<CategoryDetails />} path="/category-details/:id" />
                        <Route element={<SignupOk />} path="/signupok" />
                        <Route element={<LogoutOk />} path="/logoutOk" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);