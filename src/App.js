import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.css";
import AddItem from "./components/AddItem/AddItem";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Inventory from "./components/Inventory/Inventory";
import UserLogin from "./components/Login/UserLogin";
import MyItem from "./components/MyItem/MyItem";
import Register from "./components/Register/Register";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import SingleInventoryItem from "./components/SingleInventoryItem/SingleInventoryItem";
import UpdateItem from "./components/UpdateItem/UpdateItem";

function App() {
    return (
        <>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route
                    path="/inventory"
                    element={
                        <RequireAuth>
                            <Inventory></Inventory>
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/inventory/:id"
                    element={
                        <RequireAuth>
                            <SingleInventoryItem></SingleInventoryItem>
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/add-item"
                    element={
                        <RequireAuth>
                            <AddItem></AddItem>
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/my-items"
                    element={
                        <RequireAuth>
                            <MyItem></MyItem>
                        </RequireAuth>
                    }
                ></Route>
                <Route
                    path="/update-item/:_id"
                    element={
                        <RequireAuth>
                            <UpdateItem></UpdateItem>
                        </RequireAuth>
                    }
                ></Route>

                <Route path="/register" element={<Register></Register>}></Route>
                <Route path="/login" element={<UserLogin></UserLogin>}></Route>
            </Routes>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
