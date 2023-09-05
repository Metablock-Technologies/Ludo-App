import React, { createContext, useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import UserPage from './Components/UserView/UserPage';
import WalletPage from './Components/Transaction/WalletPage';
import HistoryPage from './Components/HistoryPage';
import ProfilePage from './Components/ProfilePage';
// import ReferandEarn from './Components/ReferandEarn';
// import SpinadnWin from './Components/SpinadnWin';
import LanguagesPage from './Components/LanguagesPage';
import SupportPage from './Components/SupportPage';
import LegalPage from './Components/LegalPage';
import AddChipsPage from './Components/Transaction/AddChipsPage';
import WithDrawPage from './Components/Transaction/WithDrawPage';
import PalyPage from './GameTypes/PlayPage';
import FirstGame from './GameTypes/FirstGame';
import MainPage from './Components/MainPage';
import RegisterPage from './Components/Authentication/RegisterPage';
import LoginPage from './Components/Authentication/LoginPage';
import SecondPage from './GameTypes/SecondPage';
import EnterFirstGame from './GameTypes/EnterFirstGame';
import OTPPage from './Components/Authentication/OTPPage';
import SignUpPage from './Components/Authentication/SignUpPage';
import RegisterLegalPAge from './Components/RegisterLegalPAge';

function PrivateRoute({ element }) {
    // const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    // Check for the presence of the access token
    const hasAccessToken = localStorage.getItem('access_token');

    useEffect(() => {
        // Redirect to login if not logged in and no access token
        if (!hasAccessToken) {
            navigate('/LoginPage');
        }
    }, []);
    return hasAccessToken ? element : <Navigate to="/LoginPage" />;
}


export const AuthContext = createContext()
function App() {
    const [user, setUser] = useState({
        name: '',
        memberType: '',
        userID: ''
    })
    return (
        <>
            <AuthContext.Provider value={{ user, setUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path='/' element={<MainPage />}></Route>
                        <Route exact path='/RegisterPage' element={<RegisterPage />}></Route>
                        <Route exact path="/RegisterLegalPAge" element={<RegisterLegalPAge />}></Route>
                        <Route exact path='/LoginPage' element={<LoginPage />}></Route>
                        <Route exact path='/OTPPage' element={<OTPPage />} />
                        <Route exact path='/SignUpPage' element={<SignUpPage />} ></Route>
                        <Route exact path='/UserPage' element={<PrivateRoute element={<UserPage />} />} ></Route>
                        <Route exact path='/PlayPage' element={<PrivateRoute element={<PalyPage />} />} ></Route>
                        <Route exact path='/FirstGame' element={<PrivateRoute element={<FirstGame />} />} ></Route>
                        <Route exact path='/EnterFirstGame' element={<PrivateRoute element={<EnterFirstGame />} />} ></Route>
                        <Route exact path='/SecondPage' element={<PrivateRoute element={<SecondPage />} />} ></Route>
                        <Route exact path='/WalletPage' element={<PrivateRoute element={<WalletPage />} />} ></Route>
                        <Route exact path='/HistoryPage' element={<PrivateRoute element={<HistoryPage />} />} ></Route>
                        <Route exact path='/ProfilePage' element={<PrivateRoute element={<ProfilePage />} />} ></Route>
                        {/* <Route exact path='/ReferandEarn' element={<ReferandEarn />}></Route>
                        <Route exact path='/SpinandWin' element={<SpinadnWin />}></Route> */}
                        <Route exact path='/LanguagesPage' element={<PrivateRoute element={<LanguagesPage />} />} ></Route>
                        <Route exact path='/SupportPage' element={<PrivateRoute element={<SupportPage />} />} ></Route>
                        <Route exact path='/LegalPage' element={<PrivateRoute element={<LegalPage />} />} ></Route>
                        <Route exact path='/AddChipsPage' element={<PrivateRoute element={<AddChipsPage />} />} ></Route >
                        <Route exact path='/WithDrawPage' element={<PrivateRoute element={<WithDrawPage />} />
                        } ></Route >
                    </Routes >
                </BrowserRouter >
            </AuthContext.Provider >
        </>
    )
}

export default App;