import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import './ECommerce.css';
import { ShoppingCartOutlined, SearchOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const ECommerce = () => {
    const nav = useNavigate();
    const handleSignInBTN = () => {
        nav('/ECommerce/SignIn');
    };

    const [product, setProduct] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrectPage] = useState(1);
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        const localCurrentPage = parseInt(localStorage.getItem('currentPage'));
        handlePageChange(localCurrentPage || 1);
    }, [])


    const handlePageChange = async (page = 1, limit = 10) => {
        const res = await axios.get(`http://localhost:3001/ECommerceHomePage?page=${page}&limit=${limit}`);
        setProduct(res.data.product);
        setTotalPages(res.data.totalPages);
        setCurrectPage(page);
        localStorage.setItem('currentPage', page);
    }

    useEffect(() => {
        axios.get('http://localhost:3001/ECommerce_Slider')
            .then(res => (setSlider(res.data.Slider), console.log(res.data.Slider)))
            .catch(error => console.log(error));

    }, []);

    const settings = {
        dots:true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "linear",
    };

    return (
        <div className='ECommerceHomePage'>
            <nav className='navBar'>
                <HashLink to='/#project-blank' className='YG'>YG</HashLink>
                <div className='Search'><input className='SearchInput' placeholder='search' /><SearchOutlined className='SearchIcon' /></div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='CategoryBTN'>Category</div>
                    <div className='CartBTN'><ShoppingCartOutlined style={{ color: '#f9c5bd', fontSize: 30 }} /> Cart
                        <div className='CartItemNumber'>0</div>
                    </div>
                    <div className='SignInBTN' onClick={handleSignInBTN}>Sign in</div>
                </div>
            </nav>


            <div className='Slider'>
                <Slider {...settings}>
                    {
                        slider.map((sliderItem, index) => (
                                <img src={`http://localhost:3001/${sliderItem}`} className='SliderImage'></img>
                        ))
                    }
                </Slider>
            </div>



            <div className='AllItemContainer'>{
                product.map(product => (
                    <div>
                        <div className='SingleItemContainer'>
                            <div className='ItemImageContainer'><img src={`http://localhost:3001${product.pic}`} className='ItemImage'></img></div>
                            <div className='ItemName'> {product.name}</div>
                            <div>CA${product.price}</div>
                            <select style={{border:'2px solid #8076a3',marginTop:10}} >
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                            <button style={{marginTop:10}}>Save it for later</button>
                            <button style={{marginTop:10}}>Add to Cart</button>
                        </div>
                    </div>
                ))
            }
            </div>

            <div className='Pagination'>
                {
                    Array.from({ length: totalPages }, (_, index) => index + 1).map(
                        (page) => (
                            <button key={page}
                                id={page}
                                onClick={() => handlePageChange(page)}
                                className={`${(page === 1 ? (currentPage === 1 ? 'FirstPageActive' : 'FirstPageInactive') : (page === totalPages ? (currentPage === totalPages ? 'LastPageActive' : 'LastPageInactive') : (page === currentPage ? 'PageActive' : 'PageInactive')))}`}
                            >{page}
                            </button>
                        ))
                }
            </div>
        </div>
    )
}

export default ECommerce;