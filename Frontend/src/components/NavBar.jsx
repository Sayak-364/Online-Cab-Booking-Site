import { NavLink } from "react-router-dom"


const Navbar = ({containerStyles, navBtnClick}) => {
  return (
    <nav className={`${containerStyles}`}>
        <NavLink to={'/'} className={({isActive}) => isActive? "active_link":""}><div className="nav_menu" onClick={navBtnClick}> Home</div></NavLink>
        <NavLink to={'/about'} className={({isActive}) => isActive? "active_link":""} onClick={navBtnClick}><div className="nav_menu"> About Us</div></NavLink>
        <NavLink to={'/services'} className={({isActive}) => isActive? "active_link":""} onClick={navBtnClick}><div className="nav_menu"> Services</div></NavLink>
        <NavLink to={'/pricing'} className={({isActive}) => isActive? "active_link":""} onClick={navBtnClick}><div className="nav_menu"> Pricing</div></NavLink>
        <NavLink to={'/cars'} className={({isActive}) => isActive? "active_link":""} onClick={navBtnClick}><div className="nav_menu"> Cars</div></NavLink>
        <NavLink to={'/blogs'} className={({isActive}) => isActive? "active_link":""} onClick={navBtnClick}><div className="nav_menu"> Blogs</div></NavLink>
        <NavLink to={'/contacts'} className={({isActive}) => isActive? "active_link":""} onClick={navBtnClick}><div className="nav_menu"> Contact</div></NavLink>
    </nav>
    )        
}

export default Navbar