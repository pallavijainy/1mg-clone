import React, { useContext } from "react";

import {
  Text,
  Box,
  IconButton,
  Image,
  Flex,
  Heading,
  Button,
} from "@chakra-ui/react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// Here we have used react-icons package for the icons

// And react-slick as our Carousel Lib
import Slider from "react-slick";
// import AddCart from "../AddCart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductFun } from "./../../redux/ProductAction";
import { CartContext } from "../../cart/CartContext";

// Settings for the slider
const settings = {
  dots: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  infinite: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function LightningDeals() {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState(1);

  const datas = useSelector((store) => store.data);
  console.log(datas);
  const dispatch = useDispatch();
  const { handleCartCount, handleCartProduct } = useContext(CartContext);

  // These are the images used in the slide

  const handleAdd = (e, i, p) => {
    handleCartCount(1);
    const btn = document.getElementById("btn" + i);
    btn.disabled = true;
    e.target.childNodes[0].data = "Added";
    handleCartProduct({ p });
  };


  useEffect(() => {
    dispatch(getProductFun());
  }, []);

  return (
    <Box
      position={"relative"}
      height={"400px"}
      width={"100%"}
      bg={"white"}
      overflow={"hidden"}
    >
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        zIndex={20}
        w="70px"
        h={"70px"}
        position={"absolute"}
        rounded={"50%"}
        shadow={"dark-lg"}
        top={"35%"}
        left="10px"
        bg="none"
        transform={"translate(0%, -50%)"}
        onClick={() => slider?.slickPrev()}
      >
        <FaAngleLeft fontSize={"50px"} color={"#ff6f61"} />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        zIndex={20}
        w="70px"
        h={"70px"}
        position={"absolute"}
        rounded={"50%"}
        shadow={"dark-lg"}
        top={"35%"}
        right="10px"
        bg="none"
        transform={"translate(0%, -50%)"}
        onClick={() => slider?.slickNext()}
      >
        <FaAngleRight fontSize={"40px"} color={"#ff6f61"} />
      </IconButton>
      {/* Slider */}
      <Box display={"flex"} justifyContent="space-between">
        <Box>
          <Heading fontSize={{base:"20px",md:"none"}}>Vitamins & Suppliments | supplement of the week</Heading>
        </Box>
        <Box>
          <Button colorScheme="red">SEE ALL</Button>
        </Box>
      </Box>
     
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {datas.map((el) => (
          <Box
            flexShrink={0}
            w={{ base: "50%", md: "15%" }}
            _hover={{ shadow: "xl" }}
            p={"15px"}
          >
            <Box w={"100%"} h={"150px"} mb={"10px"}>
              <Image h="100%" src={el.src} />
            </Box>
            <Text color="grey" fontSize={"15px"} mb={"10px"} fontWeight={600}>
              {el.title}
            </Text>
            <Text color="grey" fontSize={"13px"} mb={"10px"} fontWeight={600}>
              {el.packsize}
            </Text>
            <Flex gap={"10px"}>
              <Text
                color="grey"
                fontSize={"13px"}
                mb={"10px"}
                textDecor="line-through"
                fontWeight={600}
              >
                {el["strike-price"] ? `₹${el["strike-price"]}` : null}
              </Text>
              <Text
                fontSize={"13px"}
                mb={"10px"}
                color="green"
                fontWeight={600}
              >
                {el["discount-percent"]}
              </Text>
            </Flex>
            <Heading
              color="grey"
              fontSize={"15px"}
              mb={"10px"}
              fontWeight={600}
            >
              {el["price"] ? `₹${el["price"]}` : null}
            </Heading>
            <Button
          w={"100%"}
          id={"btn" + el.id}
          size={"md"}
          onClick={(e) => handleAdd(e, el.id, el)}
          borderRadius="5px"
          bg={"#ff6f61"}
          _hover={{
            bg: "#ff4f61",
          }}
          color="#fff"
        >
          Add To Cart
        </Button>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
