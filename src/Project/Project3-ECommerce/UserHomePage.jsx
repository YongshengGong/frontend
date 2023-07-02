import jwtDecode from 'jwt-decode';
import React, { useState, useEffect,useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken';
import { HashLink } from 'react-router-hash-link';
import './ECommerce.css';
import { ShoppingCartOutlined, SearchOutlined, PlusCircleOutlined} from '@ant-design/icons';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './UserHomePage.css'
import Search from 'antd/es/transfer/search';
// import { useDispatch } from 'react-redux';
// import {cart} from '../../ecommerceSlice';

const UserHomePage = () => {
    const [product, setProduct] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrectPage] = useState(1);
    const [slider, setSlider] = useState([]);
    const [selectProductNumber,setSelectProductNumber]=useState({});
    const [quantity,setQuantity]=useState(0);
    const [search,setSearch]=useState('');

    let { username } = useParams();
    const nav = useNavigate();
    const ref = useRef([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let timeoutID;
        if (!token) {
            nav('/ECommerce/SignIn');
        }
        else {
            const timeout = jwtDecode(token).expireTime - Date.now();
            timeoutID = setTimeout(() => {
                localStorage.removeItem('token');
                alert('Your session has expired, please log in again!');
                nav('/ECommerce/SignIn');
            }, timeout);
        }
        return () => {
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
        }
    }, []);
    useEffect(() => {
        axios.get('http://localhost:3001/ECommerce_Slider')
            .then(res => (setSlider(res.data.Slider), console.log(res.data.Slider)))
            .catch(error => console.log(error));
    }, []);
    useEffect(() => {
        const localCurrentPage = parseInt(localStorage.getItem('currentPage'));
        handlePageChange(localCurrentPage || 1);
    }, [])
    useEffect(()=>{
     axios.get(`http://localhost:3001/Quantity?username=${username}`)
     .then(res=>setQuantity(res.data))
     .catch(error => console.log(error));
    },[]);




    const handleLogOut = () => {
        localStorage.removeItem('token');
        nav('/ECommerce');
    }
    const handlePageChange = async (page = 1, limit = 10) => {
        const res = await axios.get(`http://localhost:3001/ECommerceHomePage?page=${page}&limit=${limit}`);
        setProduct(res.data.product);
        setTotalPages(res.data.totalPages);
        setCurrectPage(page);
        localStorage.setItem('currentPage', page);
    }
    const handleCart = () => {
        nav(`/ECommerce/UserHomePage/${username}/Cart`)
    }
    // const dispatch = useDispatch();
    let addProductNumber;
    const handleAddToCart = async (id, product) => {
        if (selectProductNumber[id]) {
            addProductNumber=selectProductNumber[id];
            // setAddProductNumber(prev => prev + parseInt(selectProductNumber[id]))
        }
        else {
            // setAddProductNumber(prev => prev + 1)
            addProductNumber=1;
        }
        try {
            const res1=await axios.post('http://localhost:3001/SaveToCart', { username, product, addProductNumber });
            console.log(res1.status);
            const res = await axios.get(`http://localhost:3001/Quantity?username=${username}`);
            setQuantity(res.data);
          } catch (error) {
            console.log(error);
          }
          const element = ref.current[id]; 
          const clone = element.cloneNode(true);  
          clone.style.position = 'fixed';
          clone.style.top = element.getBoundingClientRect().top + 'px';
          clone.style.right = element.getBoundingClientRect().right + 'px';
          clone.style.width = '50px';
          clone.style.height = '50px';
          clone.style.transition = 'all 1s ease-in-out';
          element.parentElement.appendChild(clone);
         
          setTimeout(() => {
            element.parentElement.removeChild(clone);
        }, 1000);
    }
const handleSearch=async(e, page = 1, limit = 10)=>{
    setSearch(e);
    if(e){
    const res = await axios.get(`http://localhost:3001/ECommerceHomePage?page=${page}&limit=${limit}&search=${e}`);
    setProduct(res.data.product);
    setTotalPages(res.data.totalPages);
    setCurrectPage(page);
    }
    else{
        const localCurrentPage = parseInt(localStorage.getItem('currentPage'));
        handlePageChange(localCurrentPage || 1);
    }
}
   
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };

   
    return(
        <div className='ECommerceHomePage'>
        <nav className='navBar'>
            <HashLink to='/#project-blank' className='YG'>YG</HashLink>
            <div className='Search'>
                <input className='SearchInput' placeholder='search' value={search}
                onChange={e=>{handleSearch(e.target.value)}}/>
                <SearchOutlined className='SearchIcon' />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className='CategoryBTN'>Category</div>
                <div className='CartBTN' onClick={handleCart}><ShoppingCartOutlined style={{ color: '#f9c5bd', fontSize: 30 }} /> Cart
                    <div className='CartItemNumber'>{quantity}</div>
                </div>
                <div className='UserBTN'>
                    <p>Welcome</p>
                    <p>{username}</p>
                    <div className='userDropDown' ><button onClick={handleLogOut}>Log out</button></div>
                </div>
            </div>
        </nav>



        <div style={{marginTop:100,color:'#8076a3',fontSize:30,textAlign:'center'}}>Hi {username},  great to see you! What would you like to discover today?
        </div>



        <div className='Slider'>
            <Slider {...settings}>
                {
                    slider.map((sliderItem, index) => (
                        <div key={index}>
                            <img src={`http://localhost:3001/${sliderItem}`} className='SliderImage'></img>
                        </div>
                    ))
                }
            </Slider>
        </div>



        <div className='AllItemContainer'>{
            product.map((product,index) => (
                    <div className='SingleItemContainer' id={index}>
                        <div className='ItemImageContainer'><img src={`http://localhost:3001${product.pic}`} className='ItemImage' ref={el => ref.current[index] = el}></img></div>
                        <div className='ItemName'> {product.name}</div>
                        <div>CA${product.price}</div>
                        <select onChange={(e)=>{setSelectProductNumber({...selectProductNumber,[index]:e.target.value})}} style={{border:'2px solid #8076a3',marginTop:10}}>
                            {/* <option selected value='0'>Choose quantity</option> */}
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                            <option value='6'>6</option>
                        </select>
                        <button style={{marginTop:10}}>Save it for later</button>
                        <button style={{marginTop:10}} onClick={()=>handleAddToCart(index,product)}>Add t<PlusCircleOutlined style={{fontSize:'13px'}}/> Cart</button>
                    </div>
            ))
        }
        </div>



        <div className='Pagination'>
            {
                search===''?
                Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <button key={page}
                            id={page}
                            onClick={() => handlePageChange(page)}
                            className={`${page === 1 ? 
                                (currentPage === 1 ? 'FirstPageActive' : 'FirstPageInactive') : 
                                (page === totalPages ? 
                                    (currentPage === totalPages ? 'LastPageActive' : 'LastPageInactive') : 
                                    (page === currentPage ? 'PageActive' : 'PageInactive')
                                )}`}
                        >{page}
                        </button>
                    ))
                    :
                    Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (page) => (
                            <button key={page}
                                id={page}
                                onClick={() => handleSearch(search,page)}
                                className={`${page === 1 ? 
                                    (currentPage === 1 ? 'FirstPageActive' : 'FirstPageInactive') : 
                                    (page === totalPages ? 
                                        (currentPage === totalPages ? 'LastPageActive' : 'LastPageInactive') : 
                                        (page === currentPage ? 'PageActive' : 'PageInactive')
                                    )}`}
                            >{page}
                            </button>
                        ))
            }
        </div>
    </div>
)
     
    
}

export default UserHomePage;