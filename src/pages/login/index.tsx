
import styles from './styles.module.css';
import { Header, Footer } from '@/./components';

function Login() {
    return (
        <>
            <Header />
            <video autoPlay={true} muted loop className={styles.bgVideo}>
                <source src="/Forza_Net_Splash_Page_Motorsport_adb7e0d56b.mp4" type="video/mp4" />
            </video>

            <div className=" fixed bottom w-full h-full">
            </div>

            <Footer />
        </>
    )
}

export default Login
