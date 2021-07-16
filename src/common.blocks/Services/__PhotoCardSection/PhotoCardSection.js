import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";

function PhotoCardSection(props) {
    SwiperCore.use([Navigation]);

    const [thumb, setThumb] = useState("");
    const [category, setCategory] = useState("");

    const handleThumb = (event) => {
        setThumb(event.target.src);
    };

    const getCategory = (event) => {
        let img_src = event.target.src;
        let image_category = img_src.split("services/")[1];
        image_category = image_category.split("/")[0];
        setCategory(image_category);
    };

    //Checking weither selected category is "All"

    let image_list = [];
    if (props.title === "All") {
        image_list = props.allImages;
    } else {
        image_list = props.imageList;
    }

    //Assigning a new initial thumbnail each time the user selects a new section
    let initial_thumb = image_list[0];
    useEffect(() => {
        setThumb(`${process.env.PUBLIC_URL + initial_thumb}`);
    }, [initial_thumb]);

    const images_listed = image_list.map((item, index) => (
        <SwiperSlide tag="li" key={index}>
            <figure className="services__card">
                <img
                    onClick={handleThumb}
                    onMouseEnter={getCategory}
                    src={process.env.PUBLIC_URL + item}
                    alt="client card"
                />
                <div className="services__card-info-container">
                    <figcaption className="services__card-info">
                        <h4 className="services__card-category button margin-reset">{category}</h4>
                        <a href="##" className="services__card-link link">
                            <span>Check Service</span>
                            <img src={process.env.PUBLIC_URL + "/img/ui/arrow_10880.png"} alt="check" />
                        </a>
                    </figcaption>
                    <div className="services__card-overlay"></div>
                </div>
            </figure>
        </SwiperSlide>
    ));

    return (
        <div className="services__slider-container container">
            <h3 className="hidden">{props.title}</h3>
            <div className="swiper-column-container">
                <Swiper
                    tag="div"
                    wrapperTag="ul"
                    slidesPerView={2}
                    slidesPerColumn={2}
                    spaceBetween={15}
                    navigation={{ prevEl: "#prev", nextEl: "#next" }}
                    grabCursor={true}
                >
                    {images_listed}
                </Swiper>
                <div className="services__slider-buttons">
                    <button id="prev">
                        <img
                            src={process.env.PUBLIC_URL + "/img/ui/arrow_copy_11284.png"}
                            alt="Back"
                        />
                    </button>
                    <button id="next">
                        <img
                            src={process.env.PUBLIC_URL + "/img/ui/arrow_copy_2_11285.png"}
                            alt="Forward"
                        />
                    </button>
                </div>
            </div>
            <div className="services__thumb-image">
                <img src={thumb} alt="Thumbnail" />
            </div>
        </div>
    );
}

export default PhotoCardSection;
