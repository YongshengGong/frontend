import './Cart.css';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken';
import { HashLink } from 'react-router-hash-link';
import './ECommerce.css';
import { ShoppingCartOutlined, SearchOutlined, LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


// import { useSelector} from 'react-redux';
const Cart = () => {
    const nav = useNavigate();
    let { username } = useParams();
    // const cart=useSelector(state=>state.eco.image);
    // console.log(cart);
    const [quantity, setQuantity] = useState(0);
    const [uniqueProduct, setProduct] = useState([]);
    const [typeQuantity, setTypeQuantity] = useState({});
  

    const fetchData = () => {
        axios.get(`http://localhost:3001/GetFromCart?username=${username}`)
            .then(res => {
                const x = res.data.product.map((obj, index) => ({ ...obj, number: parseInt(res.data.quantity[index]) }));
                const y = x.reduce((acc, obj) => {
                    if (acc[obj.name]) {
                        acc[obj.name].number += obj.number;
                    }
                    else {
                        acc[obj.name] = { ...obj };
                    }
                    return acc;
                }, {})
                const uniqueSingleItemObjectArray = Object.values(y);
                setProduct(uniqueSingleItemObjectArray.filter(obj => obj.number !== 0));
            });
    }
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:3001/Quantity?username=${username}`)
            .then(res => setQuantity(res.data))
            .catch(error => console.log(error));
    }, [uniqueProduct]);
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


    const handleLogOut = () => {
        localStorage.removeItem('token');
        nav('/ECommerce');
    }
    const handleCart = () => {
        nav(`/ECommerce/UserHomePage/${username}/Cart`)
    }
    const handleQuantityUpdate = async (id, number) => {
        setProduct(uniqueProduct.map(obj => { return (obj.id === id ? ({ ...obj, isEditing: true }) : ({ ...obj })) }));
        setTypeQuantity({ ...typeQuantity, [id]: number });
    }
    const handleSave = async (id, newNumber, oldNumber, product) => {
        let addProductNumber = newNumber - oldNumber;
        const res1 = await axios.post('http://localhost:3001/SaveToCart', { username, product, addProductNumber });
        axios.get(`http://localhost:3001/GetFromCart?username=${username}`)
            .then(res => {
                const x = res.data.product.map((obj, index) => ({ ...obj, number: parseInt(res.data.quantity[index]) }));
                const y = x.reduce((acc, obj) => {
                    if (acc[obj.name]) {
                        acc[obj.name].number += obj.number;
                    }
                    else {
                        acc[obj.name] = { ...obj };
                    }
                    return acc;
                }, {})
                const uniqueSingleItemObjectArray = Object.values(y);
                const uniqueSingleItemObjectArray_new = uniqueSingleItemObjectArray.map((obj, index) => {
                    const find = uniqueProduct.find(obj1 => obj1.name === obj.name);
                    if (find && find.isEditing !== obj.isEditing) {
                        return { ...obj, isEditing: !obj.isEditing }
                    }
                    else {
                        return obj;
                    }
                })
                setProduct(uniqueSingleItemObjectArray_new.filter(obj => obj.number !== 0).map(obj => obj.id === id ? ({ ...obj, isEditing: false }) : (obj)));
            })
    }
    const handleDelete = async (id, oldNumber, product) => {
        let addProductNumber = 0 - oldNumber;
        const res1 = await axios.post('http://localhost:3001/SaveToCart', { username, product, addProductNumber });
        axios.get(`http://localhost:3001/GetFromCart?username=${username}`)
            .then(res => {
                const x = res.data.product.map((obj, index) => ({ ...obj, number: parseInt(res.data.quantity[index]) }));
                const y = x.reduce((acc, obj) => {
                    if (acc[obj.name]) {
                        acc[obj.name].number += obj.number;
                    }
                    else {
                        acc[obj.name] = { ...obj };
                    }
                    return acc;
                }, {})
                const uniqueSingleItemObjectArray = Object.values(y);
                const uniqueSingleItemObjectArray_new = uniqueSingleItemObjectArray.map((obj, index) => {
                    const find = uniqueProduct.find(obj1 => obj1.name === obj.name);
                    if (find && find.isEditing !== obj.isEditing) {
                        return { ...obj, isEditing: !obj.isEditing }
                    }
                    else {
                        return obj;
                    }
                })
                setProduct(uniqueSingleItemObjectArray_new.filter(obj => obj.number !== 0).map(obj => obj.id === id ? ({ ...obj, isEditing: false }) : (obj)));
            })
    }
  

    // const [saving, setSaving] = useState(false);
    // const handleSave = (id, newNumber, oldNumber, product) => {
    //     let addProductNumber = newNumber - oldNumber;
    //     setProduct(uniqueProduct.map(obj => 
    //         obj.id === id 
    //         ? { ...obj, isEditing: false } 
    //         : obj
    //     ));
    //     setSaving({ username, product, addProductNumber });
    // };
    // useEffect(() => {
    //     if (saving) {
    //         const saveData = async () => {
    //             await axios.post('http://localhost:3001/SaveToCart', { username, product:saving.product, addProductNumber:saving.addProductNumber });
    //             setSaving(false);
    //             fetchData();
    //         };
    //         saveData();
    //     }
    // }, [saving]); 


    const totalPriceForEach = uniqueProduct.map(obj => obj.number * obj.price);
    const totalBeforeTax = totalPriceForEach.reduce((acc, num) => acc + num, 0);
 

    return (
        <div className='Cart'>
            <nav className='navBar'>
                <HashLink to='/#project-blank' className='YG'>YG</HashLink>
                <div className='Search'>
                    <input className='SearchInput' placeholder='search'/>
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


            <div class='checkout'>
                <div className='checkout_left'>
                    {
                        uniqueProduct.map((product, index) => (
                            <div key={product.id} className='productContainer'>
                                <img style={{ height: 200, borderRadius: 20 }} src={`http://localhost:3001${product.pic}`} />
                                <div className='itemInfo'>
                                    <div>Product: {product.name}</div>
                                    <div>Price:{product.price}</div>
                                    {product.isEditing === false ?
                                        (<div>
                                            <div>Quantiy: {product.number}</div>
                                            <button onClick={() => { handleQuantityUpdate(product.id, product.number, product) }}>update quantity</button>
                                            <button onClick={() => { handleDelete(product.id, product.number, product) }}>delete</button>
                                        </div>) :
                                        (<div>
                                            Quantity:
                                            <input
                                                type='text'
                                                value={typeQuantity[product.id]}
                                                onChange={(e) => {
                                                    const newValue = e.target.value;
                                                    if (/^[0-9]+$|^$/.test(newValue)) {
                                                        setTypeQuantity({ ...typeQuantity, [product.id]: newValue });
                                                    }
                                                }}
                                                min='1'
                                                max='100'
                                                step='1'
                                            />
                                            <button onClick={() => { handleSave(product.id, typeQuantity[product.id], product.number, product) }}>save</button>
                                        </div>)
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='checkout_right'>
                    <div className='order1'> Order Summary</div>
                    <div className='order'>Total before tax:<div>CA${totalBeforeTax.toFixed(2)}</div></div>
                    <div className='order'>Estimated tax(13%):<div>CA$</div></div>
                    <div className='order2'>Total after tax:<div>CA$</div></div>
                    <div className='order3'>Pay Now</div>
                </div>
            </div>



        </div>
    )
}

export default Cart;