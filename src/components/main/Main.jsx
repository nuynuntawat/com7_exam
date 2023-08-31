import React from 'react'
import "./main.scss"
import Footer from "../footer/Footer"
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
    const [products, setProducts] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedModelIndex, setSelectedModelIndex] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const [colorClicked, setColorClicked] = useState(false);

    const colorSelected = (product, i) => {
        setSelectedColor(product)
        selectedColorIndex(i)
        colorClicked(true)
    }

    const getAllProducts = async () => {
        const endpoint = "https://interview.com7.in/api/pre-order"

        try {
            const response = await axios.get(endpoint)
            setProducts(response.data.data.main_product),
                setSelectedModel(response.data.data.main_product[0]),
                setSelectedModelIndex(0)
        } catch (error) {
            setError("Something went wrong", error);
        }
    }

    const sortProducts = () => {
        // const sortByPrice = []
        // products.map((product, i) => {        
        //     sortByPrice.push(product?.model[0]?.data[0]?.price)
        // })
        // sortByPrice.sort((x, y) => y - x);
        // console.log(sortByPrice)


        // const sort = products.sort((a, b) => (b.model[0]?.data[0]?.price - a.model[0]?.data[0]?.price))
        // console.log(b.model[0]?.data[0]?.price)
    }

    const selectProduct = (product, index) => {
        setSelectedModel(product)
        setSelectedModelIndex(index)
    }

    useEffect(() => {
        getAllProducts();
        // sortProducts();
    }, []);

    return (
        <div className="main">
            <div className="main-container">
                <div className="main-slider">
                    <div className="image-container">
                        {!colorClicked && <img src={selectedModel?.model[0]?.data[0]?.image_url} alt="" />}
                        {colorClicked && <img src={selectedModel?.model[0]?.data[0]?.image[0]} alt="" />}
                    </div>
                </div>
                <div className="main-content">
                    <div className="model">
                        <div className="model-title">
                            <h2 className="model-title-text">ซื้อ iPhone 13</h2>
                        </div>
                        <div className="model-title">
                            <h4 class="model-title-subtext">รุ่น</h4>
                        </div>
                        <div className="model-content-container">
                            {products.map((product, i) => (
                                <div key={i}
                                    className={"model-content-item " + (selectedModel === product ? "selected" : "")}
                                    onClick={() => selectProduct(product, i)}
                                >
                                    <div className="model-name">
                                        <div className="model-name-title">{product?.name}</div>
                                        <div className="model-name-desc"></div>
                                    </div>
                                    <div className="model-price">{product?.model[0]?.data[0]?.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="color">
                        <div className="color-title">
                            <h4 class="color-text">สี</h4>
                        </div>
                        <div className="color-content-grid">
                            {selectedModel?.model.map((product, i) => (
                                <div key={i} className="color-content-item">
                                    <div className={"color-item-container " + (selectedColor === product ? "selected" : "")}
                                        onClick={() => colorSelected(product, i)}
                                    >
                                        <div className="color-icon"></div>
                                        <div className="color-name">{product.color}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="storage">
                        <div className="storage-title">
                            <h4 className="storage-title-text">ขนาด</h4>
                        </div>
                        <div className="storage-content-grid">
                            {selectedModel?.model[selectedModelIndex]?.data?.map((data, i) => (
                                <div key={i}
                                    className={"storage-grid-item " + (selectedStorage === data ? "selected" : "")}
                                    onClick={() => setSelectedStorage(data)}
                                >
                                    <div className="storage-size">
                                        <h4>{data?.size?.substring(0, 3)}</h4>
                                        <span>GB</span>
                                    </div>
                                    <div className="storage-price">฿{data?.price}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="delivery">
                        <div className="delivery-title">
                            <div className="delivery-title-container">
                                <h4 className="delivery-title-text">คุณต้องการรับสินค้าด้วยวิธีใด</h4>
                            </div>
                        </div>
                        <div className="delivery-content-grid">
                            <div className="delivery-content-item">
                                <div className="delivery-item-icon">
                                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-8i0cyk"><path d="M16.6674 8L11.0015 16V44C10.9729 45.0312 11.3546 46.0317 12.063 46.7816C12.7713 47.5316 13.7483 47.9698 14.7793 48H41.2206C42.2517 47.9698 43.2287 47.5316 43.937 46.7816C44.6454 46.0317 45.0271 45.0312 44.9985 44V16L39.3326 8H16.6674Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svelte-8i0cyk"></path><path d="M11.002 16H44.9989" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="svelte-8i0cyk"></path><path d="M36.7379 23.6311C36.7379 25.9489 35.8172 28.1717 34.1785 29.8106C32.5397 31.4495 30.3171 32.3702 27.9996 32.3702C25.682 32.3702 23.4594 31.4495 21.8206 29.8106C20.1819 28.1717 19.2612 25.9489 19.2612 23.6311" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                </div>
                                <div className="delivery-item-content">
                                    <div className="delivery-content-title">บริการรับสินค้าหน้าร้าน</div>
                                    <div className="delivery-content-description">จองเริ่มต้นเพียง ฿3,000.00 เท่านั้น</div>
                                </div>
                            </div>
                            <div className="delivery-content-item selected">
                                <div className="delivery-item-icon">
                                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-8i0cyk"><path d="M51.9991 28.5429C51.9991 28.5323 51.9991 28.5225 51.9991 28.5118C52.0111 28.1981 51.902 27.8921 51.6953 27.66C51.4886 27.4279 51.2009 27.2883 50.8944 27.2713H50.604L46.1245 17.3301C46.0425 17.1317 45.9061 16.9618 45.7318 16.8408C45.5575 16.7199 45.3528 16.6531 45.1422 16.6485H37.4926L37.7846 13.994C37.8822 12.9828 37.5939 11.9721 36.9799 11.1734C36.6984 10.8075 36.3394 10.5118 35.9299 10.3085C35.5205 10.1053 35.0712 9.99978 34.6161 10H10.8729C10.5666 10.0185 10.278 10.153 10.0635 10.3774C9.84886 10.6018 9.72366 10.8998 9.71226 11.2135L9.47229 13.4007H22.9989C23.2187 13.4136 23.4338 13.4714 23.6314 13.5707C23.8291 13.67 24.0053 13.8088 24.1496 13.9789C24.294 14.1489 24.4035 14.3469 24.4719 14.561C24.5402 14.7751 24.5659 15.001 24.5475 15.2255C24.5586 15.6864 24.3949 16.1337 24.0907 16.4739C23.7865 16.814 23.3654 17.0206 22.9157 17.0503H18.4026V17.0576H5.15833C4.84036 17.0785 4.5426 17.2243 4.32743 17.4647C4.11226 17.7051 3.99637 18.0214 4.00405 18.3472C3.99109 18.5059 4.00931 18.6657 4.05766 18.8171C4.10601 18.9685 4.1835 19.1084 4.28556 19.2287C4.38762 19.3489 4.51219 19.4471 4.65192 19.5173C4.79165 19.5876 4.94371 19.6285 5.09914 19.6376H22.6421C23.0624 19.7353 23.4346 19.9836 23.6914 20.3377C23.9482 20.6918 24.0726 21.1282 24.042 21.5679C24.0533 22.0595 23.8792 22.5366 23.5559 22.9004C23.2326 23.2642 22.7848 23.4868 22.3054 23.522H10.213C9.89093 23.5422 9.58908 23.6895 9.37096 23.9327C9.15284 24.176 9.03547 24.4963 9.04353 24.8263C9.03035 24.9867 9.0487 25.1481 9.09751 25.3011C9.14632 25.454 9.2246 25.5954 9.32772 25.7169C9.43084 25.8384 9.55672 25.9376 9.69792 26.0085C9.83912 26.0794 9.99277 26.1207 10.1498 26.1298H22.1006C22.5264 26.2217 22.9053 26.4682 23.1671 26.8239C23.4289 27.1796 23.5559 27.6202 23.5244 28.0642C23.5366 28.5582 23.3613 29.0378 23.0353 29.4024C22.7093 29.767 22.2579 29.9883 21.7758 30.0199H8.06923H6.91735C6.59612 30.0412 6.29539 30.1887 6.07814 30.4317C5.86089 30.6747 5.74397 30.9942 5.75187 31.3234C5.73869 31.4838 5.75704 31.6452 5.80585 31.7982C5.85466 31.9511 5.93294 32.0925 6.03606 32.214C6.13918 32.3355 6.26506 32.4347 6.40626 32.5056C6.54746 32.5765 6.70111 32.6178 6.85816 32.6269H7.85245L7.46369 37.2968C7.36595 38.308 7.6543 39.3187 8.26841 40.1174C8.54983 40.4833 8.90882 40.7791 9.3183 40.9824C9.72777 41.1856 10.177 41.2911 10.6322 41.2908H11.4897C11.6207 42.5464 12.1877 43.7121 13.0876 44.5763C13.9876 45.4404 15.1608 45.9456 16.394 46C17.6456 45.9343 18.8371 45.4307 19.7691 44.5736C20.7011 43.7164 21.3169 42.5578 21.5134 41.2916H32.2163C33.0888 41.2749 33.9217 40.9165 34.5433 40.2901C34.8238 40.6062 35.166 40.8587 35.5478 41.0312C35.9296 41.2037 36.3425 41.2924 36.7599 41.2916H36.9359C37.0669 42.5471 37.6339 43.7128 38.5339 44.5768C39.4339 45.4408 40.607 45.9458 41.8402 46C43.0918 45.9343 44.2833 45.4307 45.2153 44.5736C46.1472 43.7164 46.7631 42.5578 46.9596 41.2916H47.666C48.6252 41.2196 49.5253 40.7901 50.1958 40.0846C50.8663 39.3792 51.2606 38.4467 51.304 37.4638L51.9959 28.6632C51.9959 28.6509 51.9959 28.6395 51.9959 28.628C51.9959 28.6166 51.9959 28.592 51.9959 28.574C51.9959 28.556 51.9991 28.5536 51.9991 28.5429ZM16.454 43.3946C16.0613 43.3712 15.6771 43.2677 15.3241 43.09C14.9711 42.9124 14.6565 42.6643 14.3987 42.3603C14.1409 42.0564 13.9452 41.7027 13.8231 41.3202C13.7011 40.9376 13.6551 40.534 13.6879 40.133C13.669 39.3101 13.9616 38.5117 14.5047 37.9044C15.0477 37.297 15.7991 36.9278 16.602 36.8738C16.9944 36.8973 17.3782 37.0009 17.731 37.1784C18.0837 37.3559 18.3981 37.6038 18.6558 37.9075C18.9134 38.2112 19.1091 38.5645 19.2313 38.9467C19.3535 39.3289 19.3997 39.7322 19.3673 40.133C19.3868 40.9562 19.0944 41.7553 18.5513 42.3632C18.0082 42.971 17.2564 43.3406 16.4532 43.3946H16.454ZM41.8985 43.3946C41.5058 43.3712 41.1217 43.2677 40.7687 43.09C40.4157 42.9124 40.1011 42.6643 39.8433 42.3603C39.5855 42.0564 39.3898 41.7027 39.2677 41.3202C39.1456 40.9376 39.0996 40.534 39.1324 40.133C39.1136 39.3101 39.4062 38.5117 39.9492 37.9044C40.4923 37.297 41.2437 36.9278 42.0465 36.8738C42.439 36.8973 42.8228 37.0009 43.1755 37.1784C43.5283 37.3559 43.8427 37.6038 44.1004 37.9075C44.358 38.2112 44.5537 38.5645 44.6759 38.9467C44.7981 39.3289 44.8443 39.7322 44.8118 40.133C44.8313 40.9562 44.539 41.7553 43.9959 42.3632C43.4528 42.971 42.7018 43.3406 41.8985 43.3946ZM49.0386 37.2993C49.0206 37.6545 48.8775 37.991 48.6357 38.2467C48.394 38.5024 48.07 38.66 47.7235 38.6904H46.9596C46.7755 37.4931 46.1911 36.3983 45.3061 35.5926C44.4211 34.7868 43.2903 34.32 42.1065 34.2717C40.9044 34.3308 39.7556 34.7969 38.8408 35.5968C37.9259 36.3967 37.2969 37.4849 37.0526 38.6904H36.8191C36.6801 38.692 36.5426 38.6613 36.4169 38.6007C36.2912 38.54 36.1807 38.4509 36.0935 38.3401C35.9069 38.0924 35.8209 37.7805 35.8536 37.4695L37.2862 19.258H40.5755L40.0539 25.886C39.9562 26.8972 40.2445 27.9079 40.8587 28.7066C41.1401 29.0727 41.4992 29.3687 41.9088 29.5721C42.3184 29.7755 42.7679 29.8811 43.2232 29.8808H49.6226L49.0386 37.2993Z" fill="black"></path></svg>
                                </div>
                                <div className="delivery-item-content">
                                    <div className="delivery-content-title">บริการจัดส่งถึงบ้าน</div>
                                    <div className="delivery-content-description">ชำระสินค้าในราคาเต็ม</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="checkout">
                        <div className="checkout-container">
                            <button className="checkout-button"
                                onClick={() => setOpenModal(true)}
                            >
                                ยืนยันการสั่งซื้อล่วงหน้า
                            </button>
                        </div>
                        {openModal && 
                            <div className="checkout-modal" role="dialog">
                                <div className="checkout-modal-container">
                                    <div className="modal-image">
                                        <svg width="198" height="128" viewBox="0 0 198 128" fill="none" xmlns="http://www.w3.org/2000/svg" class="svelte-pxaq92"><circle cx="166" cy="18" r="6" fill="url(#paint0_linear_5_394)" class="svelte-pxaq92"></circle><circle cx="21" cy="85" r="6" fill="url(#paint1_linear_5_394)" class="svelte-pxaq92"></circle><circle cx="179" cy="5" r="4" fill="url(#paint2_linear_5_394)" class="svelte-pxaq92"></circle><circle cx="24" cy="27" r="3" fill="url(#paint3_linear_5_394)" class="svelte-pxaq92"></circle><ellipse cx="99" cy="66.2371" rx="60" ry="59.2371" fill="url(#paint4_linear_5_394)" class="svelte-pxaq92"></ellipse><path fill-rule="evenodd" clip-rule="evenodd" d="M55 108.42V47.5295C55 45.3204 56.7909 43.5295 59 43.5295H138.273C140.482 43.5295 142.273 45.3204 142.273 47.5295V108.42C131.333 119.86 115.829 127 98.6364 127C81.4433 127 65.9393 119.86 55 108.42Z" fill="white" class="svelte-pxaq92"></path><path d="M93.7444 72.5044L108.176 57.6833C108.624 57.2228 109.195 56.9925 109.888 56.9925C110.581 56.9925 111.152 57.2228 111.6 57.6833C112.049 58.1438 112.273 58.73 112.273 59.4417C112.273 60.1535 112.049 60.7396 111.6 61.2002L95.4566 77.7796C94.9674 78.2821 94.3967 78.5333 93.7444 78.5333C93.0921 78.5333 92.5214 78.2821 92.0322 77.7796L85.6726 71.2483C85.2242 70.7878 85 70.2016 85 69.4899C85 68.7782 85.2242 68.192 85.6726 67.7315C86.1211 67.2709 86.6918 67.0407 87.3848 67.0407C88.0779 67.0407 88.6486 67.2709 89.097 67.7315L93.7444 72.5044Z" fill="url(#paint5_linear_5_394)" class="svelte-pxaq92"></path><rect x="85" y="91.9963" width="27.2727" height="4.03889" rx="1" fill="#EEEEEE" class="svelte-pxaq92"></rect><rect x="87.7273" y="110.844" width="21.8182" height="4.03889" rx="1" fill="#EEEEEE" class="svelte-pxaq92"></rect><rect x="79.5454" y="101.42" width="38.1818" height="4.03889" rx="1" fill="#EEEEEE" class="svelte-pxaq92"></rect><defs class="svelte-pxaq92"><linearGradient id="paint0_linear_5_394" x1="166" y1="12" x2="166" y2="24" gradientUnits="userSpaceOnUse" class="svelte-pxaq92"><stop stop-color="#5BBA47" class="svelte-pxaq92"></stop><stop offset="1" stop-color="#198F00" class="svelte-pxaq92"></stop></linearGradient><linearGradient id="paint1_linear_5_394" x1="21" y1="79" x2="21" y2="91" gradientUnits="userSpaceOnUse" class="svelte-pxaq92"><stop stop-color="#5BBA47" class="svelte-pxaq92"></stop><stop offset="1" stop-color="#198F00" class="svelte-pxaq92"></stop></linearGradient><linearGradient id="paint2_linear_5_394" x1="179" y1="1" x2="179" y2="9" gradientUnits="userSpaceOnUse" class="svelte-pxaq92"><stop stop-color="#5BBA47" class="svelte-pxaq92"></stop><stop offset="1" stop-color="#198F00" class="svelte-pxaq92"></stop></linearGradient><linearGradient id="paint3_linear_5_394" x1="24" y1="24" x2="24" y2="30" gradientUnits="userSpaceOnUse" class="svelte-pxaq92"><stop stop-color="#5BBA47" class="svelte-pxaq92"></stop><stop offset="1" stop-color="#198F00" class="svelte-pxaq92"></stop></linearGradient><linearGradient id="paint4_linear_5_394" x1="99" y1="7" x2="99" y2="125.474" gradientUnits="userSpaceOnUse" class="svelte-pxaq92"><stop stop-color="#5BBA47" class="svelte-pxaq92"></stop><stop offset="1" stop-color="#198F00" class="svelte-pxaq92"></stop></linearGradient><linearGradient id="paint5_linear_5_394" x1="98.6364" y1="56.9925" x2="98.6364" y2="78.5333" gradientUnits="userSpaceOnUse" class="svelte-pxaq92"><stop stop-color="#5BBA47" class="svelte-pxaq92"></stop><stop offset="1" stop-color="#198F00" class="svelte-pxaq92"></stop></linearGradient></defs></svg>
                                    </div>
                                    <div className="modal-title">
                                        <h4 className='modal-title-text'>การสั่งซื้อล่วงหน้าสำเร็จ</h4>
                                    </div>
                                    <div className="modal-body">การชำระเงินของคุณสำเร็จแล้ว!</div>
                                    <div className="modal-body">ตอนนี้เราจะส่งอีเมลยืนยันคำสั่งซื้อสำเร็จให้คุณ</div>
                                    <div className="checkout-confirm">
                                        <div className="checkout-confirm-container">
                                            <button className="checkout-confirm-button">ยืนยัน</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Main